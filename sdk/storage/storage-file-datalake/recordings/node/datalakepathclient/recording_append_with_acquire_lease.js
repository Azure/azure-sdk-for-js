let nock = require('nock');

module.exports.hash = "a6b0588f1451e80ce12839130f95238e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154754012203475","file":"file169154754026703042","tempfile2":"tempfile2169154754069102600"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154754012203475')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:59 GMT',
  'ETag',
  '"0x8DB987EFDE51A31"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c2740e-101e-002e-4567-caab16000000',
  'x-ms-client-request-id',
  '7e57059e-d4fc-4e36-aefd-634cc11db892',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:58 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154754012203475/file169154754026703042')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:59 GMT',
  'ETag',
  '"0x8DB987EFDFC9DD2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674645-f01f-0054-4b67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '7ad8c9a4-0579-418b-867f-94ee78537568',
  'Date',
  'Wed, 09 Aug 2023 02:18:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154754012203475/file169154754026703042', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f167464d-f01f-0054-5367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '5ec701b0-eceb-463e-8424-531d3fb1d9e8',
  'Date',
  'Wed, 09 Aug 2023 02:18:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154754012203475/file169154754026703042')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:00 GMT',
  'ETag',
  '"0x8DB987EFE281B93"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'f1674658-f01f-0054-5d67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '4dc6d7e5-95c7-4ea1-b6f6-6ce7bb521e02',
  'Date',
  'Wed, 09 Aug 2023 02:18:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154754012203475/tempfile2169154754069102600')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:00 GMT',
  'ETag',
  '"0x8DB987EFE3CEB07"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f167465d-f01f-0054-6267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '74130d87-0596-46b4-8406-acf38155f663',
  'Date',
  'Wed, 09 Aug 2023 02:18:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154754012203475/tempfile2169154754069102600', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674665-f01f-0054-6a67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'e033b5e2-db1c-4785-971a-5b9dd54d15a2',
  'Date',
  'Wed, 09 Aug 2023 02:18:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154754012203475/tempfile2169154754069102600', "HelloWorld")
  .query(true)
  .reply(412, {"error":{"code":"LeaseIdMissing","message":"There is currently a lease on the resource and no lease ID was specified in the request.\nRequestId:f167466b-f01f-0054-7067-cab656000000\nTime:2023-08-09T02:19:00.4487430Z"}}, [
  'Content-Length',
  '219',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'LeaseIdMissing',
  'x-ms-request-id',
  'f167466b-f01f-0054-7067-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'acf35098-91d2-45f9-9176-c74ee4e4426f',
  'Date',
  'Wed, 09 Aug 2023 02:18:59 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154754012203475/tempfile2169154754069102600', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:00 GMT',
  'ETag',
  '"0x8DB987EFE7ABE72"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f167466f-f01f-0054-7467-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '7439c3d8-fecb-40d2-a144-8b6f69cdaf73',
  'Date',
  'Wed, 09 Aug 2023 02:18:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154754012203475/tempfile2169154754069102600')
  .reply(200, "", [
  'Content-Length',
  '20',
  'Content-Type',
  'application/json',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:00 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB987EFE7ABE72"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27469-101e-002e-0267-caab16000000',
  'x-ms-client-request-id',
  '4c75ab56-ab39-4daf-9d39-f98f503feea2',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:19:00 GMT',
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
  'Wed, 09 Aug 2023 02:18:59 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154754012203475/tempfile2169154754069102600')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211408240026',
  'x-ms-request-id',
  'f167467c-f01f-0054-8067-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '74fb06a1-3fbf-4b1a-b804-a6644643189f',
  'Date',
  'Wed, 09 Aug 2023 02:19:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154754012203475')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27478-101e-002e-0f67-caab16000000',
  'x-ms-client-request-id',
  '09accd1e-bc35-4d4c-8ce3-b9f6cbed17eb',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:19:00 GMT'
]);
