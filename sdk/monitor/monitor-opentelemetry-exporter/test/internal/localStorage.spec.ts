// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { diag } from "@opentelemetry/api";
import { ExportResultCode } from "@opentelemetry/core";
import { RestError, createHttpHeaders } from "@azure/core-rest-pipeline";
import "../../src/platform/nodejs/index.js";
import { BaseSender } from "../../src/platform/nodejs/baseSender.js";
import { ConfigurationManager } from "../../src/_configuration/configurationManager.js";
import { ConfigurationProfile } from "../../src/_configuration/configurationProfile.js";
import { makeOneSettingsRequest } from "../../src/_configuration/utils.js";
import { FileSystemPersist } from "../../src/platform/nodejs/persist/fileSystemPersist.js";
import { FileAccessControl } from "../../src/platform/nodejs/persist/fileAccessControl.js";
import * as helpers from "../../src/platform/nodejs/persist/fileSystemHelpers.js";
import type { SenderResult } from "../../src/types.js";
import type { AzureMonitorExporterOptions } from "../../src/config.js";
import type { TelemetryItem as Envelope } from "../../src/generated/index.js";
import { DropCode } from "../../src/export/statsbeat/types.js";

vi.mock("../../src/_configuration/utils.js", () => ({ makeOneSettingsRequest: vi.fn() }));

const enabled = { FEATURE_LOCAL_STORAGE: '{"default":"enabled"}' };
const disabled = { FEATURE_LOCAL_STORAGE: '{"default":"disabled"}' };
const batch: Envelope[] = [{ name: "test", time: new Date(0) }];
const configuration = ConfigurationManager.getInstance();

class StorageSender extends BaseSender {
  public send = vi
    .fn<() => Promise<SenderResult>>()
    .mockResolvedValue({ statusCode: 200, result: "" });
  public handlePermanentRedirect(): boolean {
    return true;
  }
  protected getStartupReplayDelayMs(): number {
    return 1000;
  }
  protected getReplayBatchDelayMs(): number {
    return 200;
  }
}

function deferred<T>(): {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (error: Error) => void;
} {
  let complete!: (value: T) => void;
  let fail!: (error: Error) => void;
  const promise = new Promise<T>((resolve, reject) => {
    complete = resolve;
    fail = reject;
  });
  return { promise, resolve: complete, reject: fail };
}

describe("OneSettings local storage", () => {
  let directory: string;
  let senders: StorageSender[];
  let persisters: FileSystemPersist[];
  let fileProtection: boolean;

  beforeEach(async () => {
    directory = await mkdtemp(join(tmpdir(), "azmon-storage-toggle-"));
    senders = [];
    persisters = [];
    configuration.reset();
    ConfigurationProfile.getInstance().reset();
    vi.mocked(makeOneSettingsRequest).mockReset();
    vi.spyOn(FileAccessControl, "checkFileProtection").mockImplementation(() => {});
    fileProtection = FileAccessControl.OS_PROVIDES_FILE_PROTECTION;
    FileAccessControl.OS_PROVIDES_FILE_PROTECTION = true;
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
  });

  afterEach(async () => {
    configuration.reset();
    await Promise.all(senders.map((sender) => sender.shutdown()));
    for (const persister of persisters) {
      persister.shutdown();
    }
    vi.useRealTimers();
    vi.restoreAllMocks();
    FileAccessControl.OS_PROVIDES_FILE_PROTECTION = fileProtection;
    await rm(directory, { recursive: true, force: true });
  });

  function createSender(
    options: AzureMonitorExporterOptions = {},
    isStatsbeatSender = false,
  ): StorageSender {
    const sender = new StorageSender({
      instrumentationKey: "00000000-0000-4000-8000-000000000001",
      endpointUrl: "https://example.test",
      trackStatsbeat: false,
      isStatsbeatSender,
      exporterOptions: { storageDirectory: directory, ...options },
    });
    senders.push(sender);
    return sender;
  }

  function createPersister(
    active: () => boolean,
    options: AzureMonitorExporterOptions = {},
  ): FileSystemPersist {
    const persister = new FileSystemPersist(
      "storage-test",
      { storageDirectory: directory, ...options },
      undefined,
      active,
    );
    persisters.push(persister);
    return persister;
  }

  async function publish(settings: Record<string, unknown>): Promise<void> {
    const response = {
      hasException: false,
      statusCode: 200,
      refreshIntervalMs: 3600000,
      settings: {},
    };
    vi.mocked(makeOneSettingsRequest)
      .mockResolvedValueOnce({ ...response, etag: '"test"' })
      .mockResolvedValueOnce({ ...response, settings });
    await configuration.getConfigurationAndRefreshInterval();
  }

  it("applies cached disable to late senders, including SDK Stats senders", async () => {
    await publish(disabled);
    for (const stats of [false, true]) {
      const sender = createSender({}, stats);
      expect(sender["storageEnabled"]).toBe(false);
      expect(sender["startupReplayTimer"]).toBeNull();
      expect(await sender["persister"].push(batch)).toBe(false);
    }
    expect(await readdir(directory)).toEqual([]);
  });

  it("never overrides an explicit local opt-out or starts replay for it", async () => {
    const sender = createSender({ disableOfflineStorage: true });
    await publish(disabled);
    await publish(enabled);
    expect(sender["storageEnabled"]).toBe(false);
    expect(sender["startupReplayTimer"]).toBeNull();
    expect(configuration["callbacks"]).toHaveLength(0);
    expect(await readdir(directory)).toEqual([]);
  });

  it("preserves state silently for missing settings and logs invalid values", async () => {
    const sender = createSender();
    const debug = vi.spyOn(diag, "debug");
    await sender["storageCallback"]({});
    expect(sender["storageEnabled"]).toBe(true);
    await sender["storageCallback"](disabled);
    await sender["storageCallback"]({ other: "setting" });
    expect(sender["storageEnabled"]).toBe(false);
    expect(debug).not.toHaveBeenCalled();
    await sender["storageCallback"]({ FEATURE_LOCAL_STORAGE: "invalid" });
    expect(sender["storageEnabled"]).toBe(false);
    expect(debug).toHaveBeenCalledWith("Ignoring invalid OneSettings local storage setting.");
  });

  it("evaluates targeted overrides using the SDK profile", async () => {
    ConfigurationProfile.getInstance().fill({ os: "linux", component: "ext", version: "1.0.0" });
    const sender = createSender();
    await publish({
      FEATURE_LOCAL_STORAGE: JSON.stringify({
        default: "enabled",
        override: [{ os: "linux", component: "ext", ver: "1.0.0" }],
      }),
    });
    expect(sender["storageEnabled"]).toBe(false);
  });

  it("preserves files during a pause and replays them once after re-enable", async () => {
    const sender = createSender();
    await sender["persister"].push(batch);
    await sender["storageCallback"](disabled);
    await vi.advanceTimersByTimeAsync(10000);
    expect(sender.send).not.toHaveBeenCalled();
    expect(await sender["persister"].shift()).toBeNull();

    await sender["storageCallback"](enabled);
    await sender["storageCallback"](enabled);
    await vi.advanceTimersByTimeAsync(999);
    expect(sender.send).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    await Promise.all([...sender["replayOperations"]]);
    expect(sender.send).toHaveBeenCalledOnce();
    expect(await sender["persister"].shift()).toBeNull();
  });

  it("continues normal sends while rejecting new persistence during a pause", async () => {
    const sender = createSender();
    await sender["storageCallback"](disabled);
    expect((await sender.exportEnvelopes(batch)).code).toBe(ExportResultCode.SUCCESS);
    sender.send.mockResolvedValueOnce({ statusCode: 503, result: "" });
    expect((await sender.exportEnvelopes(batch)).code).toBe(ExportResultCode.FAILED);
    expect(sender["retryTimer"]).toBeNull();
    expect(await readdir(directory)).toEqual([]);
  });

  it("counts new paused writes as storage-disabled drops", async () => {
    const metrics = { countDroppedItems: vi.fn() };
    const persister = new FileSystemPersist(
      "stats-test",
      { storageDirectory: directory },
      () => metrics,
      () => false,
    );
    persisters.push(persister);
    await persister.push(batch);
    expect(metrics.countDroppedItems).toHaveBeenCalledExactlyOnceWith(
      batch,
      DropCode.CLIENT_STORAGE_DISABLED,
    );
  });

  it("restores a destructively shifted batch when disable wins the race", async () => {
    const sender = createSender();
    const pending = deferred<unknown[]>();
    vi.spyOn(sender["persister"], "shift").mockReturnValueOnce(pending.promise);
    const replay = sender["sendFirstPersistedFile"]();
    await sender["storageCallback"](disabled);
    pending.resolve(batch);
    await replay;
    expect(sender.send).not.toHaveBeenCalled();
    expect(await sender["persister"].shift()).toBeNull();
    await sender["storageCallback"](enabled);
    expect(await sender["persister"].shift()).toEqual(JSON.parse(JSON.stringify(batch)));
  });

  it("waits for an old replay before restarting after rapid toggles", async () => {
    const sender = createSender();
    const pending = deferred<unknown[]>();
    vi.spyOn(sender["persister"], "shift").mockReturnValueOnce(pending.promise);
    const replay = sender["sendFirstPersistedFile"]();
    await sender["storageCallback"](disabled);
    const restarting = sender["storageCallback"](enabled);
    expect(sender["startupReplayTimer"]).toBeNull();
    pending.resolve(batch);
    await Promise.all([replay, restarting]);
    expect(sender.send).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1000);
    await Promise.all([...sender["replayOperations"]]);
    expect(sender.send).toHaveBeenCalledOnce();
  });

  it("does not restart when disabled again while a prior replay is draining", async () => {
    const sender = createSender();
    const pending = deferred<unknown[]>();
    vi.spyOn(sender["persister"], "shift").mockReturnValueOnce(pending.promise);
    const replay = sender["sendFirstPersistedFile"]();
    await sender["storageCallback"](disabled);
    const restarting = sender["storageCallback"](enabled);
    await sender["storageCallback"](disabled);
    pending.resolve(batch);
    await Promise.all([replay, restarting]);
    await vi.advanceTimersByTimeAsync(10000);
    expect(sender["startupReplayTimer"]).toBeNull();
    expect(sender.send).not.toHaveBeenCalled();
  });

  it("preserves an in-flight replay retry while pausing subsequent batches", async () => {
    const sender = createSender();
    await sender["persister"].push(batch);
    const sending = deferred<void>();
    const result = deferred<SenderResult>();
    sender.send.mockImplementationOnce(() => {
      sending.resolve();
      return result.promise;
    });
    const replay = sender["sendAllPersistedFiles"]();
    await sending.promise;
    await sender["storageCallback"](disabled);
    result.resolve({ statusCode: 503, result: "", retryAfterMs: 5000 });
    await replay;
    expect(sender.send).toHaveBeenCalledOnce();
    await sender["storageCallback"](enabled);
    await vi.advanceTimersByTimeAsync(4999);
    expect(sender.send).toHaveBeenCalledOnce();
    await vi.advanceTimersByTimeAsync(1);
    await Promise.all([...sender["replayOperations"]]);
    expect(sender.send).toHaveBeenCalledTimes(2);
  });

  it("restores replay without following a redirect received while paused", async () => {
    const sender = createSender();
    await sender["persister"].push(batch);
    const sending = deferred<void>();
    const result = deferred<SenderResult>();
    sender.send.mockImplementationOnce(() => {
      sending.resolve();
      return result.promise;
    });
    const replay = sender["sendFirstPersistedFile"]();
    await sending.promise;
    await sender["storageCallback"](disabled);
    const error = new RestError("redirect", { statusCode: 307 });
    Object.assign(error, {
      response: { headers: createHttpHeaders({ location: "https://example.test/next" }) },
    });
    sender.send.mockReset().mockResolvedValue({ statusCode: 200, result: "" });
    result.reject(error);
    await replay;
    expect(sender.send).not.toHaveBeenCalled();
    await sender["storageCallback"](enabled);
    expect(await sender["persister"].shift()).toEqual(JSON.parse(JSON.stringify(batch)));
  });

  it("cancels retry timers and honors their deadline when re-enabled", async () => {
    const sender = createSender();
    sender["scheduleRetryTimer"](10000);
    await sender["storageCallback"](disabled);
    expect(sender["retryTimer"]).toBeNull();
    expect(sender["startupReplayTimer"]).toBeNull();
    await sender["storageCallback"](enabled);
    const shift = vi.spyOn(sender["persister"], "shift");
    await vi.advanceTimersByTimeAsync(9999);
    expect(shift).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    await Promise.all([...sender["replayOperations"]]);
    expect(shift).toHaveBeenCalledOnce();
  });

  it("unregisters shutdown senders and cancels their maintenance timer", async () => {
    const sender = createSender();
    expect(configuration["callbacks"]).toHaveLength(1);
    await sender.shutdown();
    expect(configuration["callbacks"]).toHaveLength(0);
    await publish(disabled);
    await publish(enabled);
    await vi.advanceTimersByTimeAsync(3600000);
    expect(sender["startupReplayTimer"]).toBeNull();
    expect(sender.send).not.toHaveBeenCalled();
  });

  it("cancels cleanup immediately while shutdown waits for an in-flight replay", async () => {
    const sender = createSender();
    await sender["persister"].push(batch);
    const sending = deferred<void>();
    const result = deferred<SenderResult>();
    sender.send.mockImplementationOnce(() => {
      sending.resolve();
      return result.promise;
    });
    const replay = sender["sendFirstPersistedFile"]();
    await sending.promise;
    const closing = sender.shutdown();
    try {
      expect(vi.getTimerCount()).toBe(0);
      await vi.advanceTimersByTimeAsync(3600000);
    } finally {
      result.reject(new RestError("Connection reset", { code: "ECONNRESET" }));
      await Promise.all([replay, closing]);
    }

    expect(await sender["persister"].shift()).toEqual(JSON.parse(JSON.stringify(batch)));
  });

  it("stops a pending write before creating a file if disabled during directory setup", async () => {
    let active = true;
    const persister = createPersister(() => active);
    const setup = deferred<void>();
    const original = helpers.confirmDirExists;
    vi.spyOn(helpers, "confirmDirExists").mockImplementationOnce(async (location) => {
      await original(location);
      await setup.promise;
    });
    const write = persister.push(batch);
    active = false;
    setup.resolve();
    expect(await write).toBe(false);
    active = true;
    expect(await persister.shift()).toBeNull();
  });

  it("leaves a file in place when disabled between reading and unlinking", async () => {
    const active = vi.fn(() => true);
    const persister = createPersister(active);
    await persister.push(batch);
    active.mockReturnValueOnce(true).mockReturnValue(false);
    expect(await persister.shift()).toBeNull();
    active.mockReturnValue(true);
    expect(await persister.shift()).toEqual(JSON.parse(JSON.stringify(batch)));
  });

  it("keeps retention cleanup available while paused", async () => {
    let active = true;
    const persister = createPersister(() => active);
    await persister.push(batch);
    active = false;
    vi.setSystemTime(Date.now() + persister.fileRetemptionPeriod + 1);
    await persister.cleanExpiredFiles();
    active = true;
    expect(await persister.shift()).toBeNull();
  });

  it("never uses restoration to bypass local opt-outs or file-protection failures", async () => {
    const optedOut = createPersister(() => true, { disableOfflineStorage: true });
    expect(await optedOut.restore(batch)).toBe(false);
    FileAccessControl.OS_PROVIDES_FILE_PROTECTION = false;
    const unavailable = createPersister(() => true);
    expect(await unavailable.restore(batch)).toBe(false);
    expect(await readdir(directory)).toEqual([]);
  });
});
