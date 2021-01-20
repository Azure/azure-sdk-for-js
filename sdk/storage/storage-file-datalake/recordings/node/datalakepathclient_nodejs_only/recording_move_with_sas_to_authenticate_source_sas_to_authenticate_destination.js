let nock = require('nock');

module.exports.hash = "075ab402250accd9beb1a101d5015235";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160875819960408714","file":"file160875819975909553","destfile":"destfile160875820015804914"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819960408714')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:39 GMT',
  'ETag',
  '"0x8D8A78809ED18E2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f592a71-301e-0070-7070-d9b64b000000',
  'x-ms-client-request-id',
  '455aaad9-e44d-488c-9fed-7759ec1c64ed',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 23 Dec 2020 21:16:39 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819960408714/file160875819975909553')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:39 GMT',
  'ETag',
  '"0x8D8A7880A0A711B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd00c93f1-c01f-0008-4e70-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'fabc3871-4df9-4d54-9935-a70dd5c9b96f',
  'Date',
  'Wed, 23 Dec 2020 21:16:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160875819960408714/file160875819975909553', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd00c93f2-c01f-0008-4f70-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'dba0998f-5250-45b8-aecc-6f2d494168a9',
  'Date',
  'Wed, 23 Dec 2020 21:16:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160875819960408714/file160875819975909553')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:40 GMT',
  'ETag',
  '"0x8D8A7880A2F3F8F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'd00c93f3-c01f-0008-5070-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '16b4dac7-e114-476b-929f-1d2dd037432b',
  'Date',
  'Wed, 23 Dec 2020 21:16:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819960408714/destfile160875820015804914')
  .query(true)
  .reply(201, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd00c93f4-c01f-0008-5170-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'f8611379-95aa-4a7b-b32f-ba934418f267',
  'Date',
  'Wed, 23 Dec 2020 21:16:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160875819960408714/destfile160875820015804914')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:40 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8A7880A2F3F8F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f592b45-301e-0070-2870-d9b64b000000',
  'x-ms-client-request-id',
  '87cea905-9b11-4ee4-a1f2-4b498169265c',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Wed, 23 Dec 2020 21:16:39 GMT',
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
  'Wed, 23 Dec 2020 21:16:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160875819960408714')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f592b5d-301e-0070-3a70-d9b64b000000',
  'x-ms-client-request-id',
  'e8580bd9-55d2-455f-995e-90aae1cf3c59',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 23 Dec 2020 21:16:40 GMT'
]);
