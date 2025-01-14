<template>
  <div class="border-[1px] border-zinc-900 shadow sm:rounded-2xl">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg leading-6 font-medium text-zinc-300">Meus livros</h3>
      <div class="mt-5">
        <div v-if="books.length === 0" class="text-center text-zinc-600">
          Nenhum livro cadastrado ainda.
        </div>
        <ul v-else class="divide-y divide-gray-200">
          <li v-for="book in sortedBooks" :key="book.id" class="py-4">
            <BookCard :book="book" @remove="handleRemove" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import BookCard from "./BookCard.vue";

export default {
  name: "BookList",
  components: {
    BookCard,
  },
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
  emits: ["book-removed"],
  setup(props, { emit }) {
    const sortedBooks = computed(() => {
      return [...props.books].sort((a, b) => {
        return new Date(b.startDate) - new Date(a.startDate);
      });
    });

    const handleRemove = async (bookId) => {
      emit("book-removed", bookId);
    };

    return {
      sortedBooks,
      handleRemove,
    };
  },
};
</script>
