<?php

use App\Http\Controllers\V1\Web\BookController;
use App\Http\Controllers\V1\Web\CartController;
use App\Http\Controllers\V1\Web\HomeController;
use App\Http\Controllers\V1\Web\OrderBookController;
use App\Http\Controllers\V1\Web\OrderController;
use App\Http\Controllers\V1\Web\ReviewController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\Web\UserController as WebUserController;
use App\Http\Controllers\V1\API\UserController;
use App\Http\Controllers\V1\Mobile\BookController as MobileBookController;
use App\Http\Controllers\V1\Mobile\CartController as MobileCartController;
use App\Http\Controllers\V1\Mobile\HomeController as MobileHomeController;
use App\Http\Controllers\V1\Mobile\OrderBookController as MobileOrderBookController;
use App\Http\Controllers\V1\Mobile\OrderController as MobileOrderController;
use App\Http\Controllers\V1\Mobile\ReviewController as MobileReviewController;
use App\Http\Controllers\V1\Mobile\UserController as MobileUserController;

Route::prefix('v1')
    ->group(function () {
    Route::prefix('web')
        ->group(function () {
            // Add single page app api routes
            Route::prefix('/user')->group(function () {
                Route::post('/register', [WebUserController::class, 'register']);
                Route::post('/', [WebUserController::class, 'login']);
                Route::delete(
                    '/logout',
                    [WebUserController::class, 'logout'],
                )->middleware("auth:sanctum");
                Route::get(
                    '/authorize',
                    [WebUserController::class, 'authorizeUser'],
                )->middleware("auth:sanctum");
                Route::patch(
                    '/account',
                    [WebUserController::class, 'account'],
                )->middleware("auth:sanctum");
            });
            Route::get(
                '/users',
                [WebUserController::class, 'getUsers'],
            )->middleware("auth:sanctum");
            Route::get(
                '/',
                [HomeController::class, 'home'],
            );
            Route::get(
                '/orders',
                [OrderController::class, 'index'],
            )->middleware("auth:sanctum");
            Route::get(
                '/cart',
                [CartController::class, 'index'],
            )->middleware("auth:sanctum");
            Route::post(
                '/cart/update',
                [CartController::class, 'update'],
            )->middleware("auth:sanctum");
            Route::post(
                '/cart',
                [CartController::class, 'addToCart'],
            )->middleware("auth:sanctum");
            Route::post(
                '/cart/remove',
                [CartController::class, 'removeFromCart'],
            )->middleware("auth:sanctum");
            Route::get(
                '/books/search',
                [BookController::class, 'search'],
            );
            Route::get(
                '/books/{slug}',
                [BookController::class, 'get'],
            );
            Route::get(
                '/orders/{referenceNumber}',
                [OrderController::class, 'show'],
            )->middleware("auth:sanctum");
            Route::get(
                '/books/search/editions',
                [BookController::class, 'editions'],
            );
            Route::get(
                '/books/search/categories',
                [BookController::class, 'categories'],
            );
            Route::get(
                '/orders/{referenceNumber}/products',
                [OrderBookController::class, 'index'],
            )->middleware("auth:sanctum");
            Route::get(
                '/books/{slug}/reviews',
                [ReviewController::class, 'getReviewByBook'],
            );
        });

    Route::prefix('mobile')
        ->group(function () {
            Route::prefix('/user')->group(function () {
                Route::post('/register', [MobileUserController::class, 'register']);
                Route::post('/', [MobileUserController::class, 'login']);
                Route::delete(
                    '/logout',
                    [MobileUserController::class, 'logout'],
                )->middleware("auth:sanctum");
                Route::get(
                    '/authorize',
                    [MobileUserController::class, 'authorizeUser'],
                )->middleware("auth:sanctum");
                Route::patch(
                    '/account',
                    [MobileUserController::class, 'account'],
                )->middleware("auth:sanctum");
            });
            Route::get(
                '/users',
                [MobileUserController::class, 'getUsers'],
            )->middleware("auth:sanctum");
            Route::get(
                '/',
                [MobileHomeController::class, 'home'],
            );
            Route::get(
                '/orders',
                [MobileOrderController::class, 'index'],
            )->middleware("auth:sanctum");
            Route::get(
                '/cart',
                [MobileCartController::class, 'index'],
            )->middleware("auth:sanctum");
            Route::post(
                '/cart/update',
                [MobileCartController::class, 'update'],
            )->middleware("auth:sanctum");
            Route::post(
                '/cart',
                [MobileCartController::class, 'addToCart'],
            )->middleware("auth:sanctum");
            Route::post(
                '/cart/remove',
                [MobileCartController::class, 'removeFromCart'],
            )->middleware("auth:sanctum");
            Route::get(
                '/books/search',
                [MobileBookController::class, 'search'],
            );
            Route::get(
                '/books/{slug}',
                [MobileBookController::class, 'get'],
            );
            Route::get(
                '/orders/{referenceNumber}',
                [MobileOrderController::class, 'show'],
            )->middleware("auth:sanctum");
            Route::get(
                '/books/search/editions',
                [MobileBookController::class, 'editions'],
            );
            Route::get(
                '/books/search/categories',
                [MobileBookController::class, 'categories'],
            );
            Route::get(
                '/orders/{referenceNumber}/products',
                [MobileOrderBookController::class, 'index'],
            )->middleware("auth:sanctum");
            Route::get(
                '/books/{slug}/reviews',
                [MobileReviewController::class, 'getReviewByBook'],
            );
        });

    Route::prefix('/user')->group(function () {
        Route::post('/register', [UserController::class, 'register']);
        Route::post('/', [UserController::class, 'login'])->name('login');
        Route::delete(
            '/logout',
            [UserController::class, 'logout'],
        )->middleware("auth:sanctum");
        Route::get(
            '/authorize',
            [UserController::class, 'authorizeUser'],
        )->middleware("auth:sanctum");
    });
});
