<template>
    <ListItem>
        <li>
            <div>
                <label>{{microService.key}}</label>
                <label class="desc">{{microService.desc}}</label>
                <router-link :to="{name:'ServiceDetail', params:{key:microService.key}}">详情</router-link> | <a href="#" @click="onUnreg" :v-bind="microService.key">注销</a>
            </div>
        </li>
    </ListItem>
</template>

<style lang="stylus" scoped>
.desc{
    color:  #999999
}
</style>

<script>
export default {
  props: {
    microService: {
      type: Object,
      require: true
    }
  },
  methods: {
    onUnreg: function (e) {
      console.log(this.microService.key)
    }
  }
}
</script>
