import { AzureKeyCredential } from "@azure/core-auth";
import { assert } from "chai";
import { SearchAvailablePhoneNumbersRequest } from "../../src/models";
import { PhoneNumbersClient, PhoneNumbersClientOptions } from "../../src/phoneNumbersClient";
import {
  mockListPhoneNumbersHttpClient,
  mockSearchHttpClient,
} from "../public/utils/mockHttpClients";

describe("PhoneNumbersClient - custom policies ", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";
  let client: PhoneNumbersClient;

  it("applies the phoneNumbersLroPolicy", async function () {
    client = new PhoneNumbersClient(endpoint, new AzureKeyCredential(accessKey), {
      httpClient: mockSearchHttpClient,
    } as PhoneNumbersClientOptions);

    const searchRequest: SearchAvailablePhoneNumbersRequest = {
      countryCode: "US",
      phoneNumberType: "tollFree",
      assignmentType: "application",
      capabilities: {
        sms: "none",
        calling: "outbound",
      },
    };

    const poller = await client.beginSearchAvailablePhoneNumbers(searchRequest, {
      onResponse: (_response) => {
        assert.isDefined(_response.headers.get("azure-asyncoperation"));
        assert.equal(
          _response.headers.get("azure-asyncopearation"),
          _response.headers.get("opearation-location")
        );
      },
    });

    // It is only required to poll once to check if the initial request contains the header
    await poller.poll();
  });

  it("applies the phoneNumbersPagingPolicy", async function () {
    client = new PhoneNumbersClient(endpoint, new AzureKeyCredential(accessKey), {
      httpClient: mockListPhoneNumbersHttpClient,
    } as PhoneNumbersClientOptions);

    await client
      .listPurchasedPhoneNumbers({
        onResponse: (_response) => {
          assert.isTrue(_response.parsedBody.nextLink.startsWith(endpoint));
        },
      })
      .next();
  });
});
