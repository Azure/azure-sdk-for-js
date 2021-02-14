let nock = require('nock');

module.exports.hash = "a02a4136be7d42cb6fdb315eddbb2f95";

module.exports.testInfo = {"uniqueName":{"container":"container159218742963102288","blob":"blob159218742992007448"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742963102288')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:09 GMT',
  'ETag',
  '"0x8D810D2355AA63F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f47123c-701e-006e-29bb-42188f000000',
  'x-ms-client-request-id',
  '91251749-9247-4128-b8bf-0670c6d96d28',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:17:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742963102288/blob159218742992007448', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:10 GMT',
  'ETag',
  '"0x8D810D23586984D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfaa282-e01e-0021-1ebb-4269db000000',
  'x-ms-client-request-id',
  '71c42441-10e9-4a8c-96c3-bdec29d07c1b',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:17:10.0115021Z',
  'Date',
  'Mon, 15 Jun 2020 02:17:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742963102288/blob159218742992007448')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:10 GMT',
  'ETag',
  '"0x8D810D235B26B2A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f4713d5-701e-006e-31bb-42188f000000',
  'x-ms-client-request-id',
  '1d5b54e4-a130-4a25-97c2-9ab5302c1ddc',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:17:10.3007057Z',
  'Date',
  'Mon, 15 Jun 2020 02:17:10 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742963102288/blob159218742992007448')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:10 GMT',
  'ETag',
  '"0x8D810D235DDEFD3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfaa359-e01e-0021-6cbb-4269db000000',
  'x-ms-client-request-id',
  '30ca621d-9de1-43f4-aea0-d749c51d8eb7',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-15T02:17:10.5859067Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 15 Jun 2020 02:17:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218742963102288')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f47156c-701e-006e-39bb-42188f000000',
  'x-ms-client-request-id',
  '23bfeb79-7475-4832-bec9-3432a6157335',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:17:10 GMT'
]);
