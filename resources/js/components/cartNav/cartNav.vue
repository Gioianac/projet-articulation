<template>
    <div>
        <li class="nav-item first-nav-item"  @mouseleave="hover = false">
            <div class="fa fa-shopping-cart icon-nav">  <div class="numberItems_container"><div class="numberItems" v-model="numberItems">{{numberItems}}</div></div></div>
            <a @mouseover="getCart()" class="nav-link fn-link cart-link" style="color: white;" :href="cartHref">PANIER</a>
            <div class="cart" v-if="hover == true && cart != null && width > 700">
                <div v-if="emptyCart" class="cart-container">
            
                    <div class="cartitems-container row">
                    <div class="row line_bottom pl-3 pb-2 pt-4" v-for="product in cart" v-if="product.id!=null">
                       <div class="col-1 ml-2 mr-2">
                       <a :href='slug+product.slug'> <img  class="product_cart_image" :src="product.path_image" alt=""></a>
                    </div>
                    <div class="col-11 row">
                        <div class="col-10"><p class="cart_product_name">{{product.name}}</p></div>
                        <div class="col-12 text-left"><p class="choice_packaging">Carton de {{product.packaging_capacity}}
                            unité<span v-if="(product.packaging_capacity>1)">s</span> - {{product.format}}</p></div>
                            <div class="col-5"></div>
                            <div class="col-2 text-right">
                                <input type="number" class="choice_list text-center" :class="product.id"
                                :value="product.quantity" min="1" :max="product.stock"
                                @click="adjustPrice(product)">
                            </div>
                            <p class="multiply">X</p>
                            <div class="col-3"><p class="cart_product_price">CHF <template v-if="product.promotion > 0">{{product.promotion_price.toFixed(2)}}</template><template v-else>{{product.price.toFixed(2)}}</template></p>
                            </div>
                            <div class=" col-1"><img @click="deleteProduct(product)"
                             :src="deleteSVG" class="cross" alt=""></div>
                         </div>
                     </div>
                </div>


                     <div class="cart_header_2 row">
                        <p class="prices col-6">TVA</p>
                        <p class="prices col-4 text-center">CHF {{tva.toFixed(2)}}</p>
                    </div>
                    <div class="cart_header_2 row">
                     <p class="prices col-6">Livraison</p>
                     <p class="prices col-4 text-center">CHF {{livraison.toFixed(2)}}</p>
                 </div>
                 <div class="cart_header row">
                     <p class="prices white col-6">Total</p>
                     <p class="prices white col-4 text-center">CHF {{finalPrice.toFixed(2)}}</p>
                 </div>
                       <div class="row cart_buttons text-center justify-content-center pb-2">
                   <div class=" ml-2 col-5 button_cart text-center d-flex flex-column align-items-center justify-content-center"><a class="continuer_text" :href="cartHref">Panier</a></div>
                   <div class="col-1"></div>
                                      <div class=" mr-2 col-5 button_order text-center d-flex flex-column align-items-center justify-content-center"><a class="continuer_text" :href="checkout">Commander</a></div>


                 </div>
             </div>
         </div>
     </li>

 </div>
</template>

<script src="./cartNav.js"></script>
<style scoped src="./cartNav.css"></style>
