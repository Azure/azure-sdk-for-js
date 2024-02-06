// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="dom"/>

import { assert } from "chai";
import { AzureKeyCredential, generateSharedAccessSignature } from "../../src";
import { isNode } from "@azure/test-utils";

describe("generateSharedAccessSignature", function () {
  it("generates the correct signiture", async () => {
    // This is not a real key, it's the base64 encoding of "this is not a real EventGrid key", which happens to be the same
    // number of bytes as an actual EventGrid Access Key.
    const keyAsString = "this is not a real EventGrid key";
    const key = isNode ? Buffer.from(keyAsString).toString("base64") : btoa(keyAsString);
    const topicUrl = "https://eg-topic.westus-2.eventgrid.azure.net/api/events";

    const sig = await generateSharedAccessSignature(
      topicUrl,
      new AzureKeyCredential(key),
      new Date(Date.UTC(2020, 0, 1, 0, 0, 0))
    );

    assert.equal(
      sig,
      "r=https%3A%2F%2Feg-topic.westus-2.eventgrid.azure.net%2Fapi%2Fevents%3FapiVersion%3D2018-01-01&e=1%2F1%2F2020%2012%3A00%3A00%20AM&s=ZzvNAYRyvJwDrOJKYxbNAPNCoSqgOJVLFi4IMXOrW2Q%3D"
    );
  });
});
