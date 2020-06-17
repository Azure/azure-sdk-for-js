let nock = require('nock');

module.exports.hash = "4ea21591aad45730b803cf3e30322ea2";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159239946558107837","file":"file159239946683709872"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159239946558107837')
  .query(true)
  .reply(201, "", [
  'content-length',
  '0',
  'last-modified',
  'Wed, 17 Jun 2020 13:11:06 GMT',
  'etag',
  '"0x8D812BFE53A6C86"',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '672edc3f-301e-0048-30a8-44389e000000',
  'x-ms-client-request-id',
  'a8d70e45-b673-4c0a-a032-3b094a5d749a',
  'x-ms-version',
  '2019-12-12',
  'date',
  'Wed, 17 Jun 2020 13:11:06 GMT',
  'connection',
  'close'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159239946558107837/file159239946683709872')
  .query(true)
  .reply(201, "", [
  'last-modified',
  'Wed, 17 Jun 2020 13:11:08 GMT',
  'etag',
  '"0x8D812BFE61038DC"',
  'server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3d73a47f-201f-0044-4aa8-44af96000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '2ae1d363-3d63-4508-bac6-4e1f2adcb36b',
  'date',
  'Wed, 17 Jun 2020 13:11:07 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159239946558107837/file159239946683709872', "Hello World")
  .query(true)
  .reply(202, "", [
  'server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '7278091e-701f-0004-25a8-44a8ae000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '99395d15-e952-4793-be50-22dc56c9ca5b',
  'date',
  'Wed, 17 Jun 2020 13:11:09 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159239946558107837/file159239946683709872')
  .query(true)
  .reply(200, "", [
  'last-modified',
  'Wed, 17 Jun 2020 13:11:10 GMT',
  'etag',
  '"0x8D812BFE797F4EA"',
  'server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'c56765d4-e01f-0029-79a8-441bdd000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '5b33c296-2120-4d2f-98b5-e00a34437300',
  'date',
  'Wed, 17 Jun 2020 13:11:10 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159239946558107837/file159239946683709872')
  .query(true)
  .reply(200, "", [
  'last-modified',
  'Wed, 17 Jun 2020 13:11:10 GMT',
  'etag',
  '"0x8D812BFE797F4EA"',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53de0ecb-301e-0005-17a8-44f772000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '7e066314-036f-437c-bcec-9446f120ca40',
  'date',
  'Wed, 17 Jun 2020 13:11:11 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159239946558107837/file159239946683709872')
  .reply(200, "", [
  'content-length',
  '11',
  'content-type',
  'application/octet-stream',
  'last-modified',
  'Wed, 17 Jun 2020 13:11:10 GMT',
  'accept-ranges',
  'bytes',
  'etag',
  '"0x8D812BFE797F4EA"',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29b7e378-501e-004e-2da8-440b21000000',
  'x-ms-client-request-id',
  '1df599f3-5c9e-4506-9476-4969cc386f77',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Wed, 17 Jun 2020 13:11:08 GMT',
  'x-ms-expiry-time',
  'Wed, 17 Jun 2020 14:11:08 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'access-control-expose-headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-expiry-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'access-control-allow-origin',
  '*',
  'date',
  'Wed, 17 Jun 2020 13:11:12 GMT',
  'connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159239946558107837')
  .query(true)
  .reply(202, "", [
  'content-length',
  '0',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '810737a5-201e-006b-0fa8-44a25d000000',
  'x-ms-client-request-id',
  'e6b19092-8fb7-4726-b14f-b8e3625b48d0',
  'x-ms-version',
  '2019-12-12',
  'date',
  'Wed, 17 Jun 2020 13:11:13 GMT',
  'connection',
  'close'
]);
