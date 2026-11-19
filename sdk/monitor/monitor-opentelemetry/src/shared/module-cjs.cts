// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { pathToFileURL } from "node:url";

// Provides CommonJS-specific implementation for various functions
// As per https://github.com/isaacs/tshy?tab=readme-ov-file#commonjs-dialect-polyfills
// Encapsulating the ESM / CommonJS specific implementation as needed.

/**
 * A CommonJS module loader for Azure Function Core.
 * @returns The Azure Functions Core module if it exists, otherwise undefined
 */
export function loadAzureFunctionCore(): ReturnType<typeof require> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("@azure/functions-core");
  } catch (e) {
    // Module not found, this is expected in non-Azure Functions environments
    return undefined;
  }
}

/** Load the CommonJS instrumentation base used by registration hooks. */
export function loadOpenTelemetryInstrumentation(): typeof import("@opentelemetry/instrumentation") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@opentelemetry/instrumentation") as typeof import("@opentelemetry/instrumentation");
}

/**
 * A polyfill for __dirname in CommonJS
 * @returns The directory name of the current module.
 */
export function dirName(): string {
  return __dirname;
}

/**
 * Resolves a loader specifier to a URL relative to this package.
 * @internal
 */
export function resolveLoaderURL(specifier: string): string {
  return pathToFileURL(require.resolve(specifier)).href;
}
