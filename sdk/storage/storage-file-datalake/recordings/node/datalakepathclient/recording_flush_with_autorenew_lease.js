let nock = require('nock');

module.exports.hash = "d5fb16755acef459d2a221cc8321bb15";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem167333427198604662","file":"file167333427210301048","tempfile2":"tempfile2167333427246107491"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167333427198604662')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:32 GMT',
  'ETag',
  '"0x8DAF2D8ECA5FB6E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51e6b292-701e-0017-7bc1-24500a000000',
  'x-ms-client-request-id',
  'c9657ced-e022-4446-9926-390028a98953',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 10 Jan 2023 07:04:32 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167333427198604662/file167333427210301048')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:32 GMT',
  'ETag',
  '"0x8DAF2D8ECB986E0"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5d0f-801f-002c-71c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '2afae2ee-bb81-4c75-bfa3-c46d00ce59b4',
  'Date',
  'Tue, 10 Jan 2023 07:04:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333427198604662/file167333427210301048', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5d11-801f-002c-73c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '13d21d04-2841-4b1e-9004-31f77be78f0a',
  'Date',
  'Tue, 10 Jan 2023 07:04:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333427198604662/file167333427210301048')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:32 GMT',
  'ETag',
  '"0x8DAF2D8ECDE0DE4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '153e5d12-801f-002c-74c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'ef7bbdc6-9182-401c-968f-acc7330703b1',
  'Date',
  'Tue, 10 Jan 2023 07:04:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167333427198604662/tempfile2167333427246107491')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:32 GMT',
  'ETag',
  '"0x8DAF2D8ECF04C35"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5d13-801f-002c-75c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'be12e70a-fabd-405a-9127-8a72933c5dc0',
  'Date',
  'Tue, 10 Jan 2023 07:04:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333427198604662/tempfile2167333427246107491', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5d14-801f-002c-76c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'bf2c1765-0793-4291-855b-6d126c83188e',
  'Date',
  'Tue, 10 Jan 2023 07:04:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333427198604662/tempfile2167333427246107491', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5d15-801f-002c-77c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'ca8d0bd7-39a1-48fa-979c-d2b3f2ab4af4',
  'Date',
  'Tue, 10 Jan 2023 07:04:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333427198604662/tempfile2167333427246107491')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:48 GMT',
  'ETag',
  '"0x8DAF2D8F619A51B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-lease-renewed',
  'true',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '153e5d2a-801f-002c-03c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'ab0d7fd1-c331-4e9b-a3c9-b9b0ddae7aed',
  'Date',
  'Tue, 10 Jan 2023 07:04:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167333427198604662/tempfile2167333427246107491')
  .reply(412, {"error":{"code":"LeaseIdMissing","message":"There is currently a lease on the resource and no lease ID was specified in the request.\nRequestId:153e5d2b-801f-002c-04c1-2415ae000000\nTime:2023-01-10T07:04:48.3402128Z"}}, [
  'Content-Length',
  '219',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'LeaseIdMissing',
  'x-ms-request-id',
  '153e5d2b-801f-002c-04c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '36f6df06-6c91-4c8f-9e0e-4dd7a38d182f',
  'Date',
  'Tue, 10 Jan 2023 07:04:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem167333427198604662/tempfile2167333427246107491')
  .reply(200, "", [
  'Content-Length',
  '20',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:48 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAF2D8F619A51B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51e6bbdf-701e-0017-62c1-24500a000000',
  'x-ms-client-request-id',
  'd17b0f79-cdf7-4f36-ab84-f0ed5e988e91',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 10 Jan 2023 07:04:32 GMT',
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
  'Tue, 10 Jan 2023 07:04:48 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167333427198604662/tempfile2167333427246107491')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133178078885559164',
  'x-ms-request-id',
  '153e5d2c-801f-002c-05c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '5c530a79-bc0e-4575-9b1c-492a1ea5486d',
  'Date',
  'Tue, 10 Jan 2023 07:04:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167333427198604662')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51e6bbff-701e-0017-7bc1-24500a000000',
  'x-ms-client-request-id',
  '5c204bd2-a538-4971-977f-a1077dfbf836',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 10 Jan 2023 07:04:48 GMT'
]);
