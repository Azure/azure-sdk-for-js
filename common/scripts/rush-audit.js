const y = `\u001B[33m`;
const x = `\u001B[39m`;
const c = `\u001B[36m`;
const b = `\u001B[34m`;

console.log(`${y}╭────────────────────────────────────────────────────────────────────╮${x}`);
console.log(`${y}│                                                                    │${x}`);
console.log(`${y}│${x}   An NPM package-lock.json must be created to audit this package   ${y}│${x}`);
console.log(`${y}│                                                                    │${x}`);
console.log(`${y}│${x}    If you're using Rush this will corrupt your dev environment,    ${y}│${x}`);
console.log(`${y}│${x}           run ${c}rush link -f${x} to get back to a working state          ${y}│${x}`);
console.log(`${y}│                                                                    │${x}`);
console.log(`${y}╰────────────────────────────────────────────────────────────────────╯${x}`);