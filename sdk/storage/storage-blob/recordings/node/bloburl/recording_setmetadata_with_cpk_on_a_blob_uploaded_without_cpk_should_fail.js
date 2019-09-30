let nock = require('nock');

module.exports.testInfo = {"container":"container156776187178301371","blob":"blob156776187218209582"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776187178301371')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:24:32 GMT',
  'ETag',
  '"0x8D732AC067B3167"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '62cbc52a-a01e-0041-4894-64af67000000',
  'x-ms-client-request-id',
  '7270a38e-5cde-456c-be6e-ef2cf02f01b4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:24:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776187178301371/blob156776187218209582', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:24:32 GMT',
  'ETag',
  '"0x8D732AC06B8E43C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '73aaeb1d-101e-0129-7e94-6437fa000000',
  'x-ms-client-request-id',
  'd50ad84c-d322-4264-acc4-8f8380e11ccc',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:24:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776187178301371/blob156776187218209582')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobDoesNotUseCustomerSpecifiedEncryption</Code><Message>The blob is not encrypted with customer specified encryption, but one was provided in the request.\nRequestId:a24fe1bc-201e-00c9-7e94-644a6e000000\nTime:2019-09-06T09:24:32.8845766Z</Message></Error>", [ 'Content-Length',
  '308',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a24fe1bc-201e-00c9-7e94-644a6e000000',
  'x-ms-client-request-id',
  '3076c4d6-c8de-4fb1-9ea7-4fe48003bb4a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'BlobDoesNotUseCustomerSpecifiedEncryption',
  'Date',
  'Fri, 06 Sep 2019 09:24:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776187178301371')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0cbb302d-201e-00d9-2394-648f06000000',
  'x-ms-client-request-id',
  'a8b77bb4-0147-4fc9-bb68-932f89c56fca',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:24:32 GMT',
  'Connection',
  'close' ]);

