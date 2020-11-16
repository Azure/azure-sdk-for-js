let nock = require('nock');

module.exports.hash = "114be4bb7358f8675c80156b6994bab7";

module.exports.testInfo = {"uniqueName":{"container":"container160507564110102547","blob":"blob160507564139200298","blockblob":"blockblob160507564168607863"},"newDate":{"expiry":"2020-11-11T06:20:41.974Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507564110102547')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:41 GMT',
  'ETag',
  '"0x8D88609EA0E15E9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b56d7c-b01e-006b-71f2-b7d209000000',
  'x-ms-client-request-id',
  'ac458754-e63a-4354-b04b-f568d73dd9c6',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 11 Nov 2020 06:20:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507564110102547/blob160507564139200298')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:41 GMT',
  'ETag',
  '"0x8D88609EA3B2E84"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b56dd1-b01e-006b-3ff2-b7d209000000',
  'x-ms-client-request-id',
  '0326ee10-9ce5-4d85-9280-12d9dbe455ef',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-version-id',
  '2020-11-11T06:20:41.5499908Z',
  'Date',
  'Wed, 11 Nov 2020 06:20:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507564110102547/blockblob160507564168607863', "Hello World!")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:41 GMT',
  'ETag',
  '"0x8D88609EA67283F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b56e0a-b01e-006b-73f2-b7d209000000',
  'x-ms-client-request-id',
  '7d3b2d5b-7d50-473a-9c5b-a350581f2f51',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-11T06:20:41.8381887Z',
  'Date',
  'Wed, 11 Nov 2020 06:20:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507564110102547/blob160507564139200298', "Hello World!")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:42 GMT',
  'ETag',
  '"0x8D88609EA939721"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b56e6e-b01e-006b-4ff2-b7d209000000',
  'x-ms-client-request-id',
  '87392f9d-81b9-46ec-afed-35fa84e7ebc6',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-blob-append-offset',
  '0',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Wed, 11 Nov 2020 06:20:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507564110102547/blob160507564139200298')
  .query(true)
  .reply(201, "", [
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:42 GMT',
  'ETag',
  '"0x8D88609EAC05439"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-blob-committed-block-count',
  '2',
  'x-ms-blob-append-offset',
  '12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '22b56e9f-b01e-006b-7cf2-b7d209000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '403013d9-16e3-4ef6-bc5c-06a1d81e734f',
  'Date',
  'Wed, 11 Nov 2020 06:20:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160507564110102547/blob160507564139200298')
  .reply(200, "Hello World!Hello World!", [
  'Content-Length',
  '24',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:42 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D88609EAC05439"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b56eda-b01e-006b-2af2-b7d209000000',
  'x-ms-client-request-id',
  '91b5bbc4-2928-479c-a972-ce04518fc4cd',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-11-11T06:20:41.5499908Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Wed, 11 Nov 2020 06:20:41 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '2',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,x-ms-encryption-key-sha256,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Nov 2020 06:20:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160507564110102547')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b56f18-b01e-006b-60f2-b7d209000000',
  'x-ms-client-request-id',
  'aad6398c-6384-4dd9-9d08-81f5fe8f31c7',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 11 Nov 2020 06:20:42 GMT'
]);
