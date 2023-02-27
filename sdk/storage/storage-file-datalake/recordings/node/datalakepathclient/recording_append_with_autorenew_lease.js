let nock = require('nock');

module.exports.hash = "8358d9ed3efffe7bb2200b1dc662c00f";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem167333425297708719","file":"file167333425309401910","tempfile2":"tempfile2167333425347005573"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167333425297708719')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:13 GMT',
  'ETag',
  '"0x8DAF2D8E150F1A3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51e6a815-701e-0017-28c1-24500a000000',
  'x-ms-client-request-id',
  '98e0a7f7-c97b-430d-bdc2-d872ac9271f9',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 10 Jan 2023 07:04:12 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167333425297708719/file167333425309401910')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:13 GMT',
  'ETag',
  '"0x8DAF2D8E1672266"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5cbe-801f-002c-4ac1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '1e571821-3189-4a88-aae3-c982097dd9d0',
  'Date',
  'Tue, 10 Jan 2023 07:04:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333425297708719/file167333425309401910', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5cbf-801f-002c-4bc1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'e017662f-6329-475c-bd15-663c95cc75d7',
  'Date',
  'Tue, 10 Jan 2023 07:04:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333425297708719/file167333425309401910')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:13 GMT',
  'ETag',
  '"0x8DAF2D8E18C3ADE"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '153e5cc0-801f-002c-4cc1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'ff5fa0de-eb36-4393-8039-dc63759a46a1',
  'Date',
  'Tue, 10 Jan 2023 07:04:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167333425297708719/tempfile2167333425347005573')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:13 GMT',
  'ETag',
  '"0x8DAF2D8E19E3517"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5cc2-801f-002c-4dc1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'e2fae4d0-ba1c-4c75-92a3-1fc3f8364298',
  'Date',
  'Tue, 10 Jan 2023 07:04:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem167333425297708719/tempfile2167333425347005573')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:13 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAF2D8E19E3517"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51e6a871-701e-0017-7cc1-24500a000000',
  'x-ms-client-request-id',
  '86ca8742-beec-4b24-982c-501b55f1372e',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 10 Jan 2023 07:04:13 GMT',
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
  'Tue, 10 Jan 2023 07:04:12 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333425297708719/tempfile2167333425347005573', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-lease-renewed',
  'true',
  'x-ms-request-id',
  '153e5cf8-801f-002c-5cc1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '3446e3fd-9460-46d0-a978-1aaffef494b2',
  'Date',
  'Tue, 10 Jan 2023 07:04:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333425297708719/tempfile2167333425347005573', "HelloWorld")
  .query(true)
  .reply(412, {"error":{"code":"LeaseIdMissing","message":"There is currently a lease on the resource and no lease ID was specified in the request.\nRequestId:153e5cf9-801f-002c-5dc1-2415ae000000\nTime:2023-01-10T07:04:29.2080287Z"}}, [
  'Content-Length',
  '219',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'LeaseIdMissing',
  'x-ms-request-id',
  '153e5cf9-801f-002c-5dc1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'dfbf6a2b-cfec-4064-bb60-201fcecffcfb',
  'Date',
  'Tue, 10 Jan 2023 07:04:28 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167333425297708719/tempfile2167333425347005573')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133178078693279170',
  'x-ms-request-id',
  '153e5cfa-801f-002c-5ec1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '1810fd3b-ab71-416b-8434-b9c17ac2179a',
  'Date',
  'Tue, 10 Jan 2023 07:04:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167333425297708719')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51e6b0e1-701e-0017-03c1-24500a000000',
  'x-ms-client-request-id',
  '325cc52b-a233-4f11-a2be-67fd2a9402f4',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 10 Jan 2023 07:04:29 GMT'
]);
