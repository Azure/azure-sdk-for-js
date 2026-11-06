// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequire } from "node:module";
import { isAbsolute } from "node:path";
import process from "node:process";
import type { NativeReadClient, NativeReadClientFactory } from "../rust/NativeReadClient.js";

export function getNativeReadClientFactory(): NativeReadClientFactory {
  const bindingPath = process.env["AZURE_COSMOS_EXPERIMENTAL_NATIVE_BINDING_PATH"];
  return async (endpoint, key) => {
    if (!bindingPath || !isAbsolute(bindingPath)) {
      throw new Error(
        "AZURE_COSMOS_EXPERIMENTAL_NATIVE_BINDING_PATH must be an absolute path to the prototype .node binding.",
      );
    }
    // User-approved local prototype: explicitly selected .node artifact, not a published dependency.
    // eslint-disable-next-line no-restricted-syntax
    const binding = createRequire(bindingPath)(bindingPath) as {
      NativeReadClient?: { create?: NativeReadClientFactory };
    };
    if (typeof binding?.NativeReadClient?.create !== "function") {
      throw new Error("The prototype binding does not export NativeReadClient.create.");
    }
    const client: NativeReadClient = await binding.NativeReadClient.create(endpoint, key);
    if (typeof client?.readItem !== "function" || typeof client?.close !== "function") {
      throw new Error("The prototype binding returned an invalid NativeReadClient.");
    }
    return client;
  };
}
