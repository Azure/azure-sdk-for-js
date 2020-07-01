let nock = require('nock');

module.exports.hash = "e398b7bcabf21c191b9670bc84a4fc30";

module.exports.testInfo = {"uniqueName":{"container":"container159218742818906916","blob":"blob159218742847404567","copiedblob":"copiedblob159218742904903148"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742818906916')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:08 GMT',
  'ETag',
  '"0x8D810D2347E171E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa9fc6-e01e-0021-0bbb-4269db000000',
  'x-ms-client-request-id',
  '928df801-1a2e-4ac2-8a7d-78e05df4d41c',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:17:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742818906916/blob159218742847404567', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:08 GMT',
  'ETag',
  '"0x8D810D234AA4106"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f470f5b-701e-006e-6bbb-42188f000000',
  'x-ms-client-request-id',
  '23400dd3-e41a-4781-b221-f3325d8cfce7',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:17:08.5674758Z',
  'Date',
  'Mon, 15 Jun 2020 02:17:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742818906916/blob159218742847404567')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:08 GMT',
  'ETag',
  '"0x8D810D234D5ECD8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfaa0ac-e01e-0021-62bb-4269db000000',
  'x-ms-client-request-id',
  '2f2c7587-c3ad-46f2-a604-d7d8d5695417',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:17:08.8546792Z',
  'Date',
  'Mon, 15 Jun 2020 02:17:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742818906916/copiedblob159218742904903148')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:09 GMT',
  'ETag',
  '"0x8D810D235020DF0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f4710e1-701e-006e-61bb-42188f000000',
  'x-ms-client-request-id',
  'f64403d2-8974-432f-a1f9-71519f0b5cde',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-15T02:17:09.1428848Z',
  'x-ms-copy-id',
  'c6568929-560c-40e9-8ebe-45681efb26b2',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 15 Jun 2020 02:17:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218742818906916')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfaa188-e01e-0021-31bb-4269db000000',
  'x-ms-client-request-id',
  '5c3bbef5-41ea-4e94-9e98-02ceedbe6fdd',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:17:08 GMT'
]);
