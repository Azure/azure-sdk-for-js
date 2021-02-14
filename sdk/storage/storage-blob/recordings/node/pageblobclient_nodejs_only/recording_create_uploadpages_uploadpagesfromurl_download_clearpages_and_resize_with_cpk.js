let nock = require('nock');

module.exports.hash = "0a7b1dc356dad95d71174d2038c8feaf";

module.exports.testInfo = {"uniqueName":{"container":"container160507564765906627","blob":"blob160507564795100405","blockblob":"blockblob160507564853809346"},"newDate":{"expiry":"2020-11-11T06:20:48.827Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507564765906627')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:47 GMT',
  'ETag',
  '"0x8D88609EDF6DB62"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b5739b-b01e-006b-7ff2-b7d209000000',
  'x-ms-client-request-id',
  'f35ff63a-75de-49e4-82d0-ae9513aca134',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 11 Nov 2020 06:20:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507564765906627/blob160507564795100405')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:48 GMT',
  'ETag',
  '"0x8D88609EE2462B7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b573de-b01e-006b-35f2-b7d209000000',
  'x-ms-client-request-id',
  'a19466fd-a7d9-40f6-8025-cf27be28601c',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-version-id',
  '2020-11-11T06:20:48.1114807Z',
  'Date',
  'Wed, 11 Nov 2020 06:20:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160507564765906627/blob160507564795100405')
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobUsesCustomerSpecifiedEncryption</Code><Message>The blob is encrypted with customer specified encryption, but it was not provided in the request.\nRequestId:22b5740e-b01e-006b-5ef2-b7d209000000\nTime:2020-11-11T06:20:48.4045204Z</Message></Error>", [
  'Content-Length',
  '301',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b5740e-b01e-006b-5ef2-b7d209000000',
  'x-ms-client-request-id',
  '4e0f3586-84f3-44ff-a2e2-e8e4d0cd9094',
  'x-ms-version',
  '2020-02-10',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Nov 2020 06:20:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507564765906627/blockblob160507564853809346', "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'uk9S5NXZfBvPq4jGr+LM5g==',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:48 GMT',
  'ETag',
  '"0x8D88609EE7CCB72"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b57434-b01e-006b-7ef2-b7d209000000',
  'x-ms-client-request-id',
  '37733a35-39e3-4969-880b-f078e826f441',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'zGf3rvhKPeA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-11T06:20:48.6908786Z',
  'Date',
  'Wed, 11 Nov 2020 06:20:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507564765906627/blob160507564795100405', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:48 GMT',
  'ETag',
  '"0x8D88609EEA96187"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b5748c-b01e-006b-4df2-b7d209000000',
  'x-ms-client-request-id',
  '6555a64c-a8f9-46d1-bd19-0aebc863d85e',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Wed, 11 Nov 2020 06:20:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507564765906627/blob160507564795100405')
  .query(true)
  .reply(201, "", [
  'Content-MD5',
  'uk9S5NXZfBvPq4jGr+LM5g==',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:49 GMT',
  'ETag',
  '"0x8D88609EED77E86"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '22b574c9-b01e-006b-7af2-b7d209000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'e26014a7-c1e3-4895-a7eb-f34439d27aec',
  'Date',
  'Wed, 11 Nov 2020 06:20:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160507564765906627/blob160507564795100405')
  .reply(206, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", [
  'Content-Length',
  '512',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-511/1024',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:49 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D88609EED77E86"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b574fe-b01e-006b-20f2-b7d209000000',
  'x-ms-client-request-id',
  '1f99c1a7-73af-4736-a086-6b57076d7d2d',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-11-11T06:20:48.1114807Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Wed, 11 Nov 2020 06:20:48 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,x-ms-server-encrypted,x-ms-encryption-key-sha256,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Nov 2020 06:20:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160507564765906627/blob160507564795100405')
  .reply(206, "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", [
  'Content-Length',
  '512',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 512-1023/1024',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:49 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D88609EED77E86"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b57536-b01e-006b-4cf2-b7d209000000',
  'x-ms-client-request-id',
  'e303bfa9-a7c2-432d-87ab-4c363b1aca3e',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-11-11T06:20:48.1114807Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Wed, 11 Nov 2020 06:20:48 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,x-ms-server-encrypted,x-ms-encryption-key-sha256,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Nov 2020 06:20:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507564765906627/blob160507564795100405')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobUsesCustomerSpecifiedEncryption</Code><Message>The blob is encrypted with customer specified encryption, but it was not provided in the request.\nRequestId:22b5756c-b01e-006b-73f2-b7d209000000\nTime:2020-11-11T06:20:50.1597681Z</Message></Error>", [
  'Content-Length',
  '301',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b5756c-b01e-006b-73f2-b7d209000000',
  'x-ms-client-request-id',
  '7a597ba6-d30b-4f39-84bf-9371461e65fd',
  'x-ms-version',
  '2020-02-10',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Date',
  'Wed, 11 Nov 2020 06:20:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507564765906627/blob160507564795100405')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:50 GMT',
  'ETag',
  '"0x8D88609EF8961A1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b5759f-b01e-006b-1ff2-b7d209000000',
  'x-ms-client-request-id',
  '90c28faf-23c9-4f57-af06-f9d2b678f23f',
  'x-ms-version',
  '2020-02-10',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Wed, 11 Nov 2020 06:20:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160507564765906627/blob160507564795100405')
  .reply(200, "", [
  'Content-Length',
  '2048',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:50 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D88609EF8961A1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b575c1-b01e-006b-3bf2-b7d209000000',
  'x-ms-client-request-id',
  '887eb2e2-8d33-4997-bca3-114601e46154',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-11-11T06:20:48.1114807Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Wed, 11 Nov 2020 06:20:48 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,x-ms-server-encrypted,x-ms-encryption-key-sha256,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Nov 2020 06:20:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160507564765906627')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b575f5-b01e-006b-68f2-b7d209000000',
  'x-ms-client-request-id',
  '73c586eb-7bb2-40c4-ad09-61214fe40c9c',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 11 Nov 2020 06:20:50 GMT'
]);
