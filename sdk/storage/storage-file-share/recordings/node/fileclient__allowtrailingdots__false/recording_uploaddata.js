let nock = require('nock');

module.exports.hash = "dee8356b84d2671d15c67bb369a22640";

module.exports.testInfo = {"uniqueName":{"share":"share167747854412808204","dir":"dir167747854438409137","file":"file167747854464608320"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854412808204')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:44 GMT',
  'ETag',
  '"0x8DB188A0F6BF64D"',
  'x-ms-request-id',
  '1775e9a2-e01a-0001-1872-4a1b65000000',
  'x-ms-client-request-id',
  'ea3a4bec-85b8-4302-aa0a-a3db9fa0622f',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854412808204/dir167747854438409137....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:44 GMT',
  'ETag',
  '"0x8DB188A0F94D476"',
  'x-ms-request-id',
  '1775e9a4-e01a-0001-1972-4a1b65000000',
  'x-ms-client-request-id',
  'fc8a15ef-ddd8-4417-8228-c89603b39dda',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:44.9022582Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:44.9022582Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:44.9022582Z',
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
  'Mon, 27 Feb 2023 06:15:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854412808204/dir167747854438409137..../file167747854464608320....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:45 GMT',
  'ETag',
  '"0x8DB188A0FBCF5FB"',
  'x-ms-request-id',
  '1775e9a5-e01a-0001-1a72-4a1b65000000',
  'x-ms-client-request-id',
  'c9573335-87fe-4ec6-a3b1-95b3a016335f',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:45.1652603Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:45.1652603Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:45.1652603Z',
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
  'Mon, 27 Feb 2023 06:15:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854412808204/dir167747854438409137..../file167747854464608320....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:45 GMT',
  'ETag',
  '"0x8DB188A0FE34366"',
  'x-ms-request-id',
  '1775e9a6-e01a-0001-1b72-4a1b65000000',
  'x-ms-client-request-id',
  '89337688-9734-4d45-80a3-9270fd12b79d',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:45.4162790Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:45.4162790Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:45.4162790Z',
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
  'Mon, 27 Feb 2023 06:15:45 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854412808204/dir167747854438409137..../file167747854464608320....', "Hello World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:45 GMT',
  'ETag',
  '"0x8DB188A100AA136"',
  'x-ms-request-id',
  '1775e9a7-e01a-0001-1c72-4a1b65000000',
  'x-ms-client-request-id',
  '0f906cf2-5288-468f-8c5f-cec45252728d',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:45.6742710Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:45 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747854412808204/dir167747854438409137..../file167747854464608320....')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:45 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB188A100AA136"',
  'x-ms-request-id',
  '1775e9a8-e01a-0001-1d72-4a1b65000000',
  'x-ms-client-request-id',
  '53d21b4e-99f8-4c04-be7d-9fedf57a8e3e',
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
  '2023-02-27T06:15:45.6742710Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:45.6742710Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:45.4162790Z',
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
  'Mon, 27 Feb 2023 06:15:45 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747854412808204')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e9a9-e01a-0001-1e72-4a1b65000000',
  'x-ms-client-request-id',
  '57ed5743-2a96-4e47-bc2c-9321b79261cc',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:45 GMT'
]);
