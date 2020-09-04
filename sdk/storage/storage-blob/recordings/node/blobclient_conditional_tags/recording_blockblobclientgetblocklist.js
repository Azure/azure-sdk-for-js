let nock = require('nock');

module.exports.hash = "c13659bc34be8c4386ce178636dd76d1";

module.exports.testInfo = {"uniqueName":{"container":"container159549960439207219","blob":"blob159549960468500494"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960439207219')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:03 GMT',
  'ETag',
  '"0x8D82EF1F6B7B2C9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104297d1-901e-002b-2ada-60cd6c000000',
  'x-ms-client-request-id',
  'ea9a5e8c-871e-4a32-b5fc-3389cd781f30',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:20:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960439207219/blob159549960468500494', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:03 GMT',
  'ETag',
  '"0x8D82EF1F6E4DB63"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104297e5-901e-002b-36da-60cd6c000000',
  'x-ms-client-request-id',
  '3d84d016-692d-4fc0-a49a-3e6527ca7079',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:20:03.7124731Z',
  'Date',
  'Thu, 23 Jul 2020 10:20:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960439207219/blob159549960468500494', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104297ec-901e-002b-3cda-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '60cd4d06-ebf6-4357-8609-e07d252d6455',
  'Date',
  'Thu, 23 Jul 2020 10:20:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960439207219/blob159549960468500494', "HelloWorld")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104297f6-901e-002b-45da-60cd6c000000',
  'x-ms-client-request-id',
  'eb7358fc-bd39-40ab-9210-ac14eae829d5',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 23 Jul 2020 10:20:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960439207219/blob159549960468500494', "HelloWorld")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042980a-901e-002b-53da-60cd6c000000',
  'x-ms-client-request-id',
  '8b32eef3-12f3-4307-8ab6-52478e25db1d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 23 Jul 2020 10:20:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960439207219/blob159549960468500494', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><BlockList><Latest>MQ==</Latest><Latest>Mg==</Latest></BlockList>")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:04 GMT',
  'ETag',
  '"0x8D82EF1F798BBB8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429824-901e-002b-65da-60cd6c000000',
  'x-ms-client-request-id',
  'dd449e4a-6915-4761-b403-9dd96eb25797',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'GFi/o1BSQtU=',
  'x-ms-version-id',
  '2020-07-23T10:20:04.8913096Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 23 Jul 2020 10:20:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159549960439207219/blob159549960468500494')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:10429850-901e-002b-0cda-60cd6c000000\nTime:2020-07-23T10:20:05.1897838Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429850-901e-002b-0cda-60cd6c000000',
  'x-ms-client-request-id',
  'f0383629-baa5-44e2-bb7b-3cc872a0317a',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 23 Jul 2020 10:20:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159549960439207219/blob159549960468500494')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><BlockList><CommittedBlocks><Block><Name>MQ==</Name><Size>10</Size></Block><Block><Name>Mg==</Name><Size>10</Size></Block></CommittedBlocks><UncommittedBlocks /></BlockList>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:04 GMT',
  'ETag',
  '"0x8D82EF1F798BBB8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042986f-901e-002b-23da-60cd6c000000',
  'x-ms-client-request-id',
  '797651e1-70ad-4295-a3f2-a95a8e35e2c7',
  'x-ms-version',
  '2019-12-12',
  'x-ms-blob-content-length',
  '20',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-blob-content-length,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 23 Jul 2020 10:20:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549960439207219')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042987e-901e-002b-2fda-60cd6c000000',
  'x-ms-client-request-id',
  'dda39430-54e8-4f3f-a108-6f8bb7da2499',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:20:05 GMT'
]);
