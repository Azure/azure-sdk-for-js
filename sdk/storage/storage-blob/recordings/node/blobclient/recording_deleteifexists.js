let nock = require('nock');

module.exports.hash = "72625ad7134389678fb0c0df03b89186";

module.exports.testInfo = {"uniqueName":{"container":"container158977214975808781","blob":"blob158977215005109674","blob2":"blob2158977215035103936"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158977214975808781')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 03:22:27 GMT',
  'ETag',
  '"0x8D7FADAB14310B4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eed207ca-701e-006b-16c3-2c25fb000000',
  'x-ms-client-request-id',
  '432f8326-c155-46ae-8465-1d9d2e08f009',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 03:22:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158977214975808781/blob158977215005109674', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 18 May 2020 03:22:28 GMT',
  'ETag',
  '"0x8D7FADAB170E45C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eed20857-701e-006b-16c3-2c25fb000000',
  'x-ms-client-request-id',
  '093d954c-ac27-4498-898d-77f740b3f2e6',
  'x-ms-version',
  '2019-07-07',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 18 May 2020 03:22:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158977214975808781/blob2158977215035103936')
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobNotFound</Code><Message>The specified blob does not exist.\nRequestId:eed208dc-701e-006b-15c3-2c25fb000000\nTime:2020-05-18T03:22:28.5945493Z</Message></Error>", [
  'Content-Length',
  '215',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eed208dc-701e-006b-15c3-2c25fb000000',
  'x-ms-client-request-id',
  '1c2262a3-b05c-4279-881a-9f4f7b075a17',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'BlobNotFound',
  'Date',
  'Mon, 18 May 2020 03:22:28 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158977214975808781')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eed2096e-701e-006b-19c3-2c25fb000000',
  'x-ms-client-request-id',
  '873cbaea-1e8c-4db3-89e6-d299d06c83e3',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 03:22:28 GMT'
]);
