let nock = require('nock');

module.exports.hash = "5bbb82df82d1a2a8dc439c1870947d3b";

module.exports.testInfo = {"uniqueName":{"share":"share167747747489703567","dir":"dir167747747514408318","file":"file167747747541809768"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747489703567')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:55 GMT',
  'ETag',
  '"0x8DB188792199DE9"',
  'x-ms-request-id',
  'e51cf723-601a-0004-0d70-4a0ec4000000',
  'x-ms-client-request-id',
  'db0935d0-7e5c-42e6-b80e-bf88abfa65ad',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747489703567/dir167747747514408318....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:55 GMT',
  'ETag',
  '"0x8DB1887924101B4"',
  'x-ms-request-id',
  'e51cf725-601a-0004-0e70-4a0ec4000000',
  'x-ms-client-request-id',
  '77a72679-f5b0-4fd7-a9d9-61bb653ddd44',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:55.6442548Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:55.6442548Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:55.6442548Z',
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
  'Mon, 27 Feb 2023 05:57:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747489703567/dir167747747514408318..../file167747747541809768....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:55 GMT',
  'ETag',
  '"0x8DB1887926AD0F7"',
  'x-ms-request-id',
  'e51cf726-601a-0004-0f70-4a0ec4000000',
  'x-ms-client-request-id',
  'ea038b90-4830-4a86-b6bb-fa6257d0739f',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:55.9182583Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:55.9182583Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:55.9182583Z',
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
  'Mon, 27 Feb 2023 05:57:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747489703567/dir167747747514408318..../file167747747541809768....', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:56 GMT',
  'ETag',
  '"0x8DB188792916C0D"',
  'x-ms-request-id',
  'e51cf727-601a-0004-1070-4a0ec4000000',
  'x-ms-client-request-id',
  'b0f07546-3ad7-4d34-a792-473b0e12885c',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:56.1712653Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:57:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747489703567/dir167747747514408318..../file167747747541809768....', "World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:56 GMT',
  'ETag',
  '"0x8DB188792B7B8E2"',
  'x-ms-request-id',
  'e51cf728-601a-0004-1170-4a0ec4000000',
  'x-ms-client-request-id',
  '40181123-d15a-45c9-aeaf-f6756a93ee61',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:56.4222690Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:57:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747489703567/dir167747747514408318..../file167747747541809768....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:56 GMT',
  'ETag',
  '"0x8DB188792E001A5"',
  'x-ms-request-id',
  'e51cf729-601a-0004-1270-4a0ec4000000',
  'x-ms-client-request-id',
  '92adec92-11cf-47a7-880b-51620ce2efff',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:56.6862757Z',
  'Date',
  'Mon, 27 Feb 2023 05:57:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747747489703567/dir167747747514408318..../file167747747541809768....')
  .reply(200, "H\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000d", [
  'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:56 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB188792E001A5"',
  'x-ms-request-id',
  'e51cf72a-601a-0004-1370-4a0ec4000000',
  'x-ms-client-request-id',
  '2d555910-df7c-40f6-a61c-e93002a67a57',
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
  '2023-02-27T05:57:56.6862757Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:56.6862757Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:55.9182583Z',
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
  'Mon, 27 Feb 2023 05:57:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747747489703567')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf72b-601a-0004-1470-4a0ec4000000',
  'x-ms-client-request-id',
  'b7c6b146-7744-456f-8950-900efb95fa38',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:56 GMT'
]);
