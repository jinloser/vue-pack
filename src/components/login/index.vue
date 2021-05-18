<template>
  <div>
    login
    <Button>1111</Button>
    <router-link to="/main/home">main</router-link>
    <router-link to="/main/users">users</router-link>
  </div>
</template>

<script>
import ModulesLoader from '@/components/main/modules/ModulesLoader';
import { Button } from 'ant-design-vue';
export default {
  components: {
    Button,
  },
  mounted() {
    const data = [
      {
        path: 'main',
        children: [
          {
            path: 'home',
          },
          {
            path: 'users',
          },
          {
            path: 'roles',
          },
          {
            path: 'modules',
          },
        ],
      },
    ];
    ModulesLoader.initRouters(this.$router, data, true);
  },
};
</script>

<style lang="scss" scoped>
</style>