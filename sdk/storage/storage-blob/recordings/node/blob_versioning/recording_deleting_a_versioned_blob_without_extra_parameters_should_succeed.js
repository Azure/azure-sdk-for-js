let nock = require('nock');

module.exports.hash = "20cc456e0374a6511f10ecd16ac23b06";

module.exports.testInfo = {"uniqueName":{"container":"container158459900995505704","blob":"blob158459901037808615"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900995505704')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:30 GMT',
  'ETag',
  '"0x8D7CBCE0AD6D774"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4cad-b01e-0088-12b6-fd3fcb000000',
  'x-ms-client-request-id',
  '47ab8233-939f-46dc-8aa2-a7c1b7baff32',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900995505704/blob158459901037808615', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:30 GMT',
  'ETag',
  '"0x8D7CBCE0B09A8D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b85a5-701e-005c-3ab6-fd8f9a000000',
  'x-ms-client-request-id',
  'ab1ac37f-58a5-4a0d-8c4c-ae0a311d511f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:30.5098451Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900995505704/blob158459901037808615')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:30 GMT',
  'ETag',
  '"0x8D7CBCE0B35A2D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4d77-b01e-0088-3bb6-fd3fcb000000',
  'x-ms-client-request-id',
  'dd9287b1-14a9-4a53-8e07-5c21d74cf7a9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:30.7990499Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459900995505704/blob158459901037808615')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b86a4-701e-005c-21b6-fd8f9a000000',
  'x-ms-client-request-id',
  '7cd3e246-d1a6-41cf-9794-bbb62c114655',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 19 Mar 2020 06:23:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158459900995505704/blob158459901037808615')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4e35-b01e-0088-5ab6-fd3fcb000000',
  'x-ms-client-request-id',
  'dfd6e2bf-290f-4999-80d1-6a2a8abf084e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158459900995505704/blob158459901037808615')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:30 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CBCE0B09A8D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b876c-701e-005c-4bb6-fd8f9a000000',
  'x-ms-client-request-id',
  '84080d34-0e6a-4c81-9345-2a2e0b25fafd',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-19T06:23:30.5098451Z',
  'x-ms-creation-time',
  'Thu, 19 Mar 2020 06:23:30 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459900995505704')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4ede-b01e-0088-75b6-fd3fcb000000',
  'x-ms-client-request-id',
  'ed1929cd-3e70-4f8d-829e-818718b4ba3d',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:31 GMT'
]);
