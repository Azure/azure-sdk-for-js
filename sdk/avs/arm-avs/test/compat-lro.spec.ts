// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi } from "vitest";
import { applyLroCompatToClient } from "../src/compat/lro.js";
import { lroCompatMap } from "../src/compat/lro-metadata.js";

describe("LRO compat", () => {
  it("adds beginXxx and beginXxxAndWait for all LROs", async () => {
    const client: any = {};
    for (const entry of lroCompatMap) {
      if (entry.path.length === 0) {
        // Root-level LRO (none exist in this package currently)
        client[entry.method] = vi.fn().mockResolvedValue("ok");
      } else {
        // Operation group LRO
        const group = (client[entry.path[0]] ??= {});
        group[entry.method] = vi.fn().mockResolvedValue("ok");
      }
    }

    applyLroCompatToClient(client);

    // Test that all LRO methods have their begin* variants
    for (const entry of lroCompatMap) {
      const target = entry.path.length === 0 ? client : client[entry.path[0]];
      const base = entry.method;
      const begin = "begin" + base[0].toUpperCase() + base.slice(1);
      const beginAndWait = begin + "AndWait";

      expect(typeof target[begin]).toBe("function");
      expect(typeof target[beginAndWait]).toBe("function");

      // Test that the methods can be called
      await target[beginAndWait]("a", "b", "c");
      expect(target[base]).toHaveBeenCalledWith("a", "b", "c");
    }
  });

  it("is idempotent", () => {
    const client: any = {
      privateClouds: { createOrUpdate: vi.fn() },
      clusters: { delete: vi.fn() },
      workloadNetworks: { createVMGroup: vi.fn() },
    };

    applyLroCompatToClient(client);
    applyLroCompatToClient(client); // Apply twice

    expect(typeof client.privateClouds.beginCreateOrUpdate).toBe("function");
    expect(typeof client.privateClouds.beginCreateOrUpdateAndWait).toBe("function");
    expect(typeof client.clusters.beginDelete).toBe("function");
    expect(typeof client.clusters.beginDeleteAndWait).toBe("function");
    expect(typeof client.workloadNetworks.beginCreateVMGroup).toBe("function");
    expect(typeof client.workloadNetworks.beginCreateVMGroupAndWait).toBe("function");
  });

  it("covers all major operation groups", () => {
    const operationGroups = new Set(lroCompatMap.map((entry) => entry.path[0]));

    // Verify we have all expected operation groups with LROs
    expect(operationGroups.has("privateClouds")).toBe(true);
    expect(operationGroups.has("clusters")).toBe(true);
    expect(operationGroups.has("addons")).toBe(true);
    expect(operationGroups.has("cloudLinks")).toBe(true);
    expect(operationGroups.has("authorizations")).toBe(true);
    expect(operationGroups.has("datastores")).toBe(true);
    expect(operationGroups.has("globalReachConnections")).toBe(true);
    expect(operationGroups.has("iscsiPaths")).toBe(true);
    expect(operationGroups.has("placementPolicies")).toBe(true);
    expect(operationGroups.has("pureStoragePolicies")).toBe(true);
    expect(operationGroups.has("scriptExecutions")).toBe(true);
    expect(operationGroups.has("virtualMachines")).toBe(true);
    expect(operationGroups.has("workloadNetworks")).toBe(true);
  });

  it("has correct method names for privateClouds operations", () => {
    const privateCloudsLROs = lroCompatMap
      .filter((entry) => entry.path[0] === "privateClouds")
      .map((entry) => entry.method);

    expect(privateCloudsLROs).toContain("rotateNsxtPassword");
    expect(privateCloudsLROs).toContain("rotateVcenterPassword");
    expect(privateCloudsLROs).toContain("delete");
    expect(privateCloudsLROs).toContain("update");
    expect(privateCloudsLROs).toContain("createOrUpdate");
  });

  it("has correct method names for workloadNetworks operations", () => {
    const workloadNetworksLROs = lroCompatMap
      .filter((entry) => entry.path[0] === "workloadNetworks")
      .map((entry) => entry.method);

    // VM Groups
    expect(workloadNetworksLROs).toContain("deleteVMGroup");
    expect(workloadNetworksLROs).toContain("updateVMGroup");
    expect(workloadNetworksLROs).toContain("createVMGroup");

    // Segments
    expect(workloadNetworksLROs).toContain("deleteSegment");
    expect(workloadNetworksLROs).toContain("updateSegments");
    expect(workloadNetworksLROs).toContain("createSegments");

    // Public IPs
    expect(workloadNetworksLROs).toContain("deletePublicIP");
    expect(workloadNetworksLROs).toContain("createPublicIP");

    // Port Mirroring
    expect(workloadNetworksLROs).toContain("deletePortMirroring");
    expect(workloadNetworksLROs).toContain("updatePortMirroring");
    expect(workloadNetworksLROs).toContain("createPortMirroring");

    // DNS Zones
    expect(workloadNetworksLROs).toContain("deleteDnsZone");
    expect(workloadNetworksLROs).toContain("updateDnsZone");
    expect(workloadNetworksLROs).toContain("createDnsZone");

    // DNS Services
    expect(workloadNetworksLROs).toContain("deleteDnsService");
    expect(workloadNetworksLROs).toContain("updateDnsService");
    expect(workloadNetworksLROs).toContain("createDnsService");

    // DHCP
    expect(workloadNetworksLROs).toContain("deleteDhcp");
    expect(workloadNetworksLROs).toContain("updateDhcp");
    expect(workloadNetworksLROs).toContain("createDhcp");
  });

  it("handles operation groups with mixed LRO and non-LRO methods", async () => {
    const client: any = {
      privateClouds: {
        // LRO methods
        createOrUpdate: vi.fn().mockResolvedValue("created"),
        delete: vi.fn().mockResolvedValue("deleted"),

        // Non-LRO methods (should not get begin* variants)
        get: vi.fn().mockResolvedValue("gotten"),
        list: vi.fn().mockReturnValue(["item1", "item2"]),
      },
    };

    applyLroCompatToClient(client);

    // LRO methods should have begin* variants
    expect(typeof client.privateClouds.beginCreateOrUpdate).toBe("function");
    expect(typeof client.privateClouds.beginCreateOrUpdateAndWait).toBe("function");
    expect(typeof client.privateClouds.beginDelete).toBe("function");
    expect(typeof client.privateClouds.beginDeleteAndWait).toBe("function");

    // Non-LRO methods should NOT have begin* variants
    expect(client.privateClouds.beginGet).toBeUndefined();
    expect(client.privateClouds.beginGetAndWait).toBeUndefined();
    expect(client.privateClouds.beginList).toBeUndefined();
    expect(client.privateClouds.beginListAndWait).toBeUndefined();

    // Test that begin* methods work
    await client.privateClouds.beginCreateOrUpdateAndWait("rg", "name", {});
    expect(client.privateClouds.createOrUpdate).toHaveBeenCalledWith("rg", "name", {});
  });

  it("has exactly 48 LRO operations mapped", () => {
    expect(lroCompatMap).toHaveLength(48);
  });

  it("works with virtualMachines restrictMovement operation", async () => {
    const client: any = {
      virtualMachines: {
        restrictMovement: vi.fn().mockResolvedValue("restricted"),
      },
    };

    applyLroCompatToClient(client);

    expect(typeof client.virtualMachines.beginRestrictMovement).toBe("function");
    expect(typeof client.virtualMachines.beginRestrictMovementAndWait).toBe("function");

    await client.virtualMachines.beginRestrictMovementAndWait("rg", "pc", "vm", {});
    expect(client.virtualMachines.restrictMovement).toHaveBeenCalledWith("rg", "pc", "vm", {});
  });
});
