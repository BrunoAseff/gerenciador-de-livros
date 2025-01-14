<template>
  <div class="border-[1px] border-zinc-900 shadow sm:rounded-2xl">
    <div class="px-4 py-5 sm:p-6">
      <div>
        <div class="space-y-4">
          <div>
            <BookSearch @book-selected="handleBookSelection" />
          </div>
          <form
            v-if="selectedBook"
            @submit.prevent="handleSubmit"
            class="space-y-4"
          >
            <!-- Campos preenchidos automaticamente -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-zinc-300"
                  >Título</label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    v-model="selectedBook.title"
                    readonly
                    class="text-zinc-100 border-[1px] border-zinc-700 py-3 w-full shadow-sm block px-4 bg-zinc-900 sm:text-sm rounded-2xl"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-zinc-300"
                  >Autor(es)</label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    v-model="selectedBook.authors"
                    readonly
                    class="text-zinc-100 border-[1px] border-zinc-700 py-3 w-full shadow-sm block px-4 bg-zinc-900 sm:text-sm rounded-2xl"
                  />
                </div>
              </div>
            </div>

            <!-- Campos do usuário -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-zinc-300"
                  >Data de Início</label
                >
                <div class="mt-1">
                  <input
                    type="date"
                    v-model="startDate"
                    required
                    class="text-zinc-100 border-[1px] border-zinc-700 py-3 w-full shadow-sm block px-4 bg-zinc-900 sm:text-sm rounded-2xl focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-zinc-300"
                  >Data de Conclusão</label
                >
                <div class="mt-1">
                  <input
                    type="date"
                    v-model="endDate"
                    class="text-zinc-100 border-[1px] border-zinc-700 py-3 w-full shadow-sm block px-4 bg-zinc-900 sm:text-sm rounded-2xl focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-zinc-300"
                >Nota (0-5)</label
              >
              <div class="mt-1">
                <BookRating v-model="rating" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-zinc-300"
                >Opinião</label
              >
              <div class="mt-1">
                <textarea
                  v-model="review"
                  rows="3"
                  class="text-zinc-100 border-[1px] border-zinc-700 py-3 w-full shadow-sm block px-4 bg-zinc-900 sm:text-sm rounded-2xl focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-zinc-300 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
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

export default {
  name: "BookForm",
  components: {
    BookSearch,
    BookRating,
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
          startDate: startDate.value,
          endDate: endDate.value,
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
