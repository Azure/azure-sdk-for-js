// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// We need to set up the extension for the tests!

import { useIdentityExtension } from "../../../../identity/src";

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

import { cachePersistenceExtension as extension } from "../../../src";

before(function() {
  useIdentityExtension(extension);
});
