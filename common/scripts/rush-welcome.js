const y = `\u001B[33m`;
const x = `\u001B[39m`;
const c = `\u001B[36m`;
const b = `\u001B[34m`;

console.log(`${y}╭─────────────────────────────────────────────────────────────────────────────╮${x}`);
console.log(`${y}│                                                                             │${x}`);
console.log(`${y}│${x}   This project uses Rush (${b}https://rushjs.io${x}) to manage multiple libraries   ${y}│${x}`);
console.log(`${y}│${x}     in a single repository, visit ${b}https://aka.ms/azsdk-js${x} for more info     ${y}│${x}`);
console.log(`${y}│                                                                             │${x}`);
console.log(`${y}│${x}      Please install Rush globally with ${c}npm install -g @microsoft/rush${x}       ${y}│${x}`);
console.log(`${y}│${x}        Then run ${c}rush update${x} to install and link dependencies instead        ${y}│${x}`);
console.log(`${y}│                                                                             │${x}`);
console.log(`${y}╰─────────────────────────────────────────────────────────────────────────────╯${x}`);