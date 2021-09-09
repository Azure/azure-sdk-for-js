// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-require-imports */

// We need to set up the plugin for the tests!

import { useIdentityPlugin } from "../../../../identity/src";

// The persistence tests have to run on the same version of Node that's used to
// install dependencies, currently 14.
// TODO: We need a better solution for this, but this will do for now.
if (!process.versions.node.startsWith("14")) {
  console.warn(
    "WARNING: skipping persistence tests on incompatible node version:",
    process.version
  );
  console.warn("Persistence tests are only compatible with Node 14.");
  process.exit(0);
}

// This shim is required to defer loading of @azure/msal-node-extensions in environments where
// it will crash CI with an invalid Node API version.
export const createPersistence: typeof import("../../../src/provider").createPersistence = (
  ...args
) => {
  const { createPersistence: create } = require("../../../src/provider");
  return create(...args);
};

before(function() {
  useIdentityPlugin(require("../../../src").cachePersistencePlugin);
});
