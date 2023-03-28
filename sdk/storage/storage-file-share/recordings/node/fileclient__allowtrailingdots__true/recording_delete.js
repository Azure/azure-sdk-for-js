let nock = require('nock');

module.exports.hash = "6f64dd668017193c1f5aaca8d0eefd96";

module.exports.testInfo = {"uniqueName":{"share":"share167747746037108992","dir":"dir167747746062303514","file":"file167747746088102414"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746037108992')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:40 GMT',
  'ETag',
  '"0x8DB18878971B626"',
  'x-ms-request-id',
  'e51cf6d5-601a-0004-5970-4a0ec4000000',
  'x-ms-client-request-id',
  '1f19c633-ab02-40e2-bf99-c41a9d795902',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746037108992/dir167747746062303514....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:41 GMT',
  'ETag',
  '"0x8DB1887899989C1"',
  'x-ms-request-id',
  'e51cf6d7-601a-0004-5a70-4a0ec4000000',
  'x-ms-client-request-id',
  'ed4f3eca-6648-4c55-9344-c2169cd58fdb',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:41.1249601Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:41.1249601Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:41.1249601Z',
  'x-ms-file-permission-key',
  '13895902193744473398*5510371786133343095',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:57:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746037108992/dir167747746062303514..../file167747746088102414....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:41 GMT',
  'ETag',
  '"0x8DB188789C072D0"',
  'x-ms-request-id',
  'e51cf6d8-601a-0004-5b70-4a0ec4000000',
  'x-ms-client-request-id',
  'a20e597e-d99b-49a3-9273-ea8c6aa18ba1',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:41.3799632Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:41.3799632Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:41.3799632Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:57:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747746037108992/dir167747746062303514..../file167747746088102414....')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf6d9-601a-0004-5c70-4a0ec4000000',
  'x-ms-client-request-id',
  '0b9d3395-e33f-4237-a5c1-6b120b5532d1',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747746037108992')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf6da-601a-0004-5d70-4a0ec4000000',
  'x-ms-client-request-id',
  'f1ce7b3b-1203-4c1a-b724-dc44ae6da9dc',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:41 GMT'
]);
