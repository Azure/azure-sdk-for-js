let nock = require('nock');

module.exports.hash = "2b301541372f4fb5ca5e004a2f14a0d3";

module.exports.testInfo = {"uniqueName":{"container":"container159210827830903637","blob":"blob159210827832402334"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827830903637')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'ETag',
  '"0x8D81019EB720350"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309834-201e-003e-7002-42dadf000000',
  'x-ms-client-request-id',
  'b3fa6368-479b-4636-b36b-3a673e1524da',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827830903637/blob159210827832402334', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'ETag',
  '"0x8D81019EB74DEFD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309837-201e-003e-7202-42dadf000000',
  'x-ms-client-request-id',
  '15e5f354-6c2a-4c29-8e7e-57ab8abf0337',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:58.3467024Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827830903637/blob159210827832402334')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'ETag',
  '"0x8D81019EB74DEFD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130983d-201e-003e-7802-42dadf000000',
  'x-ms-client-request-id',
  '052b68d7-5bae-4e8f-8045-7456eaaa4121',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:58.3657137Z',
  'x-ms-snapshot',
  '2020-06-14T04:17:58.3647137Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827830903637/blob159210827832402334')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019EB74DEFD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130983f-201e-003e-7a02-42dadf000000',
  'x-ms-client-request-id',
  '12d5c3e8-ae61-474b-b8d2-f18baaa160ef',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827830903637/blob159210827832402334')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309840-201e-003e-7b02-42dadf000000',
  'x-ms-client-request-id',
  'b86d98db-3f5c-4245-a65f-0cb23b9b10c2',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827830903637/blob159210827832402334')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309844-201e-003e-7e02-42dadf000000',
  'x-ms-client-request-id',
  'd6d315b0-ddcb-44f3-911a-15eb84660e5c',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827830903637')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container159210827830903637\"><Blobs /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130984b-201e-003e-0502-42dadf000000',
  'x-ms-client-request-id',
  '6d22e777-3d63-4f4a-9b7f-93c944fc56cf',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827830903637')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130984e-201e-003e-0802-42dadf000000',
  'x-ms-client-request-id',
  'a0d90f3c-7ce3-4bbc-b3dd-20959c409ad2',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);
