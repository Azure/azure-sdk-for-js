let nock = require('nock');

module.exports.hash = "e398b7bcabf21c191b9670bc84a4fc30";

module.exports.testInfo = {"uniqueName":{"container":"container158459901672706413","blob":"blob158459901696704278","copiedblob":"copiedblob158459901745702616"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901672706413')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:36 GMT',
  'ETag',
  '"0x8D7CBCE0ECFF5AA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b9026-701e-005c-1eb6-fd8f9a000000',
  'x-ms-client-request-id',
  'f104b9b5-248d-4a04-ad6d-43cd54288c1d',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901672706413/blob158459901696704278', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:37 GMT',
  'ETag',
  '"0x8D7CBCE0EF52E44"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e55d1-b01e-0088-29b6-fd3fcb000000',
  'x-ms-client-request-id',
  '26737cca-f85e-439f-8570-3ec7b029cc2b',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:37.0865220Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901672706413/blob158459901696704278')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:37 GMT',
  'ETag',
  '"0x8D7CBCE0F1AE597"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b90ea-701e-005c-46b6-fd8f9a000000',
  'x-ms-client-request-id',
  'db1cbd1e-f99e-4038-bdc8-aa6bbe4fb89b',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:37.3356992Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901672706413/copiedblob158459901745702616')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:37 GMT',
  'ETag',
  '"0x8D7CBCE0F409CE5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e568d-b01e-0088-47b6-fd3fcb000000',
  'x-ms-client-request-id',
  'c72b3194-a8cf-4d4d-8d2b-2102e19ff48b',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-19T06:23:37.5818746Z',
  'x-ms-copy-id',
  '6b333786-1dd4-452d-8ed5-e6a48eb7c838',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 19 Mar 2020 06:23:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459901672706413')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b91bc-701e-005c-06b6-fd8f9a000000',
  'x-ms-client-request-id',
  '8307f037-3e1e-4daa-b706-5132be449766',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:37 GMT'
]);
