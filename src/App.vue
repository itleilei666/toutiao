<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getPinDaoList } from '@/api/index.js'
const res = getPinDaoList()
res.then(v => {
  console.log(v)
})
export default {}
</script>

<style lang="less">
</style>
