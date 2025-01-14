<template>
  <div class="space-y-6">
    <BookForm @book-added="refreshBooks" />
    <BookList :books="books" @book-removed="refreshBooks" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import BookForm from "../components/BookForm.vue";
import BookList from "../components/BookList.vue";
import { getBooks } from "../services/api";

export default {
  name: "HomeView",
  components: {
    BookForm,
    BookList,
  },
  setup() {
    const books = ref([]);

    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        books.value = response.data;
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    const refreshBooks = () => {
      fetchBooks();
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      books,
      refreshBooks,
    };
  },
};
</script>
