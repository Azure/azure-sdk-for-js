// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { setLogLevel } from "@azure/logger";
import { WebPubSubClient } from "@azure/web-pubsub-client";
import { describe, it } from "vitest";
import { WebPubSubProtobufReliableProtocol } from "../src/index.js";

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
