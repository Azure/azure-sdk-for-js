let nock = require('nock');

module.exports.testInfo = {"container":"container156776194936106206","blob":"blob156776194975605435","newblockblob":"newblockblob156776195055508847"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776194936106206')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:49 GMT',
  'ETag',
  '"0x8D732AC34B88495"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '84682a42-a01e-0113-2395-642d82000000',
  'x-ms-client-request-id',
  '969ecb40-6065-4ad3-a1fb-be7d33aea10f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:25:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776194936106206/blob156776194975605435', "HelloWorld")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:50 GMT',
  'ETag',
  '"0x8D732AC34F5478F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0450a3dc-401e-0014-3a95-64bfec000000',
  'x-ms-client-request-id',
  '05f6d824-e99a-4751-a0b2-d8b0f9567c4f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:25:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776194936106206', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers/>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:50 GMT',
  'ETag',
  '"0x8D732AC3532AA4D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00345f4a-d01e-0090-6695-64cded000000',
  'x-ms-client-request-id',
  '33c045ad-ae2c-4b9c-bc06-747f332db82c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:25:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776194936106206/newblockblob156776195055508847')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4d870e0-601e-005e-0295-641c63000000',
  'x-ms-client-request-id',
  '0d83c77f-99a5-4e40-8acf-38c3d1bf393b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:25:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156776194936106206/newblockblob156776195055508847')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><BlockList><UncommittedBlocks><Block><Name>MQ==</Name><Size>10</Size></Block></UncommittedBlocks></BlockList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ca716e1e-c01e-0105-4095-64db55000000',
  'x-ms-client-request-id',
  'c5d586c8-5961-47c7-8e53-168e2d152570',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:25:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776194936106206')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f23f4ff3-401e-00bd-2e95-647e9e000000',
  'x-ms-client-request-id',
  'ce0ea17e-1ebe-4787-9ebd-47967bf0fe80',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:25:51 GMT',
  'Connection',
  'close' ]);

