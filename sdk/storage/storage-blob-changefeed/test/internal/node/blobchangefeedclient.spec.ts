// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { createBlobChangeFeedClient } from "../../utils/node/clients.js";
import { BlobChangeFeedClient } from "@azure/storage-blob-changefeed";
import type { RequestPolicy } from "@azure/storage-blob";
import { SDK_VERSION } from "$internal/utils/constants.js";
import type { RestError } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { toHttpHeadersLike } from "@azure/core-http-compat";
import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";
import type { OperationOptions } from "@azure/core-client";

expect.extend({ toSupportTracing });

describe("BlobChangeFeedClient internals", async () => {
  let recorder: Recorder;
  let changeFeedClient: BlobChangeFeedClient;

  beforeEach(async function (ctx) {
    recorder = new Recorder(ctx);
    changeFeedClient = await createBlobChangeFeedClient("TokenCredential", { recorder });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  async function fetchTelemetryString(client: BlobChangeFeedClient): Promise<string> {
    try {
      await client.listChanges().next();
      return "";
    } catch (e: any) {
      assert.equal(e.name, "RestError");
      return (e as RestError).request?.headers.get("User-Agent") ?? "";
    }
  }

  it("user agent set correctly", async () => {
    const MockHttpClient: RequestPolicy = {
      sendRequest(request) {
        return Promise.resolve({
          request,
          headers: toHttpHeadersLike(createHttpHeaders()),
          status: 418,
        });
      },
    };

    const client = await createBlobChangeFeedClient("TokenCredential", {
      recorder,
      options: { httpClient: MockHttpClient },
    });
    const telemetryString = await fetchTelemetryString(client);
    assert.isTrue(telemetryString.startsWith(`changefeed-js/${SDK_VERSION}`));
    const blobServiceClient = changeFeedClient["blobServiceClient"];
    const userAgentPrefix = "test/1 a b";
    const client2 = new BlobChangeFeedClient(blobServiceClient.url, blobServiceClient.credential, {
      httpClient: MockHttpClient,
      userAgentOptions: { userAgentPrefix },
    });
    const telemetryString2 = await fetchTelemetryString(client2);
    assert.isTrue(telemetryString2.startsWith(`${userAgentPrefix} changefeed-js/${SDK_VERSION}`));
  });

  it("tracing", async () => {
    await expect(async (options: OperationOptions) => {
      const pageIter = changeFeedClient.listChanges(options);
      await pageIter.next();
    }).toSupportTracing(["ChangeFeedFactory-create", "ChangeFeed-getChange"]);
  });
});
