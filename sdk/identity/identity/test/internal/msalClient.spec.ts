// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { createMsalClient } from "../../src/msal/msalClient";

describe.only("MsalClient", function () {
  describe("#createMsalClient", function () {
    it("can create an msal client with minimal configuration", function () {
      const clientId = "client-id";
      const tenantId = "tenant-id";

      const msalClient = createMsalClient(clientId, tenantId);
      assert.exists(msalClient);
    });
  });
});
