<script setup lang="ts">

    const props = defineProps<{
        setWord: (word: string) => void
    }>();

    const newWord = ref('');

</script>

<template>

    <form @submit.prevent="props.setWord(newWord)">

        <input type="text" v-model="newWord">
        <input type="submit" value="Set Word">

    </form>

</template>