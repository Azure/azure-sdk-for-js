let nock = require('nock');

module.exports.hash = "073bc9377f255ffd2e8322c012c594d5";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240224301972","file":"file158368240226807258"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240224301972')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E5F0DC21"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2d14-601e-0014-5560-f586fa000000',
  'x-ms-client-request-id',
  '10c71bf5-786c-47f5-ab9d-bc4f890fb124',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240224301972/file158368240226807258')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E5F5D93A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14400e59-401f-0021-0960-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '85a17593-de72-4571-a41d-bee4f32d2622',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158368240224301972/file158368240226807258', "aaa")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '14400e5c-401f-0021-0c60-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '48c8af50-d214-481a-8b11-114fac49b9d1',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158368240224301972/file158368240226807258')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E5FD7E2F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '14400e5e-401f-0021-0e60-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'c739d5fb-685c-4d66-b3e5-9aabf9c5e528',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240224301972/file158368240226807258')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E5FD7E2F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2d51-601e-0014-0f60-f586fa000000',
  'x-ms-client-request-id',
  '22657160-2f0e-44d4-8ad9-6bbee11ccd40',
  'x-ms-version',
  '2019-07-07',
  'x-ms-lease-id',
  '4d383caa-e2d3-4916-9597-7578818f67c2',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem158368240224301972/file158368240226807258')
  .reply(200, "", [
  'Content-Length',
  '3',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7C377E5FD7E2F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2d66-601e-0014-2360-f586fa000000',
  'x-ms-client-request-id',
  '20005b4f-0089-4139-9019-4d5c80a8960f',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Sun, 08 Mar 2020 15:46:42 GMT',
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
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240224301972/file158368240226807258')
  .query(true)
  .reply(412, {"error":{"code":"LeaseIdMissing","message":"There is currently a lease on the resource and no lease ID was specified in the request.\nRequestId:14400e63-401f-0021-1360-f528af000000\nTime:2020-03-08T15:46:42.4016595Z"}}, [
  'Content-Length',
  '219',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'LeaseIdMissing',
  'x-ms-request-id',
  '14400e63-401f-0021-1360-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'f0cbce3d-d471-46cc-aa2c-fce2b385186a',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem158368240224301972/file158368240226807258')
  .reply(200, "aaa", [
  'Content-Length',
  '3',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7C377E5FD7E2F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2d77-601e-0014-3260-f586fa000000',
  'x-ms-client-request-id',
  'd74e4838-5a4e-491c-a450-60590a3cf06b',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Sun, 08 Mar 2020 15:46:42 GMT',
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
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158368240224301972')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2d7e-601e-0014-3860-f586fa000000',
  'x-ms-client-request-id',
  '6060dd4c-2b19-4237-a24a-6f4929aaa6de',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);
