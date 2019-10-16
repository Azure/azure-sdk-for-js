let nock = require('nock');

module.exports.testInfo = {"container":"container156816833054605943","blob":"blob156816833096209984"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816833054605943')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:50 GMT',
  'ETag',
  '"0x8D7365E62D0ED26"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd4a5428-901e-0037-7a47-68ca53000000',
  'x-ms-client-request-id',
  '04b5a177-b46a-4595-a112-e1f4691b0661',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:50 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816833054605943/blob156816833096209984', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:51 GMT',
  'ETag',
  '"0x8D7365E63117E09"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1071f798-c01e-0024-5b47-68ffb2000000',
  'x-ms-client-request-id',
  '9e73ba08-2959-4ef9-a698-b75436339d7a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:50 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816833054605943/blob156816833096209984')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobDoesNotUseCustomerSpecifiedEncryption</Code><Message>The blob is not encrypted with customer specified encryption, but one was provided in the request.\nRequestId:026f8b95-201e-0043-1747-684c15000000\nTime:2019-09-11T02:18:51.7343487Z</Message></Error>", [ 'Content-Length',
  '308',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '026f8b95-201e-0043-1747-684c15000000',
  'x-ms-client-request-id',
  '6d62f3e3-a94a-4450-81e4-dcf71d5893e0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'BlobDoesNotUseCustomerSpecifiedEncryption',
  'Date',
  'Wed, 11 Sep 2019 02:18:51 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816833054605943')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ad49cdec-801e-006c-2d47-68cd2f000000',
  'x-ms-client-request-id',
  '4e91daf5-78bc-49de-9c7e-26b3ad53c1d5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:51 GMT' ]);

