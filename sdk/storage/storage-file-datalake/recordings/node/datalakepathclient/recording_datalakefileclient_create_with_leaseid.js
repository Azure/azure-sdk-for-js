let nock = require('nock');

module.exports.hash = "96fffa5a6568b13bf00fa38674fc2a19";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383020612903418","file":"file165383020639509818","testfile":"testfile165383020722308909"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383020612903418')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:46 GMT',
  'ETag',
  '"0x8DA41757B91DC9C"',
  'x-ms-request-id',
  '84b4a78f-a01e-0003-1f5e-731608000000',
  'x-ms-client-request-id',
  '1ef8d95b-d2ca-4e31-893f-24a9b30d9e30',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:46 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383020612903418/file165383020639509818')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:46 GMT',
  'ETag',
  '"0x8DA41757BC008D3"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db18-a01f-0005-515e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'd5892058-32a1-4bb9-9791-d40977e5cf10',
  'Date',
  'Sun, 29 May 2022 13:16:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383020612903418/file165383020639509818', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db19-a01f-0005-525e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '3c19b291-2add-4824-b1a3-f33b498143cb',
  'Date',
  'Sun, 29 May 2022 13:16:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383020612903418/file165383020639509818')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:47 GMT',
  'ETag',
  '"0x8DA41757C12E9CA"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '5506db1a-a01f-0005-535e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '57baf43e-0522-49a1-bc54-3b6911e4a056',
  'Date',
  'Sun, 29 May 2022 13:16:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383020612903418/testfile165383020722308909')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:47 GMT',
  'ETag',
  '"0x8DA41757C43C009"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db1b-a01f-0005-545e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '19adc33c-ffe4-4c98-89d1-ef23990f20e2',
  'Date',
  'Sun, 29 May 2022 13:16:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383020612903418/testfile165383020722308909')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:47 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA41757C43C009"',
  'x-ms-request-id',
  '84b4a791-a01e-0003-205e-731608000000',
  'x-ms-client-request-id',
  'bf676653-b874-4984-8775-43d57076e690',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:16:47 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:16:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383020612903418')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a792-a01e-0003-215e-731608000000',
  'x-ms-client-request-id',
  '5fbfdfea-8d3a-46fd-821d-91d1874ef2cf',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:48 GMT'
]);
