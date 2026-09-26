<?php

namespace Tests\Feature\V1\Web;

use App\Models\V1\Book;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Testing\Fluent\AssertableJson;

class ReviewTest extends TestCase
{
    /**
     * A basic feature test ReviewController get route.
     */
    public function testReview(): void
    {
        $this->seed();
        $book = Book::where("approved", 1)->firstOrFail();
        $reviews = $book->reviews()
            ->where("approved", 1)
            ->paginate(3);
        $response = $this->getJson("/api/web/books/".$book->slug."/reviews");
        $response->assertJson(fn (AssertableJson $json) =>
            $json->hasAll(["data", "links", "meta",])
                ->missing("message")
        )
            ->assertJsonFragment(["id" => $reviews->first()->id])
            ->assertStatus(200);
    }

    /**
     * A basic feature test BookController get route where book should not be found.
     */
    public function testBookNotFoundByExists(): void
    {
        $this->seed();
        $response = $this->getJson("/api/web/books/doesnt-exist");
        $response->assertJson(fn (AssertableJson $json) =>
            $json->has("message")
                ->missing("data")
        )
            ->assertJson(["message" => "Resource not found."])
            ->assertStatus(404);
    }

    /**
     * A basic feature test BookController get route where book should not be found.
     */
    public function testBookNotFoundByApproved(): void
    {
        $this->seed();
        $book = Book::where("approved", "!=", 1)->firstOrFail();
        $response = $this->getJson("/api/web/books/".$book->slug);
        $response->assertJson(fn (AssertableJson $json) =>
            $json->has("message")
                ->missing("data")
        )
            ->assertJson(["message" => "Resource not found."])
            ->assertStatus(404);
    }
}
