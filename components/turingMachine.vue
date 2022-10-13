<script setup>

    const { machine, removeRule, addRule, step, removeState, addState, setPointer } = useTuringMachine();

    const newEmpty = ref(machine.value.empty);

</script>

<template>

    <Tape v-bind="{ machine, setPointer }" />

    <button @click="step">Step</button>

    <hr>

    <States v-bind="{ machine, removeState, addState }" />

    <hr>

    <Rules v-bind="{ machine, addRule, removeRule }" />

</template>