<template>
<Modal
  :value="value"
  @on-cancel="hide"
  :width="350"
>
  <p slot="header" class="center">
    <span>{{ title }}</span>
  </p>

  <p class="center tips">未注册用户将自动注册</p>
  <p class="center tips">Parallel Pen 内测阶段暂不开放公开注册, 敬请关注</p>
  <Form
    ref="userForm"
    :model="userForm"
    :rules="userFormRules"
  >
    <FormItem prop="user">
      <Input
        type="text"
        v-model="userForm.user"
        placeholder="用户名"
        size="large"
        autofocus
        @on-change="handleInputChange('userForm', 'user')"
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
      >
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="invitationCode">
      <Input
        type="text"
        v-model="userForm.invitationCode"
        placeholder="邀请码"
        size="large"
        @on-change="handleInputChange('userForm', 'invitationCode')"
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
      @click="handleSubmit('userForm')"
    >
      {{ submitButton.text }}
    </Button>
  </div>
</Modal>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      title: '欢迎来到 Parallel Pen',
      submitButton: {
        type: 'success',
        loading: false,
        text: '登录',
        disabled: true,
      },
      userForm: {
        user: '',
        password: '',
        invitationCode: ''
      },
      userFormRules: {
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
            trigger: 'blur',
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
            trigger: 'blur',
          }
        ]
      },
      userFormPropsValid: {
        user: false,
        password: false,
      },
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    userFormValid() {
      return this.userFormPropsValid.user &&
        this.userFormPropsValid.password;
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
    handleInputChange(name, prop) {
      this.validateField(name, prop, valid => {
        this.userFormPropsValid[prop] = !valid;
      });
      this.submitButton.disabled = !this.userFormValid;
    },
    handleSubmit(name) {
      this.submitButton.loading = true;
      setTimeout(() => {
        this.hide();
        this.submitButton.loading = false;
      }, 2000);
    },
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
</style>
