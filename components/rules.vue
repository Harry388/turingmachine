<script setup lang="ts">

    import type { TuringMachine, Rule } from '../composables/useTuringMachine';

    const props = defineProps<{
        machine: Readonly<TuringMachine>,
        addRule: (rule: Rule) => void,
        removeRule: (state: string, character: string) => void
    }>();

    const newRule = ref<Rule>({
        direction: 'left',
        readCharacter: '',
        readState: '',
        writeCharacter: '',
        writeState: ''
    });

    function submitRule() {
        props.addRule(newRule.value);
    }

</script>

<template>

    <main>

        <span v-for="rule, state in props.machine.rules"> 
            <span v-for="innerRule, character in rule">
                <div>
                    ({{state}}, {{character}}) ➡️ ({{innerRule.state}}, {{innerRule.character}}, {{innerRule.direction}})
                    <button @click="props.removeRule(String(state), String(character))">🗑️</button>
                </div>
            </span>
        </span>

        <select v-model="newRule.readState">
            <option v-for="state in props.machine.states" :value="state">{{ state }}</option>
        </select>

        <select v-model="newRule.readCharacter">
            <option v-for="char in [...props.machine.alphabet, props.machine.empty]" :value="char">{{ char }}</option>
        </select>

        ➡️
        
        <select v-model="newRule.writeState">
            <option v-for="state in props.machine.states" :value="state">{{ state }}</option>
        </select>

        <select v-model="newRule.writeCharacter">
            <option v-for="char in [...props.machine.alphabet, props.machine.empty]" :value="char">{{ char }}</option>
        </select>

        <select v-model="newRule.direction">
            <option v-for="dir in ['left', 'right']" :value="dir">{{ dir }}</option>
        </select>

        <button @click="submitRule">Add</button>

    </main>

</template>

<style scoped>


</style>