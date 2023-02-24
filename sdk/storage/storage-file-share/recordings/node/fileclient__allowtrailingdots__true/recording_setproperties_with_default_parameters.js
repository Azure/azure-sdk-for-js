let nock = require('nock');

module.exports.hash = "cd4918536aad63653dbbf78e8a04f085";

module.exports.testInfo = {"uniqueName":{"share":"share167747745582704000","dir":"dir167747745608105776","file":"file167747745633805159"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747745582704000')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:36 GMT',
  'ETag',
  '"0x8DB188786BC09ED"',
  'x-ms-request-id',
  'e51cf6b6-601a-0004-3e70-4a0ec4000000',
  'x-ms-client-request-id',
  'ca2b9243-cb48-4006-a613-9fd48baa4b65',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747745582704000/dir167747745608105776....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:36 GMT',
  'ETag',
  '"0x8DB188786E450F3"',
  'x-ms-request-id',
  'e51cf6b8-601a-0004-3f70-4a0ec4000000',
  'x-ms-client-request-id',
  'a2b932ef-4c89-4f0b-8869-67d9e1f3b9aa',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:36.5818611Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:36.5818611Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:36.5818611Z',
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
  'Mon, 27 Feb 2023 05:57:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747745582704000/dir167747745608105776..../file167747745633805159....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:36 GMT',
  'ETag',
  '"0x8DB1887870B6156"',
  'x-ms-request-id',
  'e51cf6b9-601a-0004-4070-4a0ec4000000',
  'x-ms-client-request-id',
  '17df2c66-a114-432d-a0aa-a74836a20c3d',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:36.8378710Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:36.8378710Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:36.8378710Z',
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
  'Mon, 27 Feb 2023 05:57:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747745582704000/dir167747745608105776..../file167747745633805159....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:37 GMT',
  'ETag',
  '"0x8DB1887873186FA"',
  'x-ms-request-id',
  'e51cf6ba-601a-0004-4170-4a0ec4000000',
  'x-ms-client-request-id',
  'aad95be6-0ebc-4b86-9f53-f7de4557fdce',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:37.0878714Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:36.8378710Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:36.8378710Z',
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
  'Mon, 27 Feb 2023 05:57:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747745582704000/dir167747745608105776..../file167747745633805159....')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:37 GMT',
  'ETag',
  '"0x8DB1887873186FA"',
  'x-ms-request-id',
  'e51cf6bb-601a-0004-4270-4a0ec4000000',
  'x-ms-client-request-id',
  '0cc77e8b-dae8-42f4-a0c1-8b5c2658df4f',
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
  '2023-02-27T05:57:37.0878714Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:36.8378710Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:36.8378710Z',
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
  'Mon, 27 Feb 2023 05:57:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747745582704000')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf6bc-601a-0004-4370-4a0ec4000000',
  'x-ms-client-request-id',
  'e4b88dcd-bbca-4b9a-a468-7ed68e6a8f4d',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:37 GMT'
]);
