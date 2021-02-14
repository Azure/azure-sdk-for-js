let nock = require('nock');

module.exports.hash = "c3f7171fc37c565be96c4886a01aeb79";

module.exports.testInfo = {"uniqueName":{"container":"container159218742674901684","blob":"blob159218742703506211"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742674901684')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:06 GMT',
  'ETag',
  '"0x8D810D233A29356"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f470b3c-701e-006e-07bb-42188f000000',
  'x-ms-client-request-id',
  'd670e748-c3d7-40f7-825f-685d4476b781',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:17:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742674901684/blob159218742703506211', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:07 GMT',
  'ETag',
  '"0x8D810D233CE3828"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa9e96-e01e-0021-75bb-4269db000000',
  'x-ms-client-request-id',
  'f08f1993-bef1-4c32-8bbb-68678d5b7747',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:17:07.1254568Z',
  'Date',
  'Mon, 15 Jun 2020 02:17:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742674901684/blob159218742703506211')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:07 GMT',
  'ETag',
  '"0x8D810D233F9BCCE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f470c8c-701e-006e-42bb-42188f000000',
  'x-ms-client-request-id',
  '5a5612ce-dcb8-422a-85a5-b8f0c8f6b3ea',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:17:07.4116574Z',
  'Date',
  'Mon, 15 Jun 2020 02:17:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742674901684/blob159218742703506211', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:07 GMT',
  'ETag',
  '"0x8D810D234258FAA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa9f2a-e01e-0021-02bb-4269db000000',
  'x-ms-client-request-id',
  '2f5aa1f6-a873-445e-b81f-07dd43e977ad',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:17:07.6988602Z',
  'Date',
  'Mon, 15 Jun 2020 02:17:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218742674901684')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f470de8-701e-006e-0fbb-42188f000000',
  'x-ms-client-request-id',
  '17e172c3-3c3d-441f-85d5-16c93f9ebeaf',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:17:07 GMT'
]);
