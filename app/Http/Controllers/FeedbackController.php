<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFeedbackRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class FeedbackController extends Controller
{
    /**
     * Accept validated visitor feedback.
     */
    public function store(StoreFeedbackRequest $request): RedirectResponse
    {
        // Storage is not wired up yet; persist to a Feedback model once the table exists.
        Log::info('Feedback received.', $request->validated());

        return back();
    }
}
