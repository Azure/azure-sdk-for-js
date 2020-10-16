let nock = require('nock');

module.exports.hash = "49ae201267dbd16bc5c2949dfdee3daa";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159299255423504608","file":"file159299255462704152"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159299255423504608')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Jun 2020 09:55:54 GMT',
  'ETag',
  '"0x8D81824C8FC84C9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00e03b8d-a01e-0007-7a0d-4a49ca000000',
  'x-ms-client-request-id',
  '8399bc23-b69d-46ad-b4ff-5b656ec741d2',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 24 Jun 2020 09:55:53 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159299255423504608/file159299255462704152')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 09:55:54 GMT',
  'ETag',
  '"0x8D81824C93ABDDE"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f8e5650-501f-0003-790d-4ac4cd000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'adcc7919-125e-40d9-9909-47bdc889e0f7',
  'Date',
  'Wed, 24 Jun 2020 09:55:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159299255423504608/file159299255462704152', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6f8e565e-501f-0003-070d-4ac4cd000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'e01417a4-e8a8-404c-9d3a-89b44b517fc8',
  'Date',
  'Wed, 24 Jun 2020 09:55:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159299255423504608/file159299255462704152')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 09:55:55 GMT',
  'ETag',
  '"0x8D81824C9C67EF8"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '6f8e566c-501f-0003-130d-4ac4cd000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'dd4bb946-c11c-4652-b9ca-1dc2a54f644f',
  'Date',
  'Wed, 24 Jun 2020 09:55:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159299255423504608/file159299255462704152')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 09:55:55 GMT',
  'ETag',
  '"0x8D81824C9C67EF8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00e03c15-a01e-0007-6a0d-4a49ca000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'fd6a7cd3-2b10-43ff-9f3d-d1240d306701',
  'Date',
  'Wed, 24 Jun 2020 09:55:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159299255423504608/file159299255462704152')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 24 Jun 2020 09:55:55 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81824C9C67EF8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00e03c41-a01e-0007-110d-4a49ca000000',
  'x-ms-client-request-id',
  '5ea0a817-c9e0-4207-89d5-a3c6cda5de44',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Wed, 24 Jun 2020 09:55:54 GMT',
  'x-ms-expiry-time',
  'Wed, 24 Jun 2020 10:55:54 GMT',
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
  'Wed, 24 Jun 2020 09:55:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159299255423504608/file159299255462704152')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 09:55:55 GMT',
  'ETag',
  '"0x8D81824C9C67EF8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00e03c79-a01e-0007-450d-4a49ca000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '9e2e5751-679d-438b-8385-ca4642b86e2c',
  'Date',
  'Wed, 24 Jun 2020 09:55:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159299255423504608/file159299255462704152')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 24 Jun 2020 09:55:55 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81824C9C67EF8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00e03c96-a01e-0007-590d-4a49ca000000',
  'x-ms-client-request-id',
  'a07246d0-d412-4b73-b304-c966648ecb76',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Wed, 24 Jun 2020 09:55:54 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 24 Jun 2020 09:55:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159299255423504608')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00e03cc6-a01e-0007-040d-4a49ca000000',
  'x-ms-client-request-id',
  '2a8fb699-f327-427d-9825-d807836519b8',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 24 Jun 2020 09:55:57 GMT'
]);
