let nock = require('nock');

module.exports.hash = "ad00623b96703abd10479eb1162a588d";

module.exports.testInfo = {"uniqueName":{"container":"container159341668458503751","blob":"blob159341668595804648","blob2":"blob2159341668657509953"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159341668458503751')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 29 Jun 2020 07:44:44 GMT',
  'ETag',
  '"0x8D81C004A16B216"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '148b9fd5-f01e-0065-7be9-4d0c4b000000',
  'x-ms-client-request-id',
  '21f0d4a8-4c28-4367-99f1-6ccf9e0b63d4',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 29 Jun 2020 07:44:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159341668458503751/blob159341668595804648', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 29 Jun 2020 07:44:44 GMT',
  'ETag',
  '"0x8D81C004A4971E1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '148ba0d9-f01e-0065-63e9-4d0c4b000000',
  'x-ms-client-request-id',
  '8ec90cab-945f-4fa4-95ae-6057d8510080',
  'x-ms-version',
  '2019-07-07',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 29 Jun 2020 07:44:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159341668458503751/blob159341668595804648')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '148ba1a8-f01e-0065-1ae9-4d0c4b000000',
  'x-ms-client-request-id',
  'f99aee2f-7027-4de5-953a-fbc1a90d5e8e',
  'x-ms-version',
  '2019-07-07',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 29 Jun 2020 07:44:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159341668458503751/blob2159341668657509953')
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobNotFound</Code><Message>The specified blob does not exist.\nRequestId:148ba281-f01e-0065-5de9-4d0c4b000000\nTime:2020-06-29T07:44:45.0880620Z</Message></Error>", [
  'Content-Length',
  '215',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '148ba281-f01e-0065-5de9-4d0c4b000000',
  'x-ms-client-request-id',
  '54d4dd87-b16e-4571-8fb9-50076e3832db',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'BlobNotFound',
  'Date',
  'Mon, 29 Jun 2020 07:44:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159341668458503751')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '148ba38a-f01e-0065-45e9-4d0c4b000000',
  'x-ms-client-request-id',
  '5d53fb8e-d717-44e5-8736-a2cbfd079655',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 29 Jun 2020 07:44:44 GMT'
]);
