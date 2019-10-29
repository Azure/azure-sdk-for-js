let nock = require('nock');

module.exports.testInfo = {"container":"container157187596769208785","blob":"blob157187596776802929","dest-container":"dest-container157187596783002346","copiedblob":"copiedblob157187596788904022"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157187596769208785')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:47 GMT',
  'ETag',
  '"0x8D75816E69417E2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cdea2d99-f01e-000c-18ff-89c4fc000000',
  'x-ms-client-request-id',
  '40f2a17a-c342-431c-aed8-c757f68b7e26',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:12:47 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157187596769208785/blob157187596776802929', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:47 GMT',
  'ETag',
  '"0x8D75816E69DABDA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8a3cf6aa-901e-000a-0bff-89f743000000',
  'x-ms-client-request-id',
  '660b5670-4446-4c53-9b5e-dd8bd9cdb8b7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 24 Oct 2019 00:12:47 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157187596783002346')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:47 GMT',
  'ETag',
  '"0x8D75816E6A674BA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '728b2405-201e-006d-49ff-89e7bf000000',
  'x-ms-client-request-id',
  'b1b96f3c-c268-4eae-99ee-c27cf2e81fe8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:12:47 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157187596783002346/copiedblob157187596788904022')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:47 GMT',
  'ETag',
  '"0x8D75816E6AFB07C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b24280c-601e-001e-3fff-89bf2c000000',
  'x-ms-client-request-id',
  'd25ea86e-4e84-4d30-b2c0-c6e9296cfcbb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  'caba755b-b395-43f4-add9-b21ea83ea2f6',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 24 Oct 2019 00:12:47 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157187596769208785/blob157187596776802929')
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
  '"0x8D75816E69DABDA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76324634-301e-00aa-5eff-8973e2000000',
  'x-ms-client-request-id',
  'c65ed3fd-e266-42b3-80a0-aae63f4af870',
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
  .head('/dest-container157187596783002346/copiedblob157187596788904022')
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
  '"0x8D75816E6AFB07C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b24284f-601e-001e-7cff-89bf2c000000',
  'x-ms-client-request-id',
  'f45d286f-11bf-434f-8ce6-f5c51a769c7f',
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
  'caba755b-b395-43f4-add9-b21ea83ea2f6',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container157187596769208785/blob157187596776802929',
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
  'Thu, 24 Oct 2019 00:12:47 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157187596769208785')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cdea2e9d-f01e-000c-7aff-89c4fc000000',
  'x-ms-client-request-id',
  '295b7d45-a4ed-4436-bcef-79a2ecfc4584',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:12:47 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/dest-container157187596783002346')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '728b2462-201e-006d-14ff-89e7bf000000',
  'x-ms-client-request-id',
  'c1a6eed8-dba9-48ef-a268-30e77a0ea602',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:12:47 GMT'
]);

