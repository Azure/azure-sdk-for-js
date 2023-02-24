let nock = require('nock');

module.exports.hash = "6f64dd668017193c1f5aaca8d0eefd96";

module.exports.testInfo = {"uniqueName":{"share":"share167747853297202985","dir":"dir167747853322804246","file":"file167747853348800507"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853297202985')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:33 GMT',
  'ETag',
  '"0x8DB188A08C5C0BD"',
  'x-ms-request-id',
  '1775e964-e01a-0001-6772-4a1b65000000',
  'x-ms-client-request-id',
  '9b6309b3-3167-4793-8d3f-529d123c2f54',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:33 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853297202985/dir167747853322804246....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:33 GMT',
  'ETag',
  '"0x8DB188A08EE37F9"',
  'x-ms-request-id',
  '1775e966-e01a-0001-6872-4a1b65000000',
  'x-ms-client-request-id',
  '1e779b67-f171-4941-b29b-8bf3bf8186eb',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:33.7440249Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:33.7440249Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:33.7440249Z',
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
  'Mon, 27 Feb 2023 06:15:33 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853297202985/dir167747853322804246..../file167747853348800507....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:33 GMT',
  'ETag',
  '"0x8DB188A0915212D"',
  'x-ms-request-id',
  '1775e967-e01a-0001-6972-4a1b65000000',
  'x-ms-client-request-id',
  '332af450-32fb-4b98-bb18-e0ef74d0b14a',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:33.9990317Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:33.9990317Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:33.9990317Z',
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
  'Mon, 27 Feb 2023 06:15:33 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747853297202985/dir167747853322804246..../file167747853348800507....')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e968-e01a-0001-6a72-4a1b65000000',
  'x-ms-client-request-id',
  '83a9879a-7039-449a-b243-5cd1a0351480',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:33 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747853297202985')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e969-e01a-0001-6b72-4a1b65000000',
  'x-ms-client-request-id',
  '5fa50f35-40da-4af2-9906-2f4c835474d3',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:34 GMT'
]);
