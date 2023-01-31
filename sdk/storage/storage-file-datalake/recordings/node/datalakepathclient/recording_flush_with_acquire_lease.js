let nock = require('nock');

module.exports.hash = "204b4d59b9ab7ca7277668440925212c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem167333427050704428","file":"file167333427063507644","tempfile2":"tempfile2167333427099705006"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167333427050704428')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:30 GMT',
  'ETag',
  '"0x8DAF2D8EBC44795"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51e6b1af-701e-0017-33c1-24500a000000',
  'x-ms-client-request-id',
  'f2a4dca3-daf8-438f-a3b6-37e8768aea8e',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 10 Jan 2023 07:04:30 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167333427050704428/file167333427063507644')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:31 GMT',
  'ETag',
  '"0x8DAF2D8EBDAF8C5"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5d05-801f-002c-68c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '2544e28f-b364-4f25-a5a1-689f269242ca',
  'Date',
  'Tue, 10 Jan 2023 07:04:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333427050704428/file167333427063507644', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5d06-801f-002c-69c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'a8e63c80-d62e-4cd3-9ad2-e7944921d754',
  'Date',
  'Tue, 10 Jan 2023 07:04:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333427050704428/file167333427063507644')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:31 GMT',
  'ETag',
  '"0x8DAF2D8EBFEBDD3"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '153e5d07-801f-002c-6ac1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'b610a03f-c996-44c8-b91c-711c745fd4cb',
  'Date',
  'Tue, 10 Jan 2023 07:04:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167333427050704428/tempfile2167333427099705006')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:31 GMT',
  'ETag',
  '"0x8DAF2D8EC108EC6"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5d08-801f-002c-6bc1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '752812f5-d133-4f1a-9838-d88b34875a56',
  'Date',
  'Tue, 10 Jan 2023 07:04:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333427050704428/tempfile2167333427099705006', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5d09-801f-002c-6cc1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '386b9842-7dee-4113-b67c-dc26acfb18e0',
  'Date',
  'Tue, 10 Jan 2023 07:04:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333427050704428/tempfile2167333427099705006', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5d0a-801f-002c-6dc1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '6d0a6e47-fc39-4cef-8401-6f65b8fa115e',
  'Date',
  'Tue, 10 Jan 2023 07:04:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333427050704428/tempfile2167333427099705006')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:31 GMT',
  'ETag',
  '"0x8DAF2D8EC4645FB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '153e5d0b-801f-002c-6ec1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '18886c05-6757-4d51-8880-2e8bf00a5d43',
  'Date',
  'Tue, 10 Jan 2023 07:04:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167333427050704428/tempfile2167333427099705006')
  .reply(412, {"error":{"code":"LeaseIdMissing","message":"There is currently a lease on the resource and no lease ID was specified in the request.\nRequestId:153e5d0c-801f-002c-6fc1-2415ae000000\nTime:2023-01-10T07:04:31.8565312Z"}}, [
  'Content-Length',
  '219',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'LeaseIdMissing',
  'x-ms-request-id',
  '153e5d0c-801f-002c-6fc1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'c9a0df62-6d7d-49bb-922a-959b5667d811',
  'Date',
  'Tue, 10 Jan 2023 07:04:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem167333427050704428/tempfile2167333427099705006')
  .reply(200, "", [
  'Content-Length',
  '20',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:31 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAF2D8EC4645FB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51e6b258-701e-0017-48c1-24500a000000',
  'x-ms-client-request-id',
  'fc8cb019-fa5a-4ac1-86a0-63a488f48cf8',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 10 Jan 2023 07:04:31 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 10 Jan 2023 07:04:31 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167333427050704428/tempfile2167333427099705006')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133178078720717226',
  'x-ms-request-id',
  '153e5d0d-801f-002c-70c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '0dd74097-02f1-4cb0-b3f5-d611dff2666d',
  'Date',
  'Tue, 10 Jan 2023 07:04:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167333427050704428')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51e6b283-701e-0017-6ec1-24500a000000',
  'x-ms-client-request-id',
  'e4a23030-cdf3-4d22-b6c8-feaf867b870a',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 10 Jan 2023 07:04:32 GMT'
]);
