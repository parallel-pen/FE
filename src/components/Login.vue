<template>
<Modal
  :value="value"
  @on-cancel="hide"
  :width="350"
>
  <p slot="header" class="center">
    <span>{{ title }}</span>
  </p>

  <p class="center tips">Parallel Pen 内测阶段暂不开放公开注册, 敬请关注</p>
  <p v-if="newUser" class="center tips">已注册用户将自动登录</p>
  <p v-else class="center tips">您已注册, 请登录</p>
  <Form
    ref="loginForm"
    :model="loginForm"
    :rules="rules"
  >
    <FormItem prop="user">
      <Input
        type="text"
        v-model="loginForm.user"
        placeholder="用户名"
        size="large"
        autofocus
        @on-change="handleInputChange('loginForm', 'user')"
        @on-blur="checkExist(loginForm.user)"
      >
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input
        type="password"
        v-model="loginForm.password"
        placeholder="密码"
        size="large"
        @on-change="handleInputChange('loginForm', 'password')"
      >
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="invitationCode" v-if="newUser">
      <Input
        type="text"
        v-model="loginForm.invitationCode"
        placeholder="邀请码"
        size="large"
        @on-change="handleInputChange('loginForm', 'invitationCode')"
      >
        <Icon type="ios-pricetag-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
  </Form>

  <div slot="footer">
    <Button
      :type="submitButton.type"
      size="large"
      long
      :loading="submitButton.loading"
      :disabled="submitButton.disabled"
      @click="handleSubmit('loginForm')"
    >
      {{ submitButton.text }}
    </Button>
  </div>
</Modal>
</template>

<script>
import _ from 'lodash';
export default {
  data() {
    return {
      existUsers: ['a', 'b', 'tangjing'],
      title: '欢迎来到 Parallel Pen',
      newUser: true,
      submitButton: {
        type: 'primary',
        loading: false,
        text: '注册',
        disabled: true
      },
      loginForm: {
        user: '',
        password: '',
        invitationCode: ''
      },
      rules: {
        user: [
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
        invitationCode: [
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
      },
      formPropsValid: {
        user: false,
        password: false,
        invitationCode: false
      }
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    userFormValid() {
      let basicValid = this.formPropsValid.user && this.formPropsValid.password;
      return this.newUser
        ? basicValid && this.formPropsValid.invitationCode
        : basicValid;
    }
  },
  methods: {
    hide() {
      this.$emit('toggleShow', false);
    },
    // validate(name, callback) {
    //   this.$refs[name].validate(callback);
    // },
    validateField(name, prop, callback) {
      this.$refs[name].validateField(prop, callback);
    },
    resetFields(name) {
      this.$refs[name].resetFields();
    },
    handleInputChange(name, prop) {
      this.validateField(name, prop, valid => {
        this.formPropsValid[prop] = !valid;
      });
    },
    handleSubmit(name) {
      if (this.userFormValid) {
        this.submitButton.loading = true;
        // TODO
        setTimeout(() => {
          this.hide();
          this.submitButton.loading = false;
          this.$emit('login');
        }, 2000);
      }
    },
    toggleLogin(isNew) {
      if (isNew) {
        this.submitButton.text = '注册';
        this.submitButton.type = 'primary';
      } else {
        this.submitButton.text = '登录';
        this.submitButton.type = 'success';
      }
    },
    // TODO
    checkExist(user) {
      this.newUser = !this.existUsers.includes(user);
    }
  },
  watch: {
    userFormValid(val) {
      this.submitButton.disabled = !val;
    },
    newUser(val) {
      this.toggleLogin(val);
    },
    'loginForm.user': _.debounce(function() {
      this.checkExist(this.loginForm.user);
    }, 500)
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
