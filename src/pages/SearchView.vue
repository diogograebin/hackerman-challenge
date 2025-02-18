<template>
    <div class="search-container">
      <h1>Busque um Personagem de Star Wars</h1>
      <input 
        type="text" 
        v-model="characterName" 
        placeholder="Digite o nome do personagem" 
        @input="resetResults"
      />
      <CustomButton 
        texto="Buscar" 
        :desativado="!characterName" 
        @clicado="fetchCharacterData"
      />
      
      <div v-if="loading" class="loading">
        <p>Carregando...</p>
      </div>
  
      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>
  
      <div v-if="characterData">
        <h2>Resultados para: {{ characterData.name }}</h2>
        <p><strong>Filmes:</strong> {{ characterData.films.join(', ') }}</p>
        <p><strong>Veículos:</strong> {{ characterData.vehicles.join(', ') }}</p>
        <p><strong>Naves:</strong> {{ characterData.starships.join(', ') }}</p>
        <p><strong>Planetas:</strong> {{ characterData.homeworld }}</p>
        <p><strong>Espécies:</strong> {{ characterData.species.join(', ') }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import CustomButton from '../components/CustomButton.vue';
  
  export default {
    components: {
      CustomButton
    },
    data() {
      return {
        characterName: "",
        characterData: null,
        loading: false,
        error: null,
      };
    },
    methods: {
      resetResults() {
        this.characterData = null;
        this.error = null;
      },
      async fetchCharacterData() {
  this.loading = true;
  this.error = null;

  try {
    const response = await fetch(`https://swapi.dev/api/people/?search=${this.characterName}`);
    const data = await response.json();

    if (data.count > 0) {
      const character = data.results[0];
      this.characterData = {
        name: character.name,
        films: await this.fetchDetails(character.films),
        vehicles: await this.fetchDetails(character.vehicles),
        starships: await this.fetchDetails(character.starships),
        homeworld: await this.fetchDetail(character.homeworld),
        species: await this.fetchDetails(character.species),
      };
    } else {
      this.error = "Personagem não encontrado.";
    }
  } catch (err) {
    this.error = "Erro ao buscar dados. Tente novamente.";
  } finally {
    this.loading = false;
  }
},

async fetchDetails(urls) {
  const details = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
  return details.map(detail => detail.title || detail.name || detail); // Retorna o título ou nome
},

async fetchDetail(url) {
  const response = await fetch(url);
  const detail = await response.json();
  return detail.name; // Retorna o nome do planeta
}
    }
  };
  </script>
  
  <style scoped>
  .search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  input {
    width: 300px;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .loading {
    color: #FFE81F;
  }
  
  .error {
    color: red;
  }
  </style>