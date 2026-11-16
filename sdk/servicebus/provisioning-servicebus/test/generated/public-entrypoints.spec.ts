// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as packageExports from "@azure/provisioning-servicebus";
import { describe, expect, it } from "vitest";

describe("public entrypoints", () => {
  it("exports generated resource classes", () => {
    expect(packageExports.Namespace).toBeDefined();
    expect(packageExports.ServiceBusNamespaceAuthorizationRule).toBeDefined();
    expect(packageExports.ArmDisasterRecovery).toBeDefined();
    expect(packageExports.ServiceBusDisasterRecoveryAuthorizationRule).toBeDefined();
    expect(packageExports.MigrationConfigProperties).toBeDefined();
    expect(packageExports.NetworkRuleSet).toBeDefined();
    expect(packageExports.NetworkSecurityPerimeterConfiguration).toBeDefined();
    expect(packageExports.PrivateEndpointConnection).toBeDefined();
    expect(packageExports.Queue).toBeDefined();
    expect(packageExports.ServiceBusQueueAuthorizationRule).toBeDefined();
    expect(packageExports.Topic).toBeDefined();
    expect(packageExports.ServiceBusTopicAuthorizationRule).toBeDefined();
    expect(packageExports.Subscription).toBeDefined();
    expect(packageExports.Rule).toBeDefined();
  });
});
