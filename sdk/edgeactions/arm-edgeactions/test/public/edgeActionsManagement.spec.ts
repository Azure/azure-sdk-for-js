// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { randomUUID } from "node:crypto";
import JSZip from "jszip";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { assertEnvironmentVariable, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { ResourceManagementClient } from "@azure/arm-resources";
import { createTestCredential } from "@azure-tools/test-credential";
import type { OperationState, PollerLike } from "@azure/core-lro";
import { isRestError } from "@azure/core-rest-pipeline";
import type {
  EdgeAction,
  EdgeActionVersion,
  EdgeActionExecutionFilter,
  EdgeActionsManagementClient,
} from "../../src/index.js";
import { createEdgeActionsManagement } from "../../src/api/index.js";
import type { EdgeActionsManagementContext } from "../../src/api/index.js";
import { createClient, startRecorder, testPollingOptions } from "./utils/recordedClient.js";
import { assertSpecIsCurrent, completeLro, responsePolicy } from "../utils/responseSpec.js";
import type { CapturedResponse } from "../utils/responseSpec.js";
import { newResourceGroupName, TestResourceGroup } from "../utils/resourceGroup.js";
import { createDeadline, deploymentTimeoutMs, lifecycleTimeoutMs } from "../utils/testDeadline.js";

const handler = "function handler(event) { return event; }";
const deployedVersions = ["v1", "v2"];
const deploymentLifecycleTimeoutMs = lifecycleTimeoutMs(deployedVersions.length);

describe("Edge Actions recorded lifecycle", () => {
  let recorder: Recorder | undefined;
  let client: EdgeActionsManagementClient;
  let cleanupClient: EdgeActionsManagementClient;
  let context: EdgeActionsManagementContext;
  let responses: CapturedResponse[];
  let resourceGroup: string;
  let name: string;
  let ownsResource: boolean;
  let testResourceGroup: TestResourceGroup | undefined;
  let testSignal: AbortSignal;
  let lifecycleDeadline: ReturnType<typeof createDeadline> | undefined;

  function complete<T>(
    start: () => PollerLike<OperationState<T>, T>,
    signal = testSignal,
  ): Promise<T> {
    return completeLro(context, responses, start, signal);
  }

  function assertResource(
    resource: EdgeAction | EdgeActionVersion | EdgeActionExecutionFilter,
    suffix = "",
  ): void {
    expect(resource.id?.toLowerCase()).toBe(
      `/subscriptions/${assertEnvironmentVariable("SUBSCRIPTION_ID")}/resourceGroups/${resourceGroup}/providers/Microsoft.Cdn/edgeActions/${name}${suffix}`.toLowerCase(),
    );
    expect(resource.name).toBe(suffix ? suffix.split("/").at(-1) : name);
    expect(resource.type?.toLowerCase()).toBe(
      `Microsoft.Cdn/edgeActions${suffix ? `/${suffix.split("/")[1]}` : ""}`.toLowerCase(),
    );
    expect(resource.location).toBe("global");
    expect(resource.properties?.provisioningState).toBe("Succeeded");
  }

  beforeEach(async (test) => {
    recorder = undefined;
    ownsResource = false;
    lifecycleDeadline = createDeadline(
      test.task.timeout,
      "Test lifecycle exceeded its time budget including cleanup.",
    );
    testSignal = AbortSignal.any([test.signal, lifecycleDeadline.signal]);
    testResourceGroup = undefined;
    responses = [];
    assertSpecIsCurrent();
    recorder = new Recorder(test);
    await startRecorder(recorder);
    const useExisting =
      recorder.variable("useExistingResourceGroup", String(Boolean(process.env.RESOURCE_GROUP))) ===
      "true";
    resourceGroup = isPlaybackMode()
      ? "edgeactions-test-rg"
      : useExisting
        ? assertEnvironmentVariable("RESOURCE_GROUP")
        : newResourceGroupName();
    await recorder.addSanitizers({
      generalSanitizers: [{ target: resourceGroup, value: "edgeactions-test-rg" }],
    });
    const resourceClient = new ResourceManagementClient(
      createTestCredential(),
      assertEnvironmentVariable("SUBSCRIPTION_ID"),
      recorder.configureClientOptions({}),
    );
    testResourceGroup = new TestResourceGroup(
      resourceClient.resourceGroups,
      resourceGroup,
      useExisting,
      lifecycleDeadline?.signal,
    );
    await testResourceGroup.create();
    name = recorder.variable(
      "edgeActionName",
      `eajavascript${randomUUID().replaceAll("-", "").slice(0, 20)}`,
    );
    const options = {
      apiVersion: "2026-10-01",
      additionalPolicies: [
        { policy: responsePolicy(responses, testSignal), position: "perCall" as const },
      ],
    };
    client = createClient(recorder, options);
    cleanupClient = createClient(recorder);
    context = createEdgeActionsManagement(
      createTestCredential(),
      assertEnvironmentVariable("SUBSCRIPTION_ID"),
      recorder.configureClientOptions(options),
    );
    await expect(client.edgeActions.get(resourceGroup, name)).rejects.toMatchObject({
      statusCode: 404,
    });
    // Track ownership before PUT so a partially completed creation is also cleaned up.
    ownsResource = true;
    const created = await complete(() =>
      client.edgeActions.create(
        resourceGroup,
        name,
        {
          location: "global",
          sku: { name: "Standard", tier: "Standard" },
          tags: { purpose: "initial", remove: "initial" },
        },
        testPollingOptions,
      ),
    );
    assertResource(created);
    expect(created.sku).toEqual({ name: "Standard", tier: "Standard" });
  }, deploymentLifecycleTimeoutMs);

  afterEach(async () => {
    const errors: unknown[] = [];
    for (const release of [
      async () => {
        if (ownsResource) await cleanup();
      },
      async () => {
        await testResourceGroup?.cleanup();
      },
      async () => {
        await recorder?.stop();
      },
      async () => {
        lifecycleDeadline?.dispose();
      },
    ]) {
      try {
        await release();
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length) throw new AggregateError(errors, "Edge Actions test cleanup failed.");
  }, deploymentLifecycleTimeoutMs);

  async function cleanup(): Promise<void> {
    const cleanupOptions = { ...testPollingOptions, abortSignal: lifecycleDeadline?.signal };
    try {
      await cleanupClient.edgeActions.get(resourceGroup, name, cleanupOptions);
    } catch (error) {
      if (isRestError(error) && error.statusCode === 404) return;
      throw error;
    }
    for await (const filter of cleanupClient.edgeActionExecutionFilters.listByEdgeAction(
      resourceGroup,
      name,
      cleanupOptions,
    )) {
      expect(filter.name).toBeTruthy();
      await cleanupClient.edgeActionExecutionFilters
        .delete(resourceGroup, name, filter.name!, cleanupOptions)
        .pollUntilDone({ abortSignal: lifecycleDeadline?.signal });
    }
    const versions = [];
    for await (const version of cleanupClient.edgeActionVersions.listByEdgeAction(
      resourceGroup,
      name,
      cleanupOptions,
    )) {
      expect(version.properties?.isDefaultVersion).toMatch(/^(True|False)$/);
      versions.push(version);
    }
    // A default version may be deleted only after all non-default versions.
    versions.sort(
      (a, b) =>
        Number(a.properties?.isDefaultVersion === "True") -
        Number(b.properties?.isDefaultVersion === "True"),
    );
    for (const version of versions) {
      expect(version.name).toBeTruthy();
      await cleanupClient.edgeActionVersions
        .delete(resourceGroup, name, version.name!, cleanupOptions)
        .pollUntilDone({ abortSignal: lifecycleDeadline?.signal });
    }
    await cleanupClient.edgeActions
      .delete(resourceGroup, name, cleanupOptions)
      .pollUntilDone({ abortSignal: lifecycleDeadline?.signal });
    await expect(
      cleanupClient.edgeActions.get(resourceGroup, name, cleanupOptions),
    ).rejects.toMatchObject({
      statusCode: 404,
    });
  }

  it("replaces and clears tags without changing SKU or unrelated resources", async () => {
    const before = await client.edgeActions.get(resourceGroup, name);
    for (const list of [
      client.edgeActions.listByResourceGroup(resourceGroup),
      client.edgeActions.listBySubscription(),
    ]) {
      const names = [];
      for await (const page of list.byPage()) names.push(...page.map((item) => item.name));
      expect(names).toContain(name);
    }
    await expect(
      client.edgeActions.update(resourceGroup, name, {}, testPollingOptions).pollUntilDone(),
    ).rejects.toMatchObject({ statusCode: 400 });
    const tagUpdates: Record<string, string>[] = [{ purpose: "updated" }, {}];
    for (const tags of tagUpdates) {
      const updated = await complete(() =>
        client.edgeActions.update(resourceGroup, name, { tags }, testPollingOptions),
      );
      assertResource(updated);
      expect(updated.tags).toEqual(tags);
      expect(updated.sku).toEqual(before.sku);
      expect(await client.edgeActions.get(resourceGroup, name)).toEqual(updated);
    }
    // Raw requests exercise rejected wire values that the public TypeScript models cannot express.
    for (const body of [{ tags: null }, { sku: null }, { sku: before.sku }]) {
      const response = await context
        .pathUnchecked(`${before.id!}?api-version=2026-10-01`)
        .patch({ body });
      expect(response.status).toBe("400");
    }
    expect((await client.edgeActions.get(resourceGroup, name)).tags).toEqual({});
    await complete(() => client.edgeActions.delete(resourceGroup, name, testPollingOptions));
    await expect(client.edgeActions.get(resourceGroup, name)).rejects.toMatchObject({
      statusCode: 404,
    });
  });

  it.each(["file", "zip"] as const)(
    "deploys %s versions, swaps default, and manages execution filters",
    async (deploymentType) => {
      const archive = new JSZip();
      archive.file("handler.js", handler, { date: new Date("1980-01-01T00:00:00Z") });
      const content =
        deploymentType === "file"
          ? Buffer.from(handler).toString("base64")
          : await archive.generateAsync({ type: "base64", compression: "STORE", platform: "DOS" });
      const versions = client.edgeActionVersions;
      for (const version of deployedVersions) {
        const created = await complete(() =>
          versions.create(
            resourceGroup,
            name,
            version,
            {
              location: "global",
              properties: { deploymentType, isDefaultVersion: "False" },
            },
            testPollingOptions,
          ),
        );
        assertResource(created, `/versions/${version}`);
        expect(created.properties?.isDefaultVersion).toBe(version === "v1" ? "True" : "False");
        const deadline = createDeadline(
          deploymentTimeoutMs,
          "deployVersionCode exceeded 40 minutes.",
        );
        const deploymentSignal = AbortSignal.any([testSignal, deadline.signal]);
        let deployed: EdgeActionVersion;
        try {
          deployed = await complete(
            () =>
              versions.deployVersionCode(
                resourceGroup,
                name,
                version,
                {
                  name: version,
                  content,
                },
                { ...testPollingOptions, abortSignal: deploymentSignal },
              ),
            deploymentSignal,
          );
        } finally {
          deadline.dispose();
        }
        assertResource(deployed, `/versions/${version}`);
        expect(deployed.properties?.validationStatus).toBe("Succeeded");
        expect(deployed.properties?.deploymentType).toBe(deploymentType);
        expect(await versions.get(resourceGroup, name, version)).toEqual(deployed);
      }
      const first = await versions.get(resourceGroup, name, "v1");
      const second = await versions.get(resourceGroup, name, "v2");
      const listed = [];
      for await (const version of versions.listByEdgeAction(resourceGroup, name))
        listed.push(version.name);
      expect(listed.sort()).toEqual(["v1", "v2"]);
      const code = await complete(() =>
        versions.getVersionCode(resourceGroup, name, "v1", testPollingOptions),
      );
      expect(code.name).toBeTruthy();
      expect(code.content).toBeTruthy();
      const bytes = Buffer.from(code.content, "base64");
      if (bytes.subarray(0, 2).toString() === "PK") {
        const downloaded = await JSZip.loadAsync(bytes);
        const contents = await Promise.all(
          Object.values(downloaded.files)
            .filter((file) => !file.dir)
            .map((file) => file.async("string")),
        );
        expect(contents).toContain(handler);
      } else {
        expect(bytes.toString()).toBe(handler);
      }
      const tagUpdates: Record<string, string>[] = [{ purpose: "updated" }, {}];
      for (const tags of tagUpdates) {
        const updated = await complete(() =>
          versions.update(resourceGroup, name, "v1", { tags }, testPollingOptions),
        );
        assertResource(updated, "/versions/v1");
        expect(updated.tags).toEqual(tags);
        expect(updated.properties?.deploymentType).toBe(deploymentType);
        expect(updated.properties?.isDefaultVersion).toBe("True");
        expect(await versions.get(resourceGroup, name, "v1")).toEqual(updated);
      }
      for (const properties of [
        { isDefaultVersion: "False" },
        { deploymentType: deploymentType === "file" ? "zip" : "file" },
      ]) {
        expect(
          (
            await context
              .pathUnchecked(`${first.id!}?api-version=2026-10-01`)
              .patch({ body: { properties } })
          ).status,
        ).toBe("400");
      }
      expect(
        await complete(() => versions.swapDefault(resourceGroup, name, "v2", testPollingOptions)),
      ).toBeUndefined();
      expect((await versions.get(resourceGroup, name, "v1")).properties?.isDefaultVersion).toBe(
        "False",
      );
      expect((await versions.get(resourceGroup, name, "v2")).properties?.isDefaultVersion).toBe(
        "True",
      );

      const filters = client.edgeActionExecutionFilters;
      const filterName = "sdkfilter";
      const created = await complete(() =>
        filters.create(
          resourceGroup,
          name,
          filterName,
          {
            location: "global",
            properties: {
              versionId: first.id!,
              executionFilterIdentifierHeaderName: "x-sdk-test",
              executionFilterIdentifierHeaderValue: "initial",
            },
          },
          testPollingOptions,
        ),
      );
      assertResource(created, `/executionFilters/${filterName}`);
      expect(await filters.get(resourceGroup, name, filterName)).toEqual(created);
      const properties = {
        versionId: second.id,
        executionFilterIdentifierHeaderName: "x-sdk-test-updated",
        executionFilterIdentifierHeaderValue: "updated",
      };
      const updated = await complete(() =>
        filters.update(
          resourceGroup,
          name,
          filterName,
          {
            tags: { purpose: "updated" },
            properties,
          },
          testPollingOptions,
        ),
      );
      assertResource(updated, `/executionFilters/${filterName}`);
      expect(updated.properties).toMatchObject(properties);
      expect(updated.tags).toEqual({ purpose: "updated" });
      expect(await filters.get(resourceGroup, name, filterName)).toEqual(updated);
      const filterNames = [];
      for await (const page of filters.listByEdgeAction(resourceGroup, name).byPage()) {
        filterNames.push(...page.map((filter) => filter.name));
      }
      expect(filterNames).toEqual([filterName]);
      await complete(() => filters.delete(resourceGroup, name, filterName, testPollingOptions));
      await expect(filters.get(resourceGroup, name, filterName)).rejects.toMatchObject({
        statusCode: 404,
      });
      const remaining = [];
      for await (const filter of filters.listByEdgeAction(resourceGroup, name))
        remaining.push(filter);
      expect(remaining).toEqual([]);
      for (const version of deployedVersions) {
        await complete(() => versions.delete(resourceGroup, name, version, testPollingOptions));
        await expect(versions.get(resourceGroup, name, version)).rejects.toMatchObject({
          statusCode: 404,
        });
      }
      const remainingVersions = [];
      for await (const version of versions.listByEdgeAction(resourceGroup, name))
        remainingVersions.push(version);
      expect(remainingVersions).toEqual([]);
    },
    deploymentLifecycleTimeoutMs,
  );
});
