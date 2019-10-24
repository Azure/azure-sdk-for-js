let nock = require('nock');

module.exports.testInfo = {"container":"container157187596807009829","blob":"blob157187596815001265","dest-container":"dest-container157187596821803710","copiedblob":"copiedblob157187596827606686"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157187596807009829')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:48 GMT',
  'ETag',
  '"0x8D75816E6CCFFD1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bd7cf0e6-101e-00e0-02ff-89d06d000000',
  'x-ms-client-request-id',
  '567c334e-f2a7-49fb-8bef-7900c290e250',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:12:47 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157187596807009829/blob157187596815001265', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:48 GMT',
  'ETag',
  '"0x8D75816E6D8EACE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8ccdb47-f01e-00b5-7bff-89c0e6000000',
  'x-ms-client-request-id',
  '0fcdcc59-bba6-4aaf-96b2-290811fe97eb',
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
  .put('/dest-container157187596821803710')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:48 GMT',
  'ETag',
  '"0x8D75816E6E1AEF8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd626cc22-601e-00c5-72ff-897911000000',
  'x-ms-client-request-id',
  'a7efa7da-424b-4437-b013-9cadef878cd6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:12:47 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157187596821803710/copiedblob157187596827606686')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 24 Oct 2019 00:12:48 GMT',
  'ETag',
  '"0x8D75816E73C526E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b242959-601e-001e-70ff-89bf2c000000',
  'x-ms-client-request-id',
  '3e39d38b-f300-453c-9ebc-5b8abaf81571',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  '55153376-4ddb-47fd-b979-aeff49a35250',
  'x-ms-copy-status',
  'pending',
  'Date',
  'Thu, 24 Oct 2019 00:12:48 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157187596821803710/copiedblob157187596827606686')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b242b40-601e-001e-21ff-89bf2c000000',
  'x-ms-client-request-id',
  '12a21e5c-8a90-460a-9fd1-72c424ab0574',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:12:48 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157187596807009829')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bd7cf39a-101e-00e0-05ff-89d06d000000',
  'x-ms-client-request-id',
  '85ba23ab-9060-441f-a34a-332e41d12cc4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:12:48 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/dest-container157187596821803710')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd626cfc0-601e-00c5-57ff-897911000000',
  'x-ms-client-request-id',
  '70b43cdc-22db-4e68-a778-ad3c6d4a1a84',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 24 Oct 2019 00:12:48 GMT'
]);

