let nock = require('nock');

module.exports.hash = "53b636bfddde47d9c5b89eff5523ea66";

module.exports.testInfo = {"uniqueName":{"share":"share167875883460503710","dir":"dir167875883485602104"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875883460503710')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:54 GMT',
  'ETag',
  '"0x8DB242EF7ECA3A8"',
  'x-ms-request-id',
  '0b0de3b9-701a-0008-2e17-56c247000000',
  'x-ms-client-request-id',
  '6a3dce2f-50d2-429a-9316-32b0a678e79d',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875883460503710/dir167875883485602104.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:55 GMT',
  'ETag',
  '"0x8DB242EF81B3AA8"',
  'x-ms-request-id',
  '0b0de3bb-701a-0008-2f17-56c247000000',
  'x-ms-client-request-id',
  'aedbc8ef-1bb3-48a0-afba-4a6927759d11',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:55.2686760Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:55.2686760Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:55.2686760Z',
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
  'Tue, 14 Mar 2023 01:53:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875883460503710/dir167875883485602104.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:55 GMT',
  'ETag',
  '"0x8DB242EF81B3AA8"',
  'x-ms-request-id',
  '0b0de3bc-701a-0008-3017-56c247000000',
  'x-ms-client-request-id',
  'dbb2bd1b-f450-4394-90a7-d833405ffdd6',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2023-03-14T01:53:55.2686760Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:55.2686760Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:55.2686760Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875883460503710')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9f7f-e01a-0007-1617-56fda4000000',
  'x-ms-client-request-id',
  '8832c571-26bf-451c-9b34-853fc6b22696',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:55 GMT'
]);
