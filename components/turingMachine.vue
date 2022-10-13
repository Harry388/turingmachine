<script setup>

    const { machine, removeRule, addRule, step, removeState, addState, 
        setPointer, addCharacter, removeCharacter, setState, setWord } = useTuringMachine();

    const playing = ref(false);
    const intervalId = ref(null);

    function togglePlayPause() {
        if (!playing.value) {
            intervalId.value = setInterval(step, 750);
        }
        else {
            clearInterval(intervalId.value);
        }
        playing.value = !playing.value;
    }

</script>

<template>

    <SetWord v-bind="{ setWord }" />

    <Tape v-bind="{ machine, setPointer }" />

    <button @click="step">Step</button>
    <button @click="togglePlayPause">{{ playing ? 'Pause' : 'Play' }}</button>

    <hr>

    <Alphabet v-bind="{ machine, addCharacter, removeCharacter }" />

    <hr>

    <States v-bind="{ machine, removeState, addState, setState }" />

    <hr>

    <Rules v-bind="{ machine, addRule, removeRule }" />

</template>