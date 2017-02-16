<template>
  <div>
    {{score}}
  </div>
</template>
<style>
</style>
<script type="text/ecmascript-6">
    export default{
      props: {
        size: {
          type: Number
        },
        score: {
          type: Number
        }
      }
    }
</script>
