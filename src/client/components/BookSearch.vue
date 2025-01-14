<template>
  <div class="w-full flex items-center justify-center flex-col gap-2">
    <label
      class="block text-3xl mb-3 font-roboto-mono font-medium text-zinc-300"
      >Adicione um novo livro</label
    >
    <div class="w-[60%] relative">
      <div class="w-full relative">
        <div class="relative w-full group">
          <input
            type="text"
            v-model="searchQuery"
            @input="debouncedSearch"
            class="w-full focus:bg-indigo-700/10 focus:outline-none focus:shadow-[0px_20px_207px_10px] shadow-[0px_20px_207px_10px] shadow-indigo-500/20 focus:shadow-indigo-500/30 text-white border-[1px] border-zinc-800 rounded-2xl py-3 pl-12 pr-6 bg-zinc-950 sm:text-lg focus:border-indigo-500 transition-colors"
            placeholder="Digite o título do livro..."
          />
          <Search
            :size="20"
            class="text-white group-focus-within:text-indigo-500 absolute left-4 top-1/2 -translate-y-1/2"
          />
        </div>
        <div v-if="loading" class="absolute right-4 top-1/2 -translate-y-1/2">
          <LoaderCircle :size="20" class="text-indigo-500 animate-spin" />
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

<script setup>
import { ref } from "vue";
import { searchBooks } from "../services/api";
import { Search, LoaderCircle } from "lucide-vue-next";

const emit = defineEmits(["book-selected"]);
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
      searchResults.value = response.data;
      console.log("Resultados atribuídos:", searchResults.value);
    } catch (error) {
      console.error("Error searching books:", error.response?.data || error);
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
</script>
