// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { gzip, gunzipSync } from "node:zlib";
import type * as Zlib from "node:zlib";
import {
  createDefaultHttpClient,
  createPipelineFromOptions,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { ExportResultCode } from "@opentelemetry/core";
import nock from "nock";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ConfigurationManager } from "../../src/_configuration/configurationManager.js";
import {
  DEFAULT_BREEZE_ENDPOINT,
  ENV_DISABLE_SDKSTATS,
  ENV_DISABLE_STATSBEAT,
  LEGACY_ENV_DISABLE_STATSBEAT,
} from "../../src/Declarations/Constants.js";
import type { AzureMonitorExporterOptions } from "../../src/config.js";
import { AzureMonitorTraceExporter } from "../../src/export/trace.js";
import { CustomerSDKStatsManager } from "../../src/export/statsbeat/customerSDKStatsManager.js";
import { StatsbeatManager } from "../../src/export/statsbeat/statsbeatManager.js";
import { CustomSDKStatsCounter, StatsbeatCounter } from "../../src/export/statsbeat/types.js";
import type { TelemetryItem as Envelope } from "../../src/generated/index.js";
import { HttpSender } from "../../src/platform/nodejs/httpSender.js";
import { partialBreezeResponse, successfulBreezeResponse } from "../utils/breezeTestUtils.js";

vi.mock("node:zlib", async (importOriginal) => {
  const original = await importOriginal<typeof Zlib>();
  return { ...original, gzip: vi.fn(original.gzip) };
});

const instrumentationKey = "00000000-0000-4000-8000-000000000001";
const envelope: Envelope = { name: "test", time: new Date(0) };

class ReplayTestSender extends HttpSender {
  protected getStartupReplayDelayMs(): number {
    return 60_000;
  }
}

function readRequest(request: PipelineRequest): Envelope[] {
  expect(request.headers.get("Content-Encoding")).toBe("gzip");
  expect(Buffer.isBuffer(request.body)).toBe(true);
  const bytes = request.body as Buffer;
  expect(request.headers.get("Content-Length")).toBe(String(bytes.length));
  return JSON.parse(gunzipSync(bytes).toString("utf8")) as Envelope[];
}

describe("HttpSender compression", () => {
  let senders: HttpSender[];
  let storageDirectory: string | undefined;

  beforeEach(() => {
    senders = [];
    nock.disableNetConnect();
    vi.stubEnv("WEBSITE_SITE_NAME", "exporter-gzip-test");
    vi.stubEnv(ENV_DISABLE_SDKSTATS, undefined);
    vi.stubEnv(ENV_DISABLE_STATSBEAT, undefined);
    vi.stubEnv(LEGACY_ENV_DISABLE_STATSBEAT, undefined);
    ConfigurationManager.getInstance().reset();
  });

  afterEach(async () => {
    await Promise.all(senders.map((sender) => sender.shutdown()));
    await Promise.all([
      StatsbeatManager.getInstance().shutdown(),
      CustomerSDKStatsManager.getInstance().shutdown(),
    ]);
    ConfigurationManager.getInstance().reset();
    nock.cleanAll();
    nock.enableNetConnect();
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    if (storageDirectory) {
      await rm(storageDirectory, { recursive: true, force: true });
      storageDirectory = undefined;
    }
  });

  function createSender(exporterOptions: AzureMonitorExporterOptions = {}): HttpSender {
    const sender = new ReplayTestSender({
      endpointUrl: DEFAULT_BREEZE_ENDPOINT,
      instrumentationKey,
      trackStatsbeat: false,
      exporterOptions: {
        disableOfflineStorage: true,
        retryOptions: { maxRetries: 0 },
        ...exporterOptions,
      },
    });
    senders.push(sender);
    return sender;
  }

  it("compresses policy-modified JSON on every pipeline retry without mutating caller options", async () => {
    const bodies: Envelope[][] = [];
    const sendRequest = vi.fn<HttpClient["sendRequest"]>(async (request) => {
      bodies.push(readRequest(request));
      expect(request.headers.get("x-custom-policy")).toBe("present");
      return {
        request,
        status: bodies.length === 1 ? 503 : 200,
        headers: createHttpHeaders(),
        bodyAsText: JSON.stringify(successfulBreezeResponse(1)),
      };
    });
    const pipeline = createPipelineFromOptions({
      retryOptions: { maxRetries: 1, retryDelayInMs: 1, maxRetryDelayInMs: 1 },
    });
    pipeline.addPolicy({
      name: "customPipelinePolicy",
      async sendRequest(request, next) {
        request.headers.set("x-custom-policy", "present");
        return next(request);
      },
    });
    const policyBodies: unknown[] = [];
    const options: AzureMonitorExporterOptions = {
      httpClient: { sendRequest },
      pipeline,
      retryOptions: { maxRetries: 1, retryDelayInMs: 1, maxRetryDelayInMs: 1 },
      additionalPolicies: [
        {
          position: "perRetry",
          policy: {
            name: "modifySerializedJson",
            async sendRequest(request, next) {
              expect(typeof request.body).toBe("string");
              expect(request.headers.has("Content-Encoding")).toBe(false);
              request.body = JSON.stringify([{ name: "modified", attempt: policyBodies.length }]);
              policyBodies.push(request.body);
              return next(request);
            },
          },
        },
      ],
    };
    const originalClient = options.httpClient;
    const sender = createSender(options);
    expect((await sender.exportEnvelopes([envelope])).code).toBe(ExportResultCode.SUCCESS);
    expect(bodies).toEqual([
      [{ name: "modified", attempt: 0 }],
      [{ name: "modified", attempt: 1 }],
    ]);
    expect(options.httpClient).toBe(originalClient);
    expect(sender.appInsightsClientOptions.httpClient).toBe(originalClient);
  });

  it.each([307, 308])("compresses again after an accepted %s redirect", async (status) => {
    const urls: string[] = [];
    const bodies: Envelope[][] = [];
    const regionalEndpoint = "https://westus-0.in.applicationinsights.azure.com";
    const httpClient: HttpClient = {
      async sendRequest(request) {
        urls.push(request.url);
        bodies.push(readRequest(request));
        return {
          request,
          status: urls.length === 1 ? status : 200,
          headers: createHttpHeaders({ location: `${regionalEndpoint}/v2.1/track` }),
          bodyAsText: JSON.stringify(successfulBreezeResponse(1)),
        };
      },
    };
    const sender = createSender({ httpClient });
    expect((await sender.exportEnvelopes([envelope])).code).toBe(ExportResultCode.SUCCESS);
    expect(urls).toEqual([
      `${DEFAULT_BREEZE_ENDPOINT}/v2.1/track`,
      `${regionalEndpoint}/v2.1/track`,
    ]);
    expect(bodies[1]).toEqual(bodies[0]);
    expect(sender.appInsightsClientOptions.httpClient).toBe(httpClient);
  });

  it("preserves JSON at a custom ingestion endpoint", async () => {
    const sendRequest = vi.fn<HttpClient["sendRequest"]>(async (request) => ({
      request,
      status: 200,
      headers: createHttpHeaders(),
      bodyAsText: JSON.stringify(successfulBreezeResponse(1)),
    }));
    const sender = createSender({
      endpoint: "https://proxy.example/v2",
      httpClient: { sendRequest },
    });
    await sender.send([envelope]);
    const request = sendRequest.mock.calls[0][0];
    expect(request.url).toBe("https://proxy.example/v2/track");
    expect(request.body).toBe(JSON.stringify([envelope]));
    expect(request.headers.has("Content-Encoding")).toBe(false);
  });

  it.each([200, 503])(
    "uses normal export handling when gzip fails and ingestion returns %s",
    async (status) => {
      storageDirectory = await mkdtemp(join(tmpdir(), "azmon-gzip-fallback-"));
      vi.mocked(gzip).mockImplementationOnce((...args) => {
        const callback = args.at(-1);
        if (typeof callback === "function") {
          callback(new Error("gzip failed"), Buffer.alloc(0));
        }
      });
      let requests = 0;
      const sendRequest = vi.fn<HttpClient["sendRequest"]>(async (request) => ({
        request,
        status: ++requests === 1 ? status : 200,
        headers: createHttpHeaders(),
        bodyAsText: JSON.stringify(successfulBreezeResponse(1)),
      }));
      const sender = createSender({
        httpClient: { sendRequest },
        storageDirectory,
        disableOfflineStorage: false,
      });

      expect((await sender.exportEnvelopes([envelope])).code).toBe(ExportResultCode.SUCCESS);
      expect(sendRequest).toHaveBeenCalledOnce();
      const request = sendRequest.mock.calls[0][0];
      expect(request.body).toBe(JSON.stringify([envelope]));
      expect(request.headers.has("Content-Encoding")).toBe(false);

      const persisted = await sender["persister"].shift();
      if (status === 200) {
        expect(persisted).toBeNull();
      } else {
        expect(persisted).toEqual([envelope]);
        if (!Array.isArray(persisted)) {
          throw new Error("Expected persisted envelopes");
        }
        expect(await sender["persister"].push(persisted)).toBe(true);
        await sender["sendFirstPersistedFile"]();
        expect(sendRequest).toHaveBeenCalledTimes(2);
        expect(readRequest(sendRequest.mock.calls[1][0])).toEqual(
          JSON.parse(JSON.stringify([envelope])),
        );
        expect(await sender["persister"].shift()).toBeNull();
      }
    },
  );

  it("leaves policy-encoded bodies and headers untouched", async () => {
    const sendRequest = vi.fn<HttpClient["sendRequest"]>(async (request) => ({
      request,
      status: 200,
      headers: createHttpHeaders(),
      bodyAsText: JSON.stringify(successfulBreezeResponse(1)),
    }));
    const sender = createSender({
      httpClient: { sendRequest },
      additionalPolicies: [
        {
          position: "perCall",
          policy: {
            name: "existingEncoding",
            async sendRequest(request, next) {
              request.body = "already encoded";
              request.headers.set("Content-Encoding", "br");
              request.headers.set("Content-Length", "15");
              return next(request);
            },
          },
        },
      ],
    });
    await sender.send([envelope]);
    const request = sendRequest.mock.calls[0][0];
    expect(request.body).toBe("already encoded");
    expect(request.headers.get("Content-Encoding")).toBe("br");
    expect(request.headers.get("Content-Length")).toBe("15");
  });

  it("persists only retriable envelopes after partial acceptance and compresses replay", async () => {
    storageDirectory = await mkdtemp(join(tmpdir(), "azmon-gzip-"));
    const batches: Envelope[][] = [];
    const sender = createSender({
      storageDirectory,
      disableOfflineStorage: false,
      httpClient: {
        async sendRequest(request) {
          batches.push(readRequest(request));
          return {
            request,
            status: batches.length === 1 ? 206 : 200,
            headers: createHttpHeaders(),
            bodyAsText: JSON.stringify(
              batches.length === 1
                ? partialBreezeResponse([200, 429, 400])
                : successfulBreezeResponse(1),
            ),
          };
        },
      },
    });
    const batch = ["accepted", "retry", "rejected"].map((name) => ({ ...envelope, name }));
    expect((await sender.exportEnvelopes(batch)).code).toBe(ExportResultCode.SUCCESS);
    const persisted = await sender["persister"].shift();
    expect(persisted).toEqual([batch[1]]);
    if (!Array.isArray(persisted)) {
      throw new Error("Expected persisted envelopes");
    }
    expect(await sender["persister"].push(persisted)).toBe(true);
    await sender["sendFirstPersistedFile"]();
    expect(batches.map((items) => items.map((item) => item.name))).toEqual([
      ["accepted", "retry", "rejected"],
      ["retry"],
    ]);
    expect(await sender["persister"].shift()).toBeNull();
  });

  it.each([false, true])(
    "compresses internal Statsbeat and customer SDK Stats with caller HTTP client = %s",
    async (useCustomClient) => {
      const customerBatches: Envelope[][] = [];
      const internalBatches: Envelope[][] = [];
      for (const [endpoint, batches] of [
        [DEFAULT_BREEZE_ENDPOINT, customerBatches],
        ["https://westus-0.in.applicationinsights.azure.com", internalBatches],
      ] as const) {
        nock(endpoint)
          .persist()
          .matchHeader("Content-Encoding", "gzip")
          .post("/v2.1/track", (body: Envelope[]) => {
            batches.push(body);
            return true;
          })
          .reply(200, successfulBreezeResponse(1));
      }
      const transport = createDefaultHttpClient();
      const sendRequest = vi.fn<HttpClient["sendRequest"]>((request) =>
        transport.sendRequest(request),
      );
      const exporter = new AzureMonitorTraceExporter({
        connectionString: `InstrumentationKey=${instrumentationKey}`,
        disableOfflineStorage: true,
        httpClient: useCustomClient ? { sendRequest } : undefined,
      });
      senders.push(exporter["sender"]);
      await vi.waitFor(() =>
        expect(CustomerSDKStatsManager.getInstance().customerSDKStatsMetrics).toBeDefined(),
      );
      const result = await exporter["sender"].exportEnvelopes([envelope]);
      expect(result.code).toBe(ExportResultCode.SUCCESS);

      const internal = StatsbeatManager.getInstance();
      await internal.networkStatsbeatMetrics!["networkStatsbeatMeterProvider"].forceFlush();
      await internal.longIntervalStatsbeatMetrics![
        "longIntervalStatsbeatMeterProvider"
      ].forceFlush();
      const customer = CustomerSDKStatsManager.getInstance().customerSDKStatsMetrics!;
      await customer["customerSDKStatsMeterProvider"].forceFlush();

      expect(customerBatches[0][0].name).toBe(envelope.name);
      expect(JSON.stringify(customerBatches.slice(1))).toContain(
        CustomSDKStatsCounter.ITEM_SUCCESS_COUNT,
      );
      expect(JSON.stringify(internalBatches)).toContain(StatsbeatCounter.SUCCESS_COUNT);
      expect(JSON.stringify(internalBatches)).toContain(StatsbeatCounter.ATTACH);
      expect(sendRequest).toHaveBeenCalledTimes(useCustomClient ? 1 : 0);
      await exporter.shutdown();
    },
  );
});
