<?php

namespace App\Http\Requests\Concerns;

use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

/**
 * Caps how often one visitor can submit a public form. Returned as a
 * validation error so Inertia forms can show it inline.
 */
trait LimitsSubmissions
{
    protected int $maxSubmissionsPerHour = 5;

    protected function prepareForValidation(): void
    {
        if (! RateLimiter::tooManyAttempts($this->submissionKey(), $this->maxSubmissionsPerHour)) {
            return;
        }

        $minutes = (int) ceil(RateLimiter::availableIn($this->submissionKey()) / 60);

        throw ValidationException::withMessages([
            'message' => __('Too many submissions. Please try again in :minutes minutes.', ['minutes' => $minutes]),
        ]);
    }

    protected function passedValidation(): void
    {
        RateLimiter::hit($this->submissionKey(), 3600);
    }

    protected function submissionKey(): string
    {
        return static::class.'|'.$this->ip();
    }
}
