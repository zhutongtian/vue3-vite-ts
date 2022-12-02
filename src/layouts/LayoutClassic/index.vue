<template>
  <el-container>
    <el-header>
      <div>
        <div>
          <img src="@/assets/images/logo.svg" alt="logo" />
          <span>Geeker Admin</span>
        </div>
        <ToolBarLeft />
      </div>
      <ToolBarRight />
    </el-header>
    <el-container class="classic-content">
      <el-aside>
        <div class="menu" :style="{ width: isCollapse ? '65px' : '210px' }">
          <el-scrollbar>
            <el-menu
              :default-active="activeMenu"
              :router="false"
              :collapse="isCollapse"
              :collapse-transition="false"
              :unique-opened="true"
              background-color="#ffffff"
              text-color="#303133"
            >
              <SubMenu :menuList="menuList" />
            </el-menu>
          </el-scrollbar>
        </div>
      </el-aside>
      <el-container class="classic-main">
        <Main />
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="layoutClassic">
import { useRoute } from "vue-router";
import { GlobalStore } from "@/store";
import { AuthStore } from "@/store/modules/auth";

const route = useRoute();
const authStore = AuthStore();
const globalStore = GlobalStore();
const activeMenu = computed(() => route.path);
const menuList = computed(() => authStore.showMenuListGet);
const isCollapse = computed(() => globalStore.themeConfig.isCollapse);
</script>
