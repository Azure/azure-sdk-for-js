let nock = require('nock');

module.exports.hash = "6f64dd668017193c1f5aaca8d0eefd96";

module.exports.testInfo = {"uniqueName":{"share":"share167818186159207282","dir":"dir167818186185403173","file":"file167818186211700825"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818186159207282')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:41 GMT',
  'ETag',
  '"0x8DB1EEF993327D0"',
  'x-ms-request-id',
  '790792fd-a01a-0005-5ad8-50f0c9000000',
  'x-ms-client-request-id',
  '6a146b6e-4e7b-4863-aa41-f1492f62b187',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818186159207282/dir167818186185403173....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:42 GMT',
  'ETag',
  '"0x8DB1EEF995D6C75"',
  'x-ms-request-id',
  '790792ff-a01a-0005-5bd8-50f0c9000000',
  'x-ms-client-request-id',
  'cd8272d6-5a05-41aa-a5bd-c9a25103c2a4',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-07T09:37:42.2110837Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:42.2110837Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:42.2110837Z',
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
  'Tue, 07 Mar 2023 09:37:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818186159207282/dir167818186185403173..../file167818186211700825....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:42 GMT',
  'ETag',
  '"0x8DB1EEF99854007"',
  'x-ms-request-id',
  '79079300-a01a-0005-5cd8-50f0c9000000',
  'x-ms-client-request-id',
  '6eb5095e-dc8e-486b-8df4-2ec63dc2a712',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-07T09:37:42.4720903Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:42.4720903Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:42.4720903Z',
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
  'Tue, 07 Mar 2023 09:37:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167818186159207282/dir167818186185403173..../file167818186211700825....')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '79079301-a01a-0005-5dd8-50f0c9000000',
  'x-ms-client-request-id',
  '7dfb2fe9-abf5-491d-8e6c-551f7c2c51b8',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167818186159207282')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '79079303-a01a-0005-5ed8-50f0c9000000',
  'x-ms-client-request-id',
  '71063260-66c3-4850-ac4e-406bef9baa09',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:42 GMT'
]);
