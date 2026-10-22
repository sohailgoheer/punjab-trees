<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\TestCase;

final class HealthEndpointTest extends TestCase
{
    public function test_health_endpoint_returns_safe_json(): void
    {
        $this->getJson('/api/v1/health')
            ->assertOk()
            ->assertExactJson([
                'data' => [
                    'status' => 'ok',
                    'service' => 'treestory-api',
                ],
            ]);
    }
}
