// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { afterEach, describe, expect, it, vi } from "vitest";
import { diag } from "@opentelemetry/api";
import { QuickpulseSender } from "../../../../src/metrics/quickpulse/export/sender.js";

describe("QuickpulseSender responses", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  function createSender(bodyAsText: string | undefined, status = 200): QuickpulseSender {
    const sender = new QuickpulseSender({
      endpointUrl: "https://live.example.invalid",
      instrumentationKey: "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
    });
    sender["quickpulseClient"].pipeline.addPolicy(
      {
        name: "mockQuickpulseResponse",
        sendRequest(request) {
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
      { phase: "Serialize" },
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

    it(`${operation} does not treat an HTTP error as success`, async () => {
      expect(await createSender(undefined, 403)[operation]({})).toBeUndefined();
    });

    it(`${operation} does not hide malformed nonempty configuration bodies`, async () => {
      expect(await createSender('{"ETag":"invalid"}')[operation]({})).toBeUndefined();
    });
  }
});
