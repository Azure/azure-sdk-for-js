let nock = require("nock");

module.exports.testInfo = {
  uniqueName: { container: "container157370433962705955", blob: "blob157370433995301553" },
  newDate: {}
};

nock("https://fakestorageaccount.blob.core.windows.net:443", { encodedQueryParams: true })
  .put("/container157370433962705955")
  .query(true)
  .reply(201, "", [
    "Content-Length",
    "0",
    "Last-Modified",
    "Thu, 14 Nov 2019 04:05:39 GMT",
    "ETag",
    '"0x8D768B7E950CD91"',
    "Server",
    "Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "7672ba61-b01e-0046-7ca0-9ab86a000000",
    "x-ms-client-request-id",
    "2a8a31d7-5a1b-4c2a-b119-3fb4558db724",
    "x-ms-version",
    "2019-02-02",
    "Date",
    "Thu, 14 Nov 2019 04:05:39 GMT"
  ]);

