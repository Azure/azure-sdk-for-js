let nock = require('nock');

module.exports.hash = "fbf6feac48348943de323529a76f3f2f";

module.exports.testInfo = {"uniqueName":{"container":"container158977215391405044","blob":"blob158977215420602835"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158977215391405044')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 03:22:32 GMT',
  'ETag',
  '"0x8D7FADAB3BD57B0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eed2111d-701e-006b-28c3-2c25fb000000',
  'x-ms-client-request-id',
  '265a89bd-236b-42ee-8cb0-a0a7512ee5d3',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 03:22:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158977215391405044/blob158977215420602835')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 03:22:32 GMT',
  'ETag',
  '"0x8D7FADAB3EA4124"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eed211a2-701e-006b-20c3-2c25fb000000',
  'x-ms-client-request-id',
  '5b7bd94e-7988-4280-8b38-f57bfd3c6b42',
  'x-ms-version',
  '2019-07-07',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 18 May 2020 03:22:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158977215391405044/blob158977215420602835')
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobAlreadyExists</Code><Message>The specified blob already exists.\nRequestId:eed21257-701e-006b-46c3-2c25fb000000\nTime:2020-05-18T03:22:32.7423460Z</Message></Error>", [
  'Content-Length',
  '220',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eed21257-701e-006b-46c3-2c25fb000000',
  'x-ms-client-request-id',
  '2b1114b5-0a8a-46e1-bbe6-8d408935ea0d',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'BlobAlreadyExists',
  'Date',
  'Mon, 18 May 2020 03:22:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158977215391405044')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eed21374-701e-006b-55c3-2c25fb000000',
  'x-ms-client-request-id',
  '6471de5c-8a27-4cdd-9aec-023a1fe5322e',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 03:22:32 GMT'
]);
