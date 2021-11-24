// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import sinon from "sinon";
import { RouterClient } from "../../src";
import { env } from "@azure/test-utils-recorder";

describe("[Mocked] RouterClient", async () => {
  afterEach(() => {
    sinon.restore();
  });

  it("can instantiate", async () => {
    new RouterClient(env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING, {});
  });
});
