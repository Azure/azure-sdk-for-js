let nock = require('nock');

module.exports.hash = "d9cccea04fdaab5932a5df29bcc91d63";

module.exports.testInfo = {"uniqueName":{"container":"container159842779584205878","blob":"blob159842779627306932"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159842779584205878')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:42:25 GMT',
  'ETag',
  '"0x8D84993939B89EB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2d47b19e-401e-00ec-4c7c-7b36ef000000',
  'x-ms-client-request-id',
  'd0c0103c-56f9-4d30-85a5-286bb6ca0e7f',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 26 Aug 2020 07:42:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159842779584205878/blob159842779627306932')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:42:25 GMT',
  'ETag',
  '"0x8D8499393A8301E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2d47b1fc-401e-00ec-027c-7b36ef000000',
  'x-ms-client-request-id',
  '32b363b9-7af2-40af-b6b7-768481a02685',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 26 Aug 2020 07:42:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159842779584205878/blob159842779627306932')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 26 Aug 2020 07:42:27 GMT',
  'ETag',
  '"0x8D8499394C82CF9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-blob-sealed',
  'true',
  'x-ms-request-id',
  '2d47b23f-401e-00ec-277c-7b36ef000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'f11fbeda-cace-41c0-8aa5-71e613dff507',
  'Date',
  'Wed, 26 Aug 2020 07:42:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159842779584205878/blob159842779627306932')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:42:27 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8499394C82CF9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2d47b9f5-401e-00ec-357c-7b36ef000000',
  'x-ms-client-request-id',
  'd46b320a-e316-4e1d-a401-3d3f7c572c1f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Wed, 26 Aug 2020 07:42:25 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '0',
  'x-ms-server-encrypted',
  'true',
  'x-ms-blob-sealed',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,x-ms-blob-sealed,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 26 Aug 2020 07:42:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159842779584205878/blob159842779627306932')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:42:27 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8499394C82CF9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2d47ba59-401e-00ec-7e7c-7b36ef000000',
  'x-ms-client-request-id',
  '4a1aeac7-069c-4479-ade6-92a0392e9f5e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Wed, 26 Aug 2020 07:42:25 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '0',
  'x-ms-server-encrypted',
  'true',
  'x-ms-blob-sealed',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,x-ms-blob-sealed,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 26 Aug 2020 07:42:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159842779584205878')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container159842779584205878\"><Blobs><Blob><Name>blob159842779627306932</Name><Properties><Creation-Time>Wed, 26 Aug 2020 07:42:25 GMT</Creation-Time><Last-Modified>Wed, 26 Aug 2020 07:42:27 GMT</Last-Modified><Etag>0x8D8499394C82CF9</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>AppendBlob</BlobType><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><Sealed>true</Sealed></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2d47ba9b-401e-00ec-307c-7b36ef000000',
  'x-ms-client-request-id',
  '75c06072-a4b4-44a6-ada2-e2794a335c54',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 26 Aug 2020 07:42:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159842779584205878')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2d47bad4-401e-00ec-617c-7b36ef000000',
  'x-ms-client-request-id',
  'fd1539fb-95fc-4d43-b7f6-6177599ffe2c',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 26 Aug 2020 07:42:27 GMT'
]);
