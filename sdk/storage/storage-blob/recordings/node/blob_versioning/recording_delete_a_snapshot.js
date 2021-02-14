let nock = require('nock');

module.exports.hash = "4a10969378b483457b67ea3e5414861a";

module.exports.testInfo = {"uniqueName":{"container":"container159218741251207833","blob":"blob159218741280002928"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218741251207833')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:52 GMT',
  'ETag',
  '"0x8D810D22B269B9D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46e8b5-701e-006e-0fbb-42188f000000',
  'x-ms-client-request-id',
  'b6dc20ca-0031-4588-826c-4a22db81fbe2',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:16:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218741251207833/blob159218741280002928', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:52 GMT',
  'ETag',
  '"0x8D810D22B524539"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46e95b-701e-006e-2ebb-42188f000000',
  'x-ms-client-request-id',
  '57d3d9a6-4df1-4ca4-bca2-6c75a5e4f415',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:16:52.8913721Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218741251207833/blob159218741280002928')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:53 GMT',
  'ETag',
  '"0x8D810D22B7E664A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46ea08-701e-006e-52bb-42188f000000',
  'x-ms-client-request-id',
  '2cf2324d-c567-46c8-b7f8-bc2287172abb',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:16:53.1815770Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218741251207833/blob159218741280002928')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:53 GMT',
  'ETag',
  '"0x8D810D22B7E664A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46ead9-701e-006e-1ebb-42188f000000',
  'x-ms-client-request-id',
  'e5ba2665-f14a-4e58-a2b8-5bbacc77ccab',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-15T02:16:53.4727821Z',
  'x-ms-snapshot',
  '2020-06-15T02:16:53.4717821Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Mon, 15 Jun 2020 02:16:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218741251207833/blob159218741280002928')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46eb7c-701e-006e-3cbb-42188f000000',
  'x-ms-client-request-id',
  '19a1ed43-d8a0-45bb-8fdc-6c0e3fc39bbd',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 15 Jun 2020 02:16:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159218741251207833/blob159218741280002928')
  .query(true)
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46ec58-701e-006e-15bb-42188f000000',
  'x-ms-client-request-id',
  'df951396-977e-48f3-8798-2820554459cb',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 15 Jun 2020 02:16:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159218741251207833/blob159218741280002928')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:53 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D810D22B7E664A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46ed0b-701e-006e-43bb-42188f000000',
  'x-ms-client-request-id',
  'b028be59-ba2e-4388-a8cf-d87ef21d9f27',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-15T02:16:53.4727821Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Mon, 15 Jun 2020 02:16:53 GMT',
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
  'Mon, 15 Jun 2020 02:16:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218741251207833')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46edbe-701e-006e-73bb-42188f000000',
  'x-ms-client-request-id',
  '7c13225b-05ce-4b31-a476-a2a2c866da2e',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:16:53 GMT'
]);
