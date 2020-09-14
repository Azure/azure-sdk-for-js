let nock = require('nock');

module.exports.hash = "cb488a63fcc16612520ac256330f409d";

module.exports.testInfo = {"uniqueName":{"container":"container159842817649804325","blob":"blob159842817680508163"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159842817649804325')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:49:36 GMT',
  'ETag',
  '"0x8D8499494297ABB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6dc5114a-101e-000a-807d-7be917000000',
  'x-ms-client-request-id',
  'db282817-a705-433a-97f7-6d300f40ad1a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 26 Aug 2020 07:49:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159842817649804325/blob159842817680508163', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:49:36 GMT',
  'ETag',
  '"0x8D8499494588EEC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb73cc83-401e-005a-687d-7b2b47000000',
  'x-ms-client-request-id',
  'd94c2232-6eb0-4657-b19d-2d3161a0c394',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-08-26T07:49:36.5754376Z',
  'Date',
  'Wed, 26 Aug 2020 07:49:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159842817649804325/blob159842817680508163', "100,200,300,400\n150,250,350,450\n")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'v9C7YWQTetukQaGSOQcgRQ==',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:49:36 GMT',
  'ETag',
  '"0x8D8499494860FD1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6dc5116c-101e-000a-177d-7be917000000',
  'x-ms-client-request-id',
  '9d4103a2-cb0b-4edf-94b1-b9e13e3d5cfb',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'gema9E3+zEY=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-08-26T07:49:36.8736481Z',
  'Date',
  'Wed, 26 Aug 2020 07:49:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/container159842817649804325/blob159842817680508163', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueryRequest><QueryType>SQL</QueryType><Expression>select * from BlobStorage</Expression></QueryRequest>")
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.\nRequestId:eb73ccbc-401e-005a-177d-7b2b47000000\nTime:2020-08-26T07:49:37.1644306Z</Message><HeaderName>x-ms-lease-id</HeaderName><HeaderValue>invalid</HeaderValue></Error>", [
  'Content-Length',
  '327',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'x-ms-request-id',
  'eb73ccbc-401e-005a-177d-7b2b47000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '4525099c-3002-423c-96fc-8c587affe4c0',
  'Date',
  'Wed, 26 Aug 2020 07:49:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159842817649804325')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6dc51191-101e-000a-317d-7be917000000',
  'x-ms-client-request-id',
  '42e20c6b-701b-4c43-bd4f-38d42b47b75f',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 26 Aug 2020 07:49:37 GMT'
]);
