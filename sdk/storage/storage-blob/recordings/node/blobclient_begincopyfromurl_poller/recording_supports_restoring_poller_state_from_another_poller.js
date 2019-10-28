let nock = require('nock');

module.exports.testInfo = {"container":"container157187598472909479","blob":"blob157187598479800429","dest-container":"dest-container157187598485906795","copiedblob":"copiedblob157187598492601091"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157187598472909479')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:13:04 GMT',
  'ETag',
  '"0x8D75816F0BAD5A7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bcfdd292-c01e-0007-44ff-893f97000000',
  'x-ms-client-request-id',
  '9e2e4337-b60b-460b-b932-32059785025b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:13:04 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157187598472909479/blob157187598479800429', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:13:04 GMT',
  'ETag',
  '"0x8D75816F0C41873"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9ff1ef7e-e01e-0096-2eff-895a25000000',
  'x-ms-client-request-id',
  'ad38a253-e484-4c3c-8920-41533f229bb3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 24 Oct 2019 00:13:04 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157187598485906795')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:13:04 GMT',
  'ETag',
  '"0x8D75816F0CE3EFB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e5fc99c-501e-003a-7bff-89498c000000',
  'x-ms-client-request-id',
  '4a3fcb08-5c18-4652-b446-58270e2a66c9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:13:04 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157187598485906795/copiedblob157187598492601091')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:13:04 GMT',
  'ETag',
  '"0x8D75816F0DBEA7C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3a695cd-701e-0002-29ff-89ed4c000000',
  'x-ms-client-request-id',
  '65ce2239-e56b-4bb4-a7a8-71280161af1f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  'b4a261f4-b373-46df-a298-fa5580353dcc',
  'x-ms-copy-status',
  'pending',
  'Date',
  'Thu, 24 Oct 2019 00:13:04 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/dest-container157187598485906795/copiedblob157187598492601091')
  .reply(200, "", [
  'Cache-Control',
  'max-age=300',
  'Content-Length',
  '0',
  'Content-Type',
  'text/plain; charset=utf-8',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:13:04 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D75816F0DBEA7C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3a69613-701e-0002-6aff-89ed4c000000',
  'x-ms-client-request-id',
  '5eb87c62-5e12-4488-96a8-25637ab0900e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Thu, 24 Oct 2019 00:13:04 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  'b4a261f4-b373-46df-a298-fa5580353dcc',
  'x-ms-copy-source',
  'https://raw.githubusercontent.com/Azure/azure-sdk-for-js/master/README.md',
  'x-ms-copy-status',
  'pending',
  'x-ms-copy-progress',
  '0/5278',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 24 Oct 2019 00:13:04 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/dest-container157187598485906795/copiedblob157187598492601091')
  .reply(200, "", [
  'Cache-Control',
  'max-age=300',
  'Content-Length',
  '5278',
  'Content-Type',
  'text/plain; charset=utf-8',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:13:04 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D75816F0DFBBC1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3a69633-701e-0002-09ff-89ed4c000000',
  'x-ms-client-request-id',
  '0544a039-5792-43ea-b036-ea142abb0138',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Thu, 24 Oct 2019 00:13:04 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  'b4a261f4-b373-46df-a298-fa5580353dcc',
  'x-ms-copy-source',
  'https://raw.githubusercontent.com/Azure/azure-sdk-for-js/master/README.md',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '5278/5278',
  'x-ms-copy-completion-time',
  'Thu, 24 Oct 2019 00:13:04 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 24 Oct 2019 00:13:04 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157187598472909479')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bcfdd36b-c01e-0007-0eff-893f97000000',
  'x-ms-client-request-id',
  '7be4d7c1-e995-4668-b4ae-ebab3a77d60b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:13:05 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/dest-container157187598485906795')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e5fcac1-501e-003a-12ff-89498c000000',
  'x-ms-client-request-id',
  '298986e9-da1e-41fb-bd28-b61663695717',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:13:04 GMT'
]);

