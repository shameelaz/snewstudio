<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\LimitsSubmissions;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreFeedbackRequest extends FormRequest
{
    use LimitsSubmissions;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => ['required', 'string', 'in:comment,suggestion,general'],
            'message' => ['required', 'string', 'max:2000'],
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'string', 'lowercase', 'email', 'max:255'],
        ];
    }
}
