// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
export const scale = (
  n: number,
  inMin: number,
  inMax: number,
  outerMin: number,
  outerMax: number
) => ((n - inMin) * (outerMax - outerMin)) / (inMax - inMin) + outerMin;
/**
 *
 * @param fn
 * @param delay
 * @returns
 */
export function throttle(fn: Function, delay: number) {
  let timer: any = null,
    last: number = 0;
  return function <T>(this: Function, ...args: Array<T>) {
    let now = +new Date();
    if (last && now < last + delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, delay);
    } else {
      last = now;
      fn.apply(this, args);
    }
  };
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export function randomNum(min: number, max: number): number {
  let num = Math.floor(Math.random() * (min - max) + max);
  return num;
}

/**
 * @description 获取当前时间
 * @return string
 */
export function getTimeState() {
  // 获取当前时间
  let timeNow = new Date();
  // 获取当前小时
  let hours = timeNow.getHours();
  // 判断当前时间段
  if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
  if (hours >= 10 && hours <= 14) return `中午好 🌞`;
  if (hours >= 14 && hours <= 18) return `下午好 🌞`;
  if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
  if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
}

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export function getBrowserLang() {
  let browserLang = navigator.language
    ? navigator.language
    : navigator.browserLanguage;
  let defaultBrowserLang = "";
  if (
    browserLang.toLowerCase() === "cn" ||
    browserLang.toLowerCase() === "zh" ||
    browserLang.toLowerCase() === "zh-cn"
  ) {
    defaultBrowserLang = "zh";
  } else {
    defaultBrowserLang = "en";
  }
  return defaultBrowserLang;
}

/**
 * @description 使用递归，过滤需要缓存的路由
 * @param {Array} menuList 所有菜单列表
 * @param {Array} cacheArr 缓存的路由菜单 name ['**','**']
 * @return array
 * */
export function getKeepAliveRouterName(
  menuList: Menu.MenuOptions[],
  keepAliveArr: string[] = []
) {
  menuList.forEach((item) => {
    item.meta.isKeepAlive && item.name && keepAliveArr.push(item.name);
    item.children?.length &&
      getKeepAliveRouterName(item.children, keepAliveArr);
  });
  return keepAliveArr;
}

/**
 * @description 使用递归，过滤出需要渲染在左侧菜单的列表（剔除 isHide == true 的菜单）
 * @param {Array} menuList 所有菜单列表
 * @return array
 * */
export function getShowMenuList(menuList: Menu.MenuOptions[]) {
  let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.filter((item) => {
    item.children?.length && (item.children = getShowMenuList(item.children));
    return !item.meta?.isHide;
  });
}

/**
 * @description 使用递归处理路由菜单 path，生成一维数组(第一版本地路由鉴权会用到)
 * @param {Array} menuList 所有菜单列表
 * @param {Array} menuPathArr 菜单地址的一维数组 ['**','**']
 * @return array
 */
export function getMenuListPath(
  menuList: Menu.MenuOptions[],
  menuPathArr: string[] = []
) {
  menuList.forEach((item: Menu.MenuOptions) => {
    typeof item === "object" && item.path && menuPathArr.push(item.path);
    item.children?.length && getMenuListPath(item.children, menuPathArr);
  });
  return menuPathArr;
}

/**
 * @description 使用递归，过滤出当前路径匹配的面包屑地址
 * @param {String} path 当前访问地址
 * @param {Array} menuList 所有菜单列表
 * @returns array
 */
export function getCurrentBreadcrumb(
  path: string,
  menuList: Menu.MenuOptions[]
) {
  let tempPath: Menu.MenuOptions[] = [];
  try {
    const getNodePath = (node: Menu.MenuOptions) => {
      tempPath.push(node);
      if (node.path === path) throw new Error("Find IT!");
      if (node.children?.length)
        node.children.forEach((item) => getNodePath(item));
      tempPath.pop();
    };
    menuList.forEach((item) => getNodePath(item));
  } catch (e) {
    return tempPath;
  }
}

/**
 * @description 双重递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 所有菜单列表
 * @returns array
 */
export function getAllBreadcrumbList(menuList: Menu.MenuOptions[]) {
  let handleBreadcrumbList: { [key: string]: any } = {};
  const loop = (menuItem: Menu.MenuOptions) => {
    if (menuItem?.children?.length)
      menuItem.children.forEach((item) => loop(item));
    else
      handleBreadcrumbList[menuItem.path] = getCurrentBreadcrumb(
        menuItem.path,
        menuList
      );
  };
  menuList.forEach((item) => loop(item));
  return handleBreadcrumbList;
}

/**
 * @description 扁平化数组对象(主要用来处理路由菜单)
 * @param {Array} menuList 所有菜单列表
 * @return array
 */
export function getFlatArr(menulist: Menu.MenuOptions[]) {
  return menulist.reduce(
    (pre: Menu.MenuOptions[], current: Menu.MenuOptions) => {
      let flatArr = [...pre, current];
      if (current.children)
        flatArr = [...flatArr, ...getFlatArr(current.children)];
      return flatArr;
    },
    []
  );
}
