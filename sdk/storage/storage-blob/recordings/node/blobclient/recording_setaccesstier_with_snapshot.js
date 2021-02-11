let nock = require('nock');

module.exports.hash = "e9ee58a7bcfc94e8b2d717199c4edbaf";

module.exports.testInfo = {"uniqueName":{"container":"container159834991708600601","blob":"blob159834991738505129"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159834991708600601')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Aug 2020 10:05:17 GMT',
  'ETag',
  '"0x8D848DE5E13902D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3537e5f9-b01e-0085-2ac7-7a607d000000',
  'x-ms-client-request-id',
  '7ca1e256-fe6f-4599-a189-1c475fe2392e',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 25 Aug 2020 10:05:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159834991708600601/blob159834991738505129', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 25 Aug 2020 10:05:17 GMT',
  'ETag',
  '"0x8D848DE5E46B781"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3537e614-b01e-0085-3dc7-7a607d000000',
  'x-ms-client-request-id',
  '1d0f3b3b-0f31-4617-b1c8-1f8bb9206561',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-08-25T10:05:17.4557569Z',
  'Date',
  'Tue, 25 Aug 2020 10:05:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159834991708600601/blob159834991738505129')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Aug 2020 10:05:17 GMT',
  'ETag',
  '"0x8D848DE5E46B781"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3537e63b-b01e-0085-5bc7-7a607d000000',
  'x-ms-client-request-id',
  'cba3e9b1-5c61-47f0-9b0a-76a8b3c3c9d7',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-08-25T10:05:17.7439619Z',
  'x-ms-snapshot',
  '2020-08-25T10:05:17.7429619Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Tue, 25 Aug 2020 10:05:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159834991708600601/blob159834991738505129')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3537e661-b01e-0085-7cc7-7a607d000000',
  'x-ms-client-request-id',
  'db12c620-8051-4a71-97f0-02029ec8ca78',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 25 Aug 2020 10:05:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159834991708600601/blob159834991738505129')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 25 Aug 2020 10:05:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D848DE5E46B781"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3537e67d-b01e-0085-16c7-7a607d000000',
  'x-ms-client-request-id',
  'e1510cbb-e2c2-4b51-b25c-32db325fa378',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Tue, 25 Aug 2020 10:05:17 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-change-time',
  'Tue, 25 Aug 2020 10:05:18 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Aug 2020 10:05:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159834991708600601')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3537e6a1-b01e-0085-38c7-7a607d000000',
  'x-ms-client-request-id',
  'a3872515-48f7-49dd-8eba-53ebba4c848a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 25 Aug 2020 10:05:17 GMT'
]);
