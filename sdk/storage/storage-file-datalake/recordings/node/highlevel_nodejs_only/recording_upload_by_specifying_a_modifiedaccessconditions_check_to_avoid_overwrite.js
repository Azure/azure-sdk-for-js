let nock = require('nock');

module.exports.hash = "e2eb95e9cc2fc363e0296a2df98b0d69";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240208701990","file":"file158368240211601758"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240208701990')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E5D9A5B1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2c84-601e-0014-5860-f586fa000000',
  'x-ms-client-request-id',
  'd2a3ba62-e069-46c2-8f4a-15ebc60ff7c9',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240208701990/file158368240211601758')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E5DEB8D2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14400e4e-401f-0021-7e60-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '58004f0b-978c-43d1-a1c4-ffd58766884d',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158368240208701990/file158368240211601758', "aaa")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '14400e4f-401f-0021-7f60-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '18864d52-6b3f-4553-8243-3ffd3c150a87',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158368240208701990/file158368240211601758')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E5E4865B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '14400e51-401f-0021-0160-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '307cf14a-f188-483d-bb20-79c29470b7cc',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240208701990/file158368240211601758')
  .query(true)
  .reply(409, {"error":{"code":"PathAlreadyExists","message":"The specified path already exists.\nRequestId:14400e54-401f-0021-0460-f528af000000\nTime:2020-03-08T15:46:42.1944872Z"}}, [
  'Content-Length',
  '168',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'PathAlreadyExists',
  'x-ms-request-id',
  '14400e54-401f-0021-0460-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'f8617cf8-7462-4312-a4af-d6dd42180027',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem158368240208701990/file158368240211601758')
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
  '"0x8D7C377E5E4865B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2cf2-601e-0014-3b60-f586fa000000',
  'x-ms-client-request-id',
  '2457f2b6-dee5-421f-b8ff-dc5884ab0745',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Sun, 08 Mar 2020 15:46:42 GMT',
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
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158368240208701990')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2d04-601e-0014-4a60-f586fa000000',
  'x-ms-client-request-id',
  '69705ce2-eb41-4cc9-9714-32a77c39ebbd',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);
