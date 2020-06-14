let nock = require('nock');

module.exports.hash = "7bd40161eaf58188daf1c9e43aa2cdb2";

module.exports.testInfo = {"uniqueName":{"container":"container159210827134700180","blob":"blob159210827158107503"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827134700180')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:51 GMT',
  'ETag',
  '"0x8D81019E74B8D23"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308d3c-201e-003e-3702-42dadf000000',
  'x-ms-client-request-id',
  '5134a815-6186-4e17-864b-e1b8f234856f',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827134700180/blob159210827158107503', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:51 GMT',
  'ETag',
  '"0x8D81019E7707765"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308d99-201e-003e-0a02-42dadf000000',
  'x-ms-client-request-id',
  '1e7fc791-7952-4e5e-a9aa-2dc56f1f4bda',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:51.6059493Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827134700180/blob159210827158107503')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308d9c-201e-003e-0d02-42dadf000000',
  'x-ms-client-request-id',
  'a39cc029-cafb-4f75-95e5-86343e5058f0',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827134700180/blob159210827158107503')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:51 GMT',
  'ETag',
  '"0x8D81019E775815E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308d9f-201e-003e-1002-42dadf000000',
  'x-ms-client-request-id',
  'ef63489c-b1a8-448a-9c03-9b7d673c4629',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:51.6389726Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827134700180/blob159210827158107503')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '162',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308da1-201e-003e-1202-42dadf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '95b9e2b6-1904-46b9-a05c-4fcf0ffe3846',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827134700180')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308da4-201e-003e-1502-42dadf000000',
  'x-ms-client-request-id',
  '33496ffa-236b-47fb-82c0-0c70456abac2',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);
