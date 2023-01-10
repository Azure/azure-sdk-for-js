let nock = require('nock');

module.exports.hash = "5b7518e39f2c08070529771a15e302af";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem167333425051409786","file":"file167333425121803791","tempfile2":"tempfile2167333425207105719"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167333425051409786')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:11 GMT',
  'ETag',
  '"0x8DAF2D8E02D836F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51e6a6ff-701e-0017-2ec1-24500a000000',
  'x-ms-client-request-id',
  'c6b58b03-a3fd-4c75-bd79-aafe349bd9bb',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 10 Jan 2023 07:04:10 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167333425051409786/file167333425121803791')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:12 GMT',
  'ETag',
  '"0x8DAF2D8E09009FE"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5cb2-801f-002c-3ec1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'ae913e1b-1ae9-4fe7-bcbf-dbfcf1565cda',
  'Date',
  'Tue, 10 Jan 2023 07:04:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333425051409786/file167333425121803791', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5cb3-801f-002c-3fc1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'efab0061-9489-439b-a563-b40e9df83c06',
  'Date',
  'Tue, 10 Jan 2023 07:04:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333425051409786/file167333425121803791')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:12 GMT',
  'ETag',
  '"0x8DAF2D8E0B60DA0"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '153e5cb5-801f-002c-41c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '2af9d926-050f-465e-b498-0647211c0a22',
  'Date',
  'Tue, 10 Jan 2023 07:04:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167333425051409786/tempfile2167333425207105719')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:12 GMT',
  'ETag',
  '"0x8DAF2D8E0C8AB3F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5cb6-801f-002c-42c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '929a21af-0168-44cc-9e8b-49bab433e7e7',
  'Date',
  'Tue, 10 Jan 2023 07:04:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333425051409786/tempfile2167333425207105719', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5cb8-801f-002c-44c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '9a7cb4e0-4327-4571-a768-cab4f0c17754',
  'Date',
  'Tue, 10 Jan 2023 07:04:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333425051409786/tempfile2167333425207105719', "HelloWorld")
  .query(true)
  .reply(412, {"error":{"code":"LeaseIdMissing","message":"There is currently a lease on the resource and no lease ID was specified in the request.\nRequestId:153e5cb9-801f-002c-45c1-2415ae000000\nTime:2023-01-10T07:04:12.6773728Z"}}, [
  'Content-Length',
  '219',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'LeaseIdMissing',
  'x-ms-request-id',
  '153e5cb9-801f-002c-45c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'cfd5f1fc-8dd6-4eca-8c49-a69f53fb423a',
  'Date',
  'Tue, 10 Jan 2023 07:04:12 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333425051409786/tempfile2167333425207105719', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:12 GMT',
  'ETag',
  '"0x8DAF2D8E0FE4C6D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5cba-801f-002c-46c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '10d03f8d-9508-4c3a-9dd4-93343a1a91df',
  'Date',
  'Tue, 10 Jan 2023 07:04:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem167333425051409786/tempfile2167333425207105719')
  .reply(200, "", [
  'Content-Length',
  '20',
  'Content-Type',
  'application/json',
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:12 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAF2D8E0FE4C6D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51e6a7d4-701e-0017-6bc1-24500a000000',
  'x-ms-client-request-id',
  '5ea1fa74-1b54-4696-8829-4709058418d4',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 10 Jan 2023 07:04:12 GMT',
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
  'Tue, 10 Jan 2023 07:04:11 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167333425051409786/tempfile2167333425207105719')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133178078530430327',
  'x-ms-request-id',
  '153e5cbb-801f-002c-47c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'f60fccc4-7686-4702-b65a-f6baefb47f6d',
  'Date',
  'Tue, 10 Jan 2023 07:04:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167333425051409786')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51e6a800-701e-0017-14c1-24500a000000',
  'x-ms-client-request-id',
  '9125a3e9-8db7-47b5-a204-01c76616df5f',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 10 Jan 2023 07:04:12 GMT'
]);
