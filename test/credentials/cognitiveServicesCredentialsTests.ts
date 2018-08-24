// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as assert from "assert";
import { WebResource } from "ms-rest-js";
import { CognitiveServicesCredentials } from "../../lib/credentials/cognitiveServicesCredentials";
import * as msAssert from "../msAssert";

describe("CognitiveServicesCredentials", () => {
  describe("constructor()", () => {
    it("with undefined subscription key", () => {
      msAssert.throws(() => new CognitiveServicesCredentials(undefined as any),
        new Error("subscriptionKey cannot be null or undefined and must be of type string."));
    });

    it("with null subscription key", () => {
      // tslint:disable-next-line:no-null-keyword
      msAssert.throws(() => new CognitiveServicesCredentials(null as any),
        new Error("subscriptionKey cannot be null or undefined and must be of type string."));
    });

    it("with number subscription key", () => {
      msAssert.throws(() => new CognitiveServicesCredentials(50 as any),
        new Error("subscriptionKey cannot be null or undefined and must be of type string."));
    });

    it("with empty subscription key", () => {
      msAssert.throws(() => new CognitiveServicesCredentials(""),
        new Error("subscriptionKey cannot be null or undefined and must be of type string."));
    });

    it("with non-empty subscription key", async () => {
      const credentials = new CognitiveServicesCredentials("fake-subscription-key");
      const httpRequest = new WebResource();
      const signedHttpRequest: WebResource = await credentials.signRequest(httpRequest);
      assert.strictEqual(signedHttpRequest, httpRequest);
      assert.deepEqual(signedHttpRequest.headers.rawHeaders(), {
        "ocp-apim-subscription-key": "fake-subscription-key",
        "x-bingapis-sdk-client": "node-SDK"
      });
    });
  });
});