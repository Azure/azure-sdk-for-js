let nock = require('nock');

module.exports.hash = "bc4dd729c5dd87bf12319e80d8e8545f";

module.exports.testInfo = {"uniqueName":{"container":"container158459900100501054","blob":"blob158459900124500587"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900100501054')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:21 GMT',
  'ETag',
  '"0x8D7CBCE05713E93"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4071-b01e-0088-52b6-fd3fcb000000',
  'x-ms-client-request-id',
  '012c13e8-7b4d-4c9d-b8a2-da8647837ae1',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900100501054/blob158459900124500587', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:21 GMT',
  'ETag',
  '"0x8D7CBCE0596C6CE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e40ac-b01e-0088-05b6-fd3fcb000000',
  'x-ms-client-request-id',
  '0d5ef65f-c510-4533-89ad-4118a25df3ee',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:21.3693415Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900100501054/blob158459900124500587')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:21 GMT',
  'ETag',
  '"0x8D7CBCE05BB9395"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e40ed-b01e-0088-3eb6-fd3fcb000000',
  'x-ms-client-request-id',
  'fadba3a7-65e3-4a84-9fc4-408e67a95bfb',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:21.6115130Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459900100501054/blob158459900124500587')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4139-b01e-0088-02b6-fd3fcb000000',
  'x-ms-client-request-id',
  '24727022-163f-487e-8ea4-a0097c6b54d8',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 19 Mar 2020 06:23:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158459900100501054/blob158459900124500587')
  .query(true)
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4189-b01e-0088-4ab6-fd3fcb000000',
  'x-ms-client-request-id',
  'af9eca93-5e39-46f9-8485-14c012b27d62',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158459900100501054/blob158459900124500587')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:21 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CBCE05BB9395"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e41da-b01e-0088-08b6-fd3fcb000000',
  'x-ms-client-request-id',
  '4529a963-a613-4f64-8563-55c56314ccf8',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-19T06:23:21.6115130Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 19 Mar 2020 06:23:21 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459900100501054')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4227-b01e-0088-4bb6-fd3fcb000000',
  'x-ms-client-request-id',
  'edf24965-6935-4388-bd93-2a2b50cd9da6',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:22 GMT'
]);
