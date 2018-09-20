// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import assert from "assert";
import { HttpHeaders } from "../../lib/httpHeaders";
import { HttpOperationResponse } from "../../lib/httpOperationResponse";
import { LogPolicy } from "../../lib/policies/logPolicy";
import { RequestPolicy, RequestPolicyOptions } from "../../lib/policies/requestPolicy";
import { WebResource } from "../../lib/webResource";

const emptyRequestPolicy: RequestPolicy = {
  sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    return Promise.resolve({ request, status: 200, headers: new HttpHeaders(), bodyAsText: null });
  }
};

describe("Log filter", () => {

  it("should log messages when a logger object is provided", (done) => {
    const expected = `>> Request: {
  "url": "https://foo.com",
  "method": "PUT",
  "headers": {
    "_headersMap": {}
  },
  "body": {
    "a": 1
  },
  "withCredentials": false,
  "timeout": 0
}
>> Response status code: 200
>> Body: null
`;
    let output = "";
    const logger = (message: string): void => { output += message + "\n"; };
    const lf = new LogPolicy(emptyRequestPolicy, new RequestPolicyOptions(), logger);
    const req = new WebResource("https://foo.com", "PUT", { "a": 1 });
    lf.sendRequest(req).then(() => {
      // console.dir(output, { depth: null });
      // console.log(">>>>>>>");
      // console.dir(expected);
      assert.deepEqual(output, expected);
      done();
    }).catch((err: Error) => {
      done(err);
    });
  });
});
