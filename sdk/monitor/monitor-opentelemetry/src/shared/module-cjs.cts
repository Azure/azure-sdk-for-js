// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Provides CommonJS-specific implementation for various functions
// As per https://github.com/isaacs/tshy?tab=readme-ov-file#commonjs-dialect-polyfills
// Encapsulating the ESM / CommonJS specific implementation as needed.

/**
 * A CommonJS module loader for Azure Function Core.
 */
export function loadAzureFunctionCore(): ReturnType<typeof require> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@azure/functions-core");
}

/**
 * A polyfill for __dirname in CommonJS
 * @returns The directory name of the current module.
 */
export function dirName(): string {
  return __dirname;
}
