let nock = require("nock");

module.exports.hash = "26b61eb349e8e6445724e00bcbad76be";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://fakestorageaccount.table.core.windows.net:443", { encodedQueryParams: true })
  .post("/integration", { PartitionKey: "AuthTest", RowKey: "1599148530349", foo: 1599148530349 })
  .reply(204, "", [
    "Cache-Control",
    "no-cache",
    "Content-Length",
    "0",
    "ETag",
    `W/"datetime'2020-09-03T15%3A55%3A30.4398697Z'"`,
    "Location",
    "https://fakestorageaccount.table.core.windows.net/integration(PartitionKey='AuthTest',RowKey='1599148530349')",
    "Server",
    "Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "00ed6a33-a002-0075-6b0a-82d36f000000",
    "x-ms-client-request-id",
    "2f0848d0-a636-494d-a593-f19c6b44802a",
    "x-ms-version",
    "2019-02-02",
    "X-Content-Type-Options",
    "nosniff",
    "Preference-Applied",
    "return-no-content",
    "DataServiceId",
    "https://fakestorageaccount.table.core.windows.net/integration(PartitionKey='AuthTest',RowKey='1599148530349')",
    "Date",
    "Thu, 03 Sep 2020 15:55:29 GMT"
  ]);
