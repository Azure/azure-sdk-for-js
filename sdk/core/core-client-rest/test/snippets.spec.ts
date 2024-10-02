// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import type { Client, Routes } from "@azure-rest/core-client";

describe("snippets", () => {
  it("path_example", () => {
    export type MyClient = Client & {
      path: Routes;
    };
  });
});
