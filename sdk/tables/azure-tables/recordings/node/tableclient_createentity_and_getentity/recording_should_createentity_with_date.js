let nock = require("nock");

module.exports.hash = "cc070e6adab1362a8712ac880d2774c7";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://joherediteststorage.table.core.windows.net:443", { encodedQueryParams: true })
  .post("/integration", {
    PartitionKey: "P2__node",
    RowKey: "R2",
    testField: "2020-09-17T00:00:00.000Z",
    "testField@odata.type": "Edm.DateTime"
  })
  .query(true)
  .reply(204, "", [
    "Cache-Control",
    "no-cache",
    "Content-Length",
    "0",
    "ETag",
    `W/"datetime'2020-08-20T19%3A14%3A22.6952581Z'"`,
    "Location",
    "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P2__node',RowKey='R2')",
    "Server",
    "Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "1d18d391-5002-000d-1626-77bbd8000000",
    "x-ms-version",
    "2019-02-02",
    "X-Content-Type-Options",
    "nosniff",
    "Preference-Applied",
    "return-no-content",
    "DataServiceId",
    "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P2__node',RowKey='R2')",
    "Date",
    "Thu, 20 Aug 2020 19:14:22 GMT",
    "Connection",
    "close"
  ]);

nock("https://joherediteststorage.table.core.windows.net:443", { encodedQueryParams: true })
  .get("/integration(PartitionKey=%27P2__node%27,RowKey=%27R2%27)")
  .query(true)
  .reply(
    200,
    {
      "odata.metadata":
        "https://joherediteststorage.table.core.windows.net/$metadata#integration/@Element",
      "odata.etag": "W/\"datetime'2020-08-20T19%3A14%3A22.6952581Z'\"",
      PartitionKey: "P2__node",
      RowKey: "R2",
      Timestamp: "2020-08-20T19:14:22.6952581Z",
      "testField@odata.type": "Edm.DateTime",
      testField: "2020-09-17T00:00:00Z"
    },
    [
      "Cache-Control",
      "no-cache",
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json;odata=minimalmetadata;streaming=true;charset=utf-8",
      "ETag",
      `W/"datetime'2020-08-20T19%3A14%3A22.6952581Z'"`,
      "Server",
      "Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0",
      "x-ms-request-id",
      "2ca65a82-e002-0014-6c26-7797b0000000",
      "x-ms-version",
      "2019-02-02",
      "X-Content-Type-Options",
      "nosniff",
      "Access-Control-Expose-Headers",
      "x-ms-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding",
      "Access-Control-Allow-Origin",
      "*",
      "Date",
      "Thu, 20 Aug 2020 19:14:21 GMT",
      "Connection",
      "close"
    ]
  );
