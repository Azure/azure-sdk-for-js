// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// We need to set up the extension for the tests!

import { useIdentityExtension } from "../../../../identity/src";
import { cachePersistenceExtension as extension } from "../../../src";

// The persistence tests have to run on the same version of Node that's used to
// install dependencies, currently 12.
// TODO: We need a better solution for this, but this will do for now.
if (!process.versions.node.startsWith("12")) {
  console.warn(
    "WARNING: skipping persistence tests on incompatible node version:",
    process.version
  );
  console.warn("Persistence tests are only compatible with Node 12.");
  process.exit(0);
}

before(function() {
  useIdentityExtension(extension);
});
