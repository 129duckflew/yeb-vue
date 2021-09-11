<template>
  <div>
    <template>
      <el-tabs v-model="activeName">

        <el-tab-pane label="培训管理"
                     name="Addtrain">
          <Addtrain></Addtrain>

        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
import Addtrain from "../../components/per/train/Addtrain.vue";
export default {
  name: "PerTrain",
  data () {
    return {
      activeName: 'Addtrain',
      data: {},
    }
  },
  methods: {

  },
  components: {
    Addtrain,
  }
}
</script>

<style scoped>
</style>