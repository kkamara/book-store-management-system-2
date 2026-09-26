<?php

namespace Tests;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

// Migrations are run once by the CI/local setup step, not per test run - see .github/workflows/build.yml
abstract class TestCase extends BaseTestCase
{
    use DatabaseTransactions;
}
