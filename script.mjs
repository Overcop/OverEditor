import commands from "./handle.mjs";

/** @type {HTMLDivElement} */
const EDITOR = document.querySelector("#editor");
/** @type {HTMLInputElement[]} */
const inputs = new Array();

/**
 * @param {KeyboardEvent} event
 * @param {HTMLInputElement[]} inputs
 * @param {HTMLInputElement} input
 * @param {HTMLDivElement} container
 */
function handleKeyDown(event, inputs, input, container) {
    const position = inputs.indexOf(input);
    commands[event.key]({ inputs, input, container, position, event });
}

/**
 * @param {HTMLInputElement} inputs
 * @param {HTMLDivElement} container
 * @param {number} position
 */
export function createLine(inputs, container, position = 0) {
    const input = document.createElement("input");

    input.placeholder = inputs.length;

    inputs.splice(position, 0, input);
    container.insertBefore(input, container.childNodes[position]);
    input.addEventListener("keydown", (event) =>
        handleKeyDown(event, inputs, input, container)
    );
    input.focus();
}

createLine(inputs, EDITOR);
