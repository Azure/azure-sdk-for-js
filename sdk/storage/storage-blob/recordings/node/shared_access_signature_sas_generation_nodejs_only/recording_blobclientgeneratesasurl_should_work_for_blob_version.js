let nock = require('nock');

module.exports.hash = "428b8876a2e4a6bbc877f61451fb506c";

module.exports.testInfo = {"uniqueName":{"container":"container160639613543001428","blob":"blob160639613682801826"},"newDate":{"tmr":"2020-11-26T13:08:57.439Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160639613543001428')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 13:08:56 GMT',
  'ETag',
  '"0x8D8920C6EA70DF3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e8ddcbf-701e-005b-1af5-c36cc6000000',
  'x-ms-client-request-id',
  'bc0cd80b-645e-4c9f-9957-8e0f144b430c',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 26 Nov 2020 13:08:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160639613543001428/blob160639613682801826', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 26 Nov 2020 13:08:56 GMT',
  'ETag',
  '"0x8D8920C6ED9079E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e8ddd1b-701e-005b-65f5-c36cc6000000',
  'x-ms-client-request-id',
  '37a0f269-2ac1-4ade-9363-0a07574b196b',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-26T13:08:56.9905054Z',
  'Date',
  'Thu, 26 Nov 2020 13:08:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160639613543001428/blob160639613682801826')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 26 Nov 2020 13:08:57 GMT',
  'ETag',
  '"0x8D8920C6F0724CB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e8ddd83-701e-005b-42f5-c36cc6000000',
  'x-ms-client-request-id',
  '4a317e04-95d6-46ce-9a2f-28b591a8630e',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-26T13:08:57.2937179Z',
  'Date',
  'Thu, 26 Nov 2020 13:08:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160639613543001428/blob160639613682801826')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 26 Nov 2020 13:08:56 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8920C6ED9079E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e8dde03-701e-005b-39f5-c36cc6000000',
  'x-ms-client-request-id',
  'be8b01e5-871a-4464-92a6-49f3582d47ec',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-11-26T13:08:56.9905054Z',
  'x-ms-creation-time',
  'Thu, 26 Nov 2020 13:08:56 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 26 Nov 2020 13:08:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160639613543001428/blob160639613682801826')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e8dde8f-701e-005b-3ff5-c36cc6000000',
  'x-ms-client-request-id',
  '586bbb11-4dac-4764-bb3e-066b76e74bd3',
  'x-ms-version',
  '2020-02-10',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 26 Nov 2020 13:08:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160639613543001428/blob160639613682801826')
  .query(true)
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e8ddf13-701e-005b-37f5-c36cc6000000',
  'x-ms-client-request-id',
  '87ca14e3-80b9-4855-bb8a-04a8fc25d679',
  'x-ms-version',
  '2020-02-10',
  'x-ms-is-soft-deleted',
  'true',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-is-soft-deleted,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 26 Nov 2020 13:08:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160639613543001428/blob160639613682801826')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 26 Nov 2020 13:08:57 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8920C6F0724CB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e8ddf7a-701e-005b-0df5-c36cc6000000',
  'x-ms-client-request-id',
  '85bfe2e2-b287-46b5-b659-036dafe124c9',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-11-26T13:08:57.2937179Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 26 Nov 2020 13:08:57 GMT',
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
  'Thu, 26 Nov 2020 13:08:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160639613543001428')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e8ddff0-701e-005b-78f5-c36cc6000000',
  'x-ms-client-request-id',
  'e27be7f7-f85f-4dd4-884b-2c29e0ac2e7d',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 26 Nov 2020 13:08:58 GMT'
]);
