<template>
  <div
    class="flex space-x-4 min-h-fit w-[30rem] bg-zinc-900 p-5 rounded-2xl border-[1px] border-zinc-800"
  >
    <img
      v-if="book.thumbnail"
      :src="book.thumbnail"
      :alt="book.title"
      class="h-28 w-20 object-cover rounded"
    />
    <div class="flex-1">
      <div class="flex items-center justify-between">
        <h4 class="text-base font-medium text-white font-roboto-mono">
          {{ book.title }}
        </h4>
      </div>
      <div class="text-sm flex flex-col my-1 text-zinc-500">
        {{ book.authors?.join(", ") }}
      </div>
      <div class="flex w-full my-6">
        <span
          class="gap-1 justify-left flex-col w-fit text-zinc-400 flex rounded-2xl text-sm"
          >Data de início
          <p
            class="bg-zinc-700/10 border-[1px] p-2 rounded-2xl border-zinc-600/40 text-white"
          >
            {{ formatDate(book.startDate) }}
          </p></span
        >

        <span
          v-if="book.endDate"
          class="gap-1 flex-col w-full items-end text-zinc-400 flex rounded-2xl text-sm"
          >Data de conclusão
          <p
            class="bg-zinc-700/10 border-[1px] p-2 rounded-2xl border-zinc-600/40 text-white"
          >
            {{ formatDate(book.endDate) }}
          </p>
        </span>
      </div>
      <div class="mt-2 mb-4 flex flex-col gap-1">
        <p class="text-zinc-300 font-semibold text-sm">Nota</p>
        <BookRating :modelValue="book.rating" readonly />
      </div>
      <div
        v-if="book.review"
        class="mt-2 flex flex-col gap-1 text-sm text-zinc-600"
      >
        <p class="text-zinc-300 font-semibold">Review</p>
        <div class="relative">
          <p
            ref="reviewText"
            class="p-2 rounded-2xl text-zinc-400 bg-zinc-800 mb-1"
            :class="{ 'line-clamp-3': !isExpanded }"
          >
            {{ book.review }}
          </p>
          <button
            v-if="showExpandButton"
            @click="isExpanded = !isExpanded"
            class="text-xs text-zinc-300 hover:text-indigo-500 hover:underline transition-colors float-right"
          >
            {{ isExpanded ? "ver menos" : "ver mais" }}
          </button>
        </div>
      </div>
      <div class="w-full flex justify-end mt-3">
        <button
          @click="handleRemove"
          class="inline-flex justify-center py-2 mt-3 px-4 border-transparent transition-all shadow-sm text-xs font-medium rounded-md bg-zinc-800 text-zinc-300 roboto-mono border-zinc-700 hover:border-red-500 border-[1px] hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 items-center font-roboto-mono gap-2"
        >
          <Trash2 :size="13" />
          <p>Excluir livro</p>
        </button>
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import BookRating from "./BookRating.vue";
import { deleteBook } from "../services/api";
import { Trash2 } from "lucide-vue-next";

const reviewText = ref(null);
const showExpandButton = ref(false);

onMounted(async () => {
  await nextTick();
  if (reviewText.value) {
    const lineHeight = parseInt(
      window.getComputedStyle(reviewText.value).lineHeight
    );
    const height = reviewText.value.offsetHeight;
    showExpandButton.value = height > lineHeight * 3;
  }
});

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["remove"]);
const isExpanded = ref(false);

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
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
