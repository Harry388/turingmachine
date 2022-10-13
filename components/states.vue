<script setup lang="ts">

    import type { TuringMachine } from '../composables/useTuringMachine';

    const props = defineProps<{
        machine: Readonly<TuringMachine>,
        addState: (state: string) => void,
        removeState: (state: string) => void,
        setState: (state: string) => void
    }>();

    const newState = ref('');

    function submitState() {
        if (newState.value) {
            props.addState(newState.value);
            newState.value = '';
        }
    }

</script>

<template>

    <main>
        <div>
            Current State: {{ machine.state }}
        </div>
        States:
        <div v-for="state in props.machine.states">
            {{  state  }}
            <button @click="props.removeState(state)">🗑️</button>
            <button @click="props.setState(state)">Set</button>
        </div>
        <form @submit.prevent="submitState">
            <input type="text" v-model="newState">
            <input type="submit" value="Add">
        </form>
    </main>

</template>

<style scoped>


</style>