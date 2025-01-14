<template>
  <div class="w-full flex items-center justify-center flex-col gap-2">
    <label class="block text-lg font-medium text-zinc-300"
      >Adicione um novo livro</label
    >
    <div class="w-[60%] relative">
      <!-- Container principal com largura fixa -->
      <div class="w-full">
        <input
          type="text"
          v-model="searchQuery"
          @input="debouncedSearch"
          class="w-full shadow-sm text-white border-[1px] border-zinc-700 rounded-2xl py-3 px-6 bg-zinc-900 sm:text-lg"
          placeholder="Digite o título do livro..."
        />

        <div v-if="loading" class="absolute right-4 top-1/2 -translate-y-1/2">
          <div
            class="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"
          ></div>
        </div>
      </div>

      <!-- Resultados da busca -->
      <div
        v-if="searchResults.length > 0"
        class="absolute w-full mt-2 bg-zinc-900 shadow-lg rounded-2xl border-[1px] border-zinc-700 max-h-60 overflow-auto z-50"
      >
        <ul class="divide-y divide-zinc-700">
          <li
            v-for="book in searchResults"
            :key="book.id"
            @click="selectBook(book)"
            class="px-6 py-3 hover:bg-zinc-800 cursor-pointer transition-colors"
          >
            <div class="flex items-center gap-4">
              <img
                v-if="book.thumbnail"
                :src="book.thumbnail"
                :alt="book.title"
                class="h-16 w-12 object-cover rounded"
              />
              <div>
                <p class="text-sm font-medium text-white">
                  {{ book.title }}
                </p>
                <p class="text-sm text-zinc-400">
                  {{ book.authors?.join(", ") }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { searchBooks } from "../services/api";

export default {
  name: "BookSearch",
  emits: ["book-selected"],
  setup(props, { emit }) {
    const searchQuery = ref("");
    const searchResults = ref([]);
    const loading = ref(false);
    let searchTimeout;

    const debouncedSearch = () => {
      clearTimeout(searchTimeout);
      if (searchQuery.value.length < 3) {
        searchResults.value = [];
        return;
      }

      loading.value = true;
      searchTimeout = setTimeout(async () => {
        try {
          console.log("Iniciando busca para:", searchQuery.value);
          const response = await searchBooks(searchQuery.value);
          console.log("Resposta recebida:", response);
          // Aqui está a correção - precisamos usar response.data
          searchResults.value = response.data;
          console.log("Resultados atribuídos:", searchResults.value); // Log adicional para debug
        } catch (error) {
          console.error(
            "Error searching books:",
            error.response?.data || error
          );
          searchResults.value = [];
        } finally {
          loading.value = false;
        }
      }, 300);
    };

    const selectBook = (book) => {
      emit("book-selected", book);
      searchQuery.value = "";
      searchResults.value = [];
    };

    return {
      searchQuery,
      searchResults,
      loading,
      debouncedSearch,
      selectBook,
    };
  },
};
</script>
