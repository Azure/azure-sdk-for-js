// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// We need to set up the extension for the tests!

import { useIdentityExtension } from "../../../../identity/src";
import extension from "../../../src";

before(function() {
  useIdentityExtension(extension);
});
