let nock = require('nock');

module.exports.hash = "8361469ce2e6d9b7f898fc18d6260ca4";

module.exports.testInfo = {"uniqueName":{"container":"container159549961348007419","blob":"blob159549961377409774","pageBlob":"pageBlob159549961436400331"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961348007419')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:12 GMT',
  'ETag',
  '"0x8D82EF1FC22A461"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429ae7-901e-002b-25da-60cd6c000000',
  'x-ms-client-request-id',
  '441a11c1-1256-446e-a253-788e118e1115',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:20:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961348007419/blob159549961377409774', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:12 GMT',
  'ETag',
  '"0x8D82EF1FC4FF395"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429af2-901e-002b-2fda-60cd6c000000',
  'x-ms-client-request-id',
  '0a9807b9-8dea-40de-9207-080c17f43076',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:20:12.8019349Z',
  'Date',
  'Thu, 23 Jul 2020 10:20:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961348007419/blob159549961377409774', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429b11-901e-002b-48da-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '59050718-f08f-4101-a4d9-e65d796f093d',
  'Date',
  'Thu, 23 Jul 2020 10:20:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961348007419/pageBlob159549961436400331')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:13 GMT',
  'ETag',
  '"0x8D82EF1FCAA31F2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429b21-901e-002b-55da-60cd6c000000',
  'x-ms-client-request-id',
  '5104b860-cca2-4988-90b2-1f9d402b3648',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:20:13.3933554Z',
  'Date',
  'Thu, 23 Jul 2020 10:20:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159549961348007419/pageBlob159549961436400331')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:10429b36-901e-002b-66da-60cd6c000000\nTime:2020-07-23T10:20:13.6878369Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429b36-901e-002b-66da-60cd6c000000',
  'x-ms-client-request-id',
  '340836be-848e-4a6e-a021-82ebc848c8bc',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 23 Jul 2020 10:20:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159549961348007419/pageBlob159549961436400331')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><PageList />", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:13 GMT',
  'ETag',
  '"0x8D82EF1FCAA31F2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429b43-901e-002b-72da-60cd6c000000',
  'x-ms-client-request-id',
  'af11e023-78d0-4bb1-91d7-b06c0af45290',
  'x-ms-version',
  '2019-12-12',
  'x-ms-blob-content-length',
  '512',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-blob-content-length,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 23 Jul 2020 10:20:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549961348007419')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429b5c-901e-002b-0ada-60cd6c000000',
  'x-ms-client-request-id',
  '481bb42a-91f6-45bd-8ed4-c04f847287d8',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:20:14 GMT'
]);
