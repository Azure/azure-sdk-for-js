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
    vi.useFakeTimers({
      toFake: ["Date", "setTimeout", "clearTimeout", "setInterval", "clearInterval"],
    });
    vi.spyOn(Math, "random").mockReturnValue(0);
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

  it.each([
    { random: 0.25, initialDelay: 15_000 },
    { random: 0.75, initialDelay: 45_000 },
  ])(
    "starts one unref'd worker after $initialDelay ms and then polls every 60 seconds",
    async ({ random, initialDelay }) => {
      vi.mocked(Math.random).mockReturnValue(random);
      const retry = vi.spyOn(HttpSender.prototype, "retryPersistedEnvelopes").mockResolvedValue();
      const sender = router();
      await sender.export(groups());
      await sender.export(groups("https://second.test"));
      expect(vi.getTimerCount()).toBe(1);
      expect(sender["retryWorker"]?.hasRef()).toBe(false);

      await vi.advanceTimersByTimeAsync(initialDelay - 1);
      expect(retry).not.toHaveBeenCalled();
      await vi.advanceTimersByTimeAsync(1);
      expect(retry).toHaveBeenCalledTimes(2);
      expect(vi.getTimerCount()).toBe(1);
      expect(sender["retryWorker"]?.hasRef()).toBe(false);

      await vi.advanceTimersByTimeAsync(59_999);
      expect(retry).toHaveBeenCalledTimes(2);
      await vi.advanceTimersByTimeAsync(1);
      expect(retry).toHaveBeenCalledTimes(4);
      expect(vi.getTimerCount()).toBe(1);

      await sender.shutdown();
      expect(vi.getTimerCount()).toBe(0);
      await vi.advanceTimersByTimeAsync(60_000);
      expect(retry).toHaveBeenCalledTimes(4);
    },
  );

  it("cancels the initial worker delay on shutdown without starting the polling interval", async () => {
    vi.mocked(Math.random).mockReturnValue(0.5);
    const retry = vi.spyOn(HttpSender.prototype, "retryPersistedEnvelopes").mockResolvedValue();
    const sender = router();
    await sender.export(groups());
    expect(vi.getTimerCount()).toBe(1);

    await sender.shutdown();
    expect(vi.getTimerCount()).toBe(0);
    await vi.advanceTimersByTimeAsync(120_000);
    expect(retry).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("isolates retries and backoff by endpoint and auth, preserving per-item keys", async () => {
    sendRequest.mockImplementation(async (request) => {
      requests.push(request);
      return requests.length === 1
        ? response(request, 429, { "retry-after": "120" })
        : response(request);
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

  it.each(["delay-seconds", "http-date"])(
    "honors a successful replay's Retry-After using %s",
    async (format) => {
      vi.setSystemTime(new Date("2026-01-01T00:00:00.000Z"));
      const sender = router();
      await sender.export(groups());
      const [routed] = sender["senders"].values();
      const persister = routed["persister"];
      if (!(persister instanceof FileSystemPersist)) {
        throw new Error("Expected real filesystem persistence");
      }
      const first: Envelope[] = [
        { name: "first", time: new Date(0), instrumentationKey: "first-key" },
      ];
      const second: Envelope[] = [
        { name: "second", time: new Date(0), instrumentationKey: "second-key" },
      ];
      expect(await persister.push(first)).toBe(true);
      expect(await persister.push(second)).toBe(true);
      sendRequest.mockImplementationOnce(async (request) => {
        requests.push(request);
        return response(request, 200, {
          "retry-after":
            format === "delay-seconds" ? "120" : new Date(Date.now() + 120_000).toUTCString(),
        });
      });

      vi.setSystemTime(Date.now() + 60_000);
      await routed.retryPersistedEnvelopes();
      expect(requests).toHaveLength(2);
      expect(JSON.parse(String(requests[1].body))[0].iKey).toBe("first-key");
      expect(await readdir(persister["_tempDirectory"])).toHaveLength(1);

      await sender.export(groups("https://second.test", "unaffected-key"));
      expect(requests).toHaveLength(3);
      vi.setSystemTime(Date.now() + 60_000);
      await routed.retryPersistedEnvelopes();
      expect(requests).toHaveLength(3);
      expect(await readdir(persister["_tempDirectory"])).toHaveLength(1);
      vi.setSystemTime(Date.now() + 59_999);
      await routed.retryPersistedEnvelopes();
      expect(requests).toHaveLength(3);

      vi.setSystemTime(Date.now() + 1);
      await routed.retryPersistedEnvelopes();
      expect(requests).toHaveLength(4);
      expect(JSON.parse(String(requests[3].body))[0].iKey).toBe("second-key");
      expect(await readdir(persister["_tempDirectory"])).toHaveLength(0);
    },
  );

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

  it.each(["result", "throw"])(
    "serializes overflow sender lifetimes across concurrent batches after a %s failure",
    async (failure) => {
      const sender = router();
      const batch = (start: number, count: number): RoutingGroups => {
        const result: RoutingGroups = new Map();
        for (let index = start; index < start + count; index++) {
          for (const [key, value] of groups(`https://route-${index}.test`)) {
            result.set(key, value);
          }
        }
        return result;
      };
      await sender.export(batch(0, 64));
      const cached = new Set(sender["senders"].values());
      let active = 0;
      let peak = 0;
      let created = 0;
      let closed = 0;
      const error = new Error("Overflow export failed");
      vi.spyOn(HttpSender.prototype, "exportEnvelopes").mockImplementation(async function () {
        active++;
        created++;
        peak = Math.max(peak, active);
        const first = created === 1;
        await Promise.resolve();
        if (first) {
          if (failure === "throw") {
            throw error;
          }
          return { code: ExportResultCode.FAILED, error };
        }
        return { code: ExportResultCode.SUCCESS };
      });
      const shutdown = HttpSender.prototype.shutdown;
      vi.spyOn(HttpSender.prototype, "shutdown").mockImplementation(async function (
        this: HttpSender,
      ) {
        await Promise.resolve();
        await shutdown.call(this);
        if (!cached.has(this)) {
          active--;
          closed++;
        }
      });

      const results = await Promise.all([
        sender.export(batch(64, 128)),
        sender.export(batch(192, 128)),
      ]);
      expect(results).toEqual([
        { code: ExportResultCode.FAILED, error },
        { code: ExportResultCode.SUCCESS },
      ]);
      expect(peak).toBe(1);
      expect(active).toBe(0);
      expect(created).toBe(256);
      expect(closed).toBe(256);
      expect(sender["senders"].size).toBe(64);
    },
  );

  it("keeps cached routes independent and drains queued overflow routes during shutdown", async () => {
    const sender = router();
    const batch: RoutingGroups = new Map();
    for (let index = 0; index < 64; index++) {
      for (const [key, value] of groups(`https://route-${index}.test`)) {
        batch.set(key, value);
      }
    }
    await sender.export(batch);
    const cached = new Set(sender["senders"].values());
    let release!: () => void;
    const pending = new Promise<void>((resolve) => {
      release = resolve;
    });
    let overflowStarted = 0;
    vi.spyOn(HttpSender.prototype, "exportEnvelopes").mockImplementation(async function (
      this: HttpSender,
    ) {
      if (!cached.has(this)) {
        overflowStarted++;
        await pending;
      }
      return { code: ExportResultCode.SUCCESS };
    });
    const exporting = sender.export(
      new Map([...groups("https://overflow-1.test"), ...groups("https://overflow-2.test")]),
    );
    try {
      await vi.waitFor(() => expect(overflowStarted).toBeGreaterThan(0));
      expect((await sender.export(groups("https://route-0.test"))).code).toBe(
        ExportResultCode.SUCCESS,
      );
      let stopped = false;
      const stopping = sender.shutdown().then(() => {
        stopped = true;
        return;
      });
      expect((await sender.export(groups())).code).toBe(ExportResultCode.FAILED);
      expect(overflowStarted).toBe(1);
      expect(stopped).toBe(false);
      release();
      expect((await exporting).code).toBe(ExportResultCode.SUCCESS);
      await stopping;
      expect(overflowStarted).toBe(2);
      expect(stopped).toBe(true);
      expect(sender["senders"].size).toBe(0);
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      release();
    }
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
    const shifted = await first.shift();
    expect(shifted).toEqual(batch);
    expect(await second.push(batch)).toBe(false);
    if (Array.isArray(shifted)) {
      first.release(shifted);
    }
    expect(await second.push(batch)).toBe(true);
  });

  it("reclaims expired files in unopened partitions before checking the shared quota", async () => {
    const first = storage("a");
    const second = storage("b");
    const batch: Envelope[] = [{ name: "payload", time: new Date(0) }];
    await first.push(batch);
    const shifted = await first.shift();
    if (Array.isArray(shifted)) {
      first.release(shifted);
    }
    await writeFile(join(first["_tempDirectory"], "0.ai.json"), "expired");
    second.maxBytesOnDisk = Buffer.byteLength(JSON.stringify(batch));
    expect(await second.push(batch)).toBe(true);
    expect(await readdir(first["_tempDirectory"])).toEqual([]);
  });

  it("serializes new writes with dequeuing before the replay reservation is recorded", async () => {
    const first = storage("a");
    const second = storage("b");
    const batch: Envelope[] = [{ name: "payload", time: new Date(0) }];
    first.maxBytesOnDisk = second.maxBytesOnDisk = Buffer.byteLength(JSON.stringify(batch));
    expect(await first.push(batch)).toBe(true);

    let dequeued!: () => void;
    let resume!: () => void;
    const ready = new Promise<void>((resolve) => {
      dequeued = resolve;
    });
    const waiting = new Promise<void>((resolve) => {
      resume = resolve;
    });
    const read = first["_getFirstFileOnDisk"].bind(first);
    first["_getFirstFileOnDisk"] = async () => {
      const buffer = await read();
      dequeued();
      await waiting;
      return buffer;
    };
    const shifting = first.shift();
    await ready;
    const competingWrite = second.push(batch);
    resume();
    const shifted = await shifting;
    expect(await competingWrite).toBe(false);
    expect(shifted).toEqual(batch);
    if (Array.isArray(shifted)) {
      expect(await first.restore(shifted)).toBe(true);
    }
  });

  it("charges other in-flight batches while restoring a partial replay", async () => {
    const first = storage("a");
    const second = storage("b");
    const batch: Envelope[] = [
      { name: "first", time: new Date(0) },
      { name: "second", time: new Date(0) },
    ];
    const batchSize = Buffer.byteLength(JSON.stringify(batch));
    first.maxBytesOnDisk = second.maxBytesOnDisk = 2 * batchSize;
    expect(await first.push(batch)).toBe(true);
    expect(await second.push(batch)).toBe(true);
    const original = await first.shift();
    const other = await second.shift();
    expect(original).toEqual(batch);
    expect(other).toEqual(batch);
    if (!Array.isArray(original) || !Array.isArray(other)) {
      throw new Error("Expected both persisted batches");
    }
    expect(await first.restore([original[1]], original)).toBe(true);
    // Releasing an already-restored batch must not consume another batch's reservation.
    first.release(original);
    first.release(original);
    expect(await first.push(batch)).toBe(false);
    expect(await second.restore(other)).toBe(true);
    expect(await first.push(batch)).toBe(false);
    const remaining = await first.shift();
    expect(remaining).toEqual([batch[1]]);
    if (Array.isArray(remaining)) {
      first.release(remaining);
    }
    expect(await first.push(batch)).toBe(true);
  });

  it("does not allow a restore without a reservation to bypass the shared quota", async () => {
    const first = storage("a");
    const second = storage("b");
    const batch: Envelope[] = [{ name: "payload", time: new Date(0) }];
    first.maxBytesOnDisk = second.maxBytesOnDisk = Buffer.byteLength(JSON.stringify(batch));
    expect(await first.push(batch)).toBe(true);
    expect(await second.restore(batch)).toBe(false);
    const original = await first.shift();
    expect(original).toEqual(batch);
    if (!Array.isArray(original)) {
      throw new Error("Expected the persisted batch");
    }
    expect(await first.restore([...original, ...original], original)).toBe(false);
    expect(await second.push(batch)).toBe(false);
    expect(await first.restore(original)).toBe(true);
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
