export default {
	data() {
		return {
			products : [],
			tvaPercent:7.7,
			tva:0,
			finalsubPrice:0,
			livraison:0,
			finalPrice:0,
			productToDelete: '',
			id:document.querySelector("meta[name='user-id']"),
			emptyCart:true,
		}
	},
	methods:{
		calculateDelivery:function(){
			var nbBouteilles=0;
			this.products.forEach(function(element) {
				nbBouteilles=nbBouteilles+parseInt(element.quantity, 10);;
			})
			if (nbBouteilles<13) {
				this.livraison=30;
			}
				if (nbBouteilles>13&&nbBouteilles<36) {
				this.livraison=20;
			}
				if (nbBouteilles>35) {
				this.livraison=0;
			}
			},
		adjustPrice: function(product){
			var local = localStorage.getItem('storedID'),
			local = local ? JSON.parse(local): [];
			var test =event.target.value
			product.quantity = test;
			var finalsubPrice= 0;
			var total = product.price*product.quantity;
			product.totalprice=total;
			this.adjustTotalPrice();

			var prodId = product.id
			local.forEach(function(element) {
				if (element.id == prodId) {
					element.quantity = test;
				}
			});
			localStorage.setItem('storedID', JSON.stringify(local));
		},
		adjustTotalPrice:function(){
			var finalsubPrice= 0;
			this.products.forEach(function(product) {
			var total =  product.price*product.quantity;
			product.totalprice=total
			finalsubPrice=finalsubPrice+product.totalprice;
			});
			this.finalsubPrice=finalsubPrice;
			this.tva = Math.round(this.tvaPercent*this.finalsubPrice/100);
						this.calculateDelivery();
			this.finalPrice = this.finalsubPrice+this.tva+this.livraison;

		},
		deleteProduct : function (event) {
			if (this.id != null) {
				axios.delete('cartItem/' + event.id).catch(error => {
					console.dir(error);
				})
				var local = JSON.parse(localStorage.getItem('storedID'));
				var removeIndex = local.map(function(item) { return item.id; }).indexOf(event.id);
				local.splice(removeIndex,1);
				localStorage.setItem('storedID', JSON.stringify(local));
				Vue.set(event, 'id',null)
				Vue.set(event,'quantity',null)
				Vue.set(event,'price',null)
				
				if (this.products=="" || this.products==null) {
					this.emptyCart=false;
				}
				this.adjustTotalPrice();

			}else{
				var local = JSON.parse(localStorage.getItem('storedID'));
				var removeIndex = local.map(function(item) { return item.id; }).indexOf(event.id);
				local.splice(removeIndex,1);
				localStorage.setItem('storedID', JSON.stringify(local));
				this.products = JSON.parse(localStorage.getItem('storedID'));
				this.adjustTotalPrice();
			}
		},
		checkLocalStorage:function(){
			var local = JSON.parse(localStorage.getItem('storedID'))
			if (this.id==null) {
				if (local=="" || local==null) {
					this.emptyCart=false;

				}
			}
		}
	},
	setQuantity:function(){
		console.log("a implémenter")
	},

	computed:{


	},

	props : ['cart'],
	mounted () {
		if (this.id != null) {
			this.products = JSON.parse(this.cart);
			if (this.products==null || this.products=="") {
				this.emptyCart=false;
			}

		} else {
			var local = JSON.parse(localStorage.getItem('storedID'))

			if (local=="" || local==null) {
				this.emptyCart=false;
			} 
			this.products = JSON.parse(localStorage.getItem('storedID'));
		}
		var finalsubPrice= 0;
		this.products.forEach(function(product) {
			var total =  product.price*product.quantity;
			product.totalprice=total
			finalsubPrice=finalsubPrice+product.totalprice;
		});
		this.finalsubPrice=finalsubPrice;
		this.tva = Math.round(this.tvaPercent*this.finalsubPrice/100);
					this.calculateDelivery();

		this.finalPrice = this.finalsubPrice+this.tva+this.livraison;
	},
	beforeMount(){



	},

}