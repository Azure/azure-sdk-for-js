// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { randomUUID } from "node:crypto";
import type { ResourceManagementClient } from "@azure/arm-resources";
import { isRestError } from "@azure/core-rest-pipeline";
import { isPlaybackMode } from "@azure-tools/test-recorder";

export function newResourceGroupName(): string {
  return `rgjs-javascriptsdk-edgeaction-test-${randomUUID().replaceAll("-", "").slice(0, 12)}`;
}

export class TestResourceGroup {
  private ownsGroup = false;

  constructor(
    private readonly groups: Pick<
      ResourceManagementClient["resourceGroups"],
      "get" | "createOrUpdate" | "beginDeleteAndWait"
    >,
    readonly name: string,
    private readonly useExisting: boolean,
    private readonly signal?: AbortSignal,
  ) {}

  async create(): Promise<void> {
    if (this.useExisting) {
      await this.groups.get(this.name, { abortSignal: this.signal });
      return;
    }
    try {
      await this.groups.get(this.name, { abortSignal: this.signal });
    } catch (error) {
      if (!isRestError(error) || error.statusCode !== 404) throw error;
      // Retain ownership if PUT creates the group but its response fails.
      this.ownsGroup = true;
      await this.groups.createOrUpdate(
        this.name,
        {
          location: "eastus",
          tags: { purpose: "javascriptsdk-edgeaction-test" },
        },
        { abortSignal: this.signal },
      );
      return;
    }
    throw new Error("Refusing to overwrite an existing generated test resource group.");
  }

  async cleanup(): Promise<void> {
    if (!this.ownsGroup) return;
    await this.groups.beginDeleteAndWait(this.name, {
      updateIntervalInMs: isPlaybackMode() ? 0 : 1000,
      abortSignal: this.signal,
    });
    this.ownsGroup = false;
  }
}
