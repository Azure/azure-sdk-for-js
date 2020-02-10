let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157787784586404545","blob":"blob157787784782805197","md-container":"md-container157787784783004009","md-blob":"md-blob157787784922800635"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157787784586404545')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 01 Jan 2020 11:24:06 GMT',
  'ETag',
  '"0x8D78EAD1D2899F8"',
  'x-ms-request-id',
  'cdad9864-101e-0008-3495-c01643000000',
  'x-ms-client-request-id',
  '35f4fa43-7542-40f8-808b-d592c9445a13',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Wed, 01 Jan 2020 11:24:06 GMT'
]);

nock('https://md-fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/md-container157787784783004009')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 01 Jan 2020 11:24:08 GMT',
  'ETag',
  '"0x8D78EAD1E0FDEB5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5c20da12-c01e-0014-6995-c0a2c5000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '62a6e16e-0f27-4f97-8abc-52a4c489af5e',
  'Date',
  'Wed, 01 Jan 2020 11:24:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://md-fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/md-container157787784783004009/md-blob157787784922800635')
  .reply(201, "", [
  'Last-Modified',
  'Wed, 01 Jan 2020 11:24:09 GMT',
  'ETag',
  '"0x8D78EAD1EC0FA5D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '23f8e9a5-901e-000c-3e95-c08f50000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '8eab55af-e0df-48ee-8be5-206005e127ee',
  'Date',
  'Wed, 01 Jan 2020 11:24:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://md-fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/md-container157787784783004009/md-blob157787784922800635')
  .reply(200, "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 01 Jan 2020 11:24:09 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D78EAD1EC0FA5D"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-creation-time',
  'Wed, 01 Jan 2020 11:24:09 GMT',
  'x-ms-lease-state',
  'available',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-server-encrypted',
  'true',
  'x-ms-request-id',
  'b03f31de-201e-0015-5595-c0a338000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'dbb6f2cb-6f37-407c-9854-1085b972aa9e',
  'Date',
  'Wed, 01 Jan 2020 11:24:09 GMT'
]);

nock('https://md-fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/md-container157787784783004009/md-blob157787784922800635', "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 01 Jan 2020 11:24:10 GMT',
  'ETag',
  '"0x8D78EAD1F9FC321"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-content-crc64',
  'pK+ypU+jreM=',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '23f8e9a7-901e-000c-3f95-c08f50000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'ddb2f11f-0368-48b8-8488-215865de0668',
  'Date',
  'Wed, 01 Jan 2020 11:24:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://md-fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/md-container157787784783004009/md-blob157787784922800635')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 01 Jan 2020 11:24:10 GMT',
  'ETag',
  '"0x8D78EAD1F9FC321"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-snapshot',
  '2020-01-01T11:24:11.0707251Z',
  'x-ms-request-id',
  '23f8e9ac-901e-000c-4495-c08f50000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'cfb6456e-71b8-4c79-8b9b-92616f0d926c',
  'Date',
  'Wed, 01 Jan 2020 11:24:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://md-fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/md-container157787784783004009/md-blob157787784922800635', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 01 Jan 2020 11:24:11 GMT',
  'ETag',
  '"0x8D78EAD200E779C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '23f8e9af-901e-000c-4695-c08f50000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '7ccb1803-013c-441f-9d0f-d7183d9291ed',
  'Date',
  'Wed, 01 Jan 2020 11:24:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://md-fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/md-container157787784783004009/md-blob157787784922800635')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 01 Jan 2020 11:24:11 GMT',
  'ETag',
  '"0x8D78EAD20389C89"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-request-id',
  '23f8e9b0-901e-000c-4795-c08f50000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '6678de55-3079-481a-9b62-03bc5a7b1e30',
  'Date',
  'Wed, 01 Jan 2020 11:24:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://md-fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/md-container157787784783004009/md-blob157787784922800635')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<PageList><PageRange><Start>0</Start><End>511</End></PageRange><ClearRange><Start>512</Start><End>1023</End></ClearRange><NextMarker/></PageList>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Wed, 01 Jan 2020 11:24:11 GMT',
  'ETag',
  '"0x8D78EAD20389C89"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-blob-content-length',
  '1024',
  'x-ms-request-id',
  '23f8e9b2-901e-000c-4895-c08f50000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '0f5d185d-770b-425a-922c-a070b00c66d6',
  'Date',
  'Wed, 01 Jan 2020 11:24:12 GMT'
]);

nock('https://md-fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/md-container157787784783004009')
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5c20da17-c01e-0014-6a95-c0a2c5000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '29503c10-6fc5-4db0-afda-0ff3fb0a3578',
  'Date',
  'Wed, 01 Jan 2020 11:24:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157787784586404545')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'cdad9873-101e-0008-3595-c01643000000',
  'x-ms-client-request-id',
  '462515dc-f21e-4347-bab6-e2648c5d03f7',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Wed, 01 Jan 2020 11:24:12 GMT'
]);
