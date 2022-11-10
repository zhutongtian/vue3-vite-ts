/**
 * 混入的公共方法;
 */
const mixin = {
  data() {
    return {
      tableHeight: 600,
      gettime: "", //当前时间
      userRes: {},
      debounceTimer: null,
    };
  },
  // watch: {
  //   /**
  //    * 监听收缩/展开;
  //    */
  //   showConditions() {
  //     this.calculateTableHeight();
  //   },
  // },
  // mounted() {
  //   console.log("8888");
  //   this.setTableHeight(); // 设置table高度;
  //   this.currentTime();

  //   if (this.$route && this.$route.name) {
  //     this.userRes = this.getPermission(this.$route.name);
  //   }
  // },
  // activated() {
  //   this.setTableHeight(); // 设置table高度;

  //   if (this.$route && this.$route.name) {
  //     this.userRes = this.getPermission(this.$route.name);
  //   }
  // },
  // methods: {
  //   /**
  //    * 按钮权限
  //    */
  //   getPermission(name) {
  //     let btnsObj = {};
  //     if (localStorage.getItem('menu') && localStorage.getItem('menu') != 'undefined') {
  //       this.setMenuBts(JSON.parse(localStorage.getItem('menu')), name, btnsObj);
  //     }
  //     return btnsObj[name] || {};
  //   },
  //   /**
  //    * 设置权限按钮;
  //    */
  //   setMenuBts(treeList, name, btnsObj) {
  //     return treeList.map((item) => {
  //       const { subList } = item;
  //       if (subList.length) {
  //         subList.map((subItem) => {
  //           const { code, buttons } = subItem;
  //           if (code === name) {
  //             btnsObj[name] = buttons;
  //           }
  //         });
  //       }
  //     });
  //   },
  //   /**
  //    * 根据路由设置table高度;
  //    */
  //   setTableHeight() {
  //     setTimeout(() => {
  //       if (this.$route) {
  //         this.tableHeightShow();
  //       }
  //     }, 200);
  //   },
  //   /**
  //    * 计算table表格高度;
  //    */
  //   calculateTableHeight() {
  //     this.$nextTick(() => {
  //       if (!this.$refs.table || !this.$refs.table.$el) {
  //         return;
  //       }
  //       this.tableHeight = window.innerHeight - this.$refs.table.$el.getBoundingClientRect().top - 65;
  //     });
  //   },
  //   /**
  //    * 页面table高度自适应;
  //    */
  //   tableHeightShow() {
  //     this.calculateTableHeight();
  //     bus.$on('windowResize-' + this.$route.name, () => {
  //       this.calculateTableHeight();
  //     });
  //   },
  //   //时间格式化为 年月日
  //   formatDate(date) {
  //     return (date || '') && new Date(date).Format('yyyy-MM-dd');
  //   },
  //   //时间格式化为 年月日 时分秒
  //   formatDatetime(date) {
  //     return (date || '') && new Date(date).Format('yyyy-MM-dd hh:mm:ss');
  //   },
  //   //表格列 日期格式化
  //   columnDateFmt(row, column, cellValue, index) {
  //     return this.formatDate(cellValue);
  //   },
  //   //表格列 日期时间格式化
  //   columnDateTimeFmt(row, column, cellValue, index) {
  //     return this.formatDatetime(cellValue);
  //   },
  //   // 错误提示
  //   sxError(msg = '') {
  //     // if (!localStorage.ms_username) {
  //     //     return
  //     // }
  //     msg && this.$message({ showClose: true, message: msg, type: 'error' });
  //   },
  //   // 成功提示
  //   sxSuccess(msg = '') {
  //     msg && this.$message({ showClose: true, message: msg, type: 'success' });
  //   },
  //   // 成功提示
  //   sxConfirm(msg = '', title = '') {
  //     return this.$confirm(msg || `确认吗？`, title || '提示', {
  //       type: 'warning',
  //       dangerouslyUseHTMLString: true,
  //     });
  //   },
  //   // 下载数据,请求后台等待
  //   sxLoading(msg = '') {
  //     return this.$loading({
  //       lock: true,
  //       text: msg || '数据准备中，请稍后',
  //       spinner: 'el-icon-loading',
  //       background: 'rgba(0, 0, 0, 0.7)',
  //     });
  //   },
  //   sxCopy(content) {
  //     let el = document.getElementById('select-this');
  //     el.value = content;
  //     el.select();
  //     if (document.execCommand('copy')) {
  //       this.sxSuccess('已复制');
  //     } else {
  //       this.sxError('复制失败');
  //     }
  //   },
  //   // 点击按钮-防抖
  //   debounceMethods(func, ...args) {
  //     let context = this;
  //     if (this.debounceTimer) clearTimeout(this.debounceTimer);
  //     let callNow = !this.debounceTimer; //是否立即执行
  //     this.debounceTimer = setTimeout(() => {
  //       this.debounceTimer = null;
  //     }, 500);
  //     if (callNow) func.apply(context, args);
  //   },
  //   //定时器
  //   currentTime() {
  //     setInterval(this.getTimInfo, 1000);
  //   },
  //   // 获取当前时间 年-月-日 时 分 秒 (截取年份后两位)
  //   getTimInfo() {
  //     let date = new Date();
  //     let yy = date.getFullYear().toString().substr(2, 2);
  //     let mm = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  //     let dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  //     let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  //     let mf = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  //     let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  //     this.gettime = yy + '' + mm + '' + dd + '-' + hh + '' + mf + '' + ss;
  //   },
  //   // 获取当前时间 年-月-日 时 分 秒
  //   getTimInfo2() {
  //     let yy = new Date().getFullYear();
  //     let mm = new Date().getMonth() + 1;
  //     let dd = new Date().getDate();
  //     let hh = new Date().getHours();
  //     let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
  //     let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
  //     this.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + '-' + mf + '-' + ss;
  //   },
  // },
};
export default mixin;
