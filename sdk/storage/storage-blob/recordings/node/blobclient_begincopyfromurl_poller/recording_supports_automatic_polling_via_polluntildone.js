let nock = require('nock');

module.exports.testInfo = {"container":"container157187596673706201","blob":"blob157187596701907082","dest-container":"dest-container157187596710904321","copiedblob":"copiedblob157187596741208881"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157187596673706201')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:46 GMT',
  'ETag',
  '"0x8D75816E61A425F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '908013ca-401e-0009-1aff-891627000000',
  'x-ms-client-request-id',
  '771821ce-4c55-40a5-8b82-cf4b15e66743',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:12:46 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157187596673706201/blob157187596701907082', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:47 GMT',
  'ETag',
  '"0x8D75816E62F93CF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e46dbaff-e01e-005d-64ff-895970000000',
  'x-ms-client-request-id',
  '83633d60-1249-4ac8-8854-01d14d6f330e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 24 Oct 2019 00:12:46 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157187596710904321')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:47 GMT',
  'ETag',
  '"0x8D75816E639463B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1b3531c9-a01e-00da-45ff-89ca15000000',
  'x-ms-client-request-id',
  '7d8f9448-97a4-4825-8b38-d21561058979',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:12:47 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157187596710904321/copiedblob157187596741208881')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:47 GMT',
  'ETag',
  '"0x8D75816E668FDC0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf27164e-e01e-002f-10ff-895e3f000000',
  'x-ms-client-request-id',
  '7dc9f5f0-982f-46c0-91fc-fa2c4aad3064',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  '30075de5-e451-4364-89a9-8c8c29812f6b',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 24 Oct 2019 00:12:46 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157187596673706201/blob157187596701907082')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:47 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D75816E62F93CF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f04986aa-f01e-00e8-03ff-89ca62000000',
  'x-ms-client-request-id',
  'bfcc5624-3a4d-49e7-b1a9-42be96e1112c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Thu, 24 Oct 2019 00:12:47 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 24 Oct 2019 00:12:47 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/dest-container157187596710904321/copiedblob157187596741208881')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:47 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D75816E668FDC0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf271693-e01e-002f-49ff-895e3f000000',
  'x-ms-client-request-id',
  '9e03e986-d803-4dfc-8d57-493d859a0127',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Thu, 24 Oct 2019 00:12:47 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '30075de5-e451-4364-89a9-8c8c29812f6b',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container157187596673706201/blob157187596701907082',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Thu, 24 Oct 2019 00:12:47 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 24 Oct 2019 00:12:46 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157187596673706201')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '908018f7-401e-0009-07ff-891627000000',
  'x-ms-client-request-id',
  'a55737bd-4b05-4526-97d0-33c957a3a4c7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:12:47 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/dest-container157187596710904321')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1b353443-a01e-00da-14ff-89ca15000000',
  'x-ms-client-request-id',
  '97a8b32b-c8e5-4e6e-8d49-477dd4fbdf2e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:12:47 GMT'
]);

