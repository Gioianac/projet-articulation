<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Auth::routes();


// GET
Route::get('/home', 'HomeController@index')->name('home');

Route::get('/products', 'ProductController@show');

Route::get('/produit/{id}', [
    'uses' => 'ProductController@single',
    'as' => 'product.single'
]);

Route::get('/user/account', [
    'uses' => 'UserController@index',
    'as' => 'user.account'
]);

// return JSON file
Route::get('/', 'ProductController@index')->name('products');

Route::get('/checkout', 'CartController@checkout')->name('checkout');

Route::get('/cart', 'CartController@index')->name('cart');


// POST
Route::post('/user/account/update', [
    'uses' => 'UserController@update',
    'as' => 'user.account.update'
]);


Route::post('/check', 'OrderController@store')->name('check');

Route::post('/add', 'CartItemController@store')->name('add');


/*
Route::get('/{any}', function () {
    //return view('welcome');

    return File::get(public_path().'/dist/index.html');
})->where('any', '.*');*/
