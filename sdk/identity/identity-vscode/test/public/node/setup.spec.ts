// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { vsCodePlugin as plugin } from "../../../src";

import { useIdentityPlugin } from "@azure/identity";

before(function() {
  useIdentityPlugin(plugin);
});
