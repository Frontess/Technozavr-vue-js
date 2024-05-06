<template>
    <!--  <div class="form__counter">
                <button type="button" @click=" productAmount--" aria-label="Убрать один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>
                <input type="text" v-model.number="productAmount">
                <button type="button" @click="productAmount++" aria-label="Добавить один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
      </div> -->

              <li class="cart__item product" >
              <div class="product__pic">
                <img :src="item.product.image" width="120" height="120"  alt="item.product.title">
              </div>
              <h3 class="product__title">
                {{ item.product.title }}
              </h3>

              <span class="product__code">
                Артикул: {{item.product.id}}
              </span>

              <ProductCounter :counter.sync="amount"/>
             <!--  <div class="product__counter form__counter">
               <button type="button" @click=" productAmount--" aria-label="Убрать один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>
                <input type="text" v-model.number="amount" name="count">
                <button type="button" @click="productAmount++" aria-label="Добавить один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>
 -->
              <b class="product__price">
               {{item.amount * item.product.price | numberFormat}}
              </b>

              <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(item.productId)">
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
            </li>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import numberFormat from '@/helpers/numberFormat';
import ProductCounter from '@/components/ProductCounter.vue';

export default {
  props: ['item'],
  components: { ProductCounter },
   filters: { numberFormat },
   data() {
       return {
           productAmount: 1,
       };
    },
    methods: {
    ...mapActions({deleteProduct: 'deleteCartProduct'}),
   },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  }
}
</script>
