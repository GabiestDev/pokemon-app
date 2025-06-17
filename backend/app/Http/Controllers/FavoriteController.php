<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FavoriteController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $favorites = Favorite::all();
            return response()->json($favorites);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to retrieve favorites',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function toggleFavorite(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'pokemon_id' => 'required|integer',
                'name' => 'required|string|max:255'
            ]);
            
            $favorite = Favorite::firstOrCreate([
                'pokemon_id' => $request->pokemon_id
            ], [
                'name' => $request->name
            ]);
            
            if (!$favorite->wasRecentlyCreated) {
                $favorite->delete();
                return response()->json([
                    'status' => 'removed',
                    'message' => 'Favorite removed successfully'
                ]);
            }
            
            return response()->json([
                'status' => 'added',
                'favorite' => $favorite,
                'message' => 'Favorite added successfully'
            ]);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $e->errors()
            ], 422);
            
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Server error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}