// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as packageExports from "@azure/provisioning-cognitiveservices";
import { describe, expect, it } from "vitest";

describe("public entrypoints", () => {
  it("exports generated resource classes", () => {
    expect(packageExports.Account).toBeDefined();
    expect(packageExports.AccountCapabilityHost).toBeDefined();
    expect(packageExports.CommitmentPlan).toBeDefined();
    expect(packageExports.CognitiveServicesConnection).toBeDefined();
    expect(packageExports.DefenderForAiSetting).toBeDefined();
    expect(packageExports.Deployment).toBeDefined();
    expect(packageExports.EncryptionScope).toBeDefined();
    expect(packageExports.ManagedNetwork).toBeDefined();
    expect(packageExports.OutboundRule).toBeDefined();
    expect(packageExports.NetworkSecurityPerimeterConfiguration).toBeDefined();
    expect(packageExports.PrivateEndpointConnection).toBeDefined();
    expect(packageExports.Project).toBeDefined();
    expect(packageExports.Application).toBeDefined();
    expect(packageExports.CognitiveServicesAgentDeployment).toBeDefined();
    expect(packageExports.ProjectCapabilityHost).toBeDefined();
    expect(packageExports.CognitiveServicesProjectConnection).toBeDefined();
    expect(packageExports.RaiBlocklist).toBeDefined();
    expect(packageExports.RaiBlocklistItem).toBeDefined();
    expect(packageExports.AccountRaiPolicy).toBeDefined();
    expect(packageExports.RaiToolLabel).toBeDefined();
    expect(packageExports.RaiTopic).toBeDefined();
    expect(packageExports.RaiExternalSafetyProviderSchema).toBeDefined();
    expect(packageExports.CognitiveServicesCommitmentPlan).toBeDefined();
    expect(packageExports.AccountAssociation).toBeDefined();
    expect(packageExports.RaiContentFilter).toBeDefined();
    expect(packageExports.CognitiveServicesDeletedAccount).toBeDefined();
    expect(packageExports.QuotaTier).toBeDefined();
    expect(packageExports.RaiExternalSafetyProvider).toBeDefined();
    expect(packageExports.RaiPolicy).toBeDefined();
  });
});
