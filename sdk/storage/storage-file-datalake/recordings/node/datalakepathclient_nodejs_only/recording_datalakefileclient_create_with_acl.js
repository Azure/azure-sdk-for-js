let nock = require('nock');

module.exports.hash = "92c232fc8f2d4bdb933d0f0a7cd02eea";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem170591084118708592","file":"file170591084178704823","testfile":"testfile170591084261503408","readFilePath":"readFilePath170591084307203381"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem170591084118708592')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 22 Jan 2024 08:07:22 GMT',
  'ETag',
  '"0x8DC1B21294F1CCC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ace23582-001e-001b-620a-4dd9f8000000',
  'x-ms-client-request-id',
  'c4b4ac78-ade1-4ad6-a331-c84856df7c0f',
  'x-ms-version',
  '2024-02-04',
  'Date',
  'Mon, 22 Jan 2024 08:07:21 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem170591084118708592/file170591084178704823')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 22 Jan 2024 08:07:22 GMT',
  'ETag',
  '"0x8DC1B2129A8AD59"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'c2b47e45-101f-0065-5d0a-4d49bf000000',
  'x-ms-version',
  '2024-02-04',
  'x-ms-client-request-id',
  '0ae1a316-adcc-4d2d-be45-a7872f725614',
  'Date',
  'Mon, 22 Jan 2024 08:07:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem170591084118708592/file170591084178704823', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'c2b47e46-101f-0065-5e0a-4d49bf000000',
  'x-ms-version',
  '2024-02-04',
  'x-ms-client-request-id',
  '2f832d55-f9e5-491c-b7a4-93b77995ed1f',
  'Date',
  'Mon, 22 Jan 2024 08:07:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem170591084118708592/file170591084178704823')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 22 Jan 2024 08:07:22 GMT',
  'ETag',
  '"0x8DC1B2129D2FB81"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'c2b47e49-101f-0065-610a-4d49bf000000',
  'x-ms-version',
  '2024-02-04',
  'x-ms-client-request-id',
  'ae7ac665-478a-44d9-9b96-3277491290f4',
  'Date',
  'Mon, 22 Jan 2024 08:07:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem170591084118708592/testfile170591084261503408')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 22 Jan 2024 08:07:23 GMT',
  'ETag',
  '"0x8DC1B2129E60D63"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'c2b47e4b-101f-0065-630a-4d49bf000000',
  'x-ms-version',
  '2024-02-04',
  'x-ms-client-request-id',
  'b5a431a3-c646-4dd0-a175-861e871c4efe',
  'Date',
  'Mon, 22 Jan 2024 08:07:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem170591084118708592/testfile170591084261503408')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 22 Jan 2024 08:07:23 GMT',
  'ETag',
  '"0x8DC1B2129E60D63"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x-w-',
  'x-ms-acl',
  'user::rwx,group::r-x,other::-w-',
  'x-ms-request-id',
  'c2b47e4c-101f-0065-640a-4d49bf000000',
  'x-ms-version',
  '2024-02-04',
  'x-ms-client-request-id',
  '4d1e0eb8-f29b-4204-a110-0a59fd63deda',
  'Access-Control-Expose-Headers',
  'Content-Length,Date,ETag,Last-Modified,Server,x-ms-acl,x-ms-client-request-id,x-ms-group,x-ms-owner,x-ms-permissions,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Jan 2024 08:07:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem170591084118708592/testfile170591084261503408')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 22 Jan 2024 08:07:23 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DC1B2129E60D63"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ace237d9-001e-001b-7c0a-4dd9f8000000',
  'x-ms-client-request-id',
  '337931f8-a11f-4bc3-bf44-7ff253154acd',
  'x-ms-version',
  '2024-02-04',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 22 Jan 2024 08:07:23 GMT',
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
  'rwxr-x-w-',
  'x-ms-acl',
  'user::rwx,group::r-x,other::-w-',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,x-ms-acl,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Jan 2024 08:07:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem170591084118708592/testfile170591084261503408')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 22 Jan 2024 08:07:23 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DC1B2129E60D63"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ace23817-001e-001b-320a-4dd9f8000000',
  'x-ms-client-request-id',
  'b2dcc270-2bc7-4919-831f-80967b754570',
  'x-ms-version',
  '2024-02-04',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 22 Jan 2024 08:07:23 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x-w-',
  'x-ms-acl',
  'user::rwx,group::r-x,other::-w-',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,x-ms-acl,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Jan 2024 08:07:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem170591084118708592/testfile170591084261503408')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 22 Jan 2024 08:07:23 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DC1B2129E60D63"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ace23851-001e-001b-650a-4dd9f8000000',
  'x-ms-client-request-id',
  'e6920ead-8288-4dc6-ad63-d429cbee24b9',
  'x-ms-version',
  '2024-02-04',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 22 Jan 2024 08:07:23 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x-w-',
  'x-ms-acl',
  'user::rwx,group::r-x,other::-w-',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,x-ms-acl,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Jan 2024 08:07:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem170591084118708592')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ace2388b-001e-001b-180a-4dd9f8000000',
  'x-ms-client-request-id',
  'b594f32d-999f-4cad-89f7-30638b5c02f3',
  'x-ms-version',
  '2024-02-04',
  'Date',
  'Mon, 22 Jan 2024 08:07:22 GMT'
]);
