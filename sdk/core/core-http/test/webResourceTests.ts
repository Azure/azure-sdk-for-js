// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestPrepareOptions, WebResource } from "../src/webResource";
import { assert } from "chai";

describe("WebResource", function () {
  it("supports dash in parameter name", function () {
    const options: RequestPrepareOptions = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "GET",
      url: "",
      pathTemplate: "/pet/{pet-name}/{one-friend-name}",
      pathParameters: {
        "pet-name": "tom",
        "one-friend-name": "jerry",
      },
    };
    let request = new WebResource();
    request = request.prepare(options);
    assert.equal(request.url, "https://management.azure.com/pet/tom/jerry");
  });
});
