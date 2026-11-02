// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as packageExports from "@azure/provisioning-webpubsub";
import { describe, expect, it } from "vitest";

describe("public entrypoints", () => {
  it("exports generated resource classes", () => {
    expect(packageExports.WebPubSub).toBeDefined();
    expect(packageExports.CustomCertificate).toBeDefined();
    expect(packageExports.CustomDomain).toBeDefined();
    expect(packageExports.Hub).toBeDefined();
    expect(packageExports.PersistentStorage).toBeDefined();
    expect(packageExports.PrivateEndpointConnection).toBeDefined();
    expect(packageExports.Replica).toBeDefined();
    expect(packageExports.WebPubSubReplicaSharedPrivateLink).toBeDefined();
    expect(packageExports.WebPubSubSharedPrivateLink).toBeDefined();
  });
});
