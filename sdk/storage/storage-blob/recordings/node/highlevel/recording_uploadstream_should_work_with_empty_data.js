let nock = require("nock");

module.exports.hash = "a517c9a2f9f67f81c0cd8de67eb9a59a";

module.exports.testInfo = {
  uniqueName: { container: "container159772298263601342", blob: "blob159772298403602413" },
  newDate: {}
};

nock("https://fakestorageaccount.blob.core.windows.net:443", { encodedQueryParams: true })
  .put("/container159772298263601342")
  .query(true)
  .reply(201, "", [
    "Content-Length",
    "0",
    "Last-Modified",
    "Tue, 18 Aug 2020 03:56:23 GMT",
    "ETag",
    '"0x8D8432AACA77E16"',
    "Server",
    "Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "2c049f87-d01e-0000-3d13-75a20f000000",
    "x-ms-client-request-id",
    "721da96e-ab9d-4324-8192-0f16c3051150",
    "x-ms-version",
    "2019-12-12",
    "Date",
    "Tue, 18 Aug 2020 03:56:23 GMT"
  ]);

nock("https://fakestorageaccount.blob.core.windows.net:443", { encodedQueryParams: true })
  .put(
    "/container159772298263601342/blob159772298403602413",
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><BlockList/>'
  )
  .query(true)
  .reply(201, "", [
    "Content-Length",
    "0",
    "Last-Modified",
    "Tue, 18 Aug 2020 03:56:24 GMT",
    "ETag",
    '"0x8D8432AACDA8B35"',
    "Server",
    "Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "2c04a00e-d01e-0000-2c13-75a20f000000",
    "x-ms-client-request-id",
    "874c8f27-f51c-41ea-b3cd-53ea06463ba7",
    "x-ms-version",
    "2019-12-12",
    "x-ms-content-crc64",
    "UYWRAwEVYrM=",
    "x-ms-request-server-encrypted",
    "true",
    "Date",
    "Tue, 18 Aug 2020 03:56:23 GMT"
  ]);

nock("https://fakestorageaccount.blob.core.windows.net:443", { encodedQueryParams: true })
  .get("/container159772298263601342/blob159772298403602413")
  .reply(200, "", [
    "Content-Length",
    "0",
    "Content-Type",
    "application/octet-stream",
    "Last-Modified",
    "Tue, 18 Aug 2020 03:56:24 GMT",
    "Accept-Ranges",
    "bytes",
    "ETag",
    '"0x8D8432AACDA8B35"',
    "Server",
    "Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "2c04a0da-d01e-0000-6013-75a20f000000",
    "x-ms-client-request-id",
    "4cbb8da9-90aa-4ca3-be1a-3eab375baf75",
    "x-ms-version",
    "2019-12-12",
    "x-ms-creation-time",
    "Tue, 18 Aug 2020 03:56:24 GMT",
    "x-ms-lease-status",
    "unlocked",
    "x-ms-lease-state",
    "available",
    "x-ms-blob-type",
    "BlockBlob",
    "x-ms-server-encrypted",
    "true",
    "Access-Control-Expose-Headers",
    "x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding",
    "Access-Control-Allow-Origin",
    "*",
    "Date",
    "Tue, 18 Aug 2020 03:56:23 GMT"
  ]);

nock("https://fakestorageaccount.blob.core.windows.net:443", { encodedQueryParams: true })
  .delete("/container159772298263601342")
  .query(true)
  .reply(202, "", [
    "Content-Length",
    "0",
    "Server",
    "Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "2c04a192-d01e-0000-7413-75a20f000000",
    "x-ms-client-request-id",
    "9ce68bad-6fd5-4f55-a7ea-42f1038e24b2",
    "x-ms-version",
    "2019-12-12",
    "Date",
    "Tue, 18 Aug 2020 03:56:24 GMT"
  ]);
