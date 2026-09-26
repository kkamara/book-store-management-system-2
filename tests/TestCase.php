<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\RefreshDatabaseState;
use Illuminate\Contracts\Console\Kernel;

abstract class TestCase extends BaseTestCase
{
    use RefreshDatabase;

    /**
     * Refresh a conventional test database.
     *
     * @return void
     */
    protected function refreshTestDatabase()
    {
        if (!RefreshDatabaseState::$migrated) {
            $this->artisan(
                'migrate:fresh',
                array_merge(
                    $this->migrateFreshUsing(),
                    [
                        "--path" => "database/migrations/v1"
                    ],
                )
            );

            $this->app[Kernel::class]->setArtisan(null);

            RefreshDatabaseState::$migrated = true;
        }

        $this->beginDatabaseTransaction();
    }
}
