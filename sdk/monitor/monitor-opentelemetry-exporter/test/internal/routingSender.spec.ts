// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ExportResultCode } from "@opentelemetry/core";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import "../../src/platform/nodejs/index.js";
import { RoutingSender } from "../../src/platform/nodejs/routingSender.js";
import { HttpSender } from "../../src/platform/nodejs/httpSender.js";
import {
  FileSystemPersist,
  getStorageDirectory,
} from "../../src/platform/nodejs/persist/fileSystemPersist.js";
import { FileAccessControl } from "../../src/platform/nodejs/persist/fileAccessControl.js";
import { ConfigurationManager } from "../../src/_configuration/configurationManager.js";
import { makeOneSettingsRequest } from "../../src/_configuration/utils.js";
import { StatsbeatManager } from "../../src/export/statsbeat/statsbeatManager.js";
import type { AzureMonitorExporterOptions } from "../../src/config.js";
import type { TelemetryItem as Envelope } from "../../src/generated/index.js";
import type { RoutingGroups } from "../../src/utils/routing.js";
import { addToRoutingGroups, getTelemetryRoute } from "../../src/utils/routing.js";

vi.mock("../../src/_configuration/utils.js", () => ({ makeOneSettingsRequest: vi.fn() }));

function groups(endpoint = "https://first.test", key = "tenant-key", auth = ""): RoutingGroups {
  const result: RoutingGroups = new Map();
  const route = getTelemetryRoute({
    "microsoft.instrumentation_key": key,
    "microsoft.ingestion_endpoint": endpoint,
    "microsoft.ingestion_auth": auth,
  })!;
  addToRoutingGroups(result, route, [{ name: "test", time: new Date(0) }]);
  return result;
}

describe("routed senders and persistence", () => {
  let directory: string;
  let routers: RoutingSender[];
  let persisters: FileSystemPersist[];
  let requests: PipelineRequest[];
  let sendRequest: ReturnType<typeof vi.fn<HttpClient["sendRequest"]>>;
  let protection: boolean;
  const configuration = ConfigurationManager.getInstance();

  beforeEach(async () => {
    directory = await mkdtemp(join(tmpdir(), "azmon-routes-"));
    routers = [];
    persisters = [];
    requests = [];
    configuration.reset();
    vi.mocked(makeOneSettingsRequest).mockReset();
    protection = FileAccessControl.OS_PROVIDES_FILE_PROTECTION;
    vi.spyOn(FileAccessControl, "checkFileProtection").mockImplementation(() => {});
    FileAccessControl.OS_PROVIDES_FILE_PROTECTION = true;
    vi.useFakeTimers({ toFake: ["Date", "setInterval", "clearInterval"] });
    sendRequest = vi.fn<HttpClient["sendRequest"]>(async (request) => {
      requests.push(request);
      return response(request);
    });
  });

  afterEach(async () => {
    await Promise.all(routers.map((sender) => sender.shutdown()));
    persisters.forEach((persister) => persister.shutdown());
    configuration.reset();
    vi.useRealTimers();
    vi.restoreAllMocks();
    FileAccessControl.OS_PROVIDES_FILE_PROTECTION = protection;
    await rm(directory, { recursive: true, force: true });
  });

  function response(request: PipelineRequest, status = 200, headers = {}): PipelineResponse {
    return {
      request,
      status,
      headers: createHttpHeaders(headers),
      bodyAsText: JSON.stringify({
        itemsReceived: 1,
        itemsAccepted: status === 200 ? 1 : 0,
        errors: [],
      }),
    };
  }

  function router(options: AzureMonitorExporterOptions = {}, hostKey = ""): RoutingSender {
    const sender = new RoutingSender(
      {
        storageDirectory: directory,
        httpClient: { sendRequest },
        retryOptions: { maxRetries: 0 },
        ...options,
      },
      hostKey,
    );
    routers.push(sender);
    return sender;
  }

  function storage(name: string): FileSystemPersist {
    const persister = new FileSystemPersist("", {}, undefined, undefined, {
      root: join(directory, "routes"),
      name: name.repeat(64),
    });
    persisters.push(persister);
    return persister;
  }

  async function publish(enabled: boolean): Promise<void> {
    const result = {
      hasException: false,
      statusCode: 200,
      refreshIntervalMs: 3600000,
      settings: {},
    };
    vi.mocked(makeOneSettingsRequest)
      .mockResolvedValueOnce({ ...result, etag: '"test"' })
      .mockResolvedValueOnce({
        ...result,
        settings: {
          FEATURE_LOCAL_STORAGE: JSON.stringify({ default: enabled ? "enabled" : "disabled" }),
        },
      });
    await configuration.getConfigurationAndRefreshInterval();
  }

  it("isolates retries and backoff by endpoint and auth, preserving per-item keys", async () => {
    sendRequest.mockImplementation(async (request) => {
      requests.push(request);
      return response(request, requests.length === 1 ? 429 : 200, { "retry-after": "120" });
    });
    const sender = router({
      credential: {
        getToken: async () => ({ token: "test", expiresOnTimestamp: Date.now() + 3600000 }),
      },
    });
    expect((await sender.export(groups())).code).toBe(ExportResultCode.SUCCESS);
    await sender.export(groups("https://first.test", "queued-key"));
    expect(requests).toHaveLength(1);
    await sender.export(groups("https://second.test", "second-key"));
    await sender.export(groups("https://first.test", "aad-key", "aad"));
    expect(requests).toHaveLength(3);
    await vi.advanceTimersByTimeAsync(60_000);
    expect(requests).toHaveLength(3);
    await vi.advanceTimersByTimeAsync(60_000);
    await vi.waitFor(() => expect(requests).toHaveLength(5));
    const retried = requests.slice(3).flatMap((request) => JSON.parse(String(request.body)));
    expect(retried.map((item) => item.iKey)).toEqual(["tenant-key", "queued-key"]);
    expect(
      requests.slice(3).every((request) => request.url === "https://first.test/v2.1/track"),
    ).toBe(true);
    expect(requests.slice(3).every((request) => !request.headers.has("authorization"))).toBe(true);
    expect(sender["senders"].size).toBe(3);
    expect(vi.getTimerCount()).toBe(1);
  });

  it("reopens only the matching destination partition after restart", async () => {
    sendRequest.mockImplementation(async (request) => {
      requests.push(request);
      return response(request, 503);
    });
    const first = router();
    await first.export(groups("https://first.test", "original-key"));
    await first.shutdown();
    requests = [];
    sendRequest.mockImplementation(async (request) => {
      requests.push(request);
      return response(request);
    });
    const second = router();
    await second.export(groups("https://other.test", "other-key"));
    await vi.advanceTimersByTimeAsync(60_000);
    expect(requests).toHaveLength(1);
    await second.export(groups("https://FIRST.test:443/", "new-key"));
    await vi.advanceTimersByTimeAsync(60_000);
    await vi.waitFor(() => expect(requests).toHaveLength(3));
    expect(JSON.parse(String(requests[2].body))[0].iKey).toBe("original-key");
  });

  it("persists only retriable envelopes in a partial response", async () => {
    sendRequest.mockImplementationOnce(async (request) => ({
      ...response(request, 206),
      bodyAsText: JSON.stringify({
        itemsReceived: 3,
        itemsAccepted: 1,
        errors: [
          { index: 1, statusCode: 503, message: "retry" },
          { index: 2, statusCode: 400, message: "drop" },
        ],
      }),
    }));
    const sender = router();
    const batch = groups();
    const group = [...batch.values()][0];
    group.envelopes.push(
      { name: "retry", time: new Date(0), instrumentationKey: "retry-key" },
      { name: "drop", time: new Date(0), instrumentationKey: "drop-key" },
    );
    await sender.export(batch);
    await vi.advanceTimersByTimeAsync(60_000);
    await vi.waitFor(() => expect(requests).toHaveLength(1));
    expect(JSON.parse(String(requests[0].body)).map((item: { iKey: string }) => item.iKey)).toEqual(
      ["retry-key"],
    );
  });

  it("keeps routed failures and redirects out of host Statsbeat", async () => {
    const stats = StatsbeatManager.getInstance();
    const update = vi.spyOn(stats, "updateEndpoint");
    const shutdown = vi.spyOn(stats, "shutdown");
    const count = vi.spyOn(stats, "countSuccess");
    sendRequest.mockImplementationOnce(async (request) =>
      response(request, 307, { location: "https://first.test/new" }),
    );
    const sender = router();
    await sender.export(groups());
    expect(update).not.toHaveBeenCalled();
    expect(count).not.toHaveBeenCalled();
    sendRequest.mockImplementationOnce(async (request) => ({
      ...response(request, 400),
      bodyAsText: '{"error":{"message":"Invalid instrumentation key"}}',
    }));
    expect((await sender.export(groups())).code).toBe(ExportResultCode.FAILED);
    expect(shutdown).not.toHaveBeenCalled();
  });

  it("caps cached destinations at 64 and closes temporary senders", async () => {
    const shutdown = vi.spyOn(HttpSender.prototype, "shutdown");
    const sender = router();
    const batch: RoutingGroups = new Map();
    for (let index = 0; index < 65; index++) {
      for (const [key, value] of groups(`https://route-${index}.test`)) {
        batch.set(key, value);
      }
    }
    expect((await sender.export(batch)).code).toBe(ExportResultCode.SUCCESS);
    expect(sender["senders"].size).toBe(64);
    expect(shutdown).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(1);
    sendRequest.mockImplementationOnce(async (request) => response(request, 503));
    expect((await sender.export(groups("https://route-64.test"))).code).toBe(
      ExportResultCode.FAILED,
    );
    expect(shutdown).toHaveBeenCalledTimes(2);
    expect(sender["senders"].size).toBe(64);
    await sender.shutdown();
    expect(shutdown).toHaveBeenCalledTimes(66);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("never persists to or replays from host storage", async () => {
    const hostKey = "host-key";
    const host = new FileSystemPersist(hostKey, { storageDirectory: directory });
    persisters.push(host);
    await host.push([{ name: "host", time: new Date(0), instrumentationKey: hostKey }]);
    const sender = router({}, hostKey);
    await sender.export(groups());
    await vi.advanceTimersByTimeAsync(60_000);
    expect(requests).toHaveLength(1);
    expect(await readdir(getStorageDirectory(hostKey, directory))).toHaveLength(1);
    const [routed] = sender["senders"].values();
    expect(routed["persister"]).not.toBe(host);
  });

  it.each([false, true])(
    "honors remote storage control when opened disabled=%s",
    async (initiallyDisabled) => {
      if (initiallyDisabled) {
        await publish(false);
      }
      const sender = router();
      sendRequest.mockImplementationOnce(async (request) => response(request, 503));
      const result = await sender.export(groups());
      expect(result.code).toBe(
        initiallyDisabled ? ExportResultCode.FAILED : ExportResultCode.SUCCESS,
      );
      await publish(false);
      await vi.advanceTimersByTimeAsync(120_000);
      expect(requests).toHaveLength(0);
      await publish(true);
      await vi.advanceTimersByTimeAsync(60_000);
      if (initiallyDisabled) {
        sendRequest.mockImplementationOnce(async (request) => response(request, 503));
        expect((await sender.export(groups())).code).toBe(ExportResultCode.SUCCESS);
        await vi.advanceTimersByTimeAsync(60_000);
      }
      await vi.waitFor(() => expect(requests).toHaveLength(1));
    },
  );

  it("does not back off or create a worker when offline storage is unavailable", async () => {
    FileAccessControl.OS_PROVIDES_FILE_PROTECTION = false;
    sendRequest.mockImplementation(async (request) => {
      requests.push(request);
      return response(request, 503);
    });
    const sender = router();
    expect((await sender.export(groups())).code).toBe(ExportResultCode.FAILED);
    expect((await sender.export(groups())).code).toBe(ExportResultCode.FAILED);
    expect(requests).toHaveLength(2);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("honors local storage opt-out even when remotely enabled", async () => {
    await publish(true);
    sendRequest.mockImplementationOnce(async (request) => response(request, 429));
    const sender = router({ disableOfflineStorage: true });
    expect((await sender.export(groups())).code).toBe(ExportResultCode.FAILED);
    expect(vi.getTimerCount()).toBe(0);
    expect(await readdir(directory)).toEqual([]);
  });

  it("shares the storage quota across concurrent partition writes", async () => {
    const first = storage("a");
    const second = storage("b");
    const batch: Envelope[] = [{ name: "payload", time: new Date(0) }];
    first.maxBytesOnDisk = second.maxBytesOnDisk = Buffer.byteLength(JSON.stringify(batch));
    expect(await Promise.all([first.push(batch), second.push(batch)])).toEqual([true, false]);
    expect(await first.shift()).toEqual(batch);
    expect(await second.push(batch)).toBe(true);
  });

  it("reclaims expired files in unopened partitions before checking the shared quota", async () => {
    const first = storage("a");
    const second = storage("b");
    const batch: Envelope[] = [{ name: "payload", time: new Date(0) }];
    await first.push(batch);
    await first.shift();
    await writeFile(join(first["_tempDirectory"], "0.ai.json"), "expired");
    second.maxBytesOnDisk = Buffer.byteLength(JSON.stringify(batch));
    expect(await second.push(batch)).toBe(true);
    expect(await readdir(first["_tempDirectory"])).toEqual([]);
  });

  it("waits for active exports and rejects new work during shutdown", async () => {
    let complete!: (response: PipelineResponse) => void;
    let request!: PipelineRequest;
    sendRequest.mockImplementationOnce((value) => {
      request = value;
      return new Promise((resolve) => {
        complete = resolve;
      });
    });
    const sender = router();
    const exporting = sender.export(groups());
    await vi.waitFor(() => expect(complete).toBeDefined());
    let stopped = false;
    const stopping = sender.shutdown().then(() => {
      stopped = true;
      return;
    });
    expect((await sender.export(groups())).code).toBe(ExportResultCode.FAILED);
    expect(stopped).toBe(false);
    complete(response(request));
    await exporting;
    await stopping;
    expect(stopped).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
    expect(sender["senders"].size).toBe(0);
  });
});
