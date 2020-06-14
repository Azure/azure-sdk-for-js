let nock = require('nock');

module.exports.hash = "61459601926d3ae8244cf9c706f3ee1c";

module.exports.testInfo = {"uniqueName":{"container":"container159212881463608430","blob":"blob159212881477103032"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159212881463608430')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 10:00:14 GMT',
  'ETag',
  '"0x8D81049BC1DC653"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5c69d39a-301e-0050-2932-428ff0000000',
  'x-ms-client-request-id',
  '3279ce28-dac4-4a6c-b8f2-ba1f078916ff',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 10:00:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159212881463608430/blob159212881477103032', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 10:00:14 GMT',
  'ETag',
  '"0x8D81049BC23709F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5c69d3d1-301e-0050-4e32-428ff0000000',
  'x-ms-client-request-id',
  'dd33e5df-ba3b-4523-b0a4-764238c95a81',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T10:00:14.8021407Z',
  'Date',
  'Sun, 14 Jun 2020 10:00:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159212881463608430/blob159212881477103032')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Sun, 14 Jun 2020 10:00:14 GMT',
  'ETag',
  '"0x8D81049BC26CCA0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5c69d3e5-301e-0050-5b32-428ff0000000',
  'x-ms-client-request-id',
  'df4ffe0c-51d9-4837-ab2d-094df9e7c2bd',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T10:00:14.8261571Z',
  'Date',
  'Sun, 14 Jun 2020 10:00:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159212881463608430')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5c69d3fe-301e-0050-6c32-428ff0000000',
  'x-ms-client-request-id',
  '04722bae-f7c1-4c41-9373-e2d6e8719b88',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 10:00:14 GMT'
]);
