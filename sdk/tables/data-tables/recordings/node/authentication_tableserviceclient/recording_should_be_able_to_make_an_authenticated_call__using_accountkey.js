let nock = require("nock");

module.exports.hash = "d65d622b11478f6f2d9ca221448e103f";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://fakestorageaccount.table.core.windows.net:443", { encodedQueryParams: true })
  .post("/Tables", { TableName: "Table1599148529817" })
  .reply(
    201,
    {
      "odata.metadata":
        "https://fakestorageaccount.table.core.windows.net/$metadata#Tables/@Element",
      TableName: "Table1599148529817"
    },
    [
      "Cache-Control",
      "no-cache",
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json;odata=minimalmetadata;streaming=true;charset=utf-8",
      "Location",
      "https://fakestorageaccount.table.core.windows.net/Tables('Table1599148529817')",
      "Server",
      "Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0",
      "x-ms-request-id",
      "17f80bc5-7002-00ff-490a-82694c000000",
      "x-ms-client-request-id",
      "d3ffa5bd-f870-42fa-a7f3-3c0d5ec2a3ce",
      "x-ms-version",
      "2019-02-02",
      "X-Content-Type-Options",
      "nosniff",
      "Preference-Applied",
      "return-content",
      "Date",
      "Thu, 03 Sep 2020 15:55:28 GMT"
    ]
  );
