let nock = require('nock');

module.exports.hash = "efa4b4712810eaa9330db4cc30129c6f";

module.exports.testInfo = {"uniqueName":{"container":"container159549957777001146","blob":"blob159549957806705918"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549957777001146')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:36 GMT',
  'ETag',
  '"0x8D82EF1E6D9F76C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10428ef8-901e-002b-52da-60cd6c000000',
  'x-ms-client-request-id',
  '9124ec79-618c-4798-a4c1-1cff6bb8e277',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549957777001146/blob159549957806705918', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:37 GMT',
  'ETag',
  '"0x8D82EF1E7080C23"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10428f1a-901e-002b-66da-60cd6c000000',
  'x-ms-client-request-id',
  '68e8dada-0897-41f2-8428-69c8b887358b',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:19:37.0985507Z',
  'Date',
  'Thu, 23 Jul 2020 10:19:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549957777001146/blob159549957806705918', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10428f38-901e-002b-79da-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'efc98116-4499-4ed5-bc66-c5a14b93aaa9',
  'Date',
  'Thu, 23 Jul 2020 10:19:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549957777001146')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10428f50-901e-002b-0ada-60cd6c000000',
  'x-ms-client-request-id',
  '527e7aeb-81bc-4698-aac7-89d7ae77ab02',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:36 GMT'
]);
