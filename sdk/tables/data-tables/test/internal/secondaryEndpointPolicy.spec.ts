// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { tablesSecondaryEndpointPolicy } from "../../src/secondaryEndpointPolicy";

describe("tablesSecondaryEndpointPolicy", function () {
  it("should send the request to the secondary endpoint ", async function () {
    const primaryURL = "https://testaccount.table.core.windows.net/";
    const expectedSecondary = "https://testaccount-secondary.table.core.windows.net/";

    await tablesSecondaryEndpointPolicy.sendRequest(
      {
        url: primaryURL,
        headers: createHttpHeaders({ "tables-secondary-endpoint": "true" }),
      } as any,
      async (req) => {
        assert.equal(req.url, expectedSecondary);
        assert.isUndefined(req.headers.get("tables-secondary-endpoint"));
        return { status: 200 } as any;
      },
    );
  });

  it("should send the request to the primary endpoint when the header is not set", async function () {
    const primaryURL = "https://testaccount.table.core.windows.net/";

    await tablesSecondaryEndpointPolicy.sendRequest(
      {
        url: primaryURL,
        headers: createHttpHeaders(),
      } as any,
      async (req) => {
        assert.equal(req.url, primaryURL);
        return {} as any;
      },
    );
  });
});
