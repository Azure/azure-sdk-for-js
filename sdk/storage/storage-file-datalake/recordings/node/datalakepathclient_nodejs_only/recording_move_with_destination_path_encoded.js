let nock = require('nock');

module.exports.hash = "d5e703bb5d9d0893d6298fa577759465";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160875819732703880","file":"file160875819742606114","dest file with & and 1/char":"dest file with & and 1/char160875819781104515"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819732703880')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:37 GMT',
  'ETag',
  '"0x8D8A78808900A0C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f592785-301e-0070-0970-d9b64b000000',
  'x-ms-client-request-id',
  'bde95c0d-0674-4c9f-b5a5-40eca094a0c6',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 23 Dec 2020 21:16:37 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819732703880/file160875819742606114')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:37 GMT',
  'ETag',
  '"0x8D8A78808A234AF"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd00c93e2-c01f-0008-3f70-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '03409f42-2080-4f9f-9ab8-e151dd444e50',
  'Date',
  'Wed, 23 Dec 2020 21:16:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160875819732703880/file160875819742606114', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd00c93e3-c01f-0008-4070-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '498646f4-5703-43ba-aff4-c07c5faf68d3',
  'Date',
  'Wed, 23 Dec 2020 21:16:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160875819732703880/file160875819742606114')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:37 GMT',
  'ETag',
  '"0x8D8A78808BE59A4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'd00c93e4-c01f-0008-4170-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '6b5afe31-c002-4a97-8519-54eeb1431a50',
  'Date',
  'Wed, 23 Dec 2020 21:16:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819732703880/dest%20file%20with%20%26%20and%201')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:37 GMT',
  'ETag',
  '"0x8D8A78808CC94C7"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd00c93e5-c01f-0008-4270-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '2c52671a-14dd-46ae-8cd9-117d0bd8f5bf',
  'Date',
  'Wed, 23 Dec 2020 21:16:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819732703880/dest%20file%20with%20%26%20and%201%2Fchar160875819781104515')
  .query(true)
  .reply(201, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd00c93e6-c01f-0008-4370-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '0b43659f-94f3-4b4a-b8e0-798718609c58',
  'Date',
  'Wed, 23 Dec 2020 21:16:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160875819732703880/dest%20file%20with%20%26%20and%201%2Fchar160875819781104515')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:37 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8A78808BE59A4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f592821-301e-0070-1370-d9b64b000000',
  'x-ms-client-request-id',
  '28a7cbe8-9ea1-461a-87fb-d08e70cc5a3b',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Wed, 23 Dec 2020 21:16:37 GMT',
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
  'Date',
  'Wed, 23 Dec 2020 21:16:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160875819732703880')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f592840-301e-0070-2770-d9b64b000000',
  'x-ms-client-request-id',
  '93534206-1a77-40ac-9d4a-addb272f947c',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 23 Dec 2020 21:16:38 GMT'
]);
