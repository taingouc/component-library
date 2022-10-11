const importFn = require.context('./', false, /\.vue$/)
export default {
  install(app) {
    // 批量注册全局组件
    importFn.keys().forEach((key) => {
      // 导入组件
      const component = importFn(key).default
      // 注册组件
      app.component(component.name, component)
    })
  }
}
