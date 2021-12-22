import { assert } from "chai";
import { createFetchHttpClient } from "../../src/fetchHttpClient";
import { createPipelineRequest } from "../../src/pipelineRequest";
import { createServer, Registry, Server, Response } from "miragejs";
import { AnyModels, AnyFactories } from "miragejs/-types";
import { delay } from "../../src/util/helpers";

// const createResponse = async (body: any, status: number, delayInMs: number = 0) => {
//   await delay(delayInMs);
//   const mockResponse = new Response(JSON.stringify(body), {
//     status,
//     headers: {
//       "Content-type": "application/json",
//     },
//   });

//   return mockResponse;
// };

describe.only("FetchHttpClient", function () {
  let server: Server<Registry<AnyModels, AnyFactories>>;

  beforeEach(() => {
    server = createServer({ urlPrefix: "https://localhost" });
  });

  afterEach(() => {
    server.shutdown();
  });

  it("shouldn't throw on 404", async function () {
    server.get("/404", () => {
      return new Response(404);
    });

    const client = createFetchHttpClient();

    const request = createPipelineRequest({ url: "https://localhost/404" });
    const response = await client.sendRequest(request);
    assert.strictEqual(response.status, 404);
  });

  it("should allow canceling of requests", async function () {
    server.get("/abort", async () => {
      await delay(1000);
      return new Response(404);
    });
    const client = createFetchHttpClient();
    const controller = new AbortController();
    const request = createPipelineRequest({
      url: "https://localhost/abort",
      abortSignal: controller.signal,
    });

    const promise = client.sendRequest(request);
    controller.abort();

    try {
      await promise;
      assert.fail(`Expected await to throw`);
    } catch (e) {
      assert.strictEqual(e.name, "AbortError");
    }
  });

  it("shouldn't be affected by requests cancelled late", async function () {
    server.get("/abort", async () => {
      return new Response(200);
    });
    const client = createFetchHttpClient();
    const controller = new AbortController();

    const request = createPipelineRequest({
      url: "https://localhost/abort",
      abortSignal: controller.signal,
    });
    const promise = client.sendRequest(request);
    const response = await promise;
    controller.abort();
    assert.strictEqual(response.status, 200);
  });

  it("should allow canceling of requests before the request is made", async function () {
    server.get("/abort", async () => {
      return new Response(200);
    });

    const client = createFetchHttpClient();
    const controller = new AbortController();
    controller.abort();
    const request = createPipelineRequest({
      url: "https://localhost/abort",
      abortSignal: controller.signal,
    });
    const promise = client.sendRequest(request);
    try {
      await promise;
      assert.fail("Expected await to throw");
    } catch (e) {
      assert.strictEqual(e.name, "AbortError");
    }
  });

  it("should report upload and download progress", async function () {
    const responseText = "An appropriate response.";
    server.post("/progress", async () => {
      return new Response(
        200,
        {},
        new ReadableStream({
          start: (controller) => {
            controller.enqueue([1, 2, 3, 4, 5, 6, 7, 8]);
            controller.close();
          },
        })
      );
    });

    const client = createFetchHttpClient();
    let downloadCalled = false;
    let uploadCalled = false;
    const request = createPipelineRequest({
      url: "https://localhost/progress",
      method: "POST",
      body: "Some kinda witty message",
      onDownloadProgress: (ev) => {
        assert.isNumber(ev.loadedBytes);
        downloadCalled = true;
      },
      onUploadProgress: (ev) => {
        assert.isNumber(ev.loadedBytes);
        uploadCalled = true;
      },
    });
    const promise = client.sendRequest(request);
    const response = await promise;
    assert.strictEqual(response.bodyAsText, responseText);
    assert.isTrue(downloadCalled, "no download progress");
    assert.isTrue(uploadCalled, "no upload progress");
  });
});
