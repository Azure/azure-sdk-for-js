// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownCustomerManagedKeys,
  KnownPrivateEndpointServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
  KnownPublicNetworkAccess,
  KnownCreatedByType,
  KnownVmSize,
  KnownScaleSetPriority,
  KnownNetworkEgressType,
  KnownSystemSku,
  KnownStorageStoreType,
  KnownVersions,
} from "../../src/models/index.js";

describe("ARM Discovery Models", () => {
  describe("KnownOrigin", () => {
    it("should have expected values", () => {
      assert.equal(KnownOrigin.User, "user");
      assert.equal(KnownOrigin.System, "system");
      assert.equal(KnownOrigin.UserSystem, "user,system");
    });
  });

  describe("KnownActionType", () => {
    it("should have expected values", () => {
      assert.equal(KnownActionType.Internal, "Internal");
    });
  });

  describe("KnownProvisioningState", () => {
    it("should have expected values", () => {
      assert.equal(KnownProvisioningState.Succeeded, "Succeeded");
      assert.equal(KnownProvisioningState.Failed, "Failed");
      assert.equal(KnownProvisioningState.Canceled, "Canceled");
    });
  });

  describe("KnownCustomerManagedKeys", () => {
    it("should have expected values", () => {
      assert.equal(KnownCustomerManagedKeys.Disabled, "Disabled");
      assert.equal(KnownCustomerManagedKeys.Enabled, "Enabled");
    });
  });

  describe("KnownPrivateEndpointServiceConnectionStatus", () => {
    it("should have expected values", () => {
      assert.equal(KnownPrivateEndpointServiceConnectionStatus.Pending, "Pending");
      assert.equal(KnownPrivateEndpointServiceConnectionStatus.Approved, "Approved");
      assert.equal(KnownPrivateEndpointServiceConnectionStatus.Rejected, "Rejected");
    });
  });

  describe("KnownPrivateEndpointConnectionProvisioningState", () => {
    it("should have expected values", () => {
      assert.equal(KnownPrivateEndpointConnectionProvisioningState.Succeeded, "Succeeded");
      assert.equal(KnownPrivateEndpointConnectionProvisioningState.Creating, "Creating");
      assert.equal(KnownPrivateEndpointConnectionProvisioningState.Deleting, "Deleting");
      assert.equal(KnownPrivateEndpointConnectionProvisioningState.Failed, "Failed");
    });
  });

  describe("KnownPublicNetworkAccess", () => {
    it("should have expected values", () => {
      assert.equal(KnownPublicNetworkAccess.Enabled, "Enabled");
      assert.equal(KnownPublicNetworkAccess.Disabled, "Disabled");
    });
  });

  describe("KnownCreatedByType", () => {
    it("should have expected values", () => {
      assert.equal(KnownCreatedByType.User, "User");
      assert.equal(KnownCreatedByType.Application, "Application");
      assert.equal(KnownCreatedByType.ManagedIdentity, "ManagedIdentity");
      assert.equal(KnownCreatedByType.Key, "Key");
    });
  });

  describe("KnownVmSize", () => {
    it("should have expected values for GPU-optimized VMs", () => {
      assert.equal(KnownVmSize.StandardNC24AdsA100V4, "Standard_NC24ads_A100_v4");
      assert.equal(KnownVmSize.StandardNC48AdsA100V4, "Standard_NC48ads_A100_v4");
      assert.equal(KnownVmSize.StandardNC96AdsA100V4, "Standard_NC96ads_A100_v4");
      assert.equal(KnownVmSize.StandardND40RsV2, "Standard_ND40rs_v2");
    });
  });

  describe("KnownScaleSetPriority", () => {
    it("should have expected values", () => {
      assert.equal(KnownScaleSetPriority.Regular, "Regular");
      assert.equal(KnownScaleSetPriority.Spot, "Spot");
    });
  });

  describe("KnownNetworkEgressType", () => {
    it("should have expected values", () => {
      assert.equal(KnownNetworkEgressType.LoadBalancer, "LoadBalancer");
      assert.equal(KnownNetworkEgressType.None, "None");
    });
  });

  describe("KnownSystemSku", () => {
    it("should have expected values", () => {
      assert.equal(KnownSystemSku.StandardD4SV6, "Standard_D4s_v6");
      assert.equal(KnownSystemSku.StandardD4SV5, "Standard_D4s_v5");
      assert.equal(KnownSystemSku.StandardD4SV4, "Standard_D4s_v4");
    });
  });

  describe("KnownStorageStoreType", () => {
    it("should have expected values", () => {
      assert.equal(KnownStorageStoreType.AzureStorageBlob, "AzureStorageBlob");
      assert.equal(KnownStorageStoreType.AzureNetAppFiles, "AzureNetAppFiles");
    });
  });

  describe("KnownVersions", () => {
    it("should have expected API versions", () => {
      assert.equal(KnownVersions.V20250701Preview, "2025-07-01-preview");
      assert.equal(KnownVersions.V20251201Preview, "2025-12-01-preview");
      assert.equal(KnownVersions.V20260201Preview, "2026-02-01-preview");
    });
  });
});
