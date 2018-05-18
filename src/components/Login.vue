<template>
<Modal
  :value="isLoginShow"
  @on-cancel="toggleLoginShow"
  :width="370"
  :styles="{ top: 'calc(50% - 220px)' }"
>
  <p slot="header" class="center">
    <span>{{ title }}</span>
  </p>

  <p class="center tips">Parallel Pen 内测阶段暂不开放公开注册, 敬请关注</p>
  <a href="#" @click.prevent="toggleMode">
    <p class="center tips">{{ newUser ? tips.login : tips.register }}</p>
  </a>
  
  <Form
    ref="userForm"
    :model="userForm"
    :rules="rules"
  >
    <FormItem prop="account">
      <Input
        type="text"
        v-model="userForm.account"
        placeholder="用户名"
        size="large"
        autofocus
        @on-change="handleInputChange('userForm', 'account')"
        @on-enter="handleSubmit('userForm')"
      >
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input
        type="password"
        v-model="userForm.password"
        placeholder="密码"
        size="large"
        @on-change="handleInputChange('userForm', 'password')"
        @on-enter="handleSubmit('userForm')"
      >
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="invitation" v-if="newUser">
      <Input
        type="text"
        v-model="userForm.invitation"
        placeholder="邀请码"
        size="large"
        @on-change="handleInputChange('userForm', 'invitation')"
        @on-enter="handleSubmit('userForm')"
      >
        <Icon type="ios-pricetag-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
  </Form>

  <div slot="footer">
    <Button
      :type="newUser ? submitButton.register.type : submitButton.login.type"
      size="large"
      long
      :loading="submitButton.loading"
      @click="handleSubmit('userForm')"
    >
      {{ newUser ? submitButton.register.text : submitButton.login.text }}
    </Button>
  </div>
</Modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import userApi from '@/api/user';
export default {
  data() {
    return {
      title: '欢迎来到 Parallel Pen',
      tips: {
        login: '已有账号？点此登录',
        register: '没有账号？点此注册'
      },
      newUser: false,
      submitButton: {
        login: {
          type: 'success',
          text: '登录'
        },
        register: {
          type: 'primary',
          text: '注册'
        },
        loading: false
      },
      userForm: {
        account: '',
        password: '',
        invitation: ''
      },
      rules: {
        account: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 1,
            max: 20,
            message: '用户名最大 20 位',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            max: 18,
            message: '密码应为 6 至 18 位',
            trigger: 'blur'
          }
        ],
        invitation: [
          {
            required: true,
            message: '请输入邀请码',
            trigger: 'blur'
          },
          {
            type: 'string',
            len: 8,
            message: '邀请码格式错误',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  computed: {
    ...mapState('layout', ['isLoginShow'])
  },
  mounted() {
    this.newUser = false;
  },
  methods: {
    validate(name, callback) {
      this.$refs[name].validate(callback);
    },
    validateField(name, prop, callback) {
      this.$refs[name].validateField(prop, callback);
    },
    handleInputChange(name, prop) {
      this.validateField(name, prop);
    },
    handleSubmit(name) {
      this.validate(name, valid => {
        if (valid) {
          this.submitButton.loading = true;
          if (this.newUser) {
            const { account, password, invitation } = this.userForm;
            userApi
              .register({ account, password, invitation })
              .then(res => {
                if (res.data.code === 100000) {
                  this.toggleLoginShow();
                  this.$Message.success({
                    content: '注册成功'
                  });
                  this.saveUser({
                    account,
                    token: res.data.token,
                  });
                } else {
                  this.$Message.error({
                    content: userApi.err(res.data.code)
                  })
                }
              })
              .catch(err => {
                console.log(err);
              })
              .finally(() => {
                this.submitButton.loading = false;
              });
          } else {
            const { account, password } = this.userForm;
            userApi
              .login({ account, password })
              .then(res => {
                if (res.data.code === 100000) {
                  this.toggleLoginShow();
                  this.$Message.success({
                    content: '登录成功'
                  });
                  this.saveUser({
                    account,
                    token: res.data.token,
                  });
                } else {
                  this.$Message.error({
                    content: userApi.err(res.data.code)
                  })
                }
              })
              .catch(err => {
                console.log(err);
              })
              .finally(() => {
                this.submitButton.loading = false;
              });
          }
        }
      });
    },
    toggleMode() {
      this.newUser = !this.newUser;
    },
    ...mapMutations('user', {
      saveUser: 'save',
    }),
    ...mapMutations('layout', ['toggleLoginShow'])
  }
};
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}
.tips {
  margin-bottom: 20px;
}
.ivu-icon {
  width: 14px;
}
</style>
