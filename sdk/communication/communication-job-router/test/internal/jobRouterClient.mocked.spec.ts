// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import { JobRouterClient } from "../../src/index.js";
import { baseUri, generateToken } from "../public/utils/connection.js";
import { describe, it } from "vitest";

describe("[Mocked] JobRouterClient", async () => {
  it("can instantiate", async () => {
    new JobRouterClient(baseUri, new AzureCommunicationTokenCredential(generateToken()));
  });
});
