let nock = require('nock');

module.exports.hash = "7bb9acf30dadd90f9dfbe2a16f2188ff";

module.exports.testInfo = {"uniqueName":{"container":"container159826024122802034","blob":"blob159826024135303118","copiedblob1":"copiedblob1159826024149207999","copiedblob2":"copiedblob2159826024163701375","copiedblob3":"copiedblob3159826024188504209"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159826024122802034')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Aug 2020 09:09:49 GMT',
  'ETag',
  '"0x8D8480D746CC029"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '090be0b5-101e-0115-29f6-79ba5a000000',
  'x-ms-client-request-id',
  'ff88c640-f07a-4ac1-9710-a95fe0d945ce',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 24 Aug 2020 09:09:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159826024122802034/blob159826024135303118')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Aug 2020 09:09:49 GMT',
  'ETag',
  '"0x8D8480D747FFBA0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '090be113-101e-0115-7bf6-79ba5a000000',
  'x-ms-client-request-id',
  'f75e1da3-a196-465a-9476-17ef83012edc',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 24 Aug 2020 09:09:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159826024122802034/blob159826024135303118')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Aug 2020 09:09:49 GMT',
  'ETag',
  '"0x8D8480D748A84D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-blob-sealed',
  'true',
  'x-ms-request-id',
  '090be153-101e-0115-32f6-79ba5a000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '6ddce5a5-d0ca-4971-933c-70f37f823ea3',
  'Date',
  'Mon, 24 Aug 2020 09:09:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159826024122802034/copiedblob1159826024149207999')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Aug 2020 09:09:50 GMT',
  'ETag',
  '"0x8D8480D74961FA2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '090be195-101e-0115-68f6-79ba5a000000',
  'x-ms-client-request-id',
  'dcf09d54-8f69-4eb0-88b0-6e0f5dc434a7',
  'x-ms-version',
  '2019-12-12',
  'x-ms-copy-id',
  '8a7c58c4-a4c4-4b95-a787-eb7435bafe5f',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 24 Aug 2020 09:09:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159826024122802034/copiedblob1159826024149207999')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 24 Aug 2020 09:09:50 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8480D74961FA2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '090be214-101e-0115-5cf6-79ba5a000000',
  'x-ms-client-request-id',
  'bf4683a6-d3c8-401e-a3b9-f1dc099ecf4d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Mon, 24 Aug 2020 09:09:50 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '0',
  'x-ms-copy-id',
  '8a7c58c4-a4c4-4b95-a787-eb7435bafe5f',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container159826024122802034/blob159826024135303118',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '0/0',
  'x-ms-copy-completion-time',
  'Mon, 24 Aug 2020 09:09:50 GMT',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Aug 2020 09:09:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159826024122802034/copiedblob2159826024163701375')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Aug 2020 09:09:50 GMT',
  'ETag',
  '"0x8D8480D74ABF57E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '090be252-101e-0115-0df6-79ba5a000000',
  'x-ms-client-request-id',
  'e0d7de3f-3796-41ad-9b1c-c67063cbeced',
  'x-ms-version',
  '2019-12-12',
  'x-ms-copy-id',
  'a8173d3c-ff6c-4cd3-b762-b71fd44f4802',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 24 Aug 2020 09:09:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159826024122802034/copiedblob2159826024163701375')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 24 Aug 2020 09:09:50 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8480D74ABF57E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '090be326-101e-0115-44f6-79ba5a000000',
  'x-ms-client-request-id',
  '923f9eb0-8141-40b7-9f60-555334c895a9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Mon, 24 Aug 2020 09:09:50 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '0',
  'x-ms-copy-id',
  'a8173d3c-ff6c-4cd3-b762-b71fd44f4802',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container159826024122802034/blob159826024135303118',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '0/0',
  'x-ms-copy-completion-time',
  'Mon, 24 Aug 2020 09:09:50 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-blob-sealed',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,x-ms-blob-sealed,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Aug 2020 09:09:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159826024122802034/copiedblob3159826024188504209')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Aug 2020 09:09:50 GMT',
  'ETag',
  '"0x8D8480D74D29737"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '090be36f-101e-0115-02f6-79ba5a000000',
  'x-ms-client-request-id',
  '9ffd4b90-a425-437d-8797-a0cfa70eabe3',
  'x-ms-version',
  '2019-12-12',
  'x-ms-copy-id',
  '7bde9f33-f9c1-4009-a263-52ec031a6c93',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 24 Aug 2020 09:09:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159826024122802034/copiedblob3159826024188504209')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 24 Aug 2020 09:09:50 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8480D74D29737"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '090be3ab-101e-0115-3af6-79ba5a000000',
  'x-ms-client-request-id',
  '78d095b7-41cc-4c70-a79f-0c89dfb84271',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Mon, 24 Aug 2020 09:09:50 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '0',
  'x-ms-copy-id',
  '7bde9f33-f9c1-4009-a263-52ec031a6c93',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container159826024122802034/blob159826024135303118',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '0/0',
  'x-ms-copy-completion-time',
  'Mon, 24 Aug 2020 09:09:50 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-blob-sealed',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,x-ms-blob-sealed,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Aug 2020 09:09:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159826024122802034')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '090be3f5-101e-0115-79f6-79ba5a000000',
  'x-ms-client-request-id',
  'a645517e-21fb-4669-82ee-c70348bea64f',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 24 Aug 2020 09:09:49 GMT'
]);
