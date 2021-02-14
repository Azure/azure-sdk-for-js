let nock = require('nock');

module.exports.hash = "3430e87eb1169f84e00a037e147e8567";

module.exports.testInfo = {"uniqueName":{"container":"container159842817503004660","blob":"blob159842817531505106"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159842817503004660')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:49:34 GMT',
  'ETag',
  '"0x8D8499493486368"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb73cbe7-401e-005a-6d7d-7b2b47000000',
  'x-ms-client-request-id',
  '192747fd-3aaf-4be0-b6d2-ec3a7e4108d3',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 26 Aug 2020 07:49:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159842817503004660/blob159842817531505106', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:49:35 GMT',
  'ETag',
  '"0x8D849949374E35D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6dc51104-101e-000a-4e7d-7be917000000',
  'x-ms-client-request-id',
  'abe04671-24f6-4081-b0c8-794d1b126a84',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-08-26T07:49:35.0823773Z',
  'Date',
  'Wed, 26 Aug 2020 07:49:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159842817503004660/blob159842817531505106', "100,200,300,400\n150,250,350,450\n")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'v9C7YWQTetukQaGSOQcgRQ==',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:49:35 GMT',
  'ETag',
  '"0x8D8499493A2B270"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb73cc20-401e-005a-167d-7b2b47000000',
  'x-ms-client-request-id',
  '6c442ff8-28d8-4d9b-a68c-8e252e25e580',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'gema9E3+zEY=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-08-26T07:49:35.3835904Z',
  'Date',
  'Wed, 26 Aug 2020 07:49:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/container159842817503004660/blob159842817531505106', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueryRequest><QueryType>SQL</QueryType><Expression>select * from BlobStorage</Expression></QueryRequest>")
  .query(true)
  .reply(304, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'ConditionNotMet',
  'x-ms-request-id',
  '6dc51127-101e-000a-687d-7be917000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '0b7e29af-ca25-4fce-bbfe-4f71a1cb7d91',
  'Date',
  'Wed, 26 Aug 2020 07:49:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159842817503004660')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb73cc43-401e-005a-327d-7b2b47000000',
  'x-ms-client-request-id',
  'd4656276-683a-4299-ad9a-86cdef2ac8f2',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 26 Aug 2020 07:49:35 GMT'
]);
