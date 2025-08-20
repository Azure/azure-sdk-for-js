// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { vsCodePlugin as plugin } from "@azure/identity-vscode";

import { useIdentityPlugin } from "@azure/identity";
import { beforeAll } from "vitest";

beforeAll(function () {
  useIdentityPlugin(plugin);
});
