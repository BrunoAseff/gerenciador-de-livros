<template>
  <div class="border-[1px] border-zinc-800 bg-zinc-900 shadow sm:rounded-2xl">
    <div class="p-10">
      <h3
        class="text-lg leading-6 font-medium text-zinc-300 flex gap-3 font-roboto-mono items-center"
      >
        <BookCheck class="text-zinc-40" :size="19" :stroke-width="2" />
        Meus livros
      </h3>
      <div class="mt-5">
        <div
          v-if="books.length === 0"
          class="flex flex-col gap-3 text-center text-zinc-500 w-ful items-center justify-center"
        >
          <BookX :size="80" :stroke-width="1" />
          Nenhum livro cadastrado ainda.
        </div>
        <ul
          class="grid grid-cols-1 md:grid-cols-2 w-full items-center justify-center"
          v-else
        >
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
import { BookCheck, BookX } from "lucide-vue-next";
export default {
  name: "BookList",
  components: {
    BookCard,
    BookCheck,
    BookX,
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
