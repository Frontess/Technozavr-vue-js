<template>
  <main class="content container">
      <div class="content__top">
       <!--  <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="index.html">
              Каталог
            </a>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              Корзина
            </a>
          </li>
        </ul> -->
  
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{ productCount }} товаров
        </span>
      </div>
       <section class="cart">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field">
            <ul class="cart__list">
  
              <cart-item v-for="item in products" :key="item.productId" :item="item"/>
  
            </ul>
          </div>
  
          <div class="cart__block">
            <p class="cart__desc">
              Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
            </p>
            <p class="cart__price">
              Итого: <span>{{totalPrice | numberFormat}} ₽</span>
            </p>
  
            <router-link tag="button" :to="{name: 'order'}" class="cart__button button button--primery" type="submit" v-show="products.length !==0">
              Оформить заказ
            </router-link>
          </div>
        </form>
      </section>
  </main>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import numberFormat from '@/helpers/numberFormat';
  import CartItem from '@/components/CartItem.vue';
  export default {
  components: { CartItem },
  data() {
         return {
             productAmount: 1,
         };
      },
  filters: { numberFormat },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice', productCount: 'cartProductsCount' }),
  },
  };
  </script>