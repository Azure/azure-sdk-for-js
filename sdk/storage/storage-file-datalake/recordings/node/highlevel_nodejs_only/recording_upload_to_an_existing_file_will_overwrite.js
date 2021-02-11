let nock = require('nock');

module.exports.hash = "8b6561dd7ae168e8bcb8471dae497748";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240185609916","file":"file158368240188305972"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240185609916')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'ETag',
  '"0x8D7C377E5B5E977"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2beb-601e-0014-4e60-f586fa000000',
  'x-ms-client-request-id',
  '6618712d-1498-4328-9423-35e07bbd3c7f',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240185609916/file158368240188305972')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'ETag',
  '"0x8D7C377E5BE3DB2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14400e46-401f-0021-7660-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '821578e0-7049-433b-9a8f-082ade248af2',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158368240185609916/file158368240188305972', "aaa")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '14400e49-401f-0021-7960-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '3afac6ee-12ca-46de-8e72-6d613d2b9e54',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158368240185609916/file158368240188305972')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'ETag',
  '"0x8D7C377E5C4FEDB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '14400e4a-401f-0021-7a60-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '961509ee-b060-453b-8442-3fc0dc3cbd86',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240185609916/file158368240188305972')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'ETag',
  '"0x8D7C377E5C898B2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14400e4b-401f-0021-7b60-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '743709a6-ec1a-4e0b-a6ac-1eb8eb17bda9',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158368240185609916/file158368240188305972', "bb")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '14400e4c-401f-0021-7c60-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '0c97c2c2-e558-478c-9c39-3488cc45c80d',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158368240185609916/file158368240188305972')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E5D091B7"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '14400e4d-401f-0021-7d60-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'aa7d2a82-179a-4dcf-aa1f-e6834a3596e9',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem158368240185609916/file158368240188305972')
  .reply(200, "bb", [
  'Content-Length',
  '2',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7C377E5D091B7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2c53-601e-0014-2960-f586fa000000',
  'x-ms-client-request-id',
  'e0b0f661-4071-49f4-b373-c9f219e72d2f',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Sun, 08 Mar 2020 15:46:41 GMT',
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
  'Sun, 08 Mar 2020 15:46:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158368240185609916')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2c67-601e-0014-3d60-f586fa000000',
  'x-ms-client-request-id',
  '40d22638-3737-4996-982b-1fbd9e36f078',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT'
]);
