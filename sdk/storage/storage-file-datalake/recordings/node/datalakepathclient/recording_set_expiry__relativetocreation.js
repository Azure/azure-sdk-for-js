let nock = require('nock');

module.exports.hash = "4f32566919e5d600e90893cd6a3c2650";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159230253377906386","file":"file159230253407400656"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159230253377906386')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:33 GMT',
  'ETag',
  '"0x8D811DE34BD963C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2363664a-001e-000e-24c7-430c19000000',
  'x-ms-client-request-id',
  '7fdb477a-a076-43eb-b462-e5a4bf091608',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 16 Jun 2020 10:15:33 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159230253377906386/file159230253407400656')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:34 GMT',
  'ETag',
  '"0x8D811DE34E9F65E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '386419ed-101f-005f-46c7-439195000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '1a390f63-ab5f-47e4-8c4b-33b3958b8b88',
  'Date',
  'Tue, 16 Jun 2020 10:15:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159230253377906386/file159230253407400656', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '386419ee-101f-005f-47c7-439195000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '723e59de-576d-446a-ba0a-04e722a1aa09',
  'Date',
  'Tue, 16 Jun 2020 10:15:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159230253377906386/file159230253407400656')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:34 GMT',
  'ETag',
  '"0x8D811DE354288D0"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '386419ef-101f-005f-48c7-439195000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'bd42659c-4953-4b94-99f8-7bf07e17f364',
  'Date',
  'Tue, 16 Jun 2020 10:15:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159230253377906386/file159230253407400656')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:34 GMT',
  'ETag',
  '"0x8D811DE354288D0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '236366ca-001e-000e-1dc7-430c19000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '08fb4ef2-a164-48ee-81a0-898a1aed8dc7',
  'Date',
  'Tue, 16 Jun 2020 10:15:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159230253377906386/file159230253407400656')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:34 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D811DE354288D0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '23636703-001e-000e-4dc7-430c19000000',
  'x-ms-client-request-id',
  'e6abc96f-c172-4f0e-abcf-f12321ae83a7',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Tue, 16 Jun 2020 10:15:34 GMT',
  'x-ms-expiry-time',
  'Tue, 16 Jun 2020 11:15:34 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-expiry-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 16 Jun 2020 10:15:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159230253377906386')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2363671d-001e-000e-64c7-430c19000000',
  'x-ms-client-request-id',
  '7d33cda0-da93-4c30-85a0-1b987e9a5f4e',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 16 Jun 2020 10:15:35 GMT'
]);
