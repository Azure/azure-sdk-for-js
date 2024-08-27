// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import sinon from "sinon";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import { JobRouterClient } from "../../src";
import { baseUri, generateToken } from "../public/utils/connection";

describe("[Mocked] JobRouterClient", async function () {
  afterEach(function () {
    sinon.restore();
  });

  it("can instantiate", async function () {
    new JobRouterClient(baseUri, new AzureCommunicationTokenCredential(generateToken()));
  });
});
