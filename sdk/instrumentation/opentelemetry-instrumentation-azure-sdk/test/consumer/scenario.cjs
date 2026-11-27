// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const assert = require("node:assert/strict");
const TRACE_ID = "11111111111111111111111111111111";
const REMOTE_PARENT = "2222222222222222";

module.exports = async function scenario(express, BlobServiceClient, sdk, exporter) {
  const app = express();
  let storageRequests = 0;
  app.get("/containers", async (_request, response, next) => {
    try {
      const client = new BlobServiceClient(
        `http://127.0.0.1:${server.address().port}/storage`,
        undefined,
        {
          retryOptions: { maxTries: 1 },
          allowInsecureConnection: true,
        },
      );
      const containers = [];
      for await (const container of client.listContainers()) containers.push(container.name);
      response.json(containers);
    } catch (error) {
      next(error);
    }
  });
  app.get("/storage", (_request, response) => {
    storageRequests++;
    response.set({
      "content-type": "application/xml",
      "x-ms-request-id": "test-request",
      "x-ms-version": "2025-11-05",
    });
    response.send(
      '<?xml version="1.0"?><EnumerationResults ServiceEndpoint="http://localhost"><Containers><Container><Name>example</Name><Properties><Last-Modified>Wed, 01 Jan 2025 00:00:00 GMT</Last-Modified><Etag>test</Etag></Properties></Container></Containers><NextMarker /></EnumerationResults>',
    );
  });
  const server = app.listen(0, "127.0.0.1");
  try {
    await new Promise((resolve, reject) => {
      server.once("listening", resolve);
      server.once("error", reject);
    });
    const response = await fetch(`http://127.0.0.1:${server.address().port}/containers`, {
      headers: { traceparent: `00-${TRACE_ID}-${REMOTE_PARENT}-01` },
    });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), ["example"]);
    assert.equal(storageRequests, 1, "the Blob client must make one real local request");
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
    const spans = exporter.getFinishedSpans();
    const operations = spans.filter(
      (span) => span.name === "BlobServiceClient-listContainersSegment",
    );
    assert.equal(operations.length, 1, "one Azure Blob operation span must be emitted");
    const operation = operations[0];
    const route = spans.find((span) => span.name === "request handler - /containers");
    const root = spans.find((span) => span.name === "GET /containers");
    assert.ok(operation, "Azure Blob operation span is missing");
    assert.ok(route, "Express route span is missing");
    assert.ok(root, "HTTP server span is missing");
    assert.equal(operation.instrumentationScope.name, "@azure/storage-blob");
    assert.equal(operation.attributes["az.namespace"], "Microsoft.Storage");
    assert.equal(operation.parentSpanContext.spanId, route.spanContext().spanId);
    assert.equal(route.parentSpanContext.spanId, root.spanContext().spanId);
    assert.equal(root.parentSpanContext.spanId, REMOTE_PARENT);
    for (const span of [operation, route, root]) assert.equal(span.spanContext().traceId, TRACE_ID);
    const azureHttp = spans.filter((span) => span.name === "HTTP GET");
    assert.equal(azureHttp.length, 1, "one Azure pipeline HTTP span must be emitted");
    assert.equal(azureHttp[0].parentSpanContext.spanId, operation.spanContext().spanId);
    assert.equal(azureHttp[0].spanContext().traceId, TRACE_ID);
    process.stdout.write(
      JSON.stringify({ operation: operation.name, azureHttp: azureHttp.length, traceId: TRACE_ID }),
    );
  } finally {
    if (server.listening) await new Promise((resolve) => server.close(resolve));
    await sdk.shutdown();
  }
};
