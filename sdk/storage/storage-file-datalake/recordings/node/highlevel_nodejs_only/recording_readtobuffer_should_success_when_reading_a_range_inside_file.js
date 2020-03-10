let nock = require('nock');

module.exports.hash = "0697e332fa9a18057fbe5715cdae2b0c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240398705433","file":"file158368240401204471"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240398705433')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'ETag',
  '"0x8D7C377E6FAE39D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f3121-601e-0014-0a60-f586fa000000',
  'x-ms-client-request-id',
  'cd5b3b1a-8791-45d4-8c73-58a734f87e34',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:43 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240398705433/file158368240401204471')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:44 GMT',
  'ETag',
  '"0x8D7C377E700A04D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14400e91-401f-0021-4160-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'e6a79a4a-5e22-4c05-9c82-ff8ba0d46bfc',
  'Date',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158368240398705433/file158368240401204471', "aaaabbbb")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '14400e92-401f-0021-4260-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '5c2f9178-2bad-4d74-9135-2d21f743a489',
  'Date',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158368240398705433/file158368240401204471')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:44 GMT',
  'ETag',
  '"0x8D7C377E70A4F12"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '14400e93-401f-0021-4360-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '0c2ec74a-62c1-4ee6-ab5b-d1c623b48430',
  'Date',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem158368240398705433/file158368240401204471')
  .reply(206, "bbbb", [
  'Content-Length',
  '4',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 4-7/8',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:44 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7C377E70A4F12"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f3170-601e-0014-5360-f586fa000000',
  'x-ms-client-request-id',
  '66ec8a29-92d8-48d1-8100-e06a8373ab29',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Sun, 08 Mar 2020 15:46:44 GMT',
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
  .get('/filesystem158368240398705433/file158368240401204471')
  .reply(206, "abbb", [
  'Content-Length',
  '4',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 3-6/8',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:44 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7C377E70A4F12"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f3187-601e-0014-6960-f586fa000000',
  'x-ms-client-request-id',
  '55bedec0-77e9-42c3-8951-b2369e25b448',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Sun, 08 Mar 2020 15:46:44 GMT',
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
  .get('/filesystem158368240398705433/file158368240401204471')
  .reply(206, "aabb", [
  'Content-Length',
  '4',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 2-5/8',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:44 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7C377E70A4F12"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f319a-601e-0014-7960-f586fa000000',
  'x-ms-client-request-id',
  '36bc9209-638e-4f1e-b7cb-f262917db891',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Sun, 08 Mar 2020 15:46:44 GMT',
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
  .get('/filesystem158368240398705433/file158368240401204471')
  .reply(206, "aaab", [
  'Content-Length',
  '4',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 1-4/8',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:44 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7C377E70A4F12"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f31ac-601e-0014-0960-f586fa000000',
  'x-ms-client-request-id',
  '84bc9188-2416-4836-a21f-49440bd31c1a',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Sun, 08 Mar 2020 15:46:44 GMT',
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
  .get('/filesystem158368240398705433/file158368240401204471')
  .reply(206, "aaaa", [
  'Content-Length',
  '4',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-3/8',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:44 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7C377E70A4F12"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f31b9-601e-0014-1460-f586fa000000',
  'x-ms-client-request-id',
  'd03889ec-7d86-426f-ae6b-90721f739a27',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Sun, 08 Mar 2020 15:46:44 GMT',
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
  .delete('/filesystem158368240398705433')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f31fa-601e-0014-4f60-f586fa000000',
  'x-ms-client-request-id',
  '977fcd43-97f5-41f5-8d64-20003826e44c',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:44 GMT'
]);
