let nock = require('nock');

module.exports.hash = "009a8bbaf322c6fb4bb8c61c0cf80597";

module.exports.testInfo = {"uniqueName":{"share":"share167875881749701920","dir":"dir167875881774908425","file":"file167875881800900863"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881749701920')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:37 GMT',
  'ETag',
  '"0x8DB242EEDB9FB4E"',
  'x-ms-request-id',
  '0b0de352-701a-0008-6d17-56c247000000',
  'x-ms-client-request-id',
  'd73b2b7a-1638-4f1e-98e8-4642240aca5c',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881749701920/dir167875881774908425.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:38 GMT',
  'ETag',
  '"0x8DB242EEDE248FF"',
  'x-ms-request-id',
  '0b0de354-701a-0008-6e17-56c247000000',
  'x-ms-client-request-id',
  '917fc8ec-8bec-482b-8aa8-adb5f22c36a5',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:38.1182719Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:38.1182719Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:38.1182719Z',
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
  'Tue, 14 Mar 2023 01:53:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881749701920/dir167875881774908425./file167875881800900863...')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:38 GMT',
  'ETag',
  '"0x8DB242EEE0B7CEB"',
  'x-ms-request-id',
  '0b0de355-701a-0008-6f17-56c247000000',
  'x-ms-client-request-id',
  '44c56051-e42d-4e62-bf53-648b79d108f9',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:38.3882987Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:38.3882987Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:38.3882987Z',
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
  'Tue, 14 Mar 2023 01:53:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875881749701920/dir167875881774908425.')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167875881749701920\" DirectoryPath=\"dir167875881774908425.\"><DirectoryId>13835128424026341376</DirectoryId><Entries><File><Name>file167875881800900863...</Name><FileId>11529285414812647424</FileId><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '0b0de357-701a-0008-7017-56c247000000',
  'x-ms-client-request-id',
  '8d07c071-6f1a-403b-93a8-28d6c4b964a7',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875881749701920')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de358-701a-0008-7117-56c247000000',
  'x-ms-client-request-id',
  '3e5d5868-baad-4683-9d71-7aca90308a6b',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:38 GMT'
]);
