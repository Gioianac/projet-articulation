<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use App\Cart;
use App\Product;
use App\Address;
use App\Person;
use App\Http\Controllers\ProductController;

class CartController extends Controller
{
    public static function index($require)
    {
        if (Auth::check()) {
            $user = Auth::user();

            $cart = Cart::where('user_id', $user->id)->first();

            if ($cart == null) {
                $json = json_encode(null);
            } elseif ($cart->cartItems == null) {
                $json = json_encode(null);
                dd($json);
            } else {
                $cartItems = $cart->cartItems;
                $cart = [];

                foreach ($cartItems as $cartItem) {
                    $product = ProductController::getById($cartItem->product_id);
                    $newProduct = ProductController::getAllData($product['product']);
                    $newProduct['quantity'] = $cartItem['quantity'];
                    array_push($cart, $newProduct);
                }

                if ($require == 'address') {

                    $person = Person::where('id', $user->person_id)->first();

                    if ($person == null) {
                        $favoriteAddress = null;
                    } else {
                        $address = Address::where('person_id', $person->id)->first();

                        $favoriteAddress = [];
                        if ($address == null) {
                            $favoriteAddress = null;
                        } else {
                            $favoriteAddress['street'] = $address->street;
                            $favoriteAddress['npa'] = $address->npa;
                            $favoriteAddress['city'] = $address->city;
                            $favoriteAddress['region'] = $address->region;
                            $favoriteAddress['country'] = $address->country;
                        }
                        if ($person == null) {
                            $person == null;
                        } else {
                            $favoriteAddress['gender'] = $person->gender;
                            $favoriteAddress['firstname'] = $person->firstname;
                            $favoriteAddress['lastname'] = $person->lastname;
                        }

                        $data = [
                            'cart' => $cart,
                            'address' => $favoriteAddress
                        ];
                        $json = json_encode($data);
                    }
                } else {
                    $json = json_encode($cart);
                }
            }
        } else {
            $json = json_encode(null);
        }
        return $json;
    }

    public static function checkForAvailability($quantity, $stock)
    {
        if ($quantity > $stock) {
            return 'Erreur, il ne reste que ' . $stock . ' unités dans notre stock. Veuillez s\'il vous plaît diminuer la quantité demandée';
        } else {
            return null;
        }
    }
}


