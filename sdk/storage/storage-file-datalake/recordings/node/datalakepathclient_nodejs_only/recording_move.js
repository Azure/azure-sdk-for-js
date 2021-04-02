let nock = require('nock');

module.exports.hash = "cccf92d5105cee4cff0965d96594f51a";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160875819333308281","file":"file160875819343107060","destfile":"destfile160875819398501948"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819333308281')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:33 GMT',
  'ETag',
  '"0x8D8A788062E79DD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f5921c7-301e-0070-6b70-d9b64b000000',
  'x-ms-client-request-id',
  'a711e17c-0b7b-49c1-8448-a5aebd2e39d1',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 23 Dec 2020 21:16:33 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819333308281/file160875819343107060')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:33 GMT',
  'ETag',
  '"0x8D8A788066791C7"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd00c93ca-c01f-0008-2a70-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '5ae7534e-6e4c-4bdd-a3fe-9992649d41da',
  'Date',
  'Wed, 23 Dec 2020 21:16:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160875819333308281/file160875819343107060', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd00c93cb-c01f-0008-2b70-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'b269731b-9ef5-4f91-9f6d-5bad3673ad0d',
  'Date',
  'Wed, 23 Dec 2020 21:16:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160875819333308281/file160875819343107060')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:33 GMT',
  'ETag',
  '"0x8D8A788068398AF"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'd00c93cc-c01f-0008-2c70-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '9fc1bdf6-aca8-428f-8569-ca49e03d8799',
  'Date',
  'Wed, 23 Dec 2020 21:16:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819333308281/destfile160875819398501948')
  .query(true)
  .reply(201, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd00c93cd-c01f-0008-2d70-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'a4c79561-132a-414d-a297-796aacb8c3a9',
  'Date',
  'Wed, 23 Dec 2020 21:16:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160875819333308281/destfile160875819398501948')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:33 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8A788068398AF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f592304-301e-0070-1270-d9b64b000000',
  'x-ms-client-request-id',
  '09fc6322-3ed1-4600-b0f3-3b8c51ce5eca',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Wed, 23 Dec 2020 21:16:33 GMT',
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
  'Wed, 23 Dec 2020 21:16:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160875819333308281')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f592320-301e-0070-2970-d9b64b000000',
  'x-ms-client-request-id',
  'ff5c6be6-c7a7-4f22-b91b-c2f2ad3c45f6',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 23 Dec 2020 21:16:34 GMT'
]);
