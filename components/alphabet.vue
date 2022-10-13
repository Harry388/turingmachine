<script setup lang="ts">

    import type { TuringMachine } from '../composables/useTuringMachine';

    const props = defineProps<{
        machine: Readonly<TuringMachine>,
        addCharacter: (character: string) => void,
        removeCharacter: (character: string) => void
    }>();

    const newCharacter = ref('');

    function submitCharacter() {
        if (newCharacter.value) {
            props.addCharacter(newCharacter.value);
            newCharacter.value = '';
        }
    }

</script>

<template>

    <main>
        Alphabet:
        <div v-for="character in props.machine.alphabet">
            {{  character  }}
            <button @click="props.removeCharacter(character)">🗑️</button>
        </div>
        <form @submit.prevent="submitCharacter">
            <input type="text" v-model="newCharacter">
            <input type="submit" value="Add">
        </form>
    </main>

</template>

<style scoped>


</style>