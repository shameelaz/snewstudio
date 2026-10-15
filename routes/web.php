<?php

use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Studio/Welcome')->name('home');
Route::inertia('/menu', 'Studio/Menu')->name('menu');
Route::inertia('/portfolio', 'Studio/Portfolio')->name('portfolio');
Route::inertia('/contact', 'Studio/Contact')->name('contact');
Route::inertia('/pricing', 'Studio/Pricing')->name('pricing');
Route::inertia('/feedback', 'Studio/Feedback')->name('feedback');

Route::post('/feedback', [FeedbackController::class, 'store'])->name('feedback.store');

// The previous single-topic pages now live as chapters of the portfolio.
Route::redirect('/about', '/portfolio#about');
Route::redirect('/projects', '/portfolio#work');
Route::redirect('/career', '/portfolio#experience');
Route::redirect('/certifications', '/portfolio#credentials');
Route::redirect('/education', '/portfolio#credentials');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
