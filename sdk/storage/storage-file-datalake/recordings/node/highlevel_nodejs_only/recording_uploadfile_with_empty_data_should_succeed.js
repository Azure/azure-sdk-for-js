let nock = require('nock');

module.exports.hash = "7be6b542a0229269b434e168ff87a70a";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240358906853","file":"file158368240361604412"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240358906853')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'ETag',
  '"0x8D7C377E6BE6A00"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f3045-601e-0014-4360-f586fa000000',
  'x-ms-client-request-id',
  '3992611e-18ca-4613-bb74-5aaa48fcbd89',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:43 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240358906853/file158368240361604412')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'ETag',
  '"0x8D7C377E6C36ED0"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14400e90-401f-0021-4060-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '27e88aeb-f2b3-4b4b-8752-ef668800ca37',
  'Date',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem158368240358906853/file158368240361604412')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7C377E6C36ED0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f3060-601e-0014-5c60-f586fa000000',
  'x-ms-client-request-id',
  'b84253ee-6d83-4803-9851-5f5cb003e4a9',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 08 Mar 2020 15:46:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158368240358906853')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f306b-601e-0014-6560-f586fa000000',
  'x-ms-client-request-id',
  'c4134774-a31d-4f89-a405-26589d70885b',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:43 GMT'
]);
