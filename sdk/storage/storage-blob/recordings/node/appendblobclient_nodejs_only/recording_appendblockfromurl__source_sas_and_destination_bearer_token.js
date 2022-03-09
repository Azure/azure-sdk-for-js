let nock = require('nock');

module.exports.hash = "8c64fcca79c9f9f35d928c8358af0197";

module.exports.testInfo = {"uniqueName":{"container":"container162546561243501252","blob":"blob162546561375806544","blockblob":"blockblob162546561492606470"},"newDate":{"expiry":"2021-07-05T06:13:36.084Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546561243501252')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:33 GMT',
  'ETag',
  '"0x8D93F7C04D2729E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9f50c112-701e-0031-2664-71506f000000',
  'x-ms-client-request-id',
  'f4f173a3-75ee-4ac1-bb5b-ba205f8126c4',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:13:33 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546561243501252/blob162546561375806544')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:35 GMT',
  'ETag',
  '"0x8D93F7C0587CFDB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f01424e-f01e-0020-6064-715cc1000000',
  'x-ms-client-request-id',
  'b3842bcb-4a94-44c3-91e5-d29caba6a29d',
  'x-ms-version',
  '2020-10-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:13:34 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546561243501252/blockblob162546561492606470', "Hello World!")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:36 GMT',
  'ETag',
  '"0x8D93F7C06386928"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e81a1757-d01e-002c-6c64-712fd5000000',
  'x-ms-client-request-id',
  'bdf33ed0-9e40-4ade-9b9b-8ad5ca30b70e',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:13:36 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546561243501252/blob162546561375806544')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:37 GMT',
  'ETag',
  '"0x8D93F7C0702A152"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-blob-append-offset',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '69f4e74b-e01e-0023-7a64-718462000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  'e61805df-4db7-4587-b0ab-631fd583d444',
  'Date',
  'Mon, 05 Jul 2021 06:13:37 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container162546561243501252/blob162546561375806544')
  .reply(200, "Hello World!", [
  'Content-Length',
  '12',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:37 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D93F7C0702A152"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e779a7d6-c01e-002f-4f64-71f776000000',
  'x-ms-client-request-id',
  'fb8fdcfa-4616-4931-bd49-a42703af4718',
  'x-ms-version',
  '2020-10-02',
  'x-ms-creation-time',
  'Mon, 05 Jul 2021 06:13:35 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 05 Jul 2021 06:13:38 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162546561243501252')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2e64857f-001e-0007-4064-71dd0f000000',
  'x-ms-client-request-id',
  'ef714ce0-7ae7-4b25-82ef-8060219fcbe0',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:13:39 GMT',
  'Connection',
  'close'
]);
