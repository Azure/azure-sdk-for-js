let nock = require("nock");

module.exports.hash = "e7d8cc9c5e153fa623cb4c39c72283bd";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://joherediteststorage.table.core.windows.net:443", { encodedQueryParams: true })
  .post("/integration", {
    PartitionKey: "P5__node",
    RowKey: "R5",
    testField: 123,
    "testField@odata.type": "Edm.Int32"
  })
  .query(true)
  .reply(204, "", [
    "Cache-Control",
    "no-cache",
    "Content-Length",
    "0",
    "ETag",
    `W/"datetime'2020-08-21T14%3A06%3A15.8425368Z'"`,
    "Location",
    "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P5__node',RowKey='R5')",
    "Server",
    "Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "1e6b6f98-5002-000d-78c4-77bbd8000000",
    "x-ms-version",
    "2019-02-02",
    "X-Content-Type-Options",
    "nosniff",
    "Preference-Applied",
    "return-no-content",
    "DataServiceId",
    "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P5__node',RowKey='R5')",
    "Date",
    "Fri, 21 Aug 2020 14:06:15 GMT",
    "Connection",
    "close"
  ]);

nock("https://joherediteststorage.table.core.windows.net:443", { encodedQueryParams: true })
  .get("/integration(PartitionKey=%27P5__node%27,RowKey=%27R5%27)")
  .query(true)
  .reply(
    200,
    {
      "odata.metadata":
        "https://joherediteststorage.table.core.windows.net/$metadata#integration/@Element",
      "odata.etag": "W/\"datetime'2020-08-21T14%3A06%3A15.8425368Z'\"",
      PartitionKey: "P5__node",
      RowKey: "R5",
      Timestamp: "2020-08-21T14:06:15.8425368Z",
      testField: 123
    },
    [
      "Cache-Control",
      "no-cache",
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json;odata=minimalmetadata;streaming=true;charset=utf-8",
      "ETag",
      `W/"datetime'2020-08-21T14%3A06%3A15.8425368Z'"`,
      "Server",
      "Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0",
      "x-ms-request-id",
      "dd640fe3-f002-0044-4fc4-7788b8000000",
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
