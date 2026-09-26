<?php

namespace Tests\Feature\V1\Web;

use App\Models\V1\Order;
use App\Models\V1\User;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Testing\Fluent\AssertableJson;
use Laravel\Sanctum\Sanctum;

class OrderBookTest extends TestCase
{
    use WithFaker;

    /**
     * A basic feature test OrdersController index route.
     */
    public function testOrderBooks(): void
    {
        $email = "jane@doe.com";
        $user = User::where(compact("email"))->firstOrFail();
        Sanctum::actingAs(
            $user,
        );
        $order = Order::where("user_id", $user->id)
            ->inRandomOrder()
            ->firstOrFail();
        $response = $this->getJson("/api/web/orders/".$order->reference_number."/products");
        $response->assertJson(fn (AssertableJson $json) =>
            $json->has("data")
        )
            ->assertJsonFragment(["id" => $order->orderBooks()->first()->id,])
            ->assertStatus(200);
    }

    /**
     * A basic feature test OrdersController index route not found by doesn't exist.
     */
    public function testOrderBooksNotFoundByDoesntExist(): void
    {
        $email = "jane@doe.com";
        $user = User::where(compact("email"))->firstOrFail();
        Sanctum::actingAs(
            $user,
        );
        $response = $this->getJson("/api/web/orders/doesntexist/products");
        $response->assertJson(fn (AssertableJson $json) =>
            $json->has("message")
        )
            ->assertStatus(404);
    }

    /**
     * A basic feature test OrdersController index route not found by doesn't belong to user.
     */
    public function testOrderBooksNotFoundByDoesntBelongToUser(): void
    {
        $email = "jane@doe.com";
        $user = User::where(compact("email"))->firstOrFail();
        Sanctum::actingAs(
            $user,
        );
        $order = Order::where("user_id", "!=", $user->id)
            ->inRandomOrder()
            ->firstOrFail();
        $response = $this->getJson("/api/web/orders/".$order->reference_number."/products");
        $response->assertJson(value: fn (AssertableJson $json) =>
            $json->has("message")
        )
            ->assertStatus(404);
    }
}
