let nock = require('nock');

module.exports.hash = "5578c886339e560f45c10d6e1e32edcd";

module.exports.testInfo = {"uniqueName":{"container":"container159195940804908307","blob":"blob159195940834006720"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159195940804908307')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 12 Jun 2020 10:56:47 GMT',
  'ETag',
  '"0x8D80EBF4D64F645"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c548d0-501e-0046-2ca8-407927000000',
  'x-ms-client-request-id',
  'b4be1805-15cd-42fd-b5c0-9792835c8cc8',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 12 Jun 2020 10:56:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159195940804908307/blob159195940834006720', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 12 Jun 2020 10:56:47 GMT',
  'ETag',
  '"0x8D80EBF4D9185C3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c5497d-501e-0046-52a8-407927000000',
  'x-ms-client-request-id',
  'a2972b0b-eacd-49bd-9fbd-e0c6e62a058e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-12T10:56:47.5850179Z',
  'Date',
  'Fri, 12 Jun 2020 10:56:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159195940804908307/blob159195940834006720')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54a09-501e-0046-4ea8-407927000000',
  'x-ms-client-request-id',
  '17b6f43c-edad-4463-ba82-cf72f9a95dfb',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 12 Jun 2020 10:56:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159195940804908307/blob159195940834006720', "hello")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'XUFAKrxLKna5cZ2REBfFkg==',
  'Last-Modified',
  'Fri, 12 Jun 2020 10:56:48 GMT',
  'ETag',
  '"0x8D80EBF4DEEF932"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54a8c-501e-0046-3fa8-407927000000',
  'x-ms-client-request-id',
  '49dc4ef9-1d8f-4c82-a439-39d61281b17c',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'V0JSBnCFdzM=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-12T10:56:48.1974578Z',
  'Date',
  'Fri, 12 Jun 2020 10:56:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159195940804908307/blob159195940834006720')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '162',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54b08-501e-0046-30a8-407927000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'cd8e0e9e-f643-43b8-91cb-d3984904c810',
  'Date',
  'Fri, 12 Jun 2020 10:56:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159195940804908307')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54b62-501e-0046-80a8-407927000000',
  'x-ms-client-request-id',
  '2925bf07-5b84-4a69-9e4d-61542f29874a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 12 Jun 2020 10:56:48 GMT'
]);
