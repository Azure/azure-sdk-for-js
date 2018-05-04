// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as assert from "assert";
import { Response } from "node-fetch";
import { LogPolicy } from "../lib/policies/logPolicy";
import { HttpOperationResponse } from "../lib/httpOperationResponse";
import { WebResource } from "../lib/webResource";
import { RequestPolicy } from "../lib/policies/requestPolicy";

const emptyRequestPolicy: RequestPolicy = {
  sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    assert(request);
    throw new Error("Not Implemented");
  }
};

describe("Log filter", () => {

  it("should log messages when a logger object is provided", (done) => {
    const expected = `>> Request: {
  "headers": {},
  "rawResponse": false,
  "url": "https://foo.com",
  "method": "PUT",
  "body": {
    "a": 1
  }
}
>> Response status code: 200
>> Body: null
`;
    let output = "";
    const logger = (message: string): void => { output += message + "\n"; };
    const lf = new LogPolicy(emptyRequestPolicy, logger);
    const req = new WebResource("https://foo.com", "PUT", { "a": 1 });
    const res = new Response();
    const opRes = new HttpOperationResponse(req, res as any);
    lf.after(opRes).then(() => {
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
