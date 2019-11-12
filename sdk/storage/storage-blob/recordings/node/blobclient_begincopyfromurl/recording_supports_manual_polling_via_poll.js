let nock = require('nock');

module.exports.testInfo = {"container":"container157169653036608739","blob":"blob157169653041002067","dest-container":"dest-container157169653045600246","copiedblob":"copiedblob157169653050800105"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169653036608739')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'ETag',
  '"0x8D756751D91EAB7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0c0897d8-b01e-0040-065d-8854cc000000',
  'x-ms-client-request-id',
  '33e64d42-9f39-4502-8cf2-79096fa1b978',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:22:09 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169653036608739/blob157169653041002067', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'ETag',
  '"0x8D756751D991E8D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab254146-101e-0049-5c5d-88111f000000',
  'x-ms-client-request-id',
  'c7d6b8b8-eade-4298-92ef-c3435fabb252',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157169653045600246')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'ETag',
  '"0x8D756751D9F621D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81598a5b-c01e-00dc-215d-88f9aa000000',
  'x-ms-client-request-id',
  '72bd6577-1a20-4c50-ab64-ab86dedd3462',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157169653045600246/copiedblob157169653050800105')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'ETag',
  '"0x8D756751DACD146"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3154c3f7-b01e-00b4-6e5d-889f3a000000',
  'x-ms-client-request-id',
  '784b317d-f853-44c5-900c-e7b17d313cf8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  '749b7c75-f086-40c2-be86-aef3d7f8f635',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157169653036608739/blob157169653041002067')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D756751D991E8D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dedb6264-901e-00a3-7b5d-883631000000',
  'x-ms-client-request-id',
  'bc28a0bf-1537-496a-bfb0-c31910d1cce6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Mon, 21 Oct 2019 22:22:10 GMT',
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
  'Mon, 21 Oct 2019 22:22:09 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/dest-container157169653045600246/copiedblob157169653050800105')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D756751DACD146"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ca460575-501e-0015-4b5d-884447000000',
  'x-ms-client-request-id',
  '15d76421-5773-45e7-83bf-3f2c35ffbe83',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '749b7c75-f086-40c2-be86-aef3d7f8f635',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container157169653036608739/blob157169653041002067',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Mon, 21 Oct 2019 22:22:10 GMT',
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
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157169653036608739')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '48f24fb6-d01e-00ef-3c5d-88a601000000',
  'x-ms-client-request-id',
  'cee98269-adb1-4124-9e56-69f2971d8d4f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157169653036608739')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc469c74-801e-0029-6e5d-886d80000000',
  'x-ms-client-request-id',
  'ccbab9d3-8050-42cf-900d-0fbc5bd1fe59',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:22:09 GMT',
  'Connection',
  'close'
]);

