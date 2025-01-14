<template>
  <div class="min-h-screen bg-zinc-950">
    <nav class="bg-zinc-950 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between">
          <div class="flex w-full mt-auto">
            <div class="flex flex-col gap-2 mt-10 mb-12">
              <h1
                class="text-xl flex gap-2 font-extralight text-white items-center font-roboto-mono"
              >
                <BookCopy
                  :size="20"
                  class="text-indigo-400"
                  :stroke-width="1.25"
                />

                Gerenciador de Livros
              </h1>
              <p class="text-zinc-500 text-base">
                Gerencie seus livros e acompanhe o que você leu durante o ano.
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
