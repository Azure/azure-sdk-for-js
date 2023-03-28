let nock = require('nock');

module.exports.hash = "ab22c5880d51cbda06f173a4437fd0d5";

module.exports.testInfo = {"uniqueName":{"share":"share167747854592906424","dir":"dir167747854618700978","file":"file167747854644808270"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854592906424')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:46 GMT',
  'ETag',
  '"0x8DB188A107E7B89"',
  'x-ms-request-id',
  '1775e9aa-e01a-0001-1f72-4a1b65000000',
  'x-ms-client-request-id',
  '75a7179c-360b-404a-a8cd-9d5140bb495c',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854592906424/dir167747854618700978....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:46 GMT',
  'ETag',
  '"0x8DB188A10A77E39"',
  'x-ms-request-id',
  '1775e9ac-e01a-0001-2072-4a1b65000000',
  'x-ms-client-request-id',
  'd5f2a1b8-d5e8-4763-8030-77cbf6b21d7b',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:46.7022905Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:46.7022905Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:46.7022905Z',
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
  'Mon, 27 Feb 2023 06:15:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854592906424/dir167747854618700978..../file167747854644808270....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:46 GMT',
  'ETag',
  '"0x8DB188A10CF0393"',
  'x-ms-request-id',
  '1775e9ad-e01a-0001-2172-4a1b65000000',
  'x-ms-client-request-id',
  '2ca209ee-b35e-4ce4-a6ed-543356be4623',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:46.9612947Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:46.9612947Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:46.9612947Z',
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
  'Mon, 27 Feb 2023 06:15:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854592906424/dir167747854618700978..../file167747854644808270....', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:47 GMT',
  'ETag',
  '"0x8DB188A10F5ED18"',
  'x-ms-request-id',
  '1775e9ae-e01a-0001-2272-4a1b65000000',
  'x-ms-client-request-id',
  '7917f013-0d1a-462a-bca3-b039c46bc9a0',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:47.2163096Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854592906424/dir167747854618700978..../file167747854644808270....', "World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:47 GMT',
  'ETag',
  '"0x8DB188A111C87A8"',
  'x-ms-request-id',
  '1775e9af-e01a-0001-2372-4a1b65000000',
  'x-ms-client-request-id',
  '1b8b6890-123b-4bab-a427-4bc3e6faa895',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:47.4693032Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747854592906424/dir167747854618700978..../file167747854644808270....')
  .reply(206, "HelloWor", [
  'Content-Length',
  '8',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-7/10',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:47 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB188A111C87A8"',
  'x-ms-request-id',
  '1775e9b0-e01a-0001-2472-4a1b65000000',
  'x-ms-client-request-id',
  '8a1fd2f0-7ef0-4228-9a11-aa2562b1144b',
  'x-ms-version',
  '2022-11-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2023-02-27T06:15:47.4693032Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:47.4693032Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:46.9612947Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Range,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 06:15:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747854592906424')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e9b1-e01a-0001-2572-4a1b65000000',
  'x-ms-client-request-id',
  'c45a6956-09bf-4cb5-a4e3-8407c54a3102',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:47 GMT'
]);
