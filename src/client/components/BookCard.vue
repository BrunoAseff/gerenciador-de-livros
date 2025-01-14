<template>
  <div
    class="flex space-x-4 w-fit bg-zinc-950 p-3 rounded-2xl border-[1px] border-indigo-500"
  >
    <img
      v-if="book.thumbnail"
      :src="book.thumbnail"
      :alt="book.title"
      class="h-24 w-16 object-cover rounded"
    />
    <div class="flex-1">
      <div class="flex items-center justify-between">
        <h4 class="text-lg font-medium text-zinc-400">{{ book.title }}</h4>
        <button
          @click="handleRemove"
          class="text-white bg-rose-600 transition-all rounded-2xl p-2 hover:bg-rose-700 flex items-center gap-2"
        >
          <Trash2 :size="16" />
          <p>Excluir</p>
        </button>
      </div>
      <p class="text-sm text-zinc-500">{{ book.authors?.join(", ") }}</p>
      <div class="mt-2">
        <BookRating :modelValue="book.rating" readonly />
      </div>
      <div class="mt-1 text-sm text-zinc-500">
        <span>Iniciado em: {{ formatDate(book.startDate) }}</span>
        <span v-if="book.endDate">
          • Concluído em: {{ formatDate(book.endDate) }}</span
        >
      </div>
      <div v-if="book.review" class="mt-2 text-sm text-zinc-600">
        <p class="line-clamp-2">{{ book.review }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import BookRating from "./BookRating.vue";
import { deleteBook } from "../services/api";
import { Trash2 } from "lucide-vue-next";

export default {
  name: "BookCard",
  components: {
    BookRating,
    Trash2,
  },
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  emits: ["remove"],
  setup(props, { emit }) {
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("pt-BR");
    };

    const handleRemove = async () => {
      if (confirm("Tem certeza que deseja remover este livro?")) {
        try {
          await deleteBook(props.book.id);
          emit("remove", props.book.id);
        } catch (error) {
          console.error("Error removing book:", error);
          alert("Erro ao remover o livro. Tente novamente.");
        }
      }
    };

    return {
      formatDate,
      handleRemove,
    };
  },
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
