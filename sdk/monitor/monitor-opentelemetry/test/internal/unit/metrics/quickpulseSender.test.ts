// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { PipelineRequest } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";
import { afterEach, describe, expect, it, vi } from "vitest";
import { diag } from "@opentelemetry/api";
import { QuickpulseSender } from "../../../../src/metrics/quickpulse/export/sender.js";

describe("QuickpulseSender responses", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  function createSender(
    bodyAsText: string | undefined,
    status = 200,
    credential?: TokenCredential,
    requests: PipelineRequest[] = [],
  ): QuickpulseSender {
    const sender = new QuickpulseSender({
      endpointUrl: "https://live.example.invalid",
      instrumentationKey: "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      credential,
    });
    sender["quickpulseClient"].pipeline.addPolicy(
      {
        name: "mockQuickpulseResponse",
        sendRequest(request) {
          requests.push(request);
          return Promise.resolve({
            request,
            status,
            headers: createHttpHeaders({
              "content-type": "application/json",
              "x-ms-qps-subscribed": "true",
              "x-ms-qps-configuration-etag": "configuration-1",
              "x-ms-qps-service-polling-interval-hint": "5000",
              "x-ms-qps-service-endpoint-redirect-v2":
                "https://westeurope.livediagnostics.monitor.azure.com",
            }),
            bodyAsText,
          });
        },
      },
      { afterPhase: "Sign" },
    );
    return sender;
  }

  for (const operation of ["isSubscribed", "publish"] as const) {
    it.each([undefined, "", "null"])(
      `${operation} accepts an empty successful response (%s) and preserves headers`,
      async (body) => {
        const warning = vi.spyOn(diag, "warn");
        const info = vi.spyOn(diag, "info");
        const response = await createSender(body)[operation]({});
        expect(response).toMatchObject({
          xMsQpsSubscribed: "true",
          xMsQpsConfigurationEtag: "configuration-1",
        });
        expect(response?.eTag).toBeUndefined();
        if (operation === "isSubscribed") {
          expect(response?.xMsQpsServicePollingIntervalHint).toBe("5000");
          expect(response?.xMsQpsServiceEndpointRedirectV2).toBe(
            "https://westeurope.livediagnostics.monitor.azure.com",
          );
        } else {
          expect(response?.xMsQpsServicePollingIntervalHint).toBeUndefined();
          expect(response?.xMsQpsServiceEndpointRedirectV2).toBeUndefined();
        }
        expect(warning).not.toHaveBeenCalled();
        expect(info).not.toHaveBeenCalled();
      },
    );

    it(`${operation} still deserializes a configuration body`, async () => {
      const sender = createSender(
        JSON.stringify({ ETag: "configuration-1", Metrics: [], DocumentStreams: [] }),
      );
      expect(await sender[operation]({})).toMatchObject({
        eTag: "configuration-1",
        metrics: [],
        documentStreams: [],
        xMsQpsSubscribed: "true",
      });
    });

    it.each([undefined, "null", '{"message":"Forbidden"}'])(
      `${operation} does not treat an HTTP error as success (%s)`,
      async (body) => {
        expect(await createSender(body, 403)[operation]({})).toBeUndefined();
      },
    );

    it(`${operation} preserves generated request serialization and authentication`, async () => {
      const getToken = vi.fn<TokenCredential["getToken"]>().mockResolvedValue({
        token: "test-token",
        expiresOnTimestamp: Date.now() + 3600000,
      });
      const requests: PipelineRequest[] = [];
      const sender = createSender(undefined, 200, { getToken }, requests);
      const options = { configurationEtag: "request-etag", transmissionTime: 123 };
      const point = {
        version: "test-version",
        invariantVersion: 5,
        instance: "test-instance",
        roleName: "test-role",
        machineName: "test-machine",
        streamId: "test-stream",
        isWebApp: false,
        performanceCollectionSupported: true,
      };
      const response =
        operation === "isSubscribed"
          ? await sender.isSubscribed({ ...options, monitoringDataPoint: point })
          : await sender.publish({ ...options, monitoringDataPoints: [point] });
      expect(response?.xMsQpsSubscribed).toBe("true");
      expect(requests).toHaveLength(1);
      const request = requests[0];
      const url = new URL(request.url);
      expect(url.pathname).toBe(
        `/QuickPulseService.svc/${operation === "isSubscribed" ? "ping" : "post"}`,
      );
      expect(url.searchParams.get("ikey")).toBe("1aa11111-bbbb-1ccc-8ddd-eeeeffff3333");
      expect(url.searchParams.get("api-version")).toBe("2024-04-01-preview");
      expect(request.method).toBe("POST");
      expect(request.headers.get("x-ms-qps-configuration-etag")).toBe("request-etag");
      expect(request.headers.get("x-ms-qps-transmission-time")).toBe("123");
      expect(request.headers.get("authorization")).toBe("Bearer test-token");
      expect(request.headers.get("user-agent")).toContain("azsdk-js-client");
      const serializedPoint = {
        Version: "test-version",
        InvariantVersion: 5,
        Instance: "test-instance",
        RoleName: "test-role",
        MachineName: "test-machine",
        StreamId: "test-stream",
        IsWebApp: false,
        PerformanceCollectionSupported: true,
      };
      expect(request.body).toBe(
        JSON.stringify(operation === "isSubscribed" ? serializedPoint : [serializedPoint]),
      );
      expect(getToken.mock.calls[0][0]).toEqual(["https://monitor.azure.com/.default"]);
      expect(sender["quickpulseClient"].pipeline.getOrderedPolicies()).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ name: "redirectPolicy" })]),
      );
    });

    it(`${operation} does not hide malformed nonempty configuration bodies`, async () => {
      expect(await createSender('{"ETag":"invalid"}')[operation]({})).toBeUndefined();
    });
  }
});
