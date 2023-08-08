let nock = require('nock');

module.exports.hash = "02d83b7e0465f1e453b047a48c68a38f";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154753928603879","file":"file169154753942203341"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753928603879')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:58 GMT',
  'ETag',
  '"0x8DB987EFD6575A9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c273b2-101e-002e-8067-caab16000000',
  'x-ms-client-request-id',
  'e40c39c6-bf42-4a2c-8114-49fc0e346d10',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:57 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753928603879/file169154753942203341')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:58 GMT',
  'ETag',
  '"0x8DB987EFD7B8663"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f167461c-f01f-0054-2367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'b19d21ba-ac2b-4f51-9d37-8c19e9bad160',
  'Date',
  'Wed, 09 Aug 2023 02:18:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154753928603879/file169154753942203341', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674622-f01f-0054-2967-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '688cda7c-2829-4ba8-b1ad-bb202b59284c',
  'Date',
  'Wed, 09 Aug 2023 02:18:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154753928603879/file169154753942203341')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:59 GMT',
  'ETag',
  '"0x8DB987EFDA3CA47"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'f1674629-f01f-0054-3067-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'cb5df216-2688-4184-b6eb-2bed0f9aea23',
  'Date',
  'Wed, 09 Aug 2023 02:18:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753928603879/file169154753942203341')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211393017650',
  'x-ms-request-id',
  'f1674630-f01f-0054-3767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '0cfa24bc-ecc6-4d3a-8e38-ccd7ebbec7aa',
  'Date',
  'Wed, 09 Aug 2023 02:18:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753928603879')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c273fb-101e-002e-3567-caab16000000',
  'x-ms-client-request-id',
  '12d4a10d-2f5e-48b6-8093-65dcd2334a04',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:58 GMT'
]);
