<?php

namespace Tests\Feature\V1\Web;

use App\Models\V1\Book;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Testing\Fluent\AssertableJson;

class HomeTest extends TestCase
{
    /**
     * A basic feature test HomeController home route.
     */
    public function testHome(): void
    {
        $this->seed();
        $book = Book::orderBy("id", "DESC")
            ->where("approved", 1)
            ->paginate(8);
        $response = $this->getJson("/api/web/");
        $response->assertJson(fn (AssertableJson $json) =>
            $json->hasAll(["data", "links", "meta",])
                ->missing("message")
                ->etc()
        )
            ->assertJsonFragment([ "id" => $book->first()->id, ]);
    }
}
