<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class StudioTest extends TestCase
{
    /**
     * @return array<string, array{string, string}>
     */
    public static function pages(): array
    {
        return [
            'welcome' => ['/', 'Studio/Welcome'],
            'menu' => ['/menu', 'Studio/Menu'],
            'portfolio' => ['/portfolio', 'Studio/Portfolio'],
            'contact' => ['/contact', 'Studio/Contact'],
            'pricing' => ['/pricing', 'Studio/Pricing'],
            'feedback' => ['/feedback', 'Studio/Feedback'],
        ];
    }

    #[DataProvider('pages')]
    public function test_studio_pages_render(string $uri, string $component): void
    {
        $this->get($uri)
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component($component));
    }

    public function test_previous_pages_redirect_to_portfolio_chapters(): void
    {
        $this->get('/projects')->assertRedirect('/portfolio#work');
        $this->get('/career')->assertRedirect('/portfolio#experience');
        $this->get('/education')->assertRedirect('/portfolio#credentials');
    }

    public function test_whatsapp_number_is_shared_as_digits_only(): void
    {
        config(['services.whatsapp.number' => '+60 12-345 6789']);

        $this->get('/contact')->assertInertia(fn (Assert $page) => $page->where('whatsapp', '60123456789'));
    }

    public function test_whatsapp_number_is_null_when_not_configured(): void
    {
        config(['services.whatsapp.number' => null]);

        $this->get('/contact')->assertInertia(fn (Assert $page) => $page->where('whatsapp', null));
    }

    public function test_feedback_requires_a_known_type_and_message(): void
    {
        $this->from('/feedback')
            ->post('/feedback', ['type' => 'spam'])
            ->assertSessionHasErrors(['type', 'message']);
    }

    public function test_feedback_name_and_email_are_optional(): void
    {
        $this->from('/feedback')
            ->post('/feedback', ['type' => 'suggestion', 'message' => 'Love the animations.'])
            ->assertRedirect('/feedback')
            ->assertSessionHasNoErrors();
    }

    public function test_submissions_are_rate_limited(): void
    {
        $payload = ['type' => 'general', 'message' => 'Hi'];

        for ($i = 0; $i < 5; $i++) {
            $this->from('/feedback')->post('/feedback', $payload)->assertSessionHasNoErrors();
        }

        $this->from('/feedback')->post('/feedback', $payload)->assertSessionHasErrors('message');
    }
}
