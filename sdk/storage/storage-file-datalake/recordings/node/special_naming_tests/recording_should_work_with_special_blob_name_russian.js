let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash157534398126805968","ру́сский язы́к":"ру́сский язы́к157534398241003585"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534398126805968')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:03 GMT',
  'ETag',
  '"0x8D777A0AABDE0C9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a31382ed-a01e-0009-7d89-a95f10000000',
  'x-ms-client-request-id',
  'd22a9082-9f1d-4aa1-9000-6f2083b08947',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:03 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534398126805968/%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA157534398241003585')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:27:05 GMT',
  'ETag',
  '"0x8D777A0AB6D1F42"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e4d5c949-a01f-008a-7189-a9ffbd000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '7af0acfc-8910-4b83-81ae-a07b9d5ca611',
  'Date',
  'Tue, 03 Dec 2019 03:27:04 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash157534398126805968/%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA157534398241003585')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:05 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A0AB6D1F42"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e24c4a4e-f01e-0099-7489-a9ca5c000000',
  'x-ms-client-request-id',
  '72ccff1c-d6b5-434b-ae60-f3216d552503',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:27:05 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:27:05 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash157534398126805968')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D777A0AB6D1F42","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:27:05 GMT","name":"ру́сский язы́к157534398241003585","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b1479318-301f-0043-7389-a96f77000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '24a16b73-b291-4ed7-be93-fe65610f43df',
  'Date',
  'Tue, 03 Dec 2019 03:27:06 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash157534398126805968')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a3139385-a01e-0009-7989-a95f10000000',
  'x-ms-client-request-id',
  '618bcb7a-18f1-485a-94ed-8b0d6266ad45',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:07 GMT' ]);
