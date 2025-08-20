// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";
import { mockListPhoneNumbersHttpClient } from "../public/utils/mockHttpClients.js";
import { describe, it, assert } from "vitest";

describe("PhoneNumbersClient - custom policies ", () => {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";
  let client: PhoneNumbersClient;

  it("applies the phoneNumbersPagingPolicy", async () => {
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
