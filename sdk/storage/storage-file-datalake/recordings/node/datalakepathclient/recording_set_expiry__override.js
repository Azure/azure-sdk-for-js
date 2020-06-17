let nock = require('nock');

module.exports.hash = "9e3b260e7df4a9174c1da8a9044e8d70";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159239947469006848","file":"file159239947598004671"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159239947469006848')
  .query(true)
  .reply(201, "", [
  'content-length',
  '0',
  'last-modified',
  'Wed, 17 Jun 2020 13:11:15 GMT',
  'etag',
  '"0x8D812BFEAAF3375"',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '61b42c75-f01e-0035-2da8-4449bd000000',
  'x-ms-client-request-id',
  '0c6041d0-270b-4753-8479-f2391a849f38',
  'x-ms-version',
  '2019-12-12',
  'date',
  'Wed, 17 Jun 2020 13:11:15 GMT',
  'connection',
  'close'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159239947469006848/file159239947598004671')
  .query(true)
  .reply(201, "", [
  'last-modified',
  'Wed, 17 Jun 2020 13:11:17 GMT',
  'etag',
  '"0x8D812BFEB705946"',
  'server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b219c82-401f-0020-6ba8-445e0e000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '00ed3760-44c5-4bda-8668-ae880ef4949f',
  'date',
  'Wed, 17 Jun 2020 13:11:16 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159239947469006848/file159239947598004671', "Hello World")
  .query(true)
  .reply(202, "", [
  'server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'eb6e36ea-d01f-0032-2fa8-4425de000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '6ef64840-595d-4422-bf50-39a697aff01b',
  'date',
  'Wed, 17 Jun 2020 13:11:18 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159239947469006848/file159239947598004671')
  .query(true)
  .reply(200, "", [
  'last-modified',
  'Wed, 17 Jun 2020 13:11:19 GMT',
  'etag',
  '"0x8D812BFECFB0E93"',
  'server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '9230a040-e01f-0039-65a8-44deb5000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '577e7594-b4c6-432b-9401-1882432c51b0',
  'date',
  'Wed, 17 Jun 2020 13:11:19 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159239947469006848/file159239947598004671')
  .query(true)
  .reply(200, "", [
  'last-modified',
  'Wed, 17 Jun 2020 13:11:19 GMT',
  'etag',
  '"0x8D812BFECFB0E93"',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0a1a63ab-801e-0062-7da8-44e78e000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'eb09f11a-5e1a-4374-88d6-2175f99c7d22',
  'date',
  'Wed, 17 Jun 2020 13:11:20 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159239947469006848/file159239947598004671')
  .reply(200, "", [
  'content-length',
  '11',
  'content-type',
  'application/octet-stream',
  'last-modified',
  'Wed, 17 Jun 2020 13:11:19 GMT',
  'accept-ranges',
  'bytes',
  'etag',
  '"0x8D812BFECFB0E93"',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ad19712e-d01e-008b-0aa8-4421c4000000',
  'x-ms-client-request-id',
  'bfb47a24-43e7-4c86-b053-4a1d2ccebcb3',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Wed, 17 Jun 2020 13:11:17 GMT',
  'x-ms-expiry-time',
  'Wed, 17 Jun 2020 14:11:17 GMT',
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
  'Wed, 17 Jun 2020 13:11:21 GMT',
  'connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159239947469006848/file159239947598004671')
  .query(true)
  .reply(200, "", [
  'last-modified',
  'Wed, 17 Jun 2020 13:11:19 GMT',
  'etag',
  '"0x8D812BFECFB0E93"',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb0b208b-201e-0019-58a8-44a512000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '021eaa43-f690-46d0-949b-77fe93762f8f',
  'date',
  'Wed, 17 Jun 2020 13:11:23 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159239947469006848/file159239947598004671')
  .reply(200, "", [
  'content-length',
  '11',
  'content-type',
  'application/octet-stream',
  'last-modified',
  'Wed, 17 Jun 2020 13:11:19 GMT',
  'accept-ranges',
  'bytes',
  'etag',
  '"0x8D812BFECFB0E93"',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b3b64056-101e-002d-04a8-4496da000000',
  'x-ms-client-request-id',
  '54775051-f6f6-42d6-8a08-801848b0411a',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Wed, 17 Jun 2020 13:11:17 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'access-control-allow-origin',
  '*',
  'date',
  'Wed, 17 Jun 2020 13:11:24 GMT',
  'connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159239947469006848')
  .query(true)
  .reply(202, "", [
  'content-length',
  '0',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2da6fa85-301e-0083-3aa8-443bcb000000',
  'x-ms-client-request-id',
  '26460164-771d-4e28-8667-80ba49f98a83',
  'x-ms-version',
  '2019-12-12',
  'date',
  'Wed, 17 Jun 2020 13:11:26 GMT',
  'connection',
  'close'
]);
