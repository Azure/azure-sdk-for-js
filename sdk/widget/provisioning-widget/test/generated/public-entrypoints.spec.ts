// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as packageExports from "@azure/provisioning-widget";
import { describe, expect, it } from "vitest";

describe("public entrypoints", () => {
  it("exports generated resource classes", () => {
    expect(packageExports.Employee).toBeDefined();
  });
});
