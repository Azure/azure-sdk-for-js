let nock = require('nock');

module.exports.hash = "5b30ea14feb2d92cba23dd202361a856";

module.exports.testInfo = {"uniqueName":{"share":"share167747748675903672","dir":"dir167747748701007869","file":"file167747748726808932"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748675903672')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:07 GMT',
  'ETag',
  '"0x8DB1887992BC9A9"',
  'x-ms-request-id',
  'e51cf75f-601a-0004-3c70-4a0ec4000000',
  'x-ms-client-request-id',
  'ece4aa8a-5957-42b4-95a9-436932ea5d0f',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:58:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748675903672/dir167747748701007869....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:07 GMT',
  'ETag',
  '"0x8DB188799541C15"',
  'x-ms-request-id',
  'e51cf761-601a-0004-3d70-4a0ec4000000',
  'x-ms-client-request-id',
  '554242d5-ba02-4af6-a367-07d99c36372a',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:58:07.5134997Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:07.5134997Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:58:07.5134997Z',
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
  'Mon, 27 Feb 2023 05:58:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748675903672/dir167747748701007869..../file167747748726808932....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:07 GMT',
  'ETag',
  '"0x8DB1887997ADE36"',
  'x-ms-request-id',
  'e51cf762-601a-0004-3e70-4a0ec4000000',
  'x-ms-client-request-id',
  '10663b03-1807-4c65-8f2d-27b87e6c8889',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:58:07.7675062Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:07.7675062Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:58:07.7675062Z',
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
  'Mon, 27 Feb 2023 05:58:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748675903672/dir167747748701007869..../file167747748726808932....', "Hello World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:08 GMT',
  'ETag',
  '"0x8DB188799A1C74E"',
  'x-ms-request-id',
  'e51cf763-601a-0004-3f70-4a0ec4000000',
  'x-ms-client-request-id',
  'df998cec-9ec0-4eba-bc0d-96c38586cb30',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:08.0225102Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:58:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747748675903672/dir167747748701007869..../file167747748726808932....')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:08 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB188799A1C74E"',
  'x-ms-request-id',
  'e51cf764-601a-0004-4070-4a0ec4000000',
  'x-ms-client-request-id',
  '7b6b9f9b-338a-4aaf-9b72-3d5ab3dca65b',
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
  '2023-02-27T05:58:08.0225102Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:08.0225102Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:58:07.7675062Z',
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
  'Mon, 27 Feb 2023 05:58:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747748675903672')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf765-601a-0004-4170-4a0ec4000000',
  'x-ms-client-request-id',
  '3022f254-78ef-40fb-8331-01a5ff1e0104',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:58:08 GMT'
]);
