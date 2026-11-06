// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NativeReadClientFactory } from "../rust/NativeReadClient.js";

export function getNativeReadClientFactory(): NativeReadClientFactory {
  return async () => {
    throw new Error("Experimental Rust item reads require Node.js.");
  };
}
