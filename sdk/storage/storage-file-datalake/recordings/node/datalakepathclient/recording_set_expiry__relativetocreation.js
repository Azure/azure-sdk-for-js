let nock = require('nock');

module.exports.hash = "1b61a967d608c729ba89903bf69e5ff8";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159299255097900923","file":"file159299255140603883"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159299255097900923')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Jun 2020 09:55:50 GMT',
  'ETag',
  '"0x8D81824C70679AD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00e03a72-a01e-0007-1c0d-4a49ca000000',
  'x-ms-client-request-id',
  '87942801-834d-4d1f-8168-6b7e993594f0',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 24 Jun 2020 09:55:50 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159299255097900923/file159299255140603883')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 09:55:51 GMT',
  'ETag',
  '"0x8D81824C75D6C43"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f8e5601-501f-0003-2b0d-4ac4cd000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'caee113c-8d02-4cc7-833c-c4cbbf67e0ec',
  'Date',
  'Wed, 24 Jun 2020 09:55:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159299255097900923/file159299255140603883', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6f8e5602-501f-0003-2c0d-4ac4cd000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '0a5cbc12-2ae2-4560-94b9-4719100e4629',
  'Date',
  'Wed, 24 Jun 2020 09:55:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159299255097900923/file159299255140603883')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 09:55:52 GMT',
  'ETag',
  '"0x8D81824C7DF53B3"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '6f8e5603-501f-0003-2d0d-4ac4cd000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'ce07f92e-cc8f-438e-a833-a236bf4e6884',
  'Date',
  'Wed, 24 Jun 2020 09:55:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159299255097900923/file159299255140603883')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 09:55:52 GMT',
  'ETag',
  '"0x8D81824C7DF53B3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00e03b36-a01e-0007-2e0d-4a49ca000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '51df929b-5e32-437d-9527-01dc9348ed23',
  'Date',
  'Wed, 24 Jun 2020 09:55:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159299255097900923/file159299255140603883')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 24 Jun 2020 09:55:52 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81824C7DF53B3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00e03b52-a01e-0007-460d-4a49ca000000',
  'x-ms-client-request-id',
  '9b880212-c59d-4477-81f8-0d942e429cc9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Wed, 24 Jun 2020 09:55:51 GMT',
  'x-ms-expiry-time',
  'Wed, 24 Jun 2020 10:55:51 GMT',
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
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-expiry-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 24 Jun 2020 09:55:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159299255097900923')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00e03b74-a01e-0007-640d-4a49ca000000',
  'x-ms-client-request-id',
  'c5ae678f-e7d5-4063-9dcb-ac65af589cdc',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 24 Jun 2020 09:55:53 GMT'
]);
