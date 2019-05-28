<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvator"/>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <!-- 是否展示消息页 -->
        <DropdownItem name="message" v-if="false">
          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="delCache">清除缓存</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import {AuthLogout,AuthClearCache} from "@/api/auth"
import { clearCookie } from '@/libs/cookie'

export default {
  name: 'User',
  props: {
    userAvator: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    logout () {
      AuthLogout()
              .then(res => {
                window.localStorage.removeItem('token');
                location.href = '/'
                // this.$router.push({
                //   name: '/'
                // })
              }).catch(err => {
                this.$Message.error("操作失败"+ err);
              })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    delCache () {
      AuthClearCache()
              .then(res => {
                  this.$Message.success("操作成功");
              }).catch(err => {
                this.$Message.error("操作失败"+ err);
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout();
          break;
        case 'message': this.message();
          break;
        case 'delCache': this.delCache();
        break
      }
    }
  }
}
</script>
