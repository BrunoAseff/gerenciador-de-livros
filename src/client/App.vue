<template>
  <div class="min-h-screen bg-zinc-950">
    <nav class="bg-zinc-950 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between">
          <div class="flex w-full mt-auto">
            <div class="flex flex-col gap-2 mt-16">
              <h1
                class="text-4xl flex gap-2 font-semibold text-white items-center"
              >
                <BookCopy
                  :size="32"
                  class="text-indigo-500"
                  :stroke-width="2"
                />

                Gerenciador de Livros
              </h1>
              <p class="text-zinc-500 text-base">
                Gerencie seus livros e acompanhe o que voce leu durante o ano.
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { BookCopy } from "lucide-vue-next";
</script>
