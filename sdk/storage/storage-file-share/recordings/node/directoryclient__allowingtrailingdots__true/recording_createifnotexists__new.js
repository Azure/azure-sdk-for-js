let nock = require('nock');

module.exports.hash = "4d26cdbb810efa1a3285867b8f545a8b";

module.exports.testInfo = {"uniqueName":{"share":"share167875880549009192","dir":"dir167875880574106411","dir1":"dir1167875880600205496"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875880549009192')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:25 GMT',
  'ETag',
  '"0x8DB242EE691A35D"',
  'x-ms-request-id',
  'fd6a9f3d-e01a-0007-7017-56fda4000000',
  'x-ms-client-request-id',
  '39e64177-e04a-4fc8-bde4-043f9f14556b',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875880549009192/dir167875880574106411.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:26 GMT',
  'ETag',
  '"0x8DB242EE6BA2A54"',
  'x-ms-request-id',
  'fd6a9f3f-e01a-0007-7117-56fda4000000',
  'x-ms-client-request-id',
  '6b5d8cf7-1eaa-4697-a21a-0d8d8876369b',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:26.1112916Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:26.1112916Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:26.1112916Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875880549009192/dir1167875880600205496...')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:26 GMT',
  'ETag',
  '"0x8DB242EE6E05083"',
  'x-ms-request-id',
  'fd6a9f40-e01a-0007-7217-56fda4000000',
  'x-ms-client-request-id',
  '42e1102b-7f1a-40b0-bfc4-f4f5c3926685',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:26.3613059Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:26.3613059Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:26.3613059Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875880549009192/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167875880549009192\" DirectoryPath=\"\"><DirectoryId>0</DirectoryId><Entries><Directory><Name>dir1167875880600205496...</Name><FileId>11529285414812647424</FileId><Properties /></Directory><Directory><Name>dir167875880574106411.</Name><FileId>13835128424026341376</FileId><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'fd6a9f41-e01a-0007-7317-56fda4000000',
  'x-ms-client-request-id',
  'a4b6deb8-1699-4019-bd59-c5d7f57d6e70',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875880549009192')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9f43-e01a-0007-7417-56fda4000000',
  'x-ms-client-request-id',
  '84e10376-a5b6-423e-9c6f-2b7e16ffd90c',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:26 GMT'
]);
