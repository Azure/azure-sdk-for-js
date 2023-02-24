let nock = require('nock');

module.exports.hash = "5b30ea14feb2d92cba23dd202361a856";

module.exports.testInfo = {"uniqueName":{"share":"share167747855983605842","dir":"dir167747856009405318","file":"file167747856037104327"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855983605842')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:16:00 GMT',
  'ETag',
  '"0x8DB188A18C8C9E3"',
  'x-ms-request-id',
  '1775e9f8-e01a-0001-5572-4a1b65000000',
  'x-ms-client-request-id',
  '40cd1546-4523-46d5-a294-b0ef8bafffd6',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:16:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855983605842/dir167747856009405318....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:16:00 GMT',
  'ETag',
  '"0x8DB188A18F31A64"',
  'x-ms-request-id',
  '1775e9fa-e01a-0001-5672-4a1b65000000',
  'x-ms-client-request-id',
  'd5dfa8a5-f7b2-4b44-9e0d-480cc7cf46f5',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:16:00.6195812Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:16:00.6195812Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:16:00.6195812Z',
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
  'Mon, 27 Feb 2023 06:16:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855983605842/dir167747856009405318..../file167747856037104327....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:16:00 GMT',
  'ETag',
  '"0x8DB188A191BD81A"',
  'x-ms-request-id',
  '1775e9fb-e01a-0001-5772-4a1b65000000',
  'x-ms-client-request-id',
  '980a1119-4f93-4309-9e98-e4210281685d',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:16:00.8865818Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:16:00.8865818Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:16:00.8865818Z',
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
  'Mon, 27 Feb 2023 06:16:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855983605842/dir167747856009405318..../file167747856037104327....', "Hello World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:16:01 GMT',
  'ETag',
  '"0x8DB188A19435D86"',
  'x-ms-request-id',
  '1775e9fc-e01a-0001-5872-4a1b65000000',
  'x-ms-client-request-id',
  '492b25a9-5172-41b7-8937-148887613a45',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:16:01.1455878Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:16:01 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747855983605842/dir167747856009405318..../file167747856037104327....')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:16:01 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB188A19435D86"',
  'x-ms-request-id',
  '1775e9fd-e01a-0001-5972-4a1b65000000',
  'x-ms-client-request-id',
  'bc2b2c41-9f4f-4a71-84b3-1c593cadd3b6',
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
  '2023-02-27T06:16:01.1455878Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:16:01.1455878Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:16:00.8865818Z',
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
  'Mon, 27 Feb 2023 06:16:01 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747855983605842')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e9ff-e01a-0001-5a72-4a1b65000000',
  'x-ms-client-request-id',
  '4d77d158-203c-4293-925f-c1c867466b0d',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:16:01 GMT'
]);
