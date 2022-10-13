<script setup lang="ts">

    import type { TuringMachine } from '../composables/useTuringMachine';

    const props = defineProps<{
        machine: Readonly<TuringMachine>,
        setPointer: (pointer: number) => void
    }>();

</script>

<template>

    <main>
        <div v-for="char, i in props.machine.tape" 
        :style="{ color: props.machine.pointer === i ? 'red' : 'black', cursor: 'pointer' }"
        @click.prevent="setPointer(i)"
        >
            {{  char  }}
        </div>
    </main>

</template>

<style scoped>

main {
    display: flex;
}

</style>