let nock = require('nock');

module.exports.hash = "322f8e3ce0a6668e21f53f5dfd8d203b";

module.exports.testInfo = {"uniqueName":{"share":"share167875882678809082","dir":"dir167875882705100121","dir1":"dir1167875882740807312"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882678809082')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:47 GMT',
  'ETag',
  '"0x8DB242EF343C683"',
  'x-ms-request-id',
  '0b0de387-701a-0008-1017-56c247000000',
  'x-ms-client-request-id',
  'b80f4588-0223-418d-91fe-5dd08dacc340',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882678809082/dir167875882705100121.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:47 GMT',
  'ETag',
  '"0x8DB242EF377FFC0"',
  'x-ms-request-id',
  '0b0de389-701a-0008-1117-56c247000000',
  'x-ms-client-request-id',
  '5b889ec0-9790-4002-b4b3-29741b79ca66',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:47.4880448Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:47.4880448Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:47.4880448Z',
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
  'Tue, 14 Mar 2023 01:53:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882678809082/dir1167875882740807312...')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:47 GMT',
  'ETag',
  '"0x8DB242EF3A2E12E"',
  'x-ms-request-id',
  '0b0de38a-701a-0008-1217-56c247000000',
  'x-ms-client-request-id',
  '60c831fc-3dca-4115-ab4d-d674eee35569',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:47.7690670Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:47.7690670Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:47.7690670Z',
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
  'Tue, 14 Mar 2023 01:53:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875882678809082/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167875882678809082\" DirectoryPath=\"\"><DirectoryId>0</DirectoryId><Entries><Directory><Name>dir1167875882740807312</Name><FileId>11529285414812647424</FileId><Properties /></Directory><Directory><Name>dir167875882705100121</Name><FileId>13835128424026341376</FileId><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '0b0de38b-701a-0008-1317-56c247000000',
  'x-ms-client-request-id',
  '5fbca594-01f2-4611-9077-293ea566d028',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875882678809082')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de38c-701a-0008-1417-56c247000000',
  'x-ms-client-request-id',
  '65dbd998-e479-46b4-ac68-4a27d7eb7dfc',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:48 GMT'
]);
