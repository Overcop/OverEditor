import { createLine } from "./script.mjs";

/**
 * @typedef {{inputs: HTMLInputElement[], input: HTMLInputElement, position: number, container: HTMLDivElement, event: KeyboardEvent}} HandleProps
 */

/**
 * @typedef {(props: HandleProps) => void} HandleFunction
 */

/**
 * @param {HandleProps} props
 */
export function handleEnter({ inputs, position, container }) {
    createLine(inputs, container, position + 1);
}

/**
 * @param {HandleProps} props
 */
export function handleArrowUp({ inputs, position }) {
    if (position > 0) inputs[position - 1].focus();
}

/**
 * @param {HandleProps} props
 */
export function handleArrowDown({ inputs, position }) {
    if (position < inputs.length - 1) inputs[position + 1].focus();
}

/**
 * @param {HandleProps} props
 */
export function handleBackspace({ event, inputs, input, position }) {
    if (!input.selectionStart === 0 && input.selectionEnd === 0) return;
    event.preventDefault();
    if (inputs.length === 1) return;
    else if (position > 0) inputs[position - 1].focus();
    else if (position < inputs.length - 1) inputs[position + 1].focus();
    inputs.splice(position, 1);
    input.remove();
}

/** @type {Record<string, HandleFunction>} */
const commands = {
    Enter: handleEnter,
    ArrowUp: handleArrowUp,
    ArrowDown: handleArrowDown,
    Backspace: handleBackspace,
};

export default commands;
