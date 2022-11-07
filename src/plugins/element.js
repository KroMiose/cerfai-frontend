import Vue from 'vue'
import ElementUI, { Button, Form, FormItem, Input, Pagination, Message, MessageBox } from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

// 按需引入Vue组件
Vue.use(ElementUI)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Pagination)
Vue.prototype.$message = Message
Vue.prototype.$prompt = MessageBox.prompt
