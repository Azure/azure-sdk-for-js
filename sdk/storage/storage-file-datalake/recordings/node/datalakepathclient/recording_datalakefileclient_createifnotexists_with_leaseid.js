let nock = require('nock');

module.exports.hash = "ffe1af0ba77453528692f190d3a0e467";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383024231409156","file":"file165383024258405819","testfile":"testfile165383024339103240"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383024231409156')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:22 GMT',
  'ETag',
  '"0x8DA417591230B6D"',
  'x-ms-request-id',
  '84b4a7c0-a01e-0003-3c5e-731608000000',
  'x-ms-client-request-id',
  'c8c51ff4-f6f6-406e-a7e2-94e4322e1d90',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:22 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383024231409156/file165383024258405819')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:23 GMT',
  'ETag',
  '"0x8DA41759150BC77"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6d6-201f-0006-7d5e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '4b512fac-ad4c-48f5-8378-0f5c424e4ab5',
  'Date',
  'Sun, 29 May 2022 13:17:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383024231409156/file165383024258405819', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6d7-201f-0006-7e5e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '1d42b283-f29c-49ec-8f88-f76e779790d4',
  'Date',
  'Sun, 29 May 2022 13:17:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383024231409156/file165383024258405819')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:23 GMT',
  'ETag',
  '"0x8DA417591A1D8F6"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '34a0c6d9-201f-0006-805e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'b8ad3d4c-a17d-46ca-9c14-e3261c1f0bea',
  'Date',
  'Sun, 29 May 2022 13:17:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383024231409156/testfile165383024339103240')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:23 GMT',
  'ETag',
  '"0x8DA417591C94B9D"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6da-201f-0006-015e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '31da2a5a-2806-42f6-8094-8e979694b725',
  'Date',
  'Sun, 29 May 2022 13:17:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383024231409156/testfile165383024339103240')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:23 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA417591C94B9D"',
  'x-ms-request-id',
  '84b4a7c2-a01e-0003-3d5e-731608000000',
  'x-ms-client-request-id',
  '6c6ff253-d376-4817-8c14-a94ed3f1ed32',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:17:23 GMT',
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
  'Sun, 29 May 2022 13:17:23 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383024231409156')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a7c3-a01e-0003-3e5e-731608000000',
  'x-ms-client-request-id',
  'adaefae6-0a4a-404a-89d6-3381b2877b60',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:23 GMT'
]);
