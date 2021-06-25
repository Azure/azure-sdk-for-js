let nock = require('nock');

module.exports.testInfo = {"container":"container157187596898401276","blob":"blob157187596904603143","dest-container":"dest-container157187596911008848","copiedblob":"copiedblob157187596917801308"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157187596898401276')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:48 GMT',
  'ETag',
  '"0x8D75816E7574C52"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00c9961b-801e-004b-12ff-89afa7000000',
  'x-ms-client-request-id',
  '80f95042-dc74-41d1-a8b8-98e4740012b7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:12:48 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157187596898401276/blob157187596904603143', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:49 GMT',
  'ETag',
  '"0x8D75816E760A9E3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4b7144a8-e01e-0086-17ff-899f4d000000',
  'x-ms-client-request-id',
  '92c717b3-c2bc-4155-ab96-9fea29f6d7a8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 24 Oct 2019 00:12:48 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157187596911008848')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:49 GMT',
  'ETag',
  '"0x8D75816E76B309E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '21dfa5b3-501e-00bc-01ff-898535000000',
  'x-ms-client-request-id',
  '133ddf44-adc0-4b90-93fc-b488db701c68',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:12:48 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157187596911008848/copiedblob157187596917801308')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:49 GMT',
  'ETag',
  '"0x8D75816E7ADC665"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c44e9f4-001e-00ec-7cff-894765000000',
  'x-ms-client-request-id',
  'a881e664-35cf-46f4-9813-7fc9167df5ff',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  '78936c7d-84fd-43de-931f-03bbc78baee2',
  'x-ms-copy-status',
  'pending',
  'Date',
  'Thu, 24 Oct 2019 00:12:49 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/dest-container157187596911008848/copiedblob157187596917801308')
  .reply(200, "", [
  'Cache-Control',
  'max-age=300',
  'Content-Length',
  '0',
  'Content-Type',
  'text/plain; charset=utf-8',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:49 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D75816E7ADC665"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c44eaf9-001e-00ec-6dff-894765000000',
  'x-ms-client-request-id',
  '64bc19d5-dd46-4c66-a945-58d1da1afe9b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Thu, 24 Oct 2019 00:12:49 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '78936c7d-84fd-43de-931f-03bbc78baee2',
  'x-ms-copy-source',
  'https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/README.md',
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
  'Thu, 24 Oct 2019 00:12:49 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/dest-container157187596911008848/copiedblob157187596917801308')
  .reply(200, "", [
  'Cache-Control',
  'max-age=300',
  'Content-Length',
  '5278',
  'Content-Type',
  'text/plain; charset=utf-8',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:13:01 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D75816EEFA291C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c452311-001e-00ec-33ff-894765000000',
  'x-ms-client-request-id',
  '81e92955-e48b-428b-b391-56604224538e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Thu, 24 Oct 2019 00:12:49 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '78936c7d-84fd-43de-931f-03bbc78baee2',
  'x-ms-copy-source',
  'https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/README.md',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '5278/5278',
  'x-ms-copy-completion-time',
  'Thu, 24 Oct 2019 00:13:01 GMT',
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
  .delete('/container157187596898401276')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00c9d2a5-801e-004b-20ff-89afa7000000',
  'x-ms-client-request-id',
  'f8c7c77c-b0cb-4d2f-8e4e-20a4f68e9224',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:13:04 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/dest-container157187596911008848')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '21dfe1b1-501e-00bc-1bff-898535000000',
  'x-ms-client-request-id',
  '1363b507-4694-497d-9821-d48ac3d2e55e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:13:04 GMT'
]);

