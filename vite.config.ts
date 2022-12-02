import { defineConfig } from "vite";
import { resolve } from "path"; // 主要用于alias文件路径别名
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import requireTransform from "vite-plugin-require-transform";

const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir);
};

const alias: Record<string, string> = {
  "@": pathResolve("src"),
};

// https://vitejs.dev/config/
export default defineConfig({
  //插件配置
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ["vue"],
      // dts: "src/auto-import.d.js",
    }),
    Components({
      /* options */
      resolvers: [ElementPlusResolver()], // 这里就是相关ui库的解析工具
    }),
    requireTransform({
      fileRegex: /.js$|.vue$/,
    }),
  ],
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@import "./src/assets/style/main.scss";@import "./src/styles/var.scss";`,
        // additionalData: `@import "./src/styles/var.scss";`,
      },
    },
  },
  base: "./",
  //设置别名
  resolve: {
    // 配置路径别名
    alias,
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    open: true,
    proxy: {
      // 代理配置
      // '/dev': 'https://www.fastmock.site/mock/48cab8545e64d93ff9ba66a87ad04f6b/'
      "/api": {
        // target: "https://www.fastmock.site/mock/f81e8333c1a9276214bcdbc170d9e0a0", // fastmock
        target: "https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e", // easymock
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  // 生产环境打包配置
  //去除 console debugger
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
