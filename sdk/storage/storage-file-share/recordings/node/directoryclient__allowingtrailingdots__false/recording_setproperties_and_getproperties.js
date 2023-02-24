let nock = require('nock');

module.exports.hash = "20d7a1087e2eb0188e379dfc27a7344f";

module.exports.testInfo = {"uniqueName":{"share":"share167875882816600617","dir":"dir167875882842308891"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882816600617')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:48 GMT',
  'ETag',
  '"0x8DB242EF4160E78"',
  'x-ms-request-id',
  '0b0de38e-701a-0008-1517-56c247000000',
  'x-ms-client-request-id',
  '0e016ebe-192e-4dcd-9245-d66ef201ddf7',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882816600617/dir167875882842308891.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:48 GMT',
  'ETag',
  '"0x8DB242EF43F4B29"',
  'x-ms-request-id',
  '0b0de390-701a-0008-1617-56c247000000',
  'x-ms-client-request-id',
  '3c0c0e23-fee5-4294-a5bd-e27afda2aba0',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:48.7941417Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:48.7941417Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:48.7941417Z',
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
  'Tue, 14 Mar 2023 01:53:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882816600617/dir167875882842308891.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:49 GMT',
  'ETag',
  '"0x8DB242EF46809DF"',
  'x-ms-request-id',
  '0b0de391-701a-0008-1717-56c247000000',
  'x-ms-client-request-id',
  'd58a60c5-5e79-4f1c-b71b-de65f4606ddb',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:49.0611679Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:48.7941417Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:48.7941417Z',
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
  'Tue, 14 Mar 2023 01:53:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875882816600617/dir167875882842308891.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:49 GMT',
  'ETag',
  '"0x8DB242EF46809DF"',
  'x-ms-request-id',
  '0b0de392-701a-0008-1817-56c247000000',
  'x-ms-client-request-id',
  '95e4f5b4-312b-40b7-9c5e-801b27aadd70',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2023-03-14T01:53:49.0611679Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:48.7941417Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:48.7941417Z',
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
  'Tue, 14 Mar 2023 01:53:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875882816600617')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de393-701a-0008-1917-56c247000000',
  'x-ms-client-request-id',
  '8172d996-902b-4b19-9868-0ae00af33fa1',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:49 GMT'
]);
