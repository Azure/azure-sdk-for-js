let nock = require('nock');

module.exports.hash = "53b636bfddde47d9c5b89eff5523ea66";

module.exports.testInfo = {"uniqueName":{"share":"share167875881260601349","dir":"dir167875881285703576"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881260601349')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:32 GMT',
  'ETag',
  '"0x8DB242EEACF52C1"',
  'x-ms-request-id',
  'fd6a9f65-e01a-0007-1117-56fda4000000',
  'x-ms-client-request-id',
  '3e74f0a6-9031-4174-880d-32d320ab6e5f',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881260601349/dir167875881285703576.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:33 GMT',
  'ETag',
  '"0x8DB242EEAF72768"',
  'x-ms-request-id',
  'fd6a9f68-e01a-0007-1317-56fda4000000',
  'x-ms-client-request-id',
  'bf34439a-b82e-421a-9d6a-2ea9fa85ed28',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:33.2218728Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:33.2218728Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:33.2218728Z',
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
  'Tue, 14 Mar 2023 01:53:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875881260601349/dir167875881285703576.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:33 GMT',
  'ETag',
  '"0x8DB242EEAF72768"',
  'x-ms-request-id',
  'fd6a9f69-e01a-0007-1417-56fda4000000',
  'x-ms-client-request-id',
  'f9dc2e92-b12c-4c68-ab30-7948050464bc',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2023-03-14T01:53:33.2218728Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:33.2218728Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:33.2218728Z',
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
  'Tue, 14 Mar 2023 01:53:33 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875881260601349')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de33c-701a-0008-5e17-56c247000000',
  'x-ms-client-request-id',
  '0b05f278-7ca7-4275-8a46-42e55ef929f1',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:34 GMT'
]);
