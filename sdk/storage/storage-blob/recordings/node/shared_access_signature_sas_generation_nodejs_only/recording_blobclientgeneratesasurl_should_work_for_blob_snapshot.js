let nock = require('nock');

module.exports.hash = "e29c0745d1872a1acd1eef22fb4a98b3";

module.exports.testInfo = {"uniqueName":{"container":"container160639554080307527","blob":"blob160639554220800178"},"newDate":{"now":"2020-11-26T12:59:00.802Z","tmr":"2020-11-26T12:59:00.803Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160639554080307527')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 12:59:02 GMT',
  'ETag',
  '"0x8D8920B0C3C9F48"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '36df978f-601e-001a-44f3-c33422000000',
  'x-ms-client-request-id',
  'd670fa12-8ae1-4d6f-8c6b-527d06ea298f',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 26 Nov 2020 12:59:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160639554080307527/blob160639554220800178')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 12:59:02 GMT',
  'ETag',
  '"0x8D8920B0C6C3AB1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '36df97c4-601e-001a-71f3-c33422000000',
  'x-ms-client-request-id',
  '362d7853-5a33-4301-894f-6c556d9bbf5e',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-26T12:59:02.3640241Z',
  'Date',
  'Thu, 26 Nov 2020 12:59:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160639554080307527/blob160639554220800178')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 12:59:02 GMT',
  'ETag',
  '"0x8D8920B0C6C3AB1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '36df97fb-601e-001a-1df3-c33422000000',
  'x-ms-client-request-id',
  '84924166-c90f-4aa0-9b03-9c8c0ce0283c',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-11-26T12:59:02.6632326Z',
  'x-ms-snapshot',
  '2020-11-26T12:59:02.6622326Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 26 Nov 2020 12:59:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160639554080307527/blob160639554220800178')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 12:59:02 GMT',
  'ETag',
  '"0x8D8920B0CC7154A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '36df981d-601e-001a-3cf3-c33422000000',
  'x-ms-client-request-id',
  'a1c4e74d-cb31-4620-92f4-6d727be9742d',
  'x-ms-version',
  '2020-02-10',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 26 Nov 2020 12:59:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160639554080307527/blob160639554220800178')
  .query(true)
  .reply(200, [], [
  'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '1024',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Thu, 26 Nov 2020 12:59:02 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8920B0C6C3AB1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '36df9844-601e-001a-5ff3-c33422000000',
  'x-ms-client-request-id',
  'ff6b0cef-e14f-475f-9593-d67868086b07',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Thu, 26 Nov 2020 12:59:02 GMT',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 26 Nov 2020 12:59:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160639554080307527/blob160639554220800178')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'content-type-original1',
  'Last-Modified',
  'Thu, 26 Nov 2020 12:59:02 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8920B0CC7154A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '36df9884-601e-001a-18f3-c33422000000',
  'x-ms-client-request-id',
  '9e7c69b6-69fd-441a-a107-f3ea8bbec388',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-11-26T12:59:02.6632326Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 26 Nov 2020 12:59:02 GMT',
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
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 26 Nov 2020 12:59:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160639554080307527')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '36df98b8-601e-001a-47f3-c33422000000',
  'x-ms-client-request-id',
  '9a4abab0-66d2-46ab-8790-e50c3461917b',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 26 Nov 2020 12:59:02 GMT'
]);
