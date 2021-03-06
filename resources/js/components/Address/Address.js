export default {
    data() {
        return {
            payment_method: '',
            comment: '',
            address1: '',
            firstname1: '',
            lastname1: '',
            gender1: '',
            street1: '',
            npa1: '',
            city1: '',
            region1: '',
            country1: '',
            address2: '',
            firstname2: '',
            lastname2: '',
            gender2: '',
            street2: '',
            npa2: '',
            city2: '',
            region2: '',
            country2: '',
            address3: '',
            firstname3: '',
            lastname3: '',
            gender3: '',
            street3: '',
            npa3: '',
            city3: '',
            region3: '',
            country3: '',
            emptyCart: true,
            isHiddenShipTo: false,
            isHiddenBillTo: false,
            isHiddenPromoCode: false,
            isHiddenMail: false,
            isError: false,
            finalsubPrice: 0,
            livraison: 0,
            tva: 0,
            tvaPercent: 7.7,
            finalPrice: 0,
            promocode: 'cuki',
            promotion: false,
            rabais: '',
            errors: {},
            comment: '',
            payment_method: '',
            discount: 10,
            email: '',
            id: document.querySelector("meta[name='user-id']"),
            cgv: 0,
            enabled : 0,
            loading:false,
        }
    },
    mounted() {
        if (this.id != null) {
            let prod = JSON.parse(this.cart);
               if (prod.cart == null || prod.cart == "") {
                this.emptyCart = false;
            }
            this.products = prod['cart'];
            this.gender1 = prod['address'].gender;
            this.firstname1 = prod['address'].firstname;
            this.lastname1 = prod['address'].lastname;
            this.street1 = prod['address'].street;
            this.npa1 = prod['address'].npa;
            this.city1 = prod['address'].city;
            this.region1 = prod['address'].region;
            this.country1  = prod['address'].country;
        } else {
            var local = JSON.parse(localStorage.getItem('storedID'))
            if (local == "" || local == null) {
                this.emptyCart = false;
            }
            this.products = JSON.parse(localStorage.getItem('storedID'));
        }
        var finalsubPrice = 0;
        this.products.forEach(function (product) {
            if(product.promotion > 0) {
                var finalPrice = product.promotion_price * product.quantity;
            } else {
                var finalPrice = product.price * product.quantity;
            }
            product.totalprice = finalPrice
            finalsubPrice = finalsubPrice + product.totalprice;
            finalsubPrice = Math.round(finalsubPrice * 100) / 100;
        });
        this.finalsubPrice = finalsubPrice;
        this.tva = Math.round(this.tvaPercent * this.finalsubPrice / 100);
        this.calculateDelivery();
        this.finalPrice = this.finalsubPrice + this.tva + this.livraison;
        this.finalPrice = Math.round(this.finalPrice * 100) / 100;
    },
    methods: {
        checkPromoCode: function () {
            var enteredCode = this.promocode;
            if (enteredCode == "cuki") {
                this.isHiddenPromoCode = true;
                this.finalPrice = this.tva + this.finalsubPrice + this.livraison;
                this.rabais = this.finalPrice * this.discount / 100;
                this.finalPrice = this.finalPrice - this.rabais;
                this.promotion = this.discount;
                return;
            } else {
                this.isError = true;
            }

        },
        calculateDelivery: function () {
            var nbBouteilles = 0;
            this.products.forEach(function (element) {
                nbBouteilles = nbBouteilles + parseInt(element.quantity, 10);
                ;
            })
            if (nbBouteilles < 12) {
                this.livraison = 30;
            }
            if (nbBouteilles >= 12 && nbBouteilles < 23) {
                this.livraison = 35;
            }
            if (nbBouteilles >= 24 && nbBouteilles < 34) {
                this.livraison = 40;
            }
            if (nbBouteilles >= 35) {
                this.livraison = 0;
            }
        },
        submitAddress(isHiddenBillTo, isHiddenShipTo) {
            //  e.preventDefault();
            this.address1 = {
                lastname1: this.lastname1,
                firstname1: this.firstname1,

                gender1: this.gender1,
                street1: this.street1,
                npa1: this.npa1,
                city1: this.city1,
                region1: this.region1,
                country1: this.country1,
                email: this.email,
            };
            if (isHiddenShipTo) {
                this.address2 = {
                    firstname2: this.firstname2,
                    lastname2: this.lastname2,
                    gender2: this.gender2,
                    street2: this.street2,
                    npa2: this.npa2,
                    city2: this.city2,
                    region2: this.region2,
                    country2: this.country2,
                };
            }
            else {
                this.address2 = null;
            }
            if (isHiddenBillTo) {
                this.address3 = {
                    firstname3: this.firstname3,
                    lastname3: this.lastname3,
                    gender3: this.gender3,
                    street3: this.street3,
                    npa3: this.npa3,
                    city3: this.city3,
                    region3: this.region3,
                    country3: this.country3,
                };
            }
            else {
                this.address3 = null;
            }
            if (this.id != null) {
                this.data = {
                    address1: this.address1,
                    address2: this.address2,
                    address3: this.address3,
                    products: this.products,
                    comment: this.comment,
                    payment_method: this.payment_method,
                    promotion: this.promotion
                }

            } else {
                this.data = {
                    address1: this.address1,
                    address2: this.address2,
                    address3: this.address3,
                    products: JSON.parse(localStorage.getItem('storedID')),
                    comment: this.comment,
                    payment_method: this.payment_method,
                    promotion: this.promotion,
                }
            }
            this.data.cgv = this.cgv
            this.enabled = 1;
            this.loading=true;
            axios.post('check', this.data).catch(error => {
                this.errors = error.response.data.errors
                if(this.errors != null) {
                    this.enabled = 0
                                                            this.loading=false;

                }
            }).then(response => {
                if (response.status == 200 && response.data == 1) {
                    localStorage.removeItem("storedID");
                    window.location.href = 'confirmation'
                                        this.loading=false;

                } else {
                    this.errors['products'] = 'Une erreur est survenue, veuillez réssayer s\'il vous plaît.';
                }
            })
        },
    }, props: ['cart'],

}

