let nock = require('nock');

module.exports.hash = "f184cfd939fc99b5f08ca3f173cd185b";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240269408743","file":"file158368240272007638"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240269408743')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E635E315"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2df2-601e-0014-2460-f586fa000000',
  'x-ms-client-request-id',
  '8923961f-7c36-4114-9763-2784c3df3a9f',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240269408743/file158368240272007638')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E63AEF13"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14400e7a-401f-0021-2a60-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'bce1bbd1-1898-46c7-8b99-91804ea71b96',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158368240269408743/file158368240272007638', "aaa")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '14400e7d-401f-0021-2d60-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '8e2cc7aa-fa9f-47a1-a82d-08cee6baf044',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158368240269408743/file158368240272007638')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E642B920"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '14400e81-401f-0021-3160-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'b5d9b118-dfcc-4cab-84c8-746a9e536787',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240269408743/file158368240272007638')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E642B920"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2e20-601e-0014-4f60-f586fa000000',
  'x-ms-client-request-id',
  'd0f6c4db-7daa-428d-874a-8fd37fcdb850',
  'x-ms-version',
  '2019-07-07',
  'x-ms-lease-id',
  '63940104-020f-40d9-8052-760fcc404bf4',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240269408743/file158368240272007638')
  .query(true)
  .reply(409, {"error":{"code":"PathAlreadyExists","message":"The specified path already exists.\nRequestId:14400e85-401f-0021-3560-f528af000000\nTime:2020-03-08T15:46:42.8270119Z"}}, [
  'Content-Length',
  '168',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'PathAlreadyExists',
  'x-ms-request-id',
  '14400e85-401f-0021-3560-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '78a0bfa9-3610-4db1-ba40-d1dd11dc74ce',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158368240269408743')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2e35-601e-0014-6460-f586fa000000',
  'x-ms-client-request-id',
  '8d7a6125-a519-471b-82ac-3ac2e2dceba3',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);
