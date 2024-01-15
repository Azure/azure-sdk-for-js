let nock = require('nock');

module.exports.hash = "8653580f598c5ba11346f8b8ff941de6";

module.exports.testInfo = {"uniqueName":{"share":"share168222949361104655","dir":"dir168222949541108029"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share168222949361104655')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 23 Apr 2023 05:58:15 GMT',
  'ETag',
  '"0x8DB43BFBABC61EC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b162292-e01a-00a5-17a8-75b652000000',
  'x-ms-client-request-id',
  '1d612298-48a4-494a-b6e9-c28bee5b08c8',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Sun, 23 Apr 2023 05:58:14 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share168222949361104655/dir168222949541108029')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 23 Apr 2023 05:58:15 GMT',
  'ETag',
  '"0x8DB43BFBAD16576"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b162298-e01a-00a5-18a8-75b652000000',
  'x-ms-client-request-id',
  '2876b26e-15cb-439b-b492-b755a8ff011f',
  'x-ms-version',
  '2023-01-03',
  'x-ms-file-change-time',
  '2023-04-23T05:58:15.5156854Z',
  'x-ms-file-last-write-time',
  '2023-04-23T05:58:15.5156854Z',
  'x-ms-file-creation-time',
  '2023-04-23T05:58:15.5156854Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sun, 23 Apr 2023 05:58:14 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share168222949361104655/dir168222949541108029')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries><Handle><HandleId>50304516137</HandleId><Path>dir168222949541108029</Path><FileId>13835128424026341376</FileId><ParentId>0</ParentId><SessionId>9913091334384648269</SessionId><AccessRightList><AccessRight>Read</AccessRight><AccessRight>Write</AccessRight><AccessRight>Delete</AccessRight></AccessRightList><ClientIp>10.2.4.26:49849</ClientIp><OpenTime>Sun, 23 Apr 2023 05:59:52 GMT</OpenTime><ClientName>dir168222949541108029</ClientName></Handle></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b16243d-e01a-00a5-36a8-75b652000000',
  'x-ms-client-request-id',
  '11a4d842-2000-4eb4-a758-062d3afadca1',
  'x-ms-version',
  '2023-01-03',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 23 Apr 2023 05:59:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share168222949361104655')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b162440-e01a-00a5-37a8-75b652000000',
  'x-ms-client-request-id',
  'a6a60ba4-53a3-484d-98bf-8df6f2f2c6ad',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Sun, 23 Apr 2023 05:59:58 GMT'
]);
