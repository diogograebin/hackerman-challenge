<template>
  <div>
    <h1>Login View</h1>
    <input v-model="email" type="email" placeholder="Digite seu e-mail">
    <button @click="goToNextPage" :disabled="!isEmailValid">Próximo</button>
    <p v-if="emailError">{{ emailError }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      isEmailValid: false,
      emailError: '',
    };
  },
  methods: {
    validateEmail() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isEmailValid = regex.test(this.email);
      this.emailError = this.isEmailValid ? '' : 'E-mail inválido!';
    },
    goToNextPage() {
      if (this.isEmailValid) {
        this.$router.push('/busca');
      }
    },
  },
  watch: {
    email(newEmail) {
      this.validateEmail();
    },
  },
};
</script>