let nock = require('nock');

module.exports.hash = "20d7a1087e2eb0188e379dfc27a7344f";

module.exports.testInfo = {"uniqueName":{"share":"share167875880676904995","dir":"dir167875880702208646"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875880676904995')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:27 GMT',
  'ETag',
  '"0x8DB242EE754A6CB"',
  'x-ms-request-id',
  'fd6a9f45-e01a-0007-7517-56fda4000000',
  'x-ms-client-request-id',
  '12847f31-9ca3-4fbe-a0fa-e0019716b3bc',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875880676904995/dir167875880702208646.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:27 GMT',
  'ETag',
  '"0x8DB242EE77D3065"',
  'x-ms-request-id',
  'fd6a9f47-e01a-0007-7617-56fda4000000',
  'x-ms-client-request-id',
  '2c6aee77-71e0-45f2-9b54-f7cde19131a9',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:27.3893989Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:27.3893989Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:27.3893989Z',
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
  'Tue, 14 Mar 2023 01:53:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875880676904995/dir167875880702208646.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:27 GMT',
  'ETag',
  '"0x8DB242EE7A74E40"',
  'x-ms-request-id',
  'fd6a9f48-e01a-0007-7717-56fda4000000',
  'x-ms-client-request-id',
  'b14bee94-fca3-49c0-9a23-c11461b3f1fb',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:27.6654144Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:27.3893989Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:27.3893989Z',
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
  'Tue, 14 Mar 2023 01:53:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875880676904995/dir167875880702208646.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:27 GMT',
  'ETag',
  '"0x8DB242EE7A74E40"',
  'x-ms-request-id',
  'fd6a9f49-e01a-0007-7817-56fda4000000',
  'x-ms-client-request-id',
  'e0b448ee-a08a-4520-9cdc-f4603684a03f',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2023-03-14T01:53:27.6654144Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:27.3893989Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:27.3893989Z',
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
  'Tue, 14 Mar 2023 01:53:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875880676904995')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9f4a-e01a-0007-7917-56fda4000000',
  'x-ms-client-request-id',
  '4ea3a6ca-714f-43f8-82d5-f9fca329b136',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:28 GMT'
]);
