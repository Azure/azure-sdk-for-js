let nock = require('nock');

module.exports.hash = "f2882c849aefb0f88a9f76d562b25150";

module.exports.testInfo = {"uniqueName":{"share":"share167747745886000421","dir":"dir167747745911202108","file":"file167747745936801649"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747745886000421')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:39 GMT',
  'ETag',
  '"0x8DB1887888AFEF5"',
  'x-ms-request-id',
  'e51cf6c5-601a-0004-4a70-4a0ec4000000',
  'x-ms-client-request-id',
  '2ae1fb28-9237-4f32-8c1b-14efc1119aab',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747745886000421/dir167747745911202108....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:39 GMT',
  'ETag',
  '"0x8DB188788B3201A"',
  'x-ms-request-id',
  'e51cf6c7-601a-0004-4b70-4a0ec4000000',
  'x-ms-client-request-id',
  '07593d56-c12e-4e02-8827-9bf9d0300b9c',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:39.6149274Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:39.6149274Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:39.6149274Z',
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
  'Mon, 27 Feb 2023 05:57:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747745886000421/dir167747745911202108..../file167747745936801649....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:39 GMT',
  'ETag',
  '"0x8DB188788D9BB18"',
  'x-ms-request-id',
  'e51cf6cc-601a-0004-5070-4a0ec4000000',
  'x-ms-client-request-id',
  '085749cb-1e1a-4e6b-896b-d04f6cac1260',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:39.8679320Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:39.8679320Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:39.8679320Z',
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
  'Mon, 27 Feb 2023 05:57:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747745886000421/dir167747745911202108..../file167747745936801649....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:40 GMT',
  'ETag',
  '"0x8DB188788FFB9BB"',
  'x-ms-request-id',
  'e51cf6d2-601a-0004-5670-4a0ec4000000',
  'x-ms-client-request-id',
  '398eb7c9-9650-4c09-9957-e59e7279f833',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:40.1169339Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:39.8679320Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:39.8679320Z',
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
  'Mon, 27 Feb 2023 05:57:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747745886000421/dir167747745911202108..../file167747745936801649....')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:40 GMT',
  'ETag',
  '"0x8DB188788FFB9BB"',
  'x-ms-request-id',
  'e51cf6d3-601a-0004-5770-4a0ec4000000',
  'x-ms-client-request-id',
  '9dba71f6-3ad8-4ef4-9952-bc766ff02776',
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
  '2023-02-27T05:57:40.1169339Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:39.8679320Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:39.8679320Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 05:57:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747745886000421')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf6d4-601a-0004-5870-4a0ec4000000',
  'x-ms-client-request-id',
  '3c390b9d-5baa-4438-a794-bff052c894d8',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:40 GMT'
]);
