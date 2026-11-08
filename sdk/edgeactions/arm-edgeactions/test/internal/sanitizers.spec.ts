// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createServer } from "node:http";
import { once } from "node:events";
import { describe, expect, it, vi } from "vitest";
import { Recorder } from "@azure-tools/test-recorder";
import { sanitizers, sanitizedSubscription } from "../utils/sanitizers.js";

describe("Edge Actions recording sanitizers", () => {
  it("preserves async contracts while redacting secrets through real proxy record/playback", async (test) => {
    const proxy = `http://localhost:${process.env.TEST_PROXY_HTTP_PORT ?? 5000}`;
    const subscription = "11111111-2222-3333-4444-555555555555";
    const operation = `https://management.azure.com/subscriptions/${subscription}/resourceGroups/private-group/providers/Microsoft.Cdn/locations/global/operationStatuses/op?api-version=2026-10-01&t=secret-t&c=secret-c&s=secret-s&h=secret-h`;
    const resultUrl = operation.replace("operationStatuses", "operationResults");
    const cleanupToken = Buffer.from(
      JSON.stringify({
        jobId: "private-group",
        jobLocation: "eastus",
        jobStorageAccount: "private-storage",
      }),
    ).toString("base64url");
    const cleanupPath = `/providers/Microsoft.Resources/locations/eastus/operationresults/${cleanupToken}?api-version=2021-04-01`;
    const cleanupUrl = `https://management.azure.com${cleanupPath}`;
    const ownName = "eajavascript0123456789abcdef0123";
    const resourcePrefix = `/subscriptions/${subscription}/resourceGroups/private-group/providers/Microsoft.Cdn`;
    const payload = {
      id: `/subscriptions/${subscription}/resourceGroups/private-group/providers/Microsoft.Cdn/edgeActions/test`,
      name: "test",
      type: "Microsoft.Cdn/edgeActions",
      location: "global",
      status: "Succeeded",
      systemData: { createdBy: "private@example.com", lastModifiedBy: "private@example.com" },
      tenantId: subscription,
      clientId: subscription,
      principalId: subscription,
      access_token: "secret-access",
      refresh_token: "secret-refresh",
      id_token: "secret-id",
      client_secret: "secret-client",
      statusUrl: operation,
      resultUrl,
      cleanupUrl,
      value: [
        {
          id: `${resourcePrefix}/edgeActions/${ownName}`,
          name: ownName,
          type: "Microsoft.Cdn/EdgeActions",
          tags: { purpose: "initial" },
          properties: { provisioningState: "Succeeded", attachments: [] },
        },
        {
          id: `${resourcePrefix}/edgeActions/private-action`,
          name: "private-action",
          type: "Microsoft.Cdn/EdgeActions",
          tags: { purpose: "private-tag" },
          properties: {
            provisioningState: "Succeeded",
            attachments: [
              {
                id: "private-attachment",
                attachedResourceId: `${resourcePrefix}/profiles/private-profile/ruleSets/private-ruleset/rules/private-rule`,
              },
              {
                id: "private-route-attachment",
                attachedResourceId: `${resourcePrefix}/profiles/private-profile/afdEndpoints/private-endpoint/routes/private-route`,
              },
            ],
          },
        },
      ],
    };
    const server = createServer((_request, response) => {
      response.writeHead(200, {
        "content-type": "application/json",
        "azure-asyncoperation": operation,
        location: resultUrl,
        "operation-location": operation,
        "retry-after": "3",
        "set-cookie": "private-cookie",
        "x-ms-correlation-request-id": "private-trace",
        "x-cleanup-location": cleanupUrl,
      });
      response.end(JSON.stringify(payload));
    });
    let recordingId: string | undefined;
    let playbackId: string | undefined;
    async function admin(
      path: string,
      id?: string,
      body?: unknown,
      headers: Record<string, string> = {},
    ) {
      const response = await fetch(`${proxy}${path}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(id ? { "x-recording-id": id } : {}),
          ...headers,
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      expect(response.status, `Test proxy ${path}`).toBe(200);
      return response;
    }
    vi.stubEnv("TEST_MODE", "record");
    try {
      server.listen(0, "127.0.0.1");
      await once(server, "listening");
      const address = server.address();
      if (!address || typeof address === "string") throw new Error("Expected a TCP server.");
      const upstream = `http://127.0.0.1:${address.port}`;
      const start = await admin("/record/start");
      recordingId = start.headers.get("x-recording-id")!;
      expect(recordingId).toBeTruthy();
      await admin("/admin/removeSanitizers", recordingId, {
        Sanitizers: ["AZSDK2003", "AZSDK2030", "AZSDK3430", "AZSDK3493"],
      });
      // Use the recorder's public API to register the exact package configuration.
      const recorder = new Recorder(test);
      recorder.recordingId = recordingId;
      await recorder.addSanitizers(sanitizers);
      const requestPath = `/subscriptions/${subscription}/resourceGroups/private-group/status?api-version=2026-10-01&t=secret-t`;
      const recorded = await fetch(`${proxy}${requestPath}`, {
        headers: {
          "x-recording-id": recordingId,
          "x-recording-mode": "record",
          "x-recording-upstream-base-uri": upstream,
          authorization: "Bearer secret-auth",
          cookie: "private-cookie",
        },
      });
      expect(recorded.status).toBe(200);
      await recorded.text();
      const recordedCleanup = await fetch(`${proxy}${cleanupPath}`, {
        headers: {
          "x-recording-id": recordingId,
          "x-recording-mode": "record",
          "x-recording-upstream-base-uri": upstream,
        },
      });
      expect(recordedCleanup.status).toBe(200);
      await recordedCleanup.text();
      await admin("/record/stop", recordingId, {}, { "x-recording-save": "true" });
      const playback = await admin("/playback/start", recordingId);
      playbackId = playback.headers.get("x-recording-id")!;
      expect(playbackId).toBeTruthy();
      const replayed = await fetch(
        `${proxy}/subscriptions/${sanitizedSubscription}/resourceGroups/edgeactions-test-rg/status?api-version=2026-10-01&t=Sanitized`,
        {
          headers: {
            "x-recording-id": playbackId,
            "x-recording-mode": "playback",
            "x-recording-upstream-base-uri": upstream,
            authorization: "Sanitized",
            cookie: "Sanitized",
          },
        },
      );
      const text = await replayed.text();
      expect(replayed.status, text).toBe(200);
      const all = text + JSON.stringify([...replayed.headers]);
      for (const secret of [
        subscription,
        "private-group",
        "private@example.com",
        "secret-t",
        "secret-c",
        "secret-s",
        "secret-h",
        "secret-access",
        "secret-refresh",
        "secret-id",
        "secret-client",
        "private-cookie",
        "private-trace",
        cleanupToken,
        "private-storage",
        "private-action",
        "private-tag",
        "private-attachment",
        "private-profile",
        "private-ruleset",
        "private-rule",
        "private-route-attachment",
        "private-endpoint",
        "private-route",
      ]) {
        expect(all).not.toContain(secret);
      }
      const body = JSON.parse(text);
      expect(body.name).toBe("test");
      expect(body.status).toBe("Succeeded");
      expect(body.id).toContain(`/subscriptions/${sanitizedSubscription}/`);
      expect(body.value).toHaveLength(2);
      expect(body.value[0]).toEqual({
        ...payload.value[0],
        id: `/subscriptions/${sanitizedSubscription}/resourceGroups/edgeactions-test-rg/providers/Microsoft.Cdn/edgeActions/${ownName}`,
      });
      expect(body.value[1].name).toBe("Sanitized");
      expect(body.value[1].id).toMatch(/\/edgeActions\/Sanitized$/);
      expect(body.value[1].tags).toEqual({ purpose: "Sanitized" });
      expect(body.value[1].properties).toEqual({
        provisioningState: "Succeeded",
        attachments: [
          {
            id: "Sanitized",
            attachedResourceId: `/subscriptions/${sanitizedSubscription}/resourceGroups/edgeactions-test-rg/providers/Microsoft.Cdn/profiles/Sanitized/ruleSets/Sanitized/rules/Sanitized`,
          },
          {
            id: "Sanitized",
            attachedResourceId: `/subscriptions/${sanitizedSubscription}/resourceGroups/edgeactions-test-rg/providers/Microsoft.Cdn/profiles/Sanitized/afdEndpoints/Sanitized/routes/Sanitized`,
          },
        ],
      });
      const sanitizedCleanupPath = cleanupPath.replace(cleanupToken, "Sanitized");
      expect(body.cleanupUrl).toBe(`https://management.azure.com${sanitizedCleanupPath}`);
      expect(replayed.headers.get("x-cleanup-location")).toBe(body.cleanupUrl);
      const replayedCleanup = await fetch(`${proxy}${sanitizedCleanupPath}`, {
        headers: {
          "x-recording-id": playbackId,
          "x-recording-mode": "playback",
          "x-recording-upstream-base-uri": upstream,
        },
      });
      expect(replayedCleanup.status).toBe(200);
      expect(await replayedCleanup.json()).toEqual(body);
      for (const header of ["azure-asyncoperation", "location", "operation-location"]) {
        const url = new URL(replayed.headers.get(header)!);
        expect(url.protocol).toBe("https:");
        expect(url.searchParams.get("api-version")).toBe("2026-10-01");
        for (const parameter of ["t", "c", "s", "h"])
          expect(url.searchParams.get(parameter)).toBe("Sanitized");
      }
    } finally {
      try {
        if (playbackId) {
          await admin("/playback/stop", playbackId, {}, { "x-purge-inmemory-recording": "true" });
        } else if (recordingId) {
          await admin("/record/stop", recordingId, {}, { "x-recording-save": "false" });
        }
      } finally {
        vi.unstubAllEnvs();
        await new Promise<void>((resolve, reject) =>
          server.close((error) => (error ? reject(error) : resolve())),
        );
      }
    }
  });
});
