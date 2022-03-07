// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import { assert } from "chai";
import { PhoneNumbersClient } from "../../src/phoneNumbersClient";
import { mockListPhoneNumbersHttpClient } from "../public/utils/mockHttpClients";

describe("PhoneNumbersClient - custom policies ", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";
  let client: PhoneNumbersClient;

  it("applies the phoneNumbersPagingPolicy", async function () {
    client = new PhoneNumbersClient(endpoint, new AzureKeyCredential(accessKey), {
      httpClient: mockListPhoneNumbersHttpClient,
    });

    await client
      .listPurchasedPhoneNumbers({
        onResponse: (_response) => {
          assert.isTrue(_response.parsedBody.nextLink.startsWith(endpoint));
        },
      })
      .next();
  });
});
