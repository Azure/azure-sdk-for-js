// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-expressions */

import "chai/register-should";
import { CompositeMapper, Serializer } from "../src/serializer";
import { HttpMockFacade, getHttpMock } from "./mockHttp";
import { TransferProgressEvent, WebResource } from "../src/webResource";
import { DefaultHttpClient } from "../src/defaultHttpClient";
import { OperationSpec } from "../src/operationSpec";

describe("defaultHttpClient (browser)", function () {
  let httpMock: HttpMockFacade;
  beforeEach(() => {
    httpMock = getHttpMock();
    httpMock.setup();
  });
  afterEach(() => httpMock.teardown());
  after(() => httpMock.teardown());

  it("should not set bodyAsText for stream response", async function () {
    const serializer = new Serializer(undefined, true);
    const StorageError: CompositeMapper = {
      serializedName: "StorageError",
      type: {
        name: "Composite",
        className: "StorageError",
        modelProperties: {
          message: {
            xmlName: "Message",
            serializedName: "Message",
            type: {
              name: "String",
            },
          },
          code: {
            xmlName: "Code",
            serializedName: "Code",
            type: {
              name: "String",
            },
          },
        },
      },
    };
    const operationSpec: OperationSpec = {
      httpMethod: "GET",
      responses: {
        200: {
          bodyMapper: {
            serializedName: "parsedResponse",
            type: {
              name: "Stream",
            },
          },
        },
        default: {
          bodyMapper: StorageError,
        },
      },
      isXML: true,
      baseUrl: "httpbin.org",
      serializer,
    };
    httpMock.get("http://my.fake.domain/non-existing-blob", async (_url, _method, _body) => {
      return {
        status: 200,
        headers: {},
        body: `Some text`,
      };
    });
    const client = new DefaultHttpClient();
    const request = new WebResource("http://my.fake.domain/non-existing-blob");
    request.operationSpec = operationSpec;
    request.streamResponseStatusCodes = new Set([200]);
    const response = await client.sendRequest(request);

    response.status.should.equal(200);
    (typeof response.bodyAsText).should.equal("undefined");
    /* Skipping the following verification because xhr-mock hasn't implemented xhr.response() for 'blob' response type.
         https://github.com/jameslnewell/xhr-mock/blob/v2.5.1/packages/xhr-mock/src/MockXMLHttpRequest.ts#L163
    (typeof response.blobBody).should.not.equal("undefined");
    const text = await response.blobBody;
    (typeof text).should.not.equal("undefined");
    text!.should.equal(
      `<?xml version="1.0" encoding="utf-8"?><Error><Code>BlobNotFound</Code><Message>The specified blob does not exist.</Message></Error>`
    );
    */
  });

  it("should not treat non-streaming default response body as stream", async function () {
    const serializer = new Serializer(undefined, true);
    const StorageError: CompositeMapper = {
      serializedName: "StorageError",
      type: {
        name: "Composite",
        className: "StorageError",
        modelProperties: {
          message: {
            xmlName: "Message",
            serializedName: "Message",
            type: {
              name: "String",
            },
          },
          code: {
            xmlName: "Code",
            serializedName: "Code",
            type: {
              name: "String",
            },
          },
        },
      },
    };
    const operationSpec: OperationSpec = {
      httpMethod: "GET",
      responses: {
        200: {
          bodyMapper: {
            serializedName: "parsedResponse",
            type: {
              name: "Stream",
            },
          },
        },
        default: {
          bodyMapper: StorageError,
        },
      },
      isXML: true,
      baseUrl: "httpbin.org",
      serializer,
    };
    httpMock.get("http://my.fake.domain/non-existing-blob", async (_url, _method, _body) => {
      return {
        status: 404,
        headers: {
          "Content-Type": "application/xml",
          "Content-Length": 215,
        },
        body: `<?xml version="1.0" encoding="utf-8"?><Error><Code>BlobNotFound</Code><Message>The specified blob does not exist.</Message></Error>`,
      };
    });
    const client = new DefaultHttpClient();
    const request = new WebResource("http://my.fake.domain/non-existing-blob");
    request.operationSpec = operationSpec;
    request.streamResponseStatusCodes = new Set([200]);
    const response = await client.sendRequest(request);

    response.status.should.equal(404);
    (typeof response.blobBody).should.equal("undefined");
    /* Skipping the following verification because xhr-mock hasn't implemented xhr.response() for 'blob' response type.
         https://github.com/jameslnewell/xhr-mock/blob/v2.5.1/packages/xhr-mock/src/MockXMLHttpRequest.ts#L163
    (typeof response.bodyAsText).should.not.equal("undefined");
    response.bodyAsText!.should.equal(
      `<?xml version="1.0" encoding="utf-8"?><Error><Code>BlobNotFound</Code><Message>The specified blob does not exist.</Message></Error>`
    );
    */
  });

  it("should respect deprecated WebResource.streamResponseBody property", async function () {
    const serializer = new Serializer(undefined, true);
    const StorageError: CompositeMapper = {
      serializedName: "StorageError",
      type: {
        name: "Composite",
        className: "StorageError",
        modelProperties: {
          message: {
            xmlName: "Message",
            serializedName: "Message",
            type: {
              name: "String",
            },
          },
          code: {
            xmlName: "Code",
            serializedName: "Code",
            type: {
              name: "String",
            },
          },
        },
      },
    };
    const operationSpec: OperationSpec = {
      httpMethod: "GET",
      responses: {
        200: {
          bodyMapper: {
            serializedName: "parsedResponse",
            type: {
              name: "Stream",
            },
          },
        },
        default: {
          bodyMapper: StorageError,
        },
      },
      isXML: true,
      baseUrl: "httpbin.org",
      serializer,
    };
    httpMock.get("http://my.fake.domain/non-existing-blob", async (_url, _method, _body) => {
      return {
        status: 404,
        headers: {
          "Content-Type": "application/xml",
          "Content-Length": 215,
        },
        body: `<?xml version="1.0" encoding="utf-8"?><Error><Code>BlobNotFound</Code><Message>The specified blob does not exist.</Message></Error>`,
      };
    });
    const client = new DefaultHttpClient();
    const request = new WebResource("http://my.fake.domain/non-existing-blob");
    request.operationSpec = operationSpec;
    // deprecated streamResponseBody property is still supported.
    request.streamResponseBody = true;
    const response = await client.sendRequest(request);

    response.status.should.equal(404);
    (typeof response.bodyAsText).should.equal("undefined");
    /* Skipping the following verification because xhr-mock hasn't implemented xhr.response() for 'blob' response type.
         https://github.com/jameslnewell/xhr-mock/blob/v2.5.1/packages/xhr-mock/src/MockXMLHttpRequest.ts#L163
    (typeof response.blobBody).should.not.equal("undefined");
    const text = await response.blobBody;
    (typeof text).should.not.equal("undefined");
    text!.should.equal(
      `<?xml version="1.0" encoding="utf-8"?><Error><Code>BlobNotFound</Code><Message>The specified blob does not exist.</Message></Error>`
    );
    */
  });

  describe("should report upload and download progress", () => {
    type Notified = { notified: boolean };
    const listener = (operationStatus: Notified, ev: TransferProgressEvent): void => {
      operationStatus.notified = true;
      if (typeof ProgressEvent !== "undefined") {
        ev.should.not.be.instanceof(ProgressEvent);
      }
      ev.loadedBytes.should.be.a("Number");
    };

    it("for blob bodies", async function () {
      const payload = new Blob([new Uint8Array(1024 * 1024)]);
      const size = undefined;

      httpMock.post("/bigfileupload", async (_url, _method, _body) => {
        return {
          status: 250,
          body: payload,
          headers: { "Content-Type": "text/javascript", "Content-length": size },
        };
      });

      const upload: Notified = { notified: false };
      const download: Notified = { notified: false };

      const request = new WebResource(
        "/bigfileupload",
        "POST",
        payload,
        undefined,
        undefined,
        true,
        undefined,
        undefined,
        0,
        (ev) => listener(upload, ev),
        (ev) => listener(download, ev)
      );

      const client = new DefaultHttpClient();
      const response = await client.sendRequest(request);
      response.status.should.equal(250);
      if (response.blobBody) {
        await response.blobBody;
      } else if (typeof response.readableStreamBody === "function") {
        const streamBody = (response.readableStreamBody as () => any)();
        streamBody.on("data", () => {
          // Nothing to do here.
        });
        await new Promise((resolve, reject) => {
          streamBody.on("end", resolve);
          streamBody.on("error", reject);
        });
      }

      upload.notified.should.be.true;
      download.notified.should.be.true;
    });
  });
});
