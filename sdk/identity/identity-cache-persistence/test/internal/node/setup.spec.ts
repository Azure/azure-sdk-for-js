// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-require-imports */

// We need to set up the plugin for the tests!

import { useIdentityPlugin } from "@azure/identity";
import { beforeAll } from "vitest";

// The persistence tests have to run on the same version of Node that's used to
// install dependencies, currently 16.
// TODO: We need a better solution for this, but this will do for now.
if (!process.versions.node.startsWith("16")) {
  console.warn(
    "WARNING: skipping persistence tests on incompatible node version:",
    process.version,
  );
  console.warn("Persistence tests are only compatible with Node 16.");
  // eslint-disable-next-line n/no-process-exit
  process.exit(0);
}

// This shim is required to defer loading of @azure/msal-node-extensions in environments where
// it will crash CI with an invalid Node API version.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export const createPersistence: typeof import("$internal/provider.js").createPersistence =
  async (...args) => {
    const { createPersistence: create } = await import("$internal/provider.js");
    return create(...args);
  };

beforeAll(function () {
  useIdentityPlugin(require("@azure/identity-cache-persistence").cachePersistencePlugin);
});
