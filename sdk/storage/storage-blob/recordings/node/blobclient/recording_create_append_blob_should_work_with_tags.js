let nock = require('nock');

module.exports.hash = "ee6ec50a5851a61546854975187699f2";

module.exports.testInfo = {"uniqueName":{"container":"container160025726972502217","blob":"blob160025727108208246","apendBlob":"apendBlob160025727141501088"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160025726972502217')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 16 Sep 2020 11:54:30 GMT',
  'ETag',
  '"0x8D85A37458C18B2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ee69817-901e-002b-0a20-8ccd6c000000',
  'x-ms-client-request-id',
  '8fd52a16-facb-4757-9ef4-f6e89b6220d6',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 16 Sep 2020 11:54:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160025726972502217/blob160025727108208246', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 16 Sep 2020 11:54:31 GMT',
  'ETag',
  '"0x8D85A3745BF254C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ee69853-901e-002b-3d20-8ccd6c000000',
  'x-ms-client-request-id',
  '1b8208e3-35c6-4475-b0b3-15951bc6841f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-09-16T11:54:31.2781132Z',
  'Date',
  'Wed, 16 Sep 2020 11:54:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160025726972502217/apendBlob160025727141501088')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 16 Sep 2020 11:54:31 GMT',
  'ETag',
  '"0x8D85A3745EEC975"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ee6987b-901e-002b-6020-8ccd6c000000',
  'x-ms-client-request-id',
  'd05c7106-f7cb-4ef1-aa40-b61ee421fe62',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-09-16T11:54:31.5913356Z',
  'Date',
  'Wed, 16 Sep 2020 11:54:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160025726972502217/apendBlob160025727141501088')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '162',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ee6989a-901e-002b-7b20-8ccd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '46bd3651-8cee-40d7-a676-765ca73dcf23',
  'Date',
  'Wed, 16 Sep 2020 11:54:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160025726972502217')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ee698dd-901e-002b-3820-8ccd6c000000',
  'x-ms-client-request-id',
  '0b8c08e8-3fc3-4913-9bfa-a61b02fb554f',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 16 Sep 2020 11:54:32 GMT'
]);
