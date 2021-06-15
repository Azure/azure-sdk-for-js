// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import extension from "../../../src";

import { useIdentityExtension } from "@azure/identity";

before(function() {
  useIdentityExtension(extension);
});
