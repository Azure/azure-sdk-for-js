// @ts-check

$.verbose = true;

// Steps:
// Setup the environment
await $`rm -rf src/generated/*`;
await $`cp tsp-location.yaml src/generated`;

// Generate from typespec
await $`tsp-client update -d -o src/generated`;

// Move the code from generated/src to generated
await $`mv src/generated/src/* src/generated/`;

// Remove generated/src
await $`rm -rf src/generated/src`;

// Remove tsp-location.yaml from generated folder
await $`rm src/generated/tsp-location.yaml`;
// Update package.json to include core-client-rest?
