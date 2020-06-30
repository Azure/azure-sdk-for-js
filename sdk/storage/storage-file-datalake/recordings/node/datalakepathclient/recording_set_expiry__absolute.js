let nock = require('nock');

module.exports.hash = "8a1b0b455a3a37375eb859d0bb25954e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159239944055201355","file":"file159239944181407133"},"newDate":{"now":"2020-06-17T13:10:45.623Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159239944055201355')
  .query(true)
  .reply(201, "", [
  'content-length',
  '0',
  'last-modified',
  'Wed, 17 Jun 2020 13:10:41 GMT',
  'etag',
  '"0x8D812BFD6512130"',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd9dce062-401e-0020-77a8-445e0e000000',
  'x-ms-client-request-id',
  '27a0dbd3-f1cb-4426-92d3-0de7f27ea9a4',
  'x-ms-version',
  '2019-12-12',
  'date',
  'Wed, 17 Jun 2020 13:10:41 GMT',
  'connection',
  'close'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159239944055201355/file159239944181407133')
  .query(true)
  .reply(201, "", [
  'last-modified',
  'Wed, 17 Jun 2020 13:10:42 GMT',
  'etag',
  '"0x8D812BFD71556C0"',
  'server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '453afe2f-901f-0041-4ca8-447d4d000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '06d3f1ca-8245-4728-9597-ea2b89f84dbf',
  'date',
  'Wed, 17 Jun 2020 13:10:42 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159239944055201355/file159239944181407133', "Hello World")
  .query(true)
  .reply(202, "", [
  'server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1adc691-a01f-0007-45a8-4449ca000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '53534a54-ece4-4ae8-a466-7e91a46acedb',
  'date',
  'Wed, 17 Jun 2020 13:10:43 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159239944055201355/file159239944181407133')
  .query(true)
  .reply(200, "", [
  'last-modified',
  'Wed, 17 Jun 2020 13:10:45 GMT',
  'etag',
  '"0x8D812BFD89A13E4"',
  'server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'b452f2ea-801f-003f-25a8-44ed0a000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '57abdffc-9254-4c5e-81b3-4f7b627599fb',
  'date',
  'Wed, 17 Jun 2020 13:10:45 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159239944055201355/file159239944181407133')
  .query(true)
  .reply(200, "", [
  'last-modified',
  'Wed, 17 Jun 2020 13:10:45 GMT',
  'etag',
  '"0x8D812BFD89A13E4"',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c75f9e58-f01e-0068-3aa8-444339000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '8570dc7e-9b60-4f6c-82e4-377ab1f8890a',
  'date',
  'Wed, 17 Jun 2020 13:10:46 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159239944055201355/file159239944181407133')
  .reply(200, "", [
  'content-length',
  '11',
  'content-type',
  'application/octet-stream',
  'last-modified',
  'Wed, 17 Jun 2020 13:10:45 GMT',
  'accept-ranges',
  'bytes',
  'etag',
  '"0x8D812BFD89A13E4"',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8938495e-c01e-0011-14a8-44bf1d000000',
  'x-ms-client-request-id',
  '0f678ca8-58d9-4c29-a33b-f334b9fae6d0',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Wed, 17 Jun 2020 13:10:42 GMT',
  'x-ms-expiry-time',
  'Wed, 17 Jun 2020 13:10:50 GMT',
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
  'Wed, 17 Jun 2020 13:10:47 GMT',
  'connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159239944055201355/file159239944181407133')
  .reply(404, "", [
  'transfer-encoding',
  'chunked',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'caa13950-b01e-0046-7ea8-44112e000000',
  'x-ms-client-request-id',
  '9b445a9e-b65c-43fd-982f-84f71e349ee8',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'access-control-expose-headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'access-control-allow-origin',
  '*',
  'date',
  'Wed, 17 Jun 2020 13:10:53 GMT',
  'connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159239944055201355')
  .query(true)
  .reply(202, "", [
  'content-length',
  '0',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c9c782f0-f01e-0025-3ba8-448cd5000000',
  'x-ms-client-request-id',
  '26dd64d7-58b7-4487-b6b8-28ea539710cb',
  'x-ms-version',
  '2019-12-12',
  'date',
  'Wed, 17 Jun 2020 13:10:55 GMT',
  'connection',
  'close'
]);
