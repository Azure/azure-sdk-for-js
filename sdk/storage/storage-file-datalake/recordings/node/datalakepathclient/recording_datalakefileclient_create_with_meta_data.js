let nock = require('nock');

module.exports.hash = "bd18898ddb946964d1cd2113570168ee";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383019957705259","file":"file165383019984905204","testfile":"testfile165383020070804668"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383019957705259')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:40 GMT',
  'ETag',
  '"0x8DA417577AA7DAA"',
  'x-ms-request-id',
  '84b4a77b-a01e-0003-175e-731608000000',
  'x-ms-client-request-id',
  '6561547b-65e6-4381-a9e2-a0ecf12731a5',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:39 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383019957705259/file165383019984905204')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:40 GMT',
  'ETag',
  '"0x8DA417577DE4165"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '15533bca-e01f-0007-805e-73fda4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'e8a582d2-63cf-423a-a36e-30fff85dc405',
  'Date',
  'Sun, 29 May 2022 13:16:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383019957705259/file165383019984905204', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '15533bcc-e01f-0007-015e-73fda4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '0a42c85f-736d-40a8-a2cc-9cc8c1e96b7b',
  'Date',
  'Sun, 29 May 2022 13:16:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383019957705259/file165383019984905204')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:40 GMT',
  'ETag',
  '"0x8DA4175783155EC"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '15533bcd-e01f-0007-025e-73fda4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '71b06db4-4726-4bb3-b790-4a2e5b728ec9',
  'Date',
  'Sun, 29 May 2022 13:16:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383019957705259/testfile165383020070804668')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:41 GMT',
  'ETag',
  '"0x8DA4175785952B6"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '15533bcf-e01f-0007-035e-73fda4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'c2af0190-74f1-4433-93d0-3f52345997a7',
  'Date',
  'Sun, 29 May 2022 13:16:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383019957705259/testfile165383020070804668')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:41 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA4175785952B6"',
  'x-ms-request-id',
  '84b4a784-a01e-0003-185e-731608000000',
  'x-ms-client-request-id',
  '41fee3a0-7554-44e8-a2b6-4b77ecb95177',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'file',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:16:41 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-a,x-ms-meta-b,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:16:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383019957705259')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a785-a01e-0003-195e-731608000000',
  'x-ms-client-request-id',
  '4fe6bfbf-1043-481b-8312-b8520c9390e6',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:41 GMT'
]);
