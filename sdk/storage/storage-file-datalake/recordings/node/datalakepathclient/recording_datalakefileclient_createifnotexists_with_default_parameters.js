let nock = require('nock');

module.exports.hash = "06f344446f26a51987184a1336e45d2a";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383023361004894","file":"file165383023388806730","testfile":"testfile165383023467709991"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383023361004894')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:14 GMT',
  'ETag',
  '"0x8DA41758BF2ABAE"',
  'x-ms-request-id',
  '84b4a7ab-a01e-0003-305e-731608000000',
  'x-ms-client-request-id',
  'ad744200-ffe2-420d-8bf6-a5551ae2db0d',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:13 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383023361004894/file165383023388806730')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:14 GMT',
  'ETag',
  '"0x8DA41758C1FC66A"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db2d-a01f-0005-615e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'f316f9df-8211-4be0-9d3f-fea7d08adc32',
  'Date',
  'Sun, 29 May 2022 13:17:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383023361004894/file165383023388806730', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db2e-a01f-0005-625e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '737f02a5-4877-4c9b-8c58-16370af99389',
  'Date',
  'Sun, 29 May 2022 13:17:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383023361004894/file165383023388806730')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:14 GMT',
  'ETag',
  '"0x8DA41758C702953"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '5506db2f-a01f-0005-635e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '25f9a89a-ed2c-4b62-88a2-c288809b995a',
  'Date',
  'Sun, 29 May 2022 13:17:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383023361004894/testfile165383023467709991')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:15 GMT',
  'ETag',
  '"0x8DA41758C970730"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db30-a01f-0005-645e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '101dbe17-f959-4863-a05c-34c63ef824b8',
  'Date',
  'Sun, 29 May 2022 13:17:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383023361004894/testfile165383023467709991')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:15 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA41758C970730"',
  'x-ms-request-id',
  '84b4a7ae-a01e-0003-315e-731608000000',
  'x-ms-client-request-id',
  '79166467-1d8b-4bec-bf73-caecae66f8b1',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:17:15 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:17:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383023361004894')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a7af-a01e-0003-325e-731608000000',
  'x-ms-client-request-id',
  '217dd498-d8c1-4377-a335-bc151e10f831',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:15 GMT'
]);
