<template>
    <div style="background-color: #fff;">
        <!-- <top-nav :keywordsVal="keywords"></top-nav> -->
        <div style="position:relative">
            <div class='search left50'>
                <div style="float: left;width: 22%;">
                <!-- <van-icon name="location-o" style="padding-top: 5px;"/> -->
                <van-dropdown-menu style="height: 54px">
                    <van-dropdown-item v-model="value1" :options="option1"  @change="menuchange"/>
                </van-dropdown-menu>
                <!-- <van-icon name="arrow-down" /> -->
                </div>
            <van-search style="float: left;width: 75%;background-color:rgba(0,0,0,0)!important;" :placeholder="$t('searchProducts')" v-model="value" shape="round" @focus="onSearch"/>
            </div>
            <div style="display:block;line-height:0">
                <van-image 
                :src="country.logo_url"
                />
            </div>
        </div>
        <!--swiper area-->
        <div class="swiper-area">
            <van-swipe :autoplay="3000" @change="onChange">
                <van-swipe-item v-for="( banner ,index) in bannerPicArray" :key="index" >
                    <img v-lazy="banner.image" width="100%" @click="goGoodsPage(banner.good_id)"/>
                </van-swipe-item>
                <!-- <div class="custom-indicator" slot="indicator">
                    {{ current + 1 }}/{{bannerPicArray.length}}
                </div> -->
            </van-swipe>
            
            <!-- <div class="swiper-span"></div> -->
        </div>  
        <div  style="display:block;line-height:0">
            <van-image
            width="33.33%"
            :src="this.man.image_url"
            @click="golistPage(man.mallCategoryId,man.mallCategoryName)"
            />
            <van-image
            width="33.33%"
            :src="country.foreign_link_image_url"
            @click="goForeign(country.foreign_link)"
            />
            <van-image
            width="33.33%"
            :src="this.woman.image_url"
            @click="golistPage(woman.mallCategoryId,woman.mallCategoryName)"
            />
        </div>
        <div class="middle">
            <!-- <video :src="country.video_url" controls="controls" width="100%" style="display: block"/> -->
            <video-tpl :src_tpl="country.video_url"></video-tpl>
            <van-image
            width="100%"
            :src="this.woman.image_url"
            />
            <van-image
            width="100%"
            :src="this.module_1.image_url"
            @click="golistPage(module_1.mallCategoryId,module_1.mallCategoryName)"
            />
        </div>
        <div>
            <div v-for="(cate,index) in category" :key="index">
                <div class="category_title">
                    <p>{{cate.mallCategoryName}}</p>
                    <span>{{cate.desc}}</span>
                </div>
                <div style="position:relative">
                    <div  @click="golistPage(cate.mallCategoryId,cate.mallCategoryName)" >
                        <van-swipe  @change="obj[index]" indicator-color="white" :ref="`swipe${index}`">
                            <van-swipe-item v-for="( banner ,index) in cate.image_url_list" :key="index" >
                                <img v-lazy="banner" width="100%"/>
                            </van-swipe-item>
                            <!-- <div class="custom-indicator" slot="indicator">
                                {{ current + 1 }}/{{bannerPicArray.length}}
                            </div> -->
                        </van-swipe>
                    </div>
                    <div>
                        <span class="left" @click="objClickRight(`swipe${index}`,index)"></span>
                        <span class="right" @click="objClickLeft(`swipe${index}`,index)"></span>
                    </div>
                </div>
            </div>
        </div>
        <!--type bar-->
        <!-- <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index"  @click="golistPage(cate.mallCategoryId,index)">
                <img :src="cate.image_url" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div> -->
        <div>

        </div>
        <mainFooter></mainFooter>
        
    </div>
</template>

<script>
    import axios from 'axios'
    import 'swiper/dist/css/swiper.css'
    import {swiper , swiperSlide} from 'vue-awesome-swiper'
 
    import floorComponent from '../component/floorComponent'
    import mainFooter from '../component/mainFooter'
    import videoTpl from '../component/video'
    import { toMoney , int,num} from '@/filter/moneyFilter.js'
    import goodsInfo from '../component/goodsInfoComponent'
    import topNav from '../component/topNav'
    import url from '@/serviceAPI.config.js'
   
    export default {
        data() {
            return {
                index_obj:[],
                obj:[],
                man:[],
                woman:[],
                module_1:[],
                country:[],
                value1: 2,
                option1: [
                  { text: this.$t('yn'), value: 1 },
                  { text: this.$t('flb'), value: 2 }
                ],
                keywords:'',
                value:'',
                bar_fixed:true,
                navLeft_show:false,
                activeKey:9999999,
                show:false,
                swiperOption:{
                    slidesPerView:3
                },
                msg: 'Shopping Mall',
                locationIcon: require('../../assets/images/location.png'),
                bannerPicArray:[],
                category:[],
                adBanner:'',
                recommendGoods:[],
                hotGoods:[],  //热卖商品
                nav_img:[require('../../assets/images/cartempty.png')],
                current: 0,
              
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            },
            int(money){
                return int(money)
            },
            num(money){
                return num(money)
            }
        },
        components:{swiper,swiperSlide,floorComponent,goodsInfo,mainFooter,topNav,videoTpl},
        created(){
            this.value1=this.$store.state.country_id||1
            console.log(this.$store.state.country_id)
            axios({
                url:url.getShopingMallInfo,
                method:'get',
                params: {country_id:this.$store.state.country_id}
            })
            .then(response=>{
                // console.log(response)
                console.log(this.index_obj)
                var that =this
                if(response.status==200){
                    for (let i = 0; i < response.data.data.category.length-3; i++) {
                        that.obj.push(function(a){that.index_obj[i]=a})
                        that.index_obj.push(0)
                    }

                    that.category=response.data.data.category;
                    // this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
                    that.bannerPicArray= response.data.data.slides;
                    // this.recommendGoods = response.data.data.recommend;
                    that.hotGoods = response.data.data.hotGoods;
                    that.country = response.data.data.country;
                    that.man=response.data.data.category[response.data.data.category.length-1]
                    that.woman=response.data.data.category[response.data.data.category.length-2]
                    that.module_1=response.data.data.category[response.data.data.category.length-3]
                    that.category.splice(that.category.length-3,3)
                    // this.category.pop()
                    // this.category.pop()
                    // console.log(this.category.pop())
                    // console.log(that.category)
                }
            })
            .catch(error=>{
                console.log(error)
            })
        },
        methods:{
            menuchange(value){
                localStorage.cartInfo='[]'
                location.href = location.origin+'/?lg='+ (value==1? 'ind-BA' : 'en-PHP')
            },
            onSearch(v){
                console.log(1)
                this.$router.push({name:'seek',query:{lg: this.$store.state.lang}})
            // console.log(v)
            // if(this.$route.name !='CategoryList'&&v!=''){
            //     this.$router.push({name:'CategoryList',query:{lg: this.$store.state.lang},params:{keywords:v}})
            //     this.$emit('nav_Search',v)
            // }else{
            //     this.$emit('nav_Search',v)
            // }
        },
            golistPage(id,index) {
                this.show=false
                this.navLeft_show=false
                this.$router.push({name:'CategoryList',query:{lg: this.$store.state.lang,categorySubId:id,name:index},params:{categorySubId:id,index:index}})
            },
            goGoodsPage(id) {
                // console.log(id)
                this.$router.push({name:'Goods',query:{goodsId:id,lg: this.$store.state.lang}})
            },
            onClickNavLeft(){
                this.show=!this.show
                this.navLeft_show=!this.navLeft_show
            },
            onChange(index) {
                this.current = index;
            },
            onSeek(){
                this.$router.push({name:'seek',query:{lg: this.$store.state.lang}})
            },
            tocart(){
                this.$router.push({name:'Cart',query:{lg: this.$store.state.lang}})
            },
            objClickLeft(a,i){
                console.log(this.index_obj)
                this.$refs[a][0].swipeTo(this.index_obj[i]+1)
            },
            objClickRight(a,i){
                
                this.$refs[a][0].swipeTo(this.index_obj[i]-1)
            },
            goForeign(a){
                window.location.href=a
            }
        },
        mounted(){
            // let winHeight = document.documentElement.clientHeight
            // document.getElementById("navLeft").style.height=winHeight -46 +'px'
        },
        computed: {
           cartNumCount() {
             return this.$store.state.cartNum
           }
        },
        activated(){
            this.$store.state.cartNum = localStorage.cartInfo ? (JSON.parse(localStorage.cartInfo).length===0?'':JSON.parse(localStorage.cartInfo).length) : ''
        },
       
    }
</script>

<style scoped>
    .van-sidebar-item--select {
        border-color: #f8f8f8;
        background-color: #f8f8f8;
        color: #7d7e80;
    }
    .van-nav-bar .van-icon {
        font-size: 26px;
        /* color:#ef3470 */
    }
    .hot-title{
        color:#ef3470
    }
    #navLeft{
        position: fixed;
        top: 46px;
        left: 0;
        z-index: 3;
        background: #f8f8f8;
        overflow-y: auto;
        width:80%
    }
    .van-overlay{
        z-index: 2!important;
    }

    .location-icon{
        padding-top:.2rem;
        padding-left:.3rem;
    }
    .swiper-area{
        position: relative;
        clear:both;
        max-height:600px;
        overflow: hidden;
    }
    .custom-indicator{
        position: absolute;
        right: 5px;
        bottom: 25px;
        padding: 2px 5px;
        color: #fff;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
    }
    .van-swipe{
        max-height:600px;
    }
/* .search{
    padding: 8px 16px;
    background-color: rgb(255, 255, 255);
    position: relative;
}
.search i{
    position: absolute;
    top: 16px;
    left: 24px;
}
.search input{
    width: 100%;
    border: none;
    background-color: rgb(240, 240, 240);
    padding: 6px;
    padding-left: 31px;
    border-radius: 12px;
    box-sizing: border-box;
    font-size: 1rem;
} */
.type-bar>div{
    text-align: center;
    border-bottom: 1px solid #eae8e4;
    padding: 20px 0
}
.type-bar img{
    margin: 0 auto;
    display: block;
    margin-bottom: 20px;
}
.search{
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
    background-color: hsla(0,0%,96.1%,.4);
    /* opacity: 0.7; */
}
.search >>> .van-dropdown-menu,.search >>> .van-search{
    background-color:rgba(0,0,0,0)!important
}
.search >>> .van-search__content{
    opacity: 0.6;
}
[class*='van-hairline']::after{
    border: none
}

.right,.left{
    position: absolute;
    top: 50%;
    width: 27px;
    height: 44px;
    z-index: 10;
    cursor: pointer;
    background-size: 27px 44px;
    background-position: 50%;
    background-repeat: no-repeat;
    padding: 30px 15px;
    margin-top: -52px;
    outline: none;
}
.right{
    right: 10px;
    left: auto;
    background-image: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'><path d='M27 22L5 44l-2.1-2.1L22.8 22 2.9 2.1 5 0l22 22z' fill='%23fff'/></svg>")
}
.left{
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M0 22L22 0l2.1 2.1L4.2 22l19.9 19.9L22 44 0 22z' fill='%23fff'/%3E%3C/svg%3E")
}
.category_title p{
    margin: 0;
    padding-left: 8px;
    font-size: 18px
}
.category_title span{
    font-size: 14px;
    padding-left: 8px;
    color: #7d7e80
}
.middle .van-image {
    display: block;
}
</style>
