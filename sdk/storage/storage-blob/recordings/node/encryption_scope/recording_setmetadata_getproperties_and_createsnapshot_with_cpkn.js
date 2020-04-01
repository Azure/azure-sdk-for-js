let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container158096126065101140","blob":"blob158096126065102055"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158096126065101140')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 06 Feb 2020 03:54:21 GMT',
  'ETag',
  '"0x8D7AAB83FD93541"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3276d124-501e-0024-6ea1-dc649b000000',
  'x-ms-client-request-id',
  'c84eeae9-4840-4fad-a9d3-e5d2ec9398a1',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Thu, 06 Feb 2020 03:54:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158096126065101140/blob158096126065102055', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 06 Feb 2020 03:54:29 GMT',
  'ETag',
  '"0x8D7AAB8443E8A80"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1e1710b8-001e-0039-0ba1-dc6927000000',
  'x-ms-client-request-id',
  '8f356dbf-c77a-45ca-ab96-88f2da5c240c',
  'x-ms-version',
  '2019-07-07',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'antjoscope1',
  'Date',
  'Thu, 06 Feb 2020 03:54:28 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158096126065101140/blob158096126065102055')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 06 Feb 2020 03:54:30 GMT',
  'ETag',
  '"0x8D7AAB84504C526"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fd45c11b-b01e-002c-34a1-dc7e94000000',
  'x-ms-client-request-id',
  'c9cbcccb-ed5f-4a47-84ae-e2d52b4d0f20',
  'x-ms-version',
  '2019-07-07',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'antjoscope1',
  'Date',
  'Thu, 06 Feb 2020 03:54:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158096126065101140/blob158096126065102055')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 06 Feb 2020 03:54:30 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7AAB84504C526"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fd45c139-b01e-002c-4ba1-dc7e94000000',
  'x-ms-client-request-id',
  '2fab94d0-fcba-4894-a371-565c77a4a605',
  'x-ms-version',
  '2019-07-07',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Thu, 06 Feb 2020 03:54:29 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'antjoscope1',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Thu, 06 Feb 2020 03:54:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158096126065101140/blob158096126065102055')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobCustomerSpecifiedEncryptionMismatch</Code><Message>The given customer specified encryption does not match the encryption used to encrypt the blob.\nRequestId:fd45c147-b01e-002c-59a1-dc7e94000000\nTime:2020-02-06T03:54:31.4894625Z</Message></Error>", [
  'Content-Length',
  '303',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fd45c147-b01e-002c-59a1-dc7e94000000',
  'x-ms-client-request-id',
  'fafbb781-e2ac-4ac1-aab2-1abf32cb5bf6',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'BlobCustomerSpecifiedEncryptionMismatch',
  'Date',
  'Thu, 06 Feb 2020 03:54:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158096126065101140')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3276d1b7-501e-0024-60a1-dc649b000000',
  'x-ms-client-request-id',
  '604acea3-2911-40be-8e0e-8f360822d37e',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Thu, 06 Feb 2020 03:54:31 GMT'
]);
