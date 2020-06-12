let nock = require('nock');

module.exports.hash = "faaf2ba76e4808ebdd525ec9ee62d785";

module.exports.testInfo = {"uniqueName":{"container":"container159195940982907573","blob":"blob159195941011805137"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159195940982907573')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 12 Jun 2020 10:56:49 GMT',
  'ETag',
  '"0x8D80EBF4E747534"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54bc9-501e-0046-5da8-407927000000',
  'x-ms-client-request-id',
  'b13cf00f-2ae7-4b58-b456-f19812ebedef',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 12 Jun 2020 10:56:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159195940982907573/blob159195941011805137', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 12 Jun 2020 10:56:49 GMT',
  'ETag',
  '"0x8D80EBF4EA0DDAF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54c32-501e-0046-39a8-407927000000',
  'x-ms-client-request-id',
  '4d63846b-4353-4e0b-a7d9-f7fde7b70763',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-12T10:56:49.3632943Z',
  'Date',
  'Fri, 12 Jun 2020 10:56:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159195940982907573/blob159195941011805137')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54c75-501e-0046-76a8-407927000000',
  'x-ms-client-request-id',
  'af7b192d-6f8d-4c96-b083-a1bd9905d990',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 12 Jun 2020 10:56:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159195940982907573/blob159195941011805137')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 12 Jun 2020 10:56:49 GMT',
  'ETag',
  '"0x8D80EBF4EF9471D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54cc4-501e-0046-40a8-407927000000',
  'x-ms-client-request-id',
  'a5d96424-fe39-4f0c-a51a-3102ef0ebcd6',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-12T10:56:49.9427101Z',
  'Date',
  'Fri, 12 Jun 2020 10:56:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159195940982907573/blob159195941011805137')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '162',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54d4b-501e-0046-3da8-407927000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'b62ace90-44d1-4ee3-b5c0-b84bd5d1b637',
  'Date',
  'Fri, 12 Jun 2020 10:56:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159195940982907573')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54dbc-501e-0046-28a8-407927000000',
  'x-ms-client-request-id',
  'c7fbe39a-cb40-4feb-85a5-639dbff054e0',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 12 Jun 2020 10:56:50 GMT'
]);
