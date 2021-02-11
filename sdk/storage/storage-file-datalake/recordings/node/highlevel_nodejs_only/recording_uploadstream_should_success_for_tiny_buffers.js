let nock = require("nock");

module.exports.hash = "a798f5bd3bb4ac6cbcbdbd562be8344f";

module.exports.testInfo = {
  uniqueName: { filesystem: "filesystem158368240303101231", file: "file158368240305602690" },
  newDate: {}
};

nock("https://fakestorageaccount.blob.core.windows.net:443", { encodedQueryParams: true })
  .put("/filesystem158368240303101231")
  .query(true)
  .reply(201, "", [
    "Content-Length",
    "0",
    "Last-Modified",
    "Sun, 08 Mar 2020 15:46:43 GMT",
    "ETag",
    '"0x8D7C377E6693303"',
    "Server",
    "Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "679f2e90-601e-0014-3960-f586fa000000",
    "x-ms-client-request-id",
    "8eeb83c9-f591-48dc-b090-dc244cbf0e6a",
    "x-ms-version",
    "2019-07-07",
    "Date",
    "Sun, 08 Mar 2020 15:46:42 GMT"
  ]);
