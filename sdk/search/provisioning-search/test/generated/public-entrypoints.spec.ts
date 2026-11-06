// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as packageExports from "@azure/provisioning-search";
import { describe, expect, it } from "vitest";

describe("public entrypoints", () => {
  it("exports generated resource classes", () => {
    expect(packageExports.SearchService).toBeDefined();
    expect(packageExports.NetworkSecurityPerimeterConfiguration).toBeDefined();
    expect(packageExports.PrivateEndpointConnection).toBeDefined();
    expect(packageExports.SharedPrivateLinkResource).toBeDefined();
  });
});
