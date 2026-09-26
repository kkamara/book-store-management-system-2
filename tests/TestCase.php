<?php

namespace Tests;

use Illuminate\Contracts\Console\Kernel;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use DatabaseTransactions;

    /**
     * Whether the "v1" migrations have already been run for this test process.
     */
    private static bool $migrated = false;

    protected function setUp(): void
    {
        if (!$this->app) {
            $this->refreshApplication();
        }

        if (!self::$migrated) {
            $this->artisan('migrate:fresh', ['--path' => 'database/migrations/v1']);

            $this->app[Kernel::class]->setArtisan(null);

            self::$migrated = true;
        }

        parent::setUp();
    }
}
