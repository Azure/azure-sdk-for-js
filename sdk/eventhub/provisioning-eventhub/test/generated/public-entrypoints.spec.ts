// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as packageExports from "@azure/provisioning-eventhub";
import { describe, expect, it } from "vitest";

describe("public entrypoints", () => {
  it("exports generated resource classes", () => {
    expect(packageExports.Cluster).toBeDefined();
    expect(packageExports.Namespace).toBeDefined();
    expect(packageExports.ApplicationGroup).toBeDefined();
    expect(packageExports.NamespaceAuthorizationRule).toBeDefined();
    expect(packageExports.ArmDisasterRecovery).toBeDefined();
    expect(packageExports.DisasterRecoveryConfigAuthorizationRule).toBeDefined();
    expect(packageExports.Eventhub).toBeDefined();
    expect(packageExports.EventhubAuthorizationRule).toBeDefined();
    expect(packageExports.ConsumerGroup).toBeDefined();
    expect(packageExports.NetworkRuleSet).toBeDefined();
    expect(packageExports.NetworkSecurityPerimeterConfiguration).toBeDefined();
    expect(packageExports.PrivateEndpointConnection).toBeDefined();
    expect(packageExports.SchemaGroup).toBeDefined();
  });
});
