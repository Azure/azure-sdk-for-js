let nock = require('nock');

module.exports.hash = "a672c204152471aa4bce73e42405ffa0";

module.exports.testInfo = {"uniqueName":{"container":"container159218741481808199","blob":"blob159218741536301937"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218741481808199')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:54 GMT',
  'ETag',
  '"0x8D810D22C861E00"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46eeb5-701e-006e-68bb-42188f000000',
  'x-ms-client-request-id',
  '95e5ac62-2c39-4e86-afd9-97f414f30169',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:16:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218741481808199/blob159218741536301937', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:55 GMT',
  'ETag',
  '"0x8D810D22CD9A17B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46f020-701e-006e-41bb-42188f000000',
  'x-ms-client-request-id',
  '8a78c653-386f-4b1e-acdf-3512031bb281',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:16:55.4561915Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218741481808199/blob159218741536301937')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:55 GMT',
  'ETag',
  '"0x8D810D22D052621"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46f0ed-701e-006e-0abb-42188f000000',
  'x-ms-client-request-id',
  '2fdf4d50-d974-40a1-9292-a50f4cf796d6',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:16:55.7423921Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218741481808199/blob159218741536301937')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:55 GMT',
  'ETag',
  '"0x8D810D22D052621"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46f1c6-701e-006e-5dbb-42188f000000',
  'x-ms-client-request-id',
  '9f068a97-b5fc-4b34-8f78-264f8cfe5532',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-15T02:16:56.0315946Z',
  'x-ms-snapshot',
  '2020-06-15T02:16:56.0305946Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Mon, 15 Jun 2020 02:16:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218741481808199/blob159218741536301937')
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>SnapshotsPresent</Code><Message>This operation is not permitted because the blob has snapshots.\nRequestId:0f46f286-701e-006e-14bb-42188f000000\nTime:2020-06-15T02:16:56.3429056Z</Message></Error>", [
  'Content-Length',
  '248',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46f286-701e-006e-14bb-42188f000000',
  'x-ms-client-request-id',
  '6cb1d2d3-b392-4caf-a4ba-68b72ca53297',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'SnapshotsPresent',
  'Date',
  'Mon, 15 Jun 2020 02:16:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218741481808199/blob159218741536301937')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46f337-701e-006e-45bb-42188f000000',
  'x-ms-client-request-id',
  'd990d2b9-36b5-4aed-ad9c-bcb711f05446',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 15 Jun 2020 02:16:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159218741481808199/blob159218741536301937')
  .query(true)
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa9219-e01e-0021-12bb-4269db000000',
  'x-ms-client-request-id',
  '799d1acd-f1ef-4439-b08f-a792c0f3fca0',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 15 Jun 2020 02:16:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159218741481808199/blob159218741536301937')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46f5ba-701e-006e-3fbb-42188f000000',
  'x-ms-client-request-id',
  '95b25c06-93b7-44f1-a8ee-a01ddfa1e87c',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 15 Jun 2020 02:16:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218741481808199')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa92e3-e01e-0021-56bb-4269db000000',
  'x-ms-client-request-id',
  '78819c83-e69c-4e72-911c-3f3a49ddbcd0',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:16:57 GMT'
]);
