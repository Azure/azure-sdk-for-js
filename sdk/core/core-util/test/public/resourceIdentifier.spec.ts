// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { parseResourceId } from "../../src/resourceIdentifier.js";

describe("resourceIdentifier", () => {
  describe("parseResourceId", () => {
    it("throws an error for empty resource ID", () => {
      expect(() => parseResourceId("")).toThrow("Invalid resource ID: resourceId cannot be empty");
    });

    it("throws an error for resource ID not starting with /", () => {
      expect(() => parseResourceId("subscriptions/subId")).toThrow(
        "Invalid resource ID: resource ID 'subscriptions/subId' must start with '/'"
      );
    });

    it("throws an error for invalid resource ID", () => {
      expect(() => parseResourceId("/invalid")).toThrow("Invalid resource ID: /invalid");
    });

    it("parses a subscription ID", () => {
      const id = "/subscriptions/00000000-0000-0000-0000-000000000000";
      const result = parseResourceId(id);
      
      expect(result).toEqual({
        id,
        subscriptionId: "00000000-0000-0000-0000-000000000000",
        resourceGroupName: undefined,
        provider: undefined,
        resourceType: undefined,
        name: undefined,
        parentResources: []
      });
    });

    it("parses a resource group ID", () => {
      const id = "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup";
      const result = parseResourceId(id);
      
      expect(result).toEqual({
        id,
        subscriptionId: "00000000-0000-0000-0000-000000000000",
        resourceGroupName: "myResourceGroup",
        provider: undefined,
        resourceType: undefined,
        name: undefined,
        parentResources: []
      });
    });

    it("parses a provider resource ID", () => {
      const id = "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM";
      const result = parseResourceId(id);
      
      expect(result).toEqual({
        id,
        subscriptionId: "00000000-0000-0000-0000-000000000000",
        resourceGroupName: "myResourceGroup",
        provider: "Microsoft.Compute",
        resourceType: "virtualMachines",
        name: "myVM",
        parentResources: []
      });
    });

    it("parses a nested resource ID", () => {
      const id = "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/myVNet/subnets/mySubnet";
      const result = parseResourceId(id);
      
      expect(result).toEqual({
        id,
        subscriptionId: "00000000-0000-0000-0000-000000000000",
        resourceGroupName: "myResourceGroup",
        provider: "Microsoft.Network",
        resourceType: "subnets",
        name: "mySubnet",
        parentResources: ["virtualNetworks", "myVNet"]
      });
    });

    it("parses a deeply nested resource ID", () => {
      const id = "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Sql/servers/myServer/databases/myDB/tables/myTable";
      const result = parseResourceId(id);
      
      expect(result).toEqual({
        id,
        subscriptionId: "00000000-0000-0000-0000-000000000000",
        resourceGroupName: "myResourceGroup",
        provider: "Microsoft.Sql",
        resourceType: "tables",
        name: "myTable",
        parentResources: ["servers", "myServer", "databases", "myDB"]
      });
    });

    it("handles case-insensitivity of key segments", () => {
      const id = "/Subscriptions/00000000-0000-0000-0000-000000000000/ResourceGroups/myResourceGroup/Providers/Microsoft.Compute/virtualMachines/myVM";
      const result = parseResourceId(id);
      
      expect(result).toEqual({
        id,
        subscriptionId: "00000000-0000-0000-0000-000000000000",
        resourceGroupName: "myResourceGroup",
        provider: "Microsoft.Compute",
        resourceType: "virtualMachines",
        name: "myVM",
        parentResources: []
      });
    });

    it("parses a resource ID with a generic parent", () => {
      const id = "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/someParent/parentName/childResource/myResource";
      const result = parseResourceId(id);
      
      expect(result).toEqual({
        id,
        subscriptionId: "00000000-0000-0000-0000-000000000000",
        resourceGroupName: "myResourceGroup",
        provider: undefined,
        resourceType: "childResource",
        name: "myResource",
        parentResources: ["someParent", "parentName"]
      });
    });
    
    it("handles resource IDs with trailing slashes", () => {
      const id = "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/";
      const result = parseResourceId(id);
      
      expect(result).toEqual({
        id,
        subscriptionId: "00000000-0000-0000-0000-000000000000",
        resourceGroupName: "myResourceGroup",
        provider: undefined,
        resourceType: undefined,
        name: undefined,
        parentResources: []
      });
    });
  });
});