﻿// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import { HttpHeaders, RawHttpHeaders } from "../lib/httpHeaders";
import { HttpOperationResponse } from "../lib/httpOperationResponse";
import { LogPolicy, LogPolicyOptions } from "../lib/policies/logPolicy";
import { RequestPolicy, RequestPolicyOptions } from "../lib/policies/requestPolicy";
import { WebResource } from "../lib/webResource";
import { getLogLevel, setLogLevel, AzureLogLevel, Debugger } from "@azure/logger";

function getNextPolicy(responseHeaders?: RawHttpHeaders): RequestPolicy {
  return {
    sendRequest(request: WebResource): Promise<HttpOperationResponse> {
      // tslint:disable-next-line: no-null-keyword
      return Promise.resolve({
        request,
        status: 200,
        headers: new HttpHeaders(responseHeaders),
        bodyAsText: null
      });
    }
  };
}

function assertLog(
  request: WebResource,
  expectedLog: string,
  doneCallback: Mocha.Done,
  responseHeaders?: RawHttpHeaders
): void {
  let output = "";

  const loggerFn = (message: string): void => {
    output += message + "\n";
  };

  const logger: Debugger = Object.assign(loggerFn, {
    enabled: true,
    destroy: () => true,
    namespace: "test",
    extend: () => logger,
    log: () => {}
  });

  const options: LogPolicyOptions = {
    logger,
    allowedHeaderNames: ["Capitalized-Header", "x-ms-safe-header"],
    allowedQueryParameters: ["api-version"]
  };

  const lf = new LogPolicy(getNextPolicy(responseHeaders), new RequestPolicyOptions(), options);

  lf.sendRequest(request)
    .then(() => {
      assert.deepEqual(output, expectedLog);
      doneCallback();
    })
    .catch((err: Error) => {
      doneCallback(err);
    });
}

describe("Log filtering", () => {
  let originalLogLevel: AzureLogLevel | undefined = undefined;

  beforeEach(() => {
    originalLogLevel = getLogLevel();
    setLogLevel("info");
  });

  afterEach(() => {
    setLogLevel(originalLogLevel);
  });

  it("redacts request headers", (done) => {
    const expected = `Request: {
  "url": "https://foo.com",
  "method": "PUT",
  "headers": {
    "_headersMap": {
      "x-ms-safe-header": "It me",
      "x-ms-oh-noes": "REDACTED"
    }
  },
  "withCredentials": false,
  "timeout": 0
}
Response status code: 200
Headers: {
  "_headersMap": {}
}
`;

    const request = new WebResource("https://foo.com", "PUT", { a: 1 }, undefined, {
      "x-ms-safe-header": "It me",
      "x-ms-oh-noes": ":-p"
    });
    delete request.requestId;
    assertLog(request, expected, done);
  });

  it("redacts response headers", (done) => {
    const expected = `Request: {
  "url": "https://foo.com",
  "method": "PUT",
  "headers": {
    "_headersMap": {}
  },
  "withCredentials": false,
  "timeout": 0
}
Response status code: 200
Headers: {
  "_headersMap": {
    "x-ms-safe-header": "It me",
    "x-ms-oh-noes": "REDACTED"
  }
}
`;

    const request = new WebResource("https://foo.com", "PUT", { a: 1 });
    delete request.requestId;
    assertLog(request, expected, done, {
      "x-ms-safe-header": "It me",
      "x-ms-oh-noes": ":-p"
    });
  });

  it("redacts request headers with different casing", (done) => {
    const expected = `Request: {
  "url": "https://foo.com",
  "method": "PUT",
  "headers": {
    "_headersMap": {
      "capitalized-header": "Don't redact me, bro",
      "x-ms-safe-header": "It me"
    }
  },
  "withCredentials": false,
  "timeout": 0
}
Response status code: 200
Headers: {
  "_headersMap": {}
}
`;

    const request = new WebResource("https://foo.com", "PUT", { a: 1 }, undefined, {
      "Capitalized-Header": "Don't redact me, bro",
      "x-ms-safe-header": "It me"
    });
    delete request.requestId;
    assertLog(request, expected, done);
  });

  it("redacts query parameters in the query field", (done) => {
    const expected = `Request: {
  "url": "https://foo.com",
  "method": "PUT",
  "headers": {
    "_headersMap": {}
  },
  "query": {
    "api-version": "1.0",
    "secret": "REDACTED"
  },
  "withCredentials": false,
  "timeout": 0
}
Response status code: 200
Headers: {
  "_headersMap": {}
}
`;

    const request = new WebResource(
      "https://foo.com",
      "PUT",
      { a: 1 },
      { "api-version": "1.0", secret: "goose" }
    );
    delete request.requestId;
    assertLog(request, expected, done);
  });

  it("redacts query parameters in the request URI", (done) => {
    const expected = `Request: {
  "url": "https://foo.com?api-version=1.0&secret=REDACTED",
  "method": "PUT",
  "headers": {
    "_headersMap": {}
  },
  "withCredentials": false,
  "timeout": 0
}
Response status code: 200
Headers: {
  "_headersMap": {}
}
`;

    const request = new WebResource("https://foo.com?api-version=1.0&secret=goose", "PUT", {
      a: 1
    });
    delete request.requestId;
    assertLog(request, expected, done);
  });
});
