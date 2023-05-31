let nock = require('nock');

module.exports.hash = "1fdf5730b73a6e843a6064714a54cb7e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem168230689328506998","file":"file168230689340009299","file1":"file1168230689404503412"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230689328506998')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:13 GMT',
  'ETag',
  '"0x8DB4473EF9864F4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232dbfe-401e-000c-6d5c-766e09000000',
  'x-ms-client-request-id',
  '0e1f4784-5ca7-43ad-a812-9afbdc4b80c3',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Mon, 24 Apr 2023 03:28:12 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230689328506998/file168230689340009299')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:13 GMT',
  'ETag',
  '"0x8DB4473EFDB44E4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'a20da043-f01f-0054-105c-76b656000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'f9f5f755-5ad8-4e75-8f75-36b1a7d384a3',
  'Date',
  'Mon, 24 Apr 2023 03:28:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230689328506998/file168230689340009299', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'a20da045-f01f-0054-115c-76b656000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '846a919d-2341-4a01-85d4-bc305eb18940',
  'Date',
  'Mon, 24 Apr 2023 03:28:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230689328506998/file168230689340009299')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:14 GMT',
  'ETag',
  '"0x8DB4473EFFD0827"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'a20da048-f01f-0054-125c-76b656000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '8dba7d5f-5da7-49e4-9469-c50223f89b1d',
  'Date',
  'Mon, 24 Apr 2023 03:28:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230689328506998/file1168230689404503412')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:14 GMT',
  'ETag',
  '"0x8DB4473F00DB9D8"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'a20da049-f01f-0054-135c-76b656000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '8d6e0d43-5b2c-400a-b8b9-3ef65bb50e83',
  'Date',
  'Mon, 24 Apr 2023 03:28:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230689328506998/file1168230689404503412', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'a20da04a-f01f-0054-145c-76b656000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'f9e529e3-08d6-4d20-9a55-85e0ca9562eb',
  'Date',
  'Mon, 24 Apr 2023 03:28:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230689328506998/file1168230689404503412')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:14 GMT',
  'ETag',
  '"0x8DB4473F02F1DC1"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'a20da04b-f01f-0054-155c-76b656000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'c96314b7-ba0b-44fb-874b-7564a3c9da61',
  'Date',
  'Mon, 24 Apr 2023 03:28:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem168230689328506998/file1168230689404503412')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:14 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB4473F02F1DC1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232dd05-401e-000c-125c-766e09000000',
  'x-ms-client-request-id',
  '159a1884-8b5d-4405-a34d-833d32f980b4',
  'x-ms-version',
  '2023-01-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 24 Apr 2023 03:28:14 GMT',
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
  'rwx-w----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Apr 2023 03:28:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem168230689328506998')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232dd29-401e-000c-205c-766e09000000',
  'x-ms-client-request-id',
  '9f753b7b-8f03-40c2-835b-254fa26f1092',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Mon, 24 Apr 2023 03:28:13 GMT'
]);
