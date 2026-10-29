// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResourceManagementClient } from "@azure/arm-resources";
import { RestError } from "@azure/core-rest-pipeline";
import { describe, expect, it, vi } from "vitest";
import { newResourceGroupName, TestResourceGroup } from "../utils/resourceGroup.js";

function setup(useExisting = false) {
  type Groups = ResourceManagementClient["resourceGroups"];
  const groups = {
    get: vi.fn<Groups["get"]>().mockRejectedValue(new RestError("Not found", { statusCode: 404 })),
    createOrUpdate: vi.fn<Groups["createOrUpdate"]>().mockResolvedValue({ location: "eastus" }),
    beginDeleteAndWait: vi.fn<Groups["beginDeleteAndWait"]>().mockResolvedValue(undefined),
  };
  return { groups, group: new TestResourceGroup(groups, "test-group", useExisting) };
}

describe("test resource group ownership", () => {
  it("uses the Python naming pattern with JavaScript replacements and unique suffixes", () => {
    const names = Array.from({ length: 10 }, newResourceGroupName);
    for (const name of names) {
      expect(name).toMatch(/^rgjs-javascriptsdk-edgeaction-test-[a-f0-9]{12}$/);
      expect(name.length).toBeLessThanOrEqual(90);
    }
    expect(new Set(names).size).toBe(names.length);
  });

  it("creates and deletes an isolated group in the same region as Python", async () => {
    const { groups, group } = setup();
    await group.create();
    expect(groups.createOrUpdate).toHaveBeenCalledWith(
      "test-group",
      {
        location: "eastus",
        tags: { purpose: "javascriptsdk-edgeaction-test" },
      },
      { abortSignal: undefined },
    );
    await group.cleanup();
    await group.cleanup();
    expect(groups.beginDeleteAndWait).toHaveBeenCalledTimes(1);
  });

  it("never creates or deletes an explicitly configured existing group", async () => {
    const { groups, group } = setup(true);
    groups.get.mockResolvedValue({ location: "eastus" });
    await group.create();
    await group.cleanup();
    expect(groups.get).toHaveBeenCalledWith("test-group", { abortSignal: undefined });
    expect(groups.createOrUpdate).not.toHaveBeenCalled();
    expect(groups.beginDeleteAndWait).not.toHaveBeenCalled();
  });

  it("fails if an explicitly configured group does not exist", async () => {
    const { groups, group } = setup(true);
    await expect(group.create()).rejects.toMatchObject({ statusCode: 404 });
    await group.cleanup();
    expect(groups.createOrUpdate).not.toHaveBeenCalled();
    expect(groups.beginDeleteAndWait).not.toHaveBeenCalled();
  });

  it("does not overwrite or delete a colliding generated group", async () => {
    const { groups, group } = setup();
    groups.get.mockResolvedValue({ location: "eastus" });
    await expect(group.create()).rejects.toThrow("Refusing to overwrite");
    await group.cleanup();
    expect(groups.createOrUpdate).not.toHaveBeenCalled();
    expect(groups.beginDeleteAndWait).not.toHaveBeenCalled();
  });

  it("does not claim ownership when preflight fails with an authorization error", async () => {
    const { groups, group } = setup();
    groups.get.mockRejectedValue(new RestError("Forbidden", { statusCode: 403 }));
    await expect(group.create()).rejects.toMatchObject({ statusCode: 403 });
    await group.cleanup();
    expect(groups.createOrUpdate).not.toHaveBeenCalled();
    expect(groups.beginDeleteAndWait).not.toHaveBeenCalled();
  });

  it("cleans up a partially created group after a failed PUT response", async () => {
    const { groups, group } = setup();
    groups.createOrUpdate.mockRejectedValue(new Error("Connection lost"));
    await expect(group.create()).rejects.toThrow("Connection lost");
    await group.cleanup();
    expect(groups.beginDeleteAndWait).toHaveBeenCalledTimes(1);
  });

  it("surfaces group cleanup errors and retains ownership for a retry", async () => {
    const { groups, group } = setup();
    await group.create();
    groups.beginDeleteAndWait.mockRejectedValueOnce(new Error("Deletion failed"));
    await expect(group.cleanup()).rejects.toThrow("Deletion failed");
    await group.cleanup();
    expect(groups.beginDeleteAndWait).toHaveBeenCalledTimes(2);
  });

  it("shares the lifecycle cancellation signal across group setup and cleanup", async () => {
    const { groups } = setup();
    const controller = new AbortController();
    const group = new TestResourceGroup(groups, "test-group", false, controller.signal);
    await group.create();
    await group.cleanup();
    expect(groups.get).toHaveBeenCalledWith("test-group", { abortSignal: controller.signal });
    expect(groups.createOrUpdate).toHaveBeenCalledWith("test-group", expect.any(Object), {
      abortSignal: controller.signal,
    });
    expect(groups.beginDeleteAndWait).toHaveBeenCalledWith(
      "test-group",
      expect.objectContaining({ abortSignal: controller.signal }),
    );
  });
});
