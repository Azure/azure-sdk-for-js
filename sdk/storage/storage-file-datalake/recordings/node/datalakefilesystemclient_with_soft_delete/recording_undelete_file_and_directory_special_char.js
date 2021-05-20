let nock = require('nock');

module.exports.hash = "d0c76cf18c4743e014291e02562eaa0c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162071857193807651"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071857193807651')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 11 May 2021 07:36:12 GMT',
  'ETag',
  '"0x8D9144F736D2259"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c77b-f01e-0012-4a38-463670000000',
  'x-ms-client-request-id',
  '4e79cb53-bfee-4dce-8dc8-35962ffb00b7',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:36:11 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071857193807651/!%27()%3B%5B%5D%40%26%25%3D%2B%24%2C%23%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%3B')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:36:12 GMT',
  'ETag',
  '"0x8D9144F739E7553"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270ebbc-601f-0000-7438-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '7b411292-acb0-43e4-8c30-6439114e2b3d',
  'Date',
  'Tue, 11 May 2021 07:36:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071857193807651/!%27()%3B%5B%5D%40%26%25%3D%2B%24%2C%23%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%3B')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921727497078',
  'x-ms-request-id',
  '1270ebd6-601f-0000-0e38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '06766757-429d-477e-be3c-c4bff27f0346',
  'Date',
  'Tue, 11 May 2021 07:36:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071857193807651/!%27()%3B%5B%5D%40%26%25%3D%2B%24%2C%23%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%3B')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c7c3-f01e-0012-0238-463670000000',
  'x-ms-client-request-id',
  'ca503796-82d4-449c-97a1-56d045b3a4cc',
  'x-ms-version',
  '2020-06-12',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:36:12 GMT',
  'Date',
  'Tue, 11 May 2021 07:36:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem162071857193807651/!%27()%3B%5B%5D%40%26%25%3D%2B%24%2C%23%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%3B')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 11 May 2021 07:36:12 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9144F739E7553"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c7e5-f01e-0012-1f38-463670000000',
  'x-ms-client-request-id',
  '0c538804-7e53-4453-86c7-6bd47625e2a0',
  'x-ms-version',
  '2020-06-12',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:36:12 GMT',
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
  'Tue, 11 May 2021 07:36:12 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071857193807651/%2521%2527%2528%2529%253B%255B%255D%2540%2526%2525%253D%252B%2524%252C%2523%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%253B')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:36:13 GMT',
  'ETag',
  '"0x8D9144F74601F12"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270ebf5-601f-0000-2d38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '068b1ecb-17f2-4d0f-a1b1-8c4b34953110',
  'Date',
  'Tue, 11 May 2021 07:36:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071857193807651/%2521%2527%2528%2529%253B%255B%255D%2540%2526%2525%253D%252B%2524%252C%2523%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%253B')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921740061981',
  'x-ms-request-id',
  '1270ec14-601f-0000-4c38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'c442e030-0ea3-4e06-87fe-150908d9ea52',
  'Date',
  'Tue, 11 May 2021 07:36:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071857193807651/%2521%2527%2528%2529%253B%255B%255D%2540%2526%2525%253D%252B%2524%252C%2523%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%253B')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c81d-f01e-0012-4a38-463670000000',
  'x-ms-client-request-id',
  'e1a8e4c2-583a-4084-958e-56bbc32e3e1e',
  'x-ms-version',
  '2020-06-12',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:36:13 GMT',
  'Date',
  'Tue, 11 May 2021 07:36:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem162071857193807651/%2521%2527%2528%2529%253B%255B%255D%2540%2526%2525%253D%252B%2524%252C%2523%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%253B')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 11 May 2021 07:36:13 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9144F74601F12"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c829-f01e-0012-5538-463670000000',
  'x-ms-client-request-id',
  'eaa443b6-5076-4b44-aff9-f7bdf3fab87a',
  'x-ms-version',
  '2020-06-12',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:36:13 GMT',
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
  'Tue, 11 May 2021 07:36:13 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071857193807651/%20a%20file%20or%20directory%20')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:36:14 GMT',
  'ETag',
  '"0x8D9144F75236234"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270ec6a-601f-0000-1538-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '06477756-1461-46ae-987f-99549fd5fa9c',
  'Date',
  'Tue, 11 May 2021 07:36:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071857193807651/%20a%20file%20or%20directory%20')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921752886884',
  'x-ms-request-id',
  '1270ec8a-601f-0000-3538-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'c38a5531-085b-4894-b387-8c01a50c0691',
  'Date',
  'Tue, 11 May 2021 07:36:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071857193807651/%20a%20file%20or%20directory%20')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c86e-f01e-0012-0538-463670000000',
  'x-ms-client-request-id',
  '12939349-2ec4-4e91-b7aa-e3831cf247ee',
  'x-ms-version',
  '2020-06-12',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:36:14 GMT',
  'Date',
  'Tue, 11 May 2021 07:36:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem162071857193807651/%20a%20file%20or%20directory%20')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 11 May 2021 07:36:14 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9144F75236234"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c879-f01e-0012-0b38-463670000000',
  'x-ms-client-request-id',
  '239d7360-1a8b-45c0-932f-8edc13efe5f1',
  'x-ms-version',
  '2020-06-12',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:36:14 GMT',
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
  'Tue, 11 May 2021 07:36:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071857193807651')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c8ac-f01e-0012-3938-463670000000',
  'x-ms-client-request-id',
  '2ac08553-0726-435e-a10e-2f4f54b11ab8',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:36:15 GMT'
]);
