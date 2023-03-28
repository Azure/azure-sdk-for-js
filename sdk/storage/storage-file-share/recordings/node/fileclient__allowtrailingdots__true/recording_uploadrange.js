let nock = require('nock');

module.exports.hash = "ab22c5880d51cbda06f173a4437fd0d5";

module.exports.testInfo = {"uniqueName":{"share":"share167747747305302282","dir":"dir167747747330402366","file":"file167747747355906760"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747305302282')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:53 GMT',
  'ETag',
  '"0x8DB188791006534"',
  'x-ms-request-id',
  'e51cf719-601a-0004-0670-4a0ec4000000',
  'x-ms-client-request-id',
  '2ef4fc65-5718-4271-a3b2-41931389f305',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747305302282/dir167747747330402366....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:53 GMT',
  'ETag',
  '"0x8DB188791283D8E"',
  'x-ms-request-id',
  'e51cf71b-601a-0004-0770-4a0ec4000000',
  'x-ms-client-request-id',
  '683cd52f-04b5-47c3-8c82-387c14013dc2',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:53.8042254Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:53.8042254Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:53.8042254Z',
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
  'Mon, 27 Feb 2023 05:57:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747305302282/dir167747747330402366..../file167747747355906760....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:54 GMT',
  'ETag',
  '"0x8DB1887914FC2C3"',
  'x-ms-request-id',
  'e51cf71c-601a-0004-0870-4a0ec4000000',
  'x-ms-client-request-id',
  '5bc7c1f0-85d2-4ae2-a38d-dae122ca9a42',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:54.0632259Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:54.0632259Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:54.0632259Z',
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
  'Mon, 27 Feb 2023 05:57:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747305302282/dir167747747330402366..../file167747747355906760....', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:54 GMT',
  'ETag',
  '"0x8DB18879176F9FB"',
  'x-ms-request-id',
  'e51cf71d-601a-0004-0970-4a0ec4000000',
  'x-ms-client-request-id',
  'cecc4843-63fd-4099-8752-b6b8391a8870',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:54.3202299Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:57:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747305302282/dir167747747330402366..../file167747747355906760....', "World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:54 GMT',
  'ETag',
  '"0x8DB188791A7F524"',
  'x-ms-request-id',
  'e51cf71f-601a-0004-0a70-4a0ec4000000',
  'x-ms-client-request-id',
  'b648b98a-4a41-4973-b2ce-40582b56b570',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:54.6412324Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:57:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747747305302282/dir167747747330402366..../file167747747355906760....')
  .reply(206, "HelloWor", [
  'Content-Length',
  '8',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-7/10',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB188791A7F524"',
  'x-ms-request-id',
  'e51cf721-601a-0004-0b70-4a0ec4000000',
  'x-ms-client-request-id',
  '91045a46-a439-4912-8cfe-1f03d15767d2',
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
  '2023-02-27T05:57:54.6412324Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:54.6412324Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:54.0632259Z',
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
  'Mon, 27 Feb 2023 05:57:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747747305302282')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf722-601a-0004-0c70-4a0ec4000000',
  'x-ms-client-request-id',
  'e3018899-7a2e-492b-98ee-c726845ca3bf',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:54 GMT'
]);
