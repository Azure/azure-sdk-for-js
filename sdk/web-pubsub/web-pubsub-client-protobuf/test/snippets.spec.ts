// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { setLogLevel } from "@azure/logger";
import { WebPubSubClient } from "@azure/web-pubsub-client";
import { describe, it } from "vitest";
import { WebPubSubProtobufReliableProtocol } from "@azure/web-pubsub-client-protobuf";

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    const client = new WebPubSubClient("client-access-url", {
      protocol: WebPubSubProtobufReliableProtocol(),
    });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
