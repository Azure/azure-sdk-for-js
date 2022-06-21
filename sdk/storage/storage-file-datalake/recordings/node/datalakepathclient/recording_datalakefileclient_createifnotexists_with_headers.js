let nock = require('nock');

module.exports.hash = "7b6b9916d0d500ba18ac5b07e10e2402";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383023935306032","file":"file165383023962107273","testfile":"testfile165383024149906983"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383023935306032')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:19 GMT',
  'ETag',
  '"0x8DA41758F5EE4D7"',
  'x-ms-request-id',
  '84b4a7b9-a01e-0003-395e-731608000000',
  'x-ms-client-request-id',
  '57e7bd1e-0a31-4c1c-96f5-42df41d8c1bc',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:19 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383023935306032/file165383023962107273')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:21 GMT',
  'ETag',
  '"0x8DA4175902F1228"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6d1-201f-0006-795e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '3a006108-60ea-4654-af9f-5dc69f9bcd99',
  'Date',
  'Sun, 29 May 2022 13:17:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383023935306032/file165383023962107273', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6d2-201f-0006-7a5e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '14dde616-2c39-42d9-a8cd-9394699d0ac6',
  'Date',
  'Sun, 29 May 2022 13:17:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383023935306032/file165383023962107273')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:21 GMT',
  'ETag',
  '"0x8DA4175908115B0"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '34a0c6d3-201f-0006-7b5e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'e2bab1a6-8ebd-4ec1-9370-48210273d1c9',
  'Date',
  'Sun, 29 May 2022 13:17:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383023935306032/testfile165383024149906983')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:22 GMT',
  'ETag',
  '"0x8DA417590A89EDB"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6d5-201f-0006-7c5e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '335146ad-8a3a-4e36-beac-27dec9dfcdf8',
  'Date',
  'Sun, 29 May 2022 13:17:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383023935306032/testfile165383024149906983')
  .reply(200, [], [
  'Cache-Control',
  'control',
  'Content-Length',
  '0',
  'Content-Type',
  'type/subtype',
  'Content-Encoding',
  'encoding',
  'Content-Language',
  'language',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:22 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA417590A89EDB"',
  'x-ms-request-id',
  '84b4a7be-a01e-0003-3a5e-731608000000',
  'x-ms-client-request-id',
  '499d8304-db60-4a3e-a765-a5b3841664ae',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:17:22 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'disposition',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:17:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383023935306032')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a7bf-a01e-0003-3b5e-731608000000',
  'x-ms-client-request-id',
  '5a1c413e-dbe8-4bc2-879d-e73e50ed497c',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:22 GMT'
]);
