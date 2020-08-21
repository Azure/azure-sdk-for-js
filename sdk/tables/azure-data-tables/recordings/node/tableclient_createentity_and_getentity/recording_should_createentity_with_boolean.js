let nock = require("nock");

module.exports.hash = "57fa50b1d0db0644ff3d7914b8f49a00";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://joherediteststorage.table.core.windows.net:443", { encodedQueryParams: true })
  .post("/integration", {
    PartitionKey: "P6__node",
    RowKey: "R6",
    testField: true,
    "testField@odata.type": "Edm.Boolean"
  })
  .query(true)
  .reply(204, "", [
    "Cache-Control",
    "no-cache",
    "Content-Length",
    "0",
    "ETag",
    `W/"datetime'2020-08-21T14%3A06%3A16.056525Z'"`,
    "Location",
    "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P6__node',RowKey='R6')",
    "Server",
    "Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "9c53674d-c002-012e-1ac4-779246000000",
    "x-ms-version",
    "2019-02-02",
    "X-Content-Type-Options",
    "nosniff",
    "Preference-Applied",
    "return-no-content",
    "DataServiceId",
    "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P6__node',RowKey='R6')",
    "Date",
    "Fri, 21 Aug 2020 14:06:15 GMT",
    "Connection",
    "close"
  ]);

nock("https://joherediteststorage.table.core.windows.net:443", { encodedQueryParams: true })
  .get("/integration(PartitionKey=%27P6__node%27,RowKey=%27R6%27)")
  .query(true)
  .reply(
    200,
    {
      "odata.metadata":
        "https://joherediteststorage.table.core.windows.net/$metadata#integration/@Element",
      "odata.etag": "W/\"datetime'2020-08-21T14%3A06%3A16.056525Z'\"",
      PartitionKey: "P6__node",
      RowKey: "R6",
      Timestamp: "2020-08-21T14:06:16.056525Z",
      testField: true
    },
    [
      "Cache-Control",
      "no-cache",
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json;odata=minimalmetadata;streaming=true;charset=utf-8",
      "ETag",
      `W/"datetime'2020-08-21T14%3A06%3A16.056525Z'"`,
      "Server",
      "Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0",
      "x-ms-request-id",
      "4fc9e52c-2002-004d-55c4-779236000000",
      "x-ms-version",
      "2019-02-02",
      "X-Content-Type-Options",
      "nosniff",
      "Access-Control-Expose-Headers",
      "x-ms-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding",
      "Access-Control-Allow-Origin",
      "*",
      "Date",
      "Fri, 21 Aug 2020 14:06:15 GMT",
      "Connection",
      "close"
    ]
  );
