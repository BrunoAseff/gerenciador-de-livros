<template>
  <div class="border-[1px] border-zinc-950 shadow sm:rounded-2xl">
    <div class="px-4 py-5 sm:p-6">
      <div>
        <div class="space-y-8">
          <div>
            <BookSearch @book-selected="handleBookSelection" />
          </div>
          <form
            v-if="selectedBook"
            @submit.prevent="handleSubmit"
            class="space-y-4 bg-zinc-950 border-[1px] border-zinc-800 px-6 py-6 rounded-2xl"
          >
            <div class="grid grid-cols-10 gap-4 mt-12">
              <div class="col-span-10 sm:col-span-4">
                <label class="block text-sm font-medium text-zinc-400"
                  >Título</label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    v-model="selectedBook.title"
                    readonly
                    disabled
                    class="text-zinc-100 border-[1px] border-zinc-800 py-3 w-full shadow-sm block px-4 bg-zinc-900 focus:bg-indigo-700/10 focus:border-indigo-500 sm:text-sm rounded-2xl"
                  />
                </div>
              </div>
              <div class="col-span-10 sm:col-span-4">
                <label class="block text-sm font-medium text-zinc-400"
                  >Autor(es)</label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    v-model="selectedBook.authors"
                    readonly
                    disabled
                    class="text-zinc-100 border-[1px] border-zinc-800 py-3 w-full shadow-sm block px-4 bg-zinc-900 focus:bg-indigo-700/10 focus:border-indigo-500 sm:text-sm rounded-2xl focus:outline-none"
                  />
                </div>
              </div>
              <div class="col-span-10 sm:col-span-2">
                <label class="block text-sm font-medium text-zinc-400"
                  >Páginas</label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    v-model="selectedBook.pageCount"
                    readonly
                    disabled
                    class="text-zinc-100 border-[1px] border-zinc-800 py-3 w-full shadow-sm block px-4 bg-zinc-900 focus:bg-indigo-700/10 focus:border-indigo-500 sm:text-sm rounded-2xl focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <!-- Campos do usuário -->
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-zinc-400"
                  >Data de Início</label
                >
                <div class="mt-1">
                  <input
                    type="date"
                    v-model="startDate"
                    required
                    class="text-zinc-100 border-[1px] border-zinc-800 py-3 w-full shadow-sm block px-4 bg-zinc-900 focus:bg-indigo-700/10 sm:text-sm rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-zinc-400"
                  >Data de Conclusão</label
                >
                <div class="mt-1">
                  <input
                    type="date"
                    v-model="endDate"
                    class="text-zinc-100 border-[1px] focus:outline-none border-zinc-800 py-3 w-full shadow-sm block px-4 bg-zinc-900 focus:bg-indigo-700/10 sm:text-sm rounded-2xl focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mt-2 text-zinc-400"
                >Deixe sua nota</label
              >
              <div class="mt-1">
                <BookRating v-model="rating" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-zinc-400"
                >Deixe sua opinião</label
              >
              <div class="mt-1">
                <textarea
                  v-model="review"
                  rows="3"
                  class="text-zinc-100 border-[1px] border-zinc-800 py-3 w-full shadow-sm block px-4 bg-zinc-900 focus:bg-indigo-700/10 sm:text-sm rounded-2xl focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>
            </div>

            <div class="flex justify-center">
              <button
                type="submit"
                class="inline-flex justify-center py-3 mt-3 px-5 border border-transparent transition-all shadow-sm text-sm font-medium rounded-lg text-black bg-white hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500 items-center gap-2 font-roboto-mono"
              >
                <SaveAll :size="17" />
                Salvar Livro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import BookSearch from "./BookSearch.vue";
import BookRating from "./BookRating.vue";
import { addBook } from "../services/api";
import { SaveAll } from "lucide-vue-next";

export default {
  name: "BookForm",
  components: {
    BookSearch,
    BookRating,
    SaveAll,
  },
  emits: ["book-added"],
  setup(props, { emit }) {
    const selectedBook = ref(null);
    const startDate = ref("");
    const endDate = ref("");
    const rating = ref(0);
    const review = ref("");

    const handleBookSelection = (book) => {
      selectedBook.value = book;
    };

    const handleSubmit = async () => {
      try {
        const bookData = {
          ...selectedBook.value,
          // Ajustando o fuso horário para manter a data correta
          startDate: new Date(startDate.value + "T00:00:00").toISOString(),
          endDate: endDate.value
            ? new Date(endDate.value + "T00:00:00").toISOString()
            : null,
          rating: rating.value,
          review: review.value,
        };

        await addBook(bookData);
        emit("book-added");

        // Reset form
        selectedBook.value = null;
        startDate.value = "";
        endDate.value = "";
        rating.value = 0;
        review.value = "";
      } catch (error) {
        console.error("Error adding book:", error);
      }
    };
    return {
      selectedBook,
      startDate,
      endDate,
      rating,
      review,
      handleBookSelection,
      handleSubmit,
    };
  },
};
</script>
