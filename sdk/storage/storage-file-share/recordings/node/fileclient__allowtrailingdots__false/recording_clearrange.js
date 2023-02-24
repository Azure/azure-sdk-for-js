let nock = require('nock');

module.exports.hash = "5bbb82df82d1a2a8dc439c1870947d3b";

module.exports.testInfo = {"uniqueName":{"share":"share167747854774508602","dir":"dir167747854799909638","file":"file167747854826101281"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854774508602')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:48 GMT',
  'ETag',
  '"0x8DB188A119371DE"',
  'x-ms-request-id',
  '1775e9b2-e01a-0001-2672-4a1b65000000',
  'x-ms-client-request-id',
  'bb4d5cde-373a-4f46-803a-99cda276fb28',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854774508602/dir167747854799909638....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:48 GMT',
  'ETag',
  '"0x8DB188A11BC726A"',
  'x-ms-request-id',
  '1775e9b4-e01a-0001-2772-4a1b65000000',
  'x-ms-client-request-id',
  'b2515e2c-ec66-4f6e-ad62-a2e5b7c6f11b',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:48.5173354Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:48.5173354Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:48.5173354Z',
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
  'Mon, 27 Feb 2023 06:15:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854774508602/dir167747854799909638..../file167747854826101281....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:48 GMT',
  'ETag',
  '"0x8DB188A11E35B44"',
  'x-ms-request-id',
  '1775e9b5-e01a-0001-2872-4a1b65000000',
  'x-ms-client-request-id',
  '7b5abe9e-2281-4120-a8fd-cfe865c83a0c',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:48.7723332Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:48.7723332Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:48.7723332Z',
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
  'Mon, 27 Feb 2023 06:15:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854774508602/dir167747854799909638..../file167747854826101281....', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:49 GMT',
  'ETag',
  '"0x8DB188A120A92AC"',
  'x-ms-request-id',
  '1775e9b6-e01a-0001-2972-4a1b65000000',
  'x-ms-client-request-id',
  '0a40c9e1-7f14-46f7-b076-6db5ec703e71',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:49.0293420Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854774508602/dir167747854799909638..../file167747854826101281....', "World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:49 GMT',
  'ETag',
  '"0x8DB188A1231A30B"',
  'x-ms-request-id',
  '1775e9b7-e01a-0001-2a72-4a1b65000000',
  'x-ms-client-request-id',
  'aef908c2-7dd4-481e-a9a6-4edcd86c5226',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:49.2853515Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854774508602/dir167747854799909638..../file167747854826101281....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:49 GMT',
  'ETag',
  '"0x8DB188A125AD5F3"',
  'x-ms-request-id',
  '1775e9b8-e01a-0001-2b72-4a1b65000000',
  'x-ms-client-request-id',
  'f988ce1c-1386-4986-b3f8-f82a4c394e26',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:49.5553523Z',
  'Date',
  'Mon, 27 Feb 2023 06:15:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747854774508602/dir167747854799909638..../file167747854826101281....')
  .reply(200, "H\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000d", [
  'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:49 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB188A125AD5F3"',
  'x-ms-request-id',
  '1775e9b9-e01a-0001-2c72-4a1b65000000',
  'x-ms-client-request-id',
  '82fa0338-f0bf-4396-8921-06607de25e48',
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
  '2023-02-27T06:15:49.5553523Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:49.5553523Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:48.7723332Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 06:15:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747854774508602')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e9ba-e01a-0001-2d72-4a1b65000000',
  'x-ms-client-request-id',
  '283ee37f-9c17-4713-b5b3-af5e732e80b4',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:49 GMT'
]);
