let nock = require('nock');

module.exports.hash = "d0c76cf18c4743e014291e02562eaa0c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162061905652109484"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061905652109484')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 May 2021 03:57:36 GMT',
  'ETag',
  '"0x8D91367BFC6000E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d4f7-801e-0045-1c50-459843000000',
  'x-ms-client-request-id',
  'a583a9f8-420f-4690-a4bc-9b6fedf39d1b',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:36 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061905652109484/!%27()%3B%5B%5D%40%26%25%3D%2B%24%2C%23%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%3B')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:37 GMT',
  'ETag',
  '"0x8D91367BFF7F6F3"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f940f-201f-0073-1b50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '24c206f6-4c3c-4407-83b1-50fc511f5b8b',
  'Date',
  'Mon, 10 May 2021 03:57:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061905652109484/!%27()%3B%5B%5D%40%26%25%3D%2B%24%2C%23%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%3B')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926578296785',
  'x-ms-request-id',
  '6d9f9411-201f-0073-1c50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '3129bcfd-9321-4a7b-8dea-da47a11c254f',
  'Date',
  'Mon, 10 May 2021 03:57:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061905652109484/!%27()%3B%5B%5D%40%26%25%3D%2B%24%2C%23%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%3B')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d546-801e-0045-4950-459843000000',
  'x-ms-client-request-id',
  '41320a4e-3359-43a6-a9e6-f7a5652b022c',
  'x-ms-version',
  '2020-06-12',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 10 May 2021 03:57:37 GMT',
  'Date',
  'Mon, 10 May 2021 03:57:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem162061905652109484/!%27()%3B%5B%5D%40%26%25%3D%2B%24%2C%23%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%3B')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 10 May 2021 03:57:37 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D91367BFF7F6F3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d55b-801e-0045-5750-459843000000',
  'x-ms-client-request-id',
  '3d7333b3-9b61-40aa-a116-8edb005f9f72',
  'x-ms-version',
  '2020-06-12',
  'x-ms-creation-time',
  'Mon, 10 May 2021 03:57:37 GMT',
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
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 May 2021 03:57:37 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061905652109484/%2521%2527%2528%2529%253B%255B%255D%2540%2526%2525%253D%252B%2524%252C%2523%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%253B')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:38 GMT',
  'ETag',
  '"0x8D91367C0DF3E16"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f941e-201f-0073-2650-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '56bf6b87-7e48-4d6a-ba53-03f056795c21',
  'Date',
  'Mon, 10 May 2021 03:57:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061905652109484/%2521%2527%2528%2529%253B%255B%255D%2540%2526%2525%253D%252B%2524%252C%2523%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%253B')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926591010715',
  'x-ms-request-id',
  '6d9f941f-201f-0073-2750-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '23f3dbcc-9817-4439-96ac-6f259a2f84a7',
  'Date',
  'Mon, 10 May 2021 03:57:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061905652109484/%2521%2527%2528%2529%253B%255B%255D%2540%2526%2525%253D%252B%2524%252C%2523%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%253B')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d5a0-801e-0045-0c50-459843000000',
  'x-ms-client-request-id',
  'c90f0a02-20af-441c-aea9-0a1b8ac2b80f',
  'x-ms-version',
  '2020-06-12',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 10 May 2021 03:57:38 GMT',
  'Date',
  'Mon, 10 May 2021 03:57:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem162061905652109484/%2521%2527%2528%2529%253B%255B%255D%2540%2526%2525%253D%252B%2524%252C%2523%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%253B')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 10 May 2021 03:57:38 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D91367C0DF3E16"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d5ac-801e-0045-1550-459843000000',
  'x-ms-client-request-id',
  '4deb1ae4-265f-4be0-a262-ab9fbc1383ce',
  'x-ms-version',
  '2020-06-12',
  'x-ms-creation-time',
  'Mon, 10 May 2021 03:57:38 GMT',
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
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 May 2021 03:57:39 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061905652109484/%20a%20file%20or%20directory%20')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:40 GMT',
  'ETag',
  '"0x8D91367C1AAC0BD"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f9421-201f-0073-2850-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '5d206d86-bdf4-4a2b-91d8-a7e42dc9366d',
  'Date',
  'Mon, 10 May 2021 03:57:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061905652109484/%20a%20file%20or%20directory%20')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926604422931',
  'x-ms-request-id',
  '6d9f9422-201f-0073-2950-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '1666d5e2-0ec1-4fba-ae15-6262fa4ba46a',
  'Date',
  'Mon, 10 May 2021 03:57:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061905652109484/%20a%20file%20or%20directory%20')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d5e0-801e-0045-3450-459843000000',
  'x-ms-client-request-id',
  'c603e20d-eddb-411e-a324-996908f81fc7',
  'x-ms-version',
  '2020-06-12',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 10 May 2021 03:57:40 GMT',
  'Date',
  'Mon, 10 May 2021 03:57:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem162061905652109484/%20a%20file%20or%20directory%20')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 10 May 2021 03:57:40 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D91367C1AAC0BD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d5f0-801e-0045-4150-459843000000',
  'x-ms-client-request-id',
  '1ea1ca49-89fb-41ba-95bc-fab2868561f1',
  'x-ms-version',
  '2020-06-12',
  'x-ms-creation-time',
  'Mon, 10 May 2021 03:57:40 GMT',
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
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 May 2021 03:57:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061905652109484')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d5fe-801e-0045-4c50-459843000000',
  'x-ms-client-request-id',
  '5dcde3ce-b57f-4fec-a789-fdda491bb84c',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:40 GMT'
]);
