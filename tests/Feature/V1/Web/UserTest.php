<?php

namespace Tests\Feature\V1\Web;

use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;
use App\Models\V1\User;
use Laravel\Sanctum\Sanctum;

class UserTest extends TestCase
{
    use WithFaker;
    
    public function testAccountNameChange()
    {
        $email = $this->faker->unique()->safeEmail;
        $user = User::factory()->create(['email' => $email,]);
        $newName = "Jane Sarah Doe";
        Sanctum::actingAs(
            $user,
        );
        $response = $this->patchJson(
            '/api/web/user/account',
            [
                "name" => $newName,
                "password" => "secret",
                "passwordConfirmation" => "secret",
            ],
        );

        $response->assertStatus(Response::HTTP_OK)
            ->assertJsonPath("data.id", $user->id)
            ->assertJsonPath("data.name", $newName);
    }
}
