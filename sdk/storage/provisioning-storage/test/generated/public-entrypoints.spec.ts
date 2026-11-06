// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as packageExports from "@azure/provisioning-storage";
import { describe, expect, it } from "vitest";

describe("public entrypoints", () => {
  it("exports generated resource classes", () => {
    expect(packageExports.DeletedAccount).toBeDefined();
    expect(packageExports.StorageAccount).toBeDefined();
    expect(packageExports.AccountMigration).toBeDefined();
    expect(packageExports.AdvancedPlatformMetric).toBeDefined();
    expect(packageExports.BlobService).toBeDefined();
    expect(packageExports.Container).toBeDefined();
    expect(packageExports.ImmutabilityPolicy).toBeDefined();
    expect(packageExports.Connector).toBeDefined();
    expect(packageExports.DataShare).toBeDefined();
    expect(packageExports.EncryptionScope).toBeDefined();
    expect(packageExports.FileService).toBeDefined();
    expect(packageExports.Share).toBeDefined();
    expect(packageExports.Usage).toBeDefined();
    expect(packageExports.InventoryPolicy).toBeDefined();
    expect(packageExports.LocalUser).toBeDefined();
    expect(packageExports.ManagementPolicy).toBeDefined();
    expect(packageExports.NetworkSecurityPerimeterConfiguration).toBeDefined();
    expect(packageExports.ObjectReplicationPolicy).toBeDefined();
    expect(packageExports.PrivateEndpointConnection).toBeDefined();
    expect(packageExports.QueueService).toBeDefined();
    expect(packageExports.Queue).toBeDefined();
    expect(packageExports.StorageTaskAssignment).toBeDefined();
    expect(packageExports.TableService).toBeDefined();
    expect(packageExports.Table).toBeDefined();
  });
});
