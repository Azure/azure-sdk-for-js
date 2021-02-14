let nock = require('nock');

module.exports.hash = "182afcbcd051964f01dd6aa10ef0860b";

module.exports.testInfo = {"uniqueName":{"container":"container158977214749307469","blob":"blob158977214884105113"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158977214749307469')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 03:22:26 GMT',
  'ETag',
  '"0x8D7FADAB0876854"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eed205b1-701e-006b-26c3-2c25fb000000',
  'x-ms-client-request-id',
  '0d50f179-961f-49ca-b81f-df1963fa169b',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 03:22:26 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158977214749307469/blob158977214884105113')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 03:22:27 GMT',
  'ETag',
  '"0x8D7FADAB0B95B93"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eed20642-701e-006b-2bc3-2c25fb000000',
  'x-ms-client-request-id',
  'c1ef56ec-7bc1-42e2-b234-2e69e3acd3e5',
  'x-ms-version',
  '2019-07-07',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 18 May 2020 03:22:26 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158977214749307469/blob158977214884105113')
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobAlreadyExists</Code><Message>The specified blob already exists.\nRequestId:eed206d9-701e-006b-39c3-2c25fb000000\nTime:2020-05-18T03:22:27.3887334Z</Message></Error>", [
  'Content-Length',
  '220',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eed206d9-701e-006b-39c3-2c25fb000000',
  'x-ms-client-request-id',
  'f8e303d9-7164-4e8e-81b0-b9f76badc938',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'BlobAlreadyExists',
  'Date',
  'Mon, 18 May 2020 03:22:26 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158977214749307469')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eed2074d-701e-006b-24c3-2c25fb000000',
  'x-ms-client-request-id',
  '8dc0e559-e40c-49d7-a639-0dd9db5ec42c',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 03:22:27 GMT'
]);
