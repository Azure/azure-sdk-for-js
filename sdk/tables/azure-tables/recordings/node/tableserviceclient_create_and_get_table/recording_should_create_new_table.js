let nock = require("nock");

module.exports.hash = "d6b7fc64e253cada2c9c4dcb1176555e";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://joherediteststorage.table.core.windows.net:443", { encodedQueryParams: true })
  .post("/Tables", { TableName: "testTablenode" })
  .query(true)
  .reply(
    201,
    {
      "odata.metadata":
        "https://joherediteststorage.table.core.windows.net/$metadata#Tables/@Element",
      TableName: "testTablenode"
    },
    [
      "Cache-Control",
      "no-cache",
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json;odata=minimalmetadata;streaming=true;charset=utf-8",
      "Location",
      "https://joherediteststorage.table.core.windows.net/Tables('testTablenode')",
      "Server",
      "Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0",
      "x-ms-request-id",
      "2dd4759e-e002-0014-0bc4-7797b0000000",
      "x-ms-version",
      "2019-02-02",
      "X-Content-Type-Options",
      "nosniff",
      "Preference-Applied",
      "return-content",
      "Date",
      "Fri, 21 Aug 2020 14:06:16 GMT",
      "Connection",
      "close"
    ]
  );

nock("https://joherediteststorage.table.core.windows.net:443", { encodedQueryParams: true })
  .get("/Tables")
  .query(true)
  .reply(
    200,
    {
      "odata.metadata": "https://joherediteststorage.table.core.windows.net/$metadata#Tables",
      value: [
        { TableName: "integration" },
        { TableName: "test1" },
        { TableName: "TestTable" },
        { TableName: "testTablenode" }
      ]
    },
    [
      "Cache-Control",
      "no-cache",
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json;odata=minimalmetadata;streaming=true;charset=utf-8",
      "Server",
      "Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0",
      "x-ms-request-id",
      "0f1824dc-9002-005f-44c4-77a62a000000",
      "x-ms-version",
      "2019-02-02",
      "X-Content-Type-Options",
      "nosniff",
      "Access-Control-Expose-Headers",
      "x-ms-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding",
      "Access-Control-Allow-Origin",
      "*",
      "Date",
      "Fri, 21 Aug 2020 14:06:15 GMT",
      "Connection",
      "close"
    ]
  );
