// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { vsCodePlugin as plugin } from "../../../src/index.js";

import { useIdentityPlugin } from "@azure/identity";
import { describe, it, assert } from "vitest";

before(function () {
  useIdentityPlugin(plugin);
});
