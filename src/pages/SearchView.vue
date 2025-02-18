<template>
    <div class="search-container">
        <div class="search-card" v-if="!loading && !characterData">
            <h3>Agora, digite seu personagem favorito de Star Wars:</h3>
            <input
                type="text"
                v-model="characterName"
                placeholder="Ex: Luke Skywalker, Darth Vader..."
                @input="resetResults"
                :class="{ 'input-error': error && error === 'Personagem inválido' }"
            />
            <div v-if="!characterData && characterName && error" class="error">
                <p>{{ error }}</p>
            </div>
            <CustomButton
                texto="Próximo"
                :desativado="!characterName || loading"
                @clicado="fetchCharacterData"
            />
        </div>
        <div v-if="loading" class="loading-card">
            <p>Carregando...</p>
            <img src="/images/IconeStormTrooper.png" alt="Ícone de Carregamento" />
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
            loading: false,
            error: null,
        };
    },
    methods: {
        resetResults() {
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
                    const characterData = {
                        name: character.name,
                        films: await this.fetchDetails(character.films),
                        vehicles: await this.fetchDetails(character.vehicles),
                        starships: await this.fetchDetails(character.starships),
                        homeworld: await this.fetchDetail(character.homeworld),
                        species: await this.fetchDetails(character.species),
                    };

                    // Redireciona para ResultView passando os dados do personagem
                    this.$router.push({ name: 'ResultView', params: { characterData } });
                } else {
                    this.error = "Personagem inválido";
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
.search-container{ 
    height: 100vh; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    } 

.search-card {
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    width: 410px; 
    height: 224px; 
    padding: 20px; 
    border-radius: 5px; 
    gap: 18px; 
    text-align: left; 
    background-color: var(--cor-background-cards); 

} 

input { 
    width: 370px; 
    padding: 10px;  
    background: var(--cor-background-cards); 
    border: 1px solid var(--cor-borda-input); 
    border-radius: 5px; 
    font-size: 16px; 
    color: var(--cor-textos); 
    margin-bottom: 8px; 
} 

input:focus {
    outline: none; /* Remove a borda de foco */
}

.input-error {
    border: 1px solid var(--cor-error); /* Cor de erro */
}

.loading {
    color: #FFE81F;
} 

.error {
    text-align: left; 
    color: var(--cor-error); 
    margin-top: -20px;
    margin-bottom: -10px; 
    width: 100%; 
} 

</style>