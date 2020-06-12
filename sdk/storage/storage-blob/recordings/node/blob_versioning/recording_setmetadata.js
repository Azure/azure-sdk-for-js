let nock = require('nock');

module.exports.hash = "a02a4136be7d42cb6fdb315eddbb2f95";

module.exports.testInfo = {"uniqueName":{"container":"container158459901794700068","blob":"blob158459901818509666"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901794700068')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:38 GMT',
  'ETag',
  '"0x8D7CBCE0F8A3DB9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e572c-b01e-0088-56b6-fd3fcb000000',
  'x-ms-client-request-id',
  '953ac2d3-5d0c-4fc8-a850-3db4276e5312',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901794700068/blob158459901818509666', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:38 GMT',
  'ETag',
  '"0x8D7CBCE0FAEDC1E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b92e1-701e-005c-1ab6-fd8f9a000000',
  'x-ms-client-request-id',
  '15a4bfcf-2827-4ab2-9202-1012c2f2690e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:38.3033886Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901794700068/blob158459901818509666')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:38 GMT',
  'ETag',
  '"0x8D7CBCE0FD4453E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e57e3-b01e-0088-72b6-fd3fcb000000',
  'x-ms-client-request-id',
  'c7004baa-9f8c-4bcd-888e-431485e195b9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:38.5505639Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901794700068/blob158459901818509666')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:38 GMT',
  'ETag',
  '"0x8D7CBCE0FF96034"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b93ae-701e-005c-54b6-fd8f9a000000',
  'x-ms-client-request-id',
  '5d243375-ca2b-4ff9-ae2c-f9d8ef438db9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-19T06:23:38.7927364Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 19 Mar 2020 06:23:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459901794700068')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e588b-b01e-0088-07b6-fd3fcb000000',
  'x-ms-client-request-id',
  '8d6a2723-0a7d-4e33-9465-5230221b28c2',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:38 GMT'
]);
