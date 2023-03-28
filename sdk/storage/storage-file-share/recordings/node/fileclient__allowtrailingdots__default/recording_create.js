let nock = require('nock');

module.exports.hash = "779ad0181ef1c49b7b76bd28d3b00f2a";

module.exports.testInfo = {"uniqueName":{"share":"share167818186028609568","dir":"dir167818186054402345","file":"file167818186082403199"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818186028609568')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:40 GMT',
  'ETag',
  '"0x8DB1EEF986C7BB9"',
  'x-ms-request-id',
  '790792f5-a01a-0005-55d8-50f0c9000000',
  'x-ms-client-request-id',
  '2f612fa9-0e08-4c0e-aba9-26d11f5fc889',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818186028609568/dir167818186054402345....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:40 GMT',
  'ETag',
  '"0x8DB1EEF989846B3"',
  'x-ms-request-id',
  '790792f7-a01a-0005-56d8-50f0c9000000',
  'x-ms-client-request-id',
  'e9a71779-8daa-4395-b08d-99d2e2485921',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-07T09:37:40.9190579Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:40.9190579Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:40.9190579Z',
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
  'Tue, 07 Mar 2023 09:37:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818186028609568/dir167818186054402345..../file167818186082403199....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:41 GMT',
  'ETag',
  '"0x8DB1EEF98C04164"',
  'x-ms-request-id',
  '790792f8-a01a-0005-57d8-50f0c9000000',
  'x-ms-client-request-id',
  'dc541753-83cc-480c-89ed-bda09babc58e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-07T09:37:41.1810660Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:41.1810660Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:41.1810660Z',
  'x-ms-file-permission-key',
  '18144810169125879831*1871445747569276785',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 07 Mar 2023 09:37:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167818186028609568/dir167818186054402345....')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167818186028609568\" DirectoryPath=\"dir167818186054402345\"><DirectoryId>13835128424026341376</DirectoryId><Entries><File><Name>file167818186082403199</Name><FileId>11529285414812647424</FileId><Properties><Content-Length>11</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '790792fa-a01a-0005-58d8-50f0c9000000',
  'x-ms-client-request-id',
  'f62e147d-7a08-4ed4-abb4-32420b19e8d4',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167818186028609568')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '790792fc-a01a-0005-59d8-50f0c9000000',
  'x-ms-client-request-id',
  '453c5b32-1852-4a98-8244-bc49daa25306',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:41 GMT'
]);
