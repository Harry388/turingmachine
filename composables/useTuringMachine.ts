export type TuringMachine = {
    pointer: number,
    state: string,
    tape: Array<string>,
    length: number,
    states: Array<string>,
    alphabet: Array<string>,
    empty: string,
    rules: Rules
}

export type Rules = {
    [key: string]: {
        [key: string]: {
            state: string,
            character: string,
            direction: 'left' | 'right'
        }
    }
}

export type Rule = {
    readState: string,
    readCharacter: string,
    writeState: string,
    writeCharacter: string,
    direction: 'left' | 'right'
}

export const useTuringMachine = () => {

    const machine = ref<TuringMachine>({
        pointer: 0,
        state: 'init',
        tape: [],
        length: 20,
        states: ['init', 'q'],
        alphabet: ['1', '0'],
        empty: '#',
        rules: {
            'init': {
                '0': {
                    state: 'init',
                    character: '0',
                    direction: 'right'
                },
                '1': {
                    state: 'init',
                    character: '1',
                    direction: 'right'
                },
                '#': {
                    state: 'q',
                    character: '#',
                    direction: 'left'
                }
            },
            'q': {
                '0': {
                    state: 'q',
                    character: '#',
                    direction: 'left'
                },
                '1': {
                    state: 'q',
                    character: '#',
                    direction: 'left'
                }
            }
        }
    });

    const addRule = (rule: Rule) => {
        const rules = machine.value.rules;
        const partRule = {
            state: rule.writeState,
            character: rule.writeCharacter,
            direction: rule.direction
        };
        const newRule = {};
        newRule[rule.readCharacter] = partRule;
        if (!(rule.readState in rules)) rules[rule.readState] = {};
        rules[rule.readState] = { ...rules[rule.readState], ...newRule };
    };

    const removeRule = (state: string, character: string) => {
        delete machine.value.rules[state][character];
        if (Object.keys(machine.value.rules[state]).length === 0) delete machine.value.rules[state];
    };

    const step = () => {
        if (!((machine.value.state in machine.value.rules) && (machine.value.tape[machine.value.pointer] in machine.value.rules[machine.value.state]))) return;
        const rule = machine.value.rules[machine.value.state][machine.value.tape[machine.value.pointer]];
        machine.value.state = rule.state;
        machine.value.tape[machine.value.pointer] = rule.character;
        if ((rule.direction === 'left') && (machine.value.pointer > 0)) {
            machine.value.pointer--;
        }
        else if ((rule.direction === 'right') && (machine.value.pointer < (machine.value.tape.length - 1))) {
            machine.value.pointer++;
        }
    };

    const addState = (state: string) => {
        if (!machine.value.states.includes(state))
            machine.value.states.push(state);
    }

    const removeState = (state: string) => {
        if (machine.value.states.includes(state))
            machine.value.states = [...machine.value.states.filter(s => s !== state)];
    }

    const addCharacter = (character: string) => {
        if (!machine.value.alphabet.includes(character))
            machine.value.alphabet.push(character);
    }

    const removeCharacter = (character: string) => {
        if (machine.value.alphabet.includes(character))
            machine.value.alphabet = [...machine.value.alphabet.filter(c => c !== character)];
    }

    const setPointer = (pointer: number) => {
        if ((0 <= pointer) && (pointer < machine.value.tape.length)) {
            machine.value.pointer = pointer;
        }
    }

    const setWord = (word: string) => {
        if (word.length > (machine.value.length - 1)) return;
        const wordList = word.split('');
        for (const character of wordList) {
            if (!(machine.value.alphabet.includes(character))) return;
        }
        machine.value.tape = Array(machine.value.length).fill(machine.value.empty);
        for (const i in wordList) {
            machine.value.tape[i] = wordList[i];
        }
    }

    const setState = (state: string) => {
        if (machine.value.states.includes(state)) {
            machine.value.state = state;
        }
    }

    setWord('1011101');

    return { 
        machine: readonly(machine),
        addRule,
        removeRule,
        step,
        addState,
        removeState,
        setPointer,
        addCharacter,
        removeCharacter,
        setWord,
        setState
    };

};