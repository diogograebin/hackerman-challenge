<template>
  <div class="login-container">
    <img src="/images/LogoStarWars.png" alt="Logo" class="logo">
    <div class="login-card">
      <h1>Olá!</h1>
      <h3>Para começar seu teste, digite um e-mail:</h3>
      <input 
        type="email" 
        v-model="email" 
        placeholder="exemplo@email.com" 
        @input="validateEmail"
        :class="{'valid-input': isEmailValid, 'invalid-input': email !== '' && !isEmailValid}"
      >
      <button @click="goToNextPage" :disabled="!isEmailValid">Próximo</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      isEmailValid: false,
    };
  },
  methods: {
    validateEmail() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isEmailValid = regex.test(this.email);
    },
    goToNextPage() {
      if (this.isEmailValid) {
        this.$router.push("/busca"); // Navega para a tela de busca
      }
    }
  }
};
</script>

<style scoped>
/* Estilização do container */
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 50px;
}

/* Card do login */
.login-card {
  background: #232323;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  width: 410px;
  height: 244px;
  text-align: left;
}

/* Input */
input {
  width: 362px;
  padding: 10px;
  margin: 10px 0;
  background: #232323;
  border: 1px solid #FFE81F4D;
  border-radius: 5px;
  font-size: 16px;
  color: #CECECE;
}

/* Borda quando inválido */
.invalid-input {
  border: 1px solid red;
}

/* Borda quando válido */
.valid-input {
  border: 1px solid #FFE81F; /* Cor igual à do botão */
}

/* Botão */
button {
  background: #FFE81F;
  color: #232323;
  padding: 10px;
  border: #ccc;
  border-radius: 8px;
  cursor: pointer;
  width: 362px;
  font-size: 16px;
}

button:disabled {
  background: #232323;
  cursor: not-allowed;
  border: 1px solid #ccc;
  color: #ccc;
}
</style>
