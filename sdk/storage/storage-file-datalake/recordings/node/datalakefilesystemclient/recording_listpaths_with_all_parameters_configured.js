let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534364570407908","file0":"file0157534364684708840","file1":"file1157534364797701351"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534364570407908')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:21:28 GMT',
  'ETag',
  '"0x8D7779FE2BAB2C5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b4101990-401e-0065-6188-a9f4c3000000',
  'x-ms-client-request-id',
  'afbed1e5-f4b6-46b8-9f55-0f832a9985cc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:28 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534364570407908/file0157534364684708840')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:29 GMT',
  'ETag',
  '"0x8D7779FE3695473"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ffd1b421-201f-0031-7188-a91e49000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '011834d0-1d26-45a1-9396-bfd6c41e9994',
  'Date',
  'Tue, 03 Dec 2019 03:21:29 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534364570407908/file1157534364797701351')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:30 GMT',
  'ETag',
  '"0x8D7779FE4194113"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53f02631-701f-0044-6d88-a999f2000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '4ebac08b-5ab9-4a81-9245-7ffb69720589',
  'Date',
  'Tue, 03 Dec 2019 03:21:30 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534364570407908')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D7779FE3695473","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:29 GMT","name":"file0157534364684708840","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-continuation',
  'MjY2OTkwODM3NDk2MDA1OTc1NCAwIC9qc3YxMgEwMUQ1NThCM0RGNDMyREI5L2ZpbGVzeXN0ZW0xNTc1MzQzNjQ1NzA0MDc5MDgBMDFENUE5ODhDMDQ0MDUyQS9maWxlMTE1NzUzNDM2NDc5NzcwMTM1MQ==',
  'x-ms-request-id',
  '4b5ff060-101f-001b-7c88-a96b0c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'd3ec6a5f-19a1-4675-b1f4-3790b5cca985',
  'Date',
  'Tue, 03 Dec 2019 03:21:31 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534364570407908')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D7779FE4194113","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:30 GMT","name":"file1157534364797701351","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4b5ff062-101f-001b-7e88-a96b0c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'b52ec4b9-cbca-4042-a4fc-4d20640fb7ee',
  'Date',
  'Tue, 03 Dec 2019 03:21:31 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534364570407908/file0157534364684708840')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ffd1b423-201f-0031-7288-a91e49000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '86d593bb-7fc7-4b9e-9fe6-e32edb725378',
  'Date',
  'Tue, 03 Dec 2019 03:21:32 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534364570407908/file1157534364797701351')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53f02635-701f-0044-6f88-a999f2000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'e793ef1e-d204-42fe-a6a3-af2792440135',
  'Date',
  'Tue, 03 Dec 2019 03:21:32 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534364570407908')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b410242a-401e-0065-1188-a9f4c3000000',
  'x-ms-client-request-id',
  '60cd7104-a63a-48ac-82d4-a86b37fd39fc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:32 GMT' ]);
