<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\JsonResponse;

class PokemonController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $page = request('page', 1);
            $perPage = 20;
            $offset = ($page - 1) * $perPage;

            $response = Http::timeout(15)->get('https://pokeapi.co/api/v2/pokemon', [
                'offset' => $offset,
                'limit' => $perPage
            ]);

            if ($response->failed()) {
                return response()->json(['error' => 'Pokemon API unavailable'], 503);
            }

            return response()->json($response->json());
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $response = Http::timeout(15)->get("https://pokeapi.co/api/v2/pokemon/{$id}");

            if ($response->failed()) {
                return response()->json(['error' => 'Pokemon not found'], 404);
            }

            return response()->json($response->json());
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }
}