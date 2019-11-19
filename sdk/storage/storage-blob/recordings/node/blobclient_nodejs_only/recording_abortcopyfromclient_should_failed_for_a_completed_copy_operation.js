let nock = require('nock');

module.exports.testInfo = {"container":"container157169617904101186","blob":"blob157169617910108417","copiedblob":"copiedblob157169617919901519"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169617904101186')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:16:19 GMT',
  'ETag',
  '"0x8D756744C2C616F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5fa2ff85-901e-0078-1d5d-88f00c000000',
  'x-ms-client-request-id',
  'adf6ef2c-09c5-48df-8a11-bfccd317450a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169617904101186/blob157169617910108417', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:16:19 GMT',
  'ETag',
  '"0x8D756744C35BAF4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d5859ac-a01e-00ca-6e5d-880f7d000000',
  'x-ms-client-request-id',
  '1fd2750a-cb8e-408a-a087-e355409f98c2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 21 Oct 2019 22:16:19 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169617904101186/copiedblob157169617919901519')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:16:19 GMT',
  'ETag',
  '"0x8D756744C457550"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5961f6ae-901e-009c-3f5d-88fe92000000',
  'x-ms-client-request-id',
  '06f6efb9-3088-48bd-b14c-a28f1ab92435',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  '50eac9ee-257c-411f-87b4-b92cd4db1108',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169617904101186/copiedblob157169617919901519')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.\nRequestId:6a1e725f-401e-0009-675d-881627000000\nTime:2019-10-21T22:16:19.2552507Z</Message><HeaderName>x-ms-copy-source</HeaderName><HeaderValue>50eac9ee-257c-411f-87b4-b92cd4db1108</HeaderValue></Error>", [
  'Content-Length',
  '358',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6a1e725f-401e-0009-675d-881627000000',
  'x-ms-client-request-id',
  '36e3db35-50d4-4a5f-ad33-2f9f14dfa2c5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'Date',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157169617904101186')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd13b8301-d01e-00b2-1f5d-88ac85000000',
  'x-ms-client-request-id',
  '3bd68aad-6ad8-4ca9-839c-8070ac488b54',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:16:19 GMT',
  'Connection',
  'close'
]);

