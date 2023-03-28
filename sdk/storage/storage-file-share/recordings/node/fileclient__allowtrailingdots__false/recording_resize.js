let nock = require('nock');

module.exports.hash = "3595d2b77734fe4e32e7b92ee67169f2";

module.exports.testInfo = {"uniqueName":{"share":"share167747854232104575","dir":"dir167747854257907511","file":"file167747854284104504"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854232104575')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:42 GMT',
  'ETag',
  '"0x8DB188A0E583872"',
  'x-ms-request-id',
  '1775e99a-e01a-0001-1172-4a1b65000000',
  'x-ms-client-request-id',
  '557361c1-5397-4f39-9c83-d269cede6ca4',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854232104575/dir167747854257907511....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:43 GMT',
  'ETag',
  '"0x8DB188A0E813FC7"',
  'x-ms-request-id',
  '1775e99c-e01a-0001-1272-4a1b65000000',
  'x-ms-client-request-id',
  '32c8d101-366d-4075-b38f-96455347c8d6',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:43.0962119Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:43.0962119Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:43.0962119Z',
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
  'Mon, 27 Feb 2023 06:15:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854232104575/dir167747854257907511..../file167747854284104504....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:43 GMT',
  'ETag',
  '"0x8DB188A0EA87726"',
  'x-ms-request-id',
  '1775e99d-e01a-0001-1372-4a1b65000000',
  'x-ms-client-request-id',
  'f2c61b5f-ee6e-4220-a4d1-2ddbdfa8036d',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:43.3532198Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:43.3532198Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:43.3532198Z',
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
  'Mon, 27 Feb 2023 06:15:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747854232104575/dir167747854257907511..../file167747854284104504....')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:43 GMT',
  'ETag',
  '"0x8DB188A0EA87726"',
  'x-ms-request-id',
  '1775e99e-e01a-0001-1472-4a1b65000000',
  'x-ms-client-request-id',
  'db2dc110-f16d-42a6-be5a-3d59645e5cc0',
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
  '2023-02-27T06:15:43.3532198Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:43.3532198Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:43.3532198Z',
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
  'Mon, 27 Feb 2023 06:15:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854232104575/dir167747854257907511..../file167747854284104504....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:43 GMT',
  'ETag',
  '"0x8DB188A0EF622BE"',
  'x-ms-request-id',
  '1775e99f-e01a-0001-1572-4a1b65000000',
  'x-ms-client-request-id',
  '2c8bde88-199f-4561-8ba1-f41c87e29539',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:43.8622398Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:43.8622398Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:43.3532198Z',
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
  'Mon, 27 Feb 2023 06:15:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747854232104575/dir167747854257907511..../file167747854284104504....')
  .reply(200, "", [
  'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:43 GMT',
  'ETag',
  '"0x8DB188A0EF622BE"',
  'x-ms-request-id',
  '1775e9a0-e01a-0001-1672-4a1b65000000',
  'x-ms-client-request-id',
  '39c875e3-4570-41c9-a083-4a29b8d4b9f0',
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
  '2023-02-27T06:15:43.8622398Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:43.8622398Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:43.3532198Z',
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
  'Mon, 27 Feb 2023 06:15:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747854232104575')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e9a1-e01a-0001-1772-4a1b65000000',
  'x-ms-client-request-id',
  '215d2c62-59a2-48c2-b490-ab017d0caf10',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:44 GMT'
]);
