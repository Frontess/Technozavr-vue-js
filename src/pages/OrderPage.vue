<template>
<main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ productCount }} товаров
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" :error="formError.name" type="text"
            title="ФИО" placeholder="Введите ваше полное имя"></BaseFormText>

            <BaseFormText v-model="formData.address" :error="formError.address" type="text"
            title="Адрес доставки" placeholder="Введите ваш адрес"></BaseFormText>
            
            <BaseFormText v-model="formData.phone" :error="formError.phone" type="tel"
            title="Телефон" placeholder="Введите ваш телефон"></BaseFormText>

            <BaseFormText v-model="formData.email" :error="formError.email" type="email"
            title="Email" placeholder="Введи ваш Email"></BaseFormText>

            <BaseFormTextarea title="Комментарий к заказу" v-model="formData.comment" 
            :error="formError.comment" placeholder="Ваши пожелания"></BaseFormTextarea>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <CartBlock :products="this.$store.state.cartProductsData"></CartBlock>
          </ul>
       
          <!-- <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>3</b> товара на сумму <b>37 970 ₽</b></p>
          </div> -->

          <button class="cart__button button button--primery" type="submit" :to="{name: 'orderInfo', params: {id: order.id}}">
            Оформить заказ
          </button>
          <div v-show="formLoading">Загрузка товаров...</div>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
  import BaseFormText from '@/components/BaseFormText.vue';
  import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
  import CartBlock from '@/components/CartBlock.vue';
  import numberFormat from '@/helpers/numberFormat';
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  import {API_BASE_URL} from '../config';


  export default {
    props: ['products'],
      components: {BaseFormText, BaseFormTextarea, CartBlock},
      filters: { numberFormat },
      data(){
        return {
          formData: {}, 
          formError: {}, 
          formErrorMessage: '',
          formLoading: false,
        }
      }, 
      computed: {
    ...mapGetters({ productCount: 'cartProductsCount' }),
   },
    methods: {
      order(){
        this.formError = {};
        this.formErrorMessage = '';
        this.formLoading = true; // очищаем свойство перед работой
          axios
          .post(API_BASE_URL + `/api/orders`, {
            ...this.formData,
          }, {
            params: {
              userAccessKey: this.$store.state.userAccessKey
            }
          })
          .then(response => {
            this.formLoading = false,
            this.$store.commit('resetCart');
            this.$store.commit('updateOrderInfo', response.data);
            this.$router.push({name: 'orderInfo', params: {id: response.data.id}});
          })
          .catch(error => {
            this.formLoading = false,
            this.formError = error.response.data.error.request || {};
            this.formErrorMessage = error.response.data.error.message;
          })
      }
    }

  }
</script>