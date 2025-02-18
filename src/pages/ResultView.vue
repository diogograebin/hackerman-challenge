<template>
    <div class="result-container">
      <h1>Resultados da Busca</h1>
      <Card 
        v-if="characterData" 
        :title="characterData.name" 
        :films="characterData.films" 
        :vehicles="characterData.vehicles" 
        :starships="characterData.starships" 
        :homeworld="characterData.homeworld" 
        :species="characterData.species"
      />
      <CustomButton 
        texto="Pesquisar Novamente" 
        @clicado="goBack"
      />
    </div>
  </template>
  
  <script>
  import Card from '../components/Card.vue';
  import CustomButton from '../components/CustomButton.vue';
  
  export default {
    components: {
      Card,
      CustomButton
    },
    props: {
      characterData: {
        type: Object,
        required: true
      }
    },
    methods: {
      goBack() {
        this.$router.push("/busca"); // Navega de volta para a página de busca
      }
    }
  };
  </script>
  
  <style scoped>
  .result-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  </style>