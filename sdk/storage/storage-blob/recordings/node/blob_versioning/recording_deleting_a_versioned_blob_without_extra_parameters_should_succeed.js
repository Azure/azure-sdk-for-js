let nock = require('nock');

module.exports.hash = "a9690167b9c588618d4a754b063f37e3";

module.exports.testInfo = {"uniqueName":{"container":"container159218742024108749","blob":"blob159218742052803751"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742024108749')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:00 GMT',
  'ETag',
  '"0x8D810D22FC1884F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa95b1-e01e-0021-7fbb-4269db000000',
  'x-ms-client-request-id',
  '5b3c5af5-1985-49ec-b2ea-2979d46e74db',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:16:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742024108749/blob159218742052803751', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:00 GMT',
  'ETag',
  '"0x8D810D22FED63C1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46fbef-701e-006e-3bbb-42188f000000',
  'x-ms-client-request-id',
  '05311b7b-b26a-48cc-bbc0-3ecce139dc28',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:17:00.6188481Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742024108749/blob159218742052803751')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:00 GMT',
  'ETag',
  '"0x8D810D23018C14B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa96b6-e01e-0021-7bbb-4269db000000',
  'x-ms-client-request-id',
  '628b7191-d57c-4e2a-987e-6e02249be5dd',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:17:00.9050482Z',
  'Date',
  'Mon, 15 Jun 2020 02:17:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218742024108749/blob159218742052803751')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46fd96-701e-006e-5bbb-42188f000000',
  'x-ms-client-request-id',
  '41c7712c-21db-48f0-9dc7-f8410b1a8ae1',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 15 Jun 2020 02:17:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159218742024108749/blob159218742052803751')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa9786-e01e-0021-42bb-4269db000000',
  'x-ms-client-request-id',
  '75aa7517-2fb2-485b-b4ac-72fdf3a75482',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 15 Jun 2020 02:17:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159218742024108749/blob159218742052803751')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:00 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D810D22FED63C1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46fed0-701e-006e-12bb-42188f000000',
  'x-ms-client-request-id',
  'fa537f6b-5286-4e03-9a2d-513ee9aa3c34',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-15T02:17:00.6188481Z',
  'x-ms-creation-time',
  'Mon, 15 Jun 2020 02:17:00 GMT',
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
  'Mon, 15 Jun 2020 02:17:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218742024108749')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa984a-e01e-0021-04bb-4269db000000',
  'x-ms-client-request-id',
  '182cd7f2-8907-416b-b012-1a7cb8ecd75b',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:17:01 GMT'
]);
