<template>
     <aside class="filter">
        <h2 class="filter__title">Фильтры</h2>

        <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
          <fieldset class="form__block">
            <legend class="form__legend">Цена</legend>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
              <span class="form__value">От</span>
            </label>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
              <span class="form__value">До</span>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Категория</legend>
            <label class="form__label form__label--select">
              <select class="form__select" type="text" name="category" v-model.number="currentCategoryId">
                <option value="0">Все категории</option>
                <option :value="category.id" v-for="category in categories" :key="category.id">
                  {{ category.title }}</option>
                
              </select>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Цвет</legend>
            <ul class="colors" v-show="colorsData">
              <li class="colors__item" v-for="color in colors" :key="color.id">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" :value="color.id" checked="" v-model.number="currentColorId">
                  <span class="colors__value" :style="{backgroundColor: color.code}">
                  </span>
                </label>
              </li>
              <!-- <li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#FFBE15">
                  <span class="colors__value" style="background-color: #FFBE15;">
                  </span>
                </label>
              </li> -->
              <!-- <li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#939393">
                  <span class="colors__value" style="background-color: #939393;">
                </span></label>
              </li>
              <li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#8BE000">
                  <span class="colors__value" style="background-color: #8BE000;">
                </span></label>
              </li>
              <li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#FF6B00">
                  <span class="colors__value" style="background-color: #FF6B00;">
                </span></label>
              </li>
              <li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#FFF">
                  <span class="colors__value" style="background-color: #FFF;">
                </span></label>
              </li>
              <li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#000">
                  <span class="colors__value" style="background-color: #000;">
                </span></label>
              </li> -->
            </ul>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Объемб в ГБ</legend>
            <ul class="check-list">
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="8" checked="">
                  <span class="check-list__desc">
                    8 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
                  <span class="check-list__desc">
                    16 
                    <span>(461)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
                  <span class="check-list__desc">
                    32 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
                  <span class="check-list__desc">
                    64 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="128">
                  <span class="check-list__desc">
                    128 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="264">
                  <span class="check-list__desc">
                    264 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <button class="filter__submit button button--primery" type="submit">
            Применить
          </button>
          <button class="filter__reset button button--second" type="button" @click.prevent="reset">
            Сбросить
          </button>
        </form>
      </aside>
</template>

<script>
import colors from '@/data/colors';
import axios from 'axios';

import {API_BASE_URL} from '../config';
    
    export default {
        data() {
            return {
                currentPriceFrom: 0,
                currentPriceTo: 0,
                currentCategoryId: 0,
                currentColorId: 0,
                colorsData: null,
                categoriesData: null
            };
        },
        props: ['priceFrom', 'priceTo', 'categoryId', 'colorId'],
        computed: {
            categories() {
                return this.categoriesData ? this.categoriesData.items : [];
            }, 
            colors() {
              return this.colorsData ? this.colorsData.items : [];
            },
        },
        //наблюдатели
        watch: {
            priceFrom(value) {
                this.currentPriceFrom = value;
            },
            priceTo(value) {
                this.currentPriceTo = value;
            },
            categoryId(value) {
                this.currentCategoryId = value;
            },
            colorId(value) {
                this.currentColorId = value;
            },
        },
        methods: {
            submit() {
                this.$emit('update:priceFrom', this.currentPriceFrom);
                this.$emit('update:priceTo', this.currentPriceTo);
                this.$emit('update:categoryId', this.currentCategoryId);
                this.$emit('update:colorId', this.currentColorId);
            },
            reset() {
                this.$emit('update:priceFrom', 0);
                this.$emit('update:priceTo', 0);
                this.$emit('update:categoryId', 0);
                this.$emit('update:colorId', 0);
            },
            loadCategories(){
              axios
              .get(API_BASE_URL + `/api/productCategories`)
                .then(response => this.categoriesData = response.data);
            },
            loadColors(){
              return axios
                .get(API_BASE_URL + `/api/colors`)
                .then(response => this.colorsData = response.data)
            },
        },
        created(){
          this.loadCategories();
          this.loadColors();
        }
    }
</script>