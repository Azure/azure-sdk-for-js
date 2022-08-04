// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.


import { env } from "@azure-tools/test-recorder";
import sinon from "sinon";
import { RouterClient } from "../../src";

describe("[Mocked] RouterClient", async () => {
  afterEach(() => {
    sinon.restore();
  });

  it("can instantiate", async () => {
    new RouterClient(env.COMMUNICATION_CONNECTION_STRING, {});
  });
});
