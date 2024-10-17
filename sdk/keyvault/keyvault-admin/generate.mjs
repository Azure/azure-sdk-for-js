// @ts-check

import "zx/globals";

// Steps:
// 0. Delete generated/**/*
await $`rm -rf generated/*`;

// 1. Generate from typespec
await $`tsp-client update -d -o generated`;

// 2. Move the code from generated/src to generated
await $`mv generated/src/* generated/`;

// 3. Remove generated/src
await $`rm -rf generated/src`;
