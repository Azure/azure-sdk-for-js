let nock = require("nock");

module.exports.hash = "03abd5e158b7a7e6a14858666d0cae67";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://joherediteststorage.table.core.windows.net:443", { encodedQueryParams: true })
  .post("/integration", {
    PartitionKey: "P8__node",
    RowKey: "R8",
    integerNumber: 3,
    floatingPointNumber: 3.14
  })
  .query(true)
  .reply(204, "", [
    "Cache-Control",
    "no-cache",
    "Content-Length",
    "0",
    "ETag",
    `W/"datetime'2020-08-21T19%3A53%3A16.8185874Z'"`,
    "Location",
    "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P8__node',RowKey='R8')",
    "Server",
    "Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "ade4e062-f002-0000-02f4-7754d4000000",
    "x-ms-version",
    "2019-02-02",
    "X-Content-Type-Options",
    "nosniff",
    "Preference-Applied",
    "return-no-content",
    "DataServiceId",
    "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P8__node',RowKey='R8')",
    "Date",
    "Fri, 21 Aug 2020 19:53:16 GMT",
    "Connection",
    "close"
  ]);

nock("https://joherediteststorage.table.core.windows.net:443", { encodedQueryParams: true })
  .get("/integration(PartitionKey=%27P8__node%27,RowKey=%27R8%27)")
  .query(true)
  .reply(
    200,
    {
      "odata.metadata":
        "https://joherediteststorage.table.core.windows.net/$metadata#integration/@Element",
      "odata.etag": "W/\"datetime'2020-08-21T19%3A53%3A16.8185874Z'\"",
      PartitionKey: "P8__node",
      RowKey: "R8",
      Timestamp: "2020-08-21T19:53:16.8185874Z",
      integerNumber: 3,
      floatingPointNumber: 3.14
    },
    [
      "Cache-Control",
      "no-cache",
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json;odata=minimalmetadata;streaming=true;charset=utf-8",
      "ETag",
      `W/"datetime'2020-08-21T19%3A53%3A16.8185874Z'"`,
      "Server",
      "Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0",
      "x-ms-request-id",
      "8548ce18-4002-00fc-7cf4-776a4b000000",
      "x-ms-version",
      "2019-02-02",
      "X-Content-Type-Options",
      "nosniff",
      "Access-Control-Expose-Headers",
      "x-ms-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding",
      "Access-Control-Allow-Origin",
      "*",
      "Date",
      "Fri, 21 Aug 2020 19:53:16 GMT",
      "Connection",
      "close"
    ]
  );
