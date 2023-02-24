let nock = require('nock');

module.exports.hash = "3595d2b77734fe4e32e7b92ee67169f2";

module.exports.testInfo = {"uniqueName":{"share":"share167747746951900959","dir":"dir167747746978204529","file":"file167747747003705836"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746951900959')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:50 GMT',
  'ETag',
  '"0x8DB18878EE72049"',
  'x-ms-request-id',
  'e51cf708-601a-0004-7870-4a0ec4000000',
  'x-ms-client-request-id',
  '30a7f673-a758-4be4-9cad-340267dbaf59',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746951900959/dir167747746978204529....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:50 GMT',
  'ETag',
  '"0x8DB18878F0EF74E"',
  'x-ms-request-id',
  'e51cf70a-601a-0004-7970-4a0ec4000000',
  'x-ms-client-request-id',
  'ddd1c6e7-cdd3-49a8-9d2e-76f9f56468d0',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:50.2831438Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:50.2831438Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:50.2831438Z',
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
  'Mon, 27 Feb 2023 05:57:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746951900959/dir167747746978204529..../file167747747003705836....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:50 GMT',
  'ETag',
  '"0x8DB18878F356B49"',
  'x-ms-request-id',
  'e51cf70c-601a-0004-7a70-4a0ec4000000',
  'x-ms-client-request-id',
  'd2fb4758-e4f0-4f53-bbd8-14fe82166ba8',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:50.5351497Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:50.5351497Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:50.5351497Z',
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
  'Mon, 27 Feb 2023 05:57:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747746951900959/dir167747746978204529..../file167747747003705836....')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:50 GMT',
  'ETag',
  '"0x8DB18878F356B49"',
  'x-ms-request-id',
  'e51cf70d-601a-0004-7b70-4a0ec4000000',
  'x-ms-client-request-id',
  'ea6d63a3-4cce-43ba-b3a7-0399483a8b12',
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
  '2023-02-27T05:57:50.5351497Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:50.5351497Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:50.5351497Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 05:57:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746951900959/dir167747746978204529..../file167747747003705836....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:51 GMT',
  'ETag',
  '"0x8DB18878F8141B8"',
  'x-ms-request-id',
  'e51cf70e-601a-0004-7c70-4a0ec4000000',
  'x-ms-client-request-id',
  '4e83a47e-3c7b-40d1-a942-3c7a4da816a6',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:51.0321592Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:51.0321592Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:50.5351497Z',
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
  'Mon, 27 Feb 2023 05:57:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747746951900959/dir167747746978204529..../file167747747003705836....')
  .reply(200, "", [
  'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:51 GMT',
  'ETag',
  '"0x8DB18878F8141B8"',
  'x-ms-request-id',
  'e51cf70f-601a-0004-7d70-4a0ec4000000',
  'x-ms-client-request-id',
  'c50d4302-49bc-4299-bb0c-391180f2e404',
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
  '2023-02-27T05:57:51.0321592Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:51.0321592Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:50.5351497Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 05:57:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747746951900959')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf710-601a-0004-7e70-4a0ec4000000',
  'x-ms-client-request-id',
  '311b6ee0-f0b1-45e6-9cc4-f16d78985fef',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:50 GMT'
]);
