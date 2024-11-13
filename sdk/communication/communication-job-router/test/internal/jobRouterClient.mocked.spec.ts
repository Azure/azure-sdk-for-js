// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import { JobRouterClient } from "../../src/index.js";
import { baseUri, generateToken } from "../public/utils/connection.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("[Mocked] JobRouterClient", async function () {
  afterEach(function () {
    vi.restoreAllMocks();
  });

  it("can instantiate", async function () {
    new JobRouterClient(baseUri, new AzureCommunicationTokenCredential(generateToken()));
  });
});
