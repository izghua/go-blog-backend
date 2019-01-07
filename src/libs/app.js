// 同数组的forEach方法 arr.forEach(fn)
export const forEach2 = (arr, fn) => {
    if (!arr.length || !fn) return
    let i = -1
    let len = arr.length
    while (++i < len) {
        let item = arr[i]
        fn(item, i, arr)
    }
}
/**
* @param {Array} target 目标数组
* @param {Array} arr 需要查询的数组
* @description 判断要查询的数组是否至少有一个元素包含在目标数组中，主要用于权限判断。
*/
export const hasOneOf = (targetarr, arr) => {
    return targetarr.some(_ => arr.indexOf(_) > -1)
}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true
      }
    }
    return false
  }

// 判断路由中路由项是否有children子路由
export const hasChild = (item) => {
    return item.children && item.children.length !== 0
}

// 将没有权限的菜单从菜单列表过滤掉
const showThisMenuEle = (item, access) => {
    if (item.meta && item.meta.access && item.meta.access.length) {
        if (hasOneOf(item.meta.access, access)) return true
        else return false
    } else return true
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
    let res = []
    forEach2(list, item => {
        // 不隐藏菜单的话进入判断
        if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
            let obj = {
                icon: (item.meta && item.meta.icon) || '',
                name: item.name,
                meta: item.meta
            }
            if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
                obj.children = getMenuByRouter(item.children, access)
            }
            if (item.meta && item.meta.href) obj.href = item.meta.href
            if (showThisMenuEle(item, access)) res.push(obj)
        }
    })
    return res
}

// 展示title字段，没有则取name
export const showTitle = (item) => {
    let title = (item.meta && item.meta.title) || item.name
    return title
}

  /**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
    return Array.from(new Set([...arr1, ...arr2]))
  }

  export const findNodeUpperByClasses = (ele, classes) => {
    let parentNode = ele.parentNode
    if (parentNode) {
      let classList = parentNode.classList
      if (classList && classes.every(className => classList.contains(className))) {
        return parentNode
      } else {
        return findNodeUpperByClasses(parentNode, classes)
      }
    }
  }


  /**
 * @param {Array} routeMetched 当前路由metched，生成面包屑
 * @returns {Array}
 */
export const getBreadCrumbList = (route) => {
    let routeMetched = route.matched
    let res = routeMetched.filter(item => {
      return item.meta === undefined || !item.meta.hideInBread
    }).map(item => {
      let meta = {...item.meta}
      if (meta.title && typeof meta.title === 'function') meta.title = meta.title(route)
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: meta
      }
      return obj
    })
    res = res.filter(item => {
       return !item.meta.hideInBread
    })
    return [ ...res]
  }


  /**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
    const routePermissionJudge = (list) => {
      return list.some(item => {
        if (item.children && item.children.length) {
          return routePermissionJudge(item.children)
        } else if (item.name === name) {
          return hasAccess(access, item)
        }
      })
    }

    return routePermissionJudge(routes)
  }

  /**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
    if (document.addEventListener) {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false)
        }
      }
    } else {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.attachEvent('on' + event, handler)
        }
      }
    }
  })()

  /**
   * @description 解绑事件 off(element, event, handler)
   */
  export const off = (function () {
    if (document.removeEventListener) {
      return function (element, event, handler) {
        if (element && event) {
          element.removeEventListener(event, handler, false)
        }
      }
    } else {
      return function (element, event, handler) {
        if (element && event) {
          element.detachEvent('on' + event, handler)
        }
      }
    }
  })()
