// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as packageExports from "@azure/provisioning-container-registry";
import { describe, expect, it } from "vitest";

describe("public entrypoints", () => {
  it("exports generated resource classes", () => {
    expect(packageExports.Registry).toBeDefined();
    expect(packageExports.CacheRule).toBeDefined();
    expect(packageExports.ConnectedRegistry).toBeDefined();
    expect(packageExports.CredentialSet).toBeDefined();
    expect(packageExports.PrivateEndpointConnection).toBeDefined();
    expect(packageExports.PrivateLinkResource).toBeDefined();
    expect(packageExports.Replication).toBeDefined();
    expect(packageExports.ScopeMap).toBeDefined();
    expect(packageExports.Token).toBeDefined();
    expect(packageExports.Webhook).toBeDefined();
  });
});
