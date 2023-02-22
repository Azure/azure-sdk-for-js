let nock = require('nock');

module.exports.hash = "021f58de981f678f192771b2377e35cd";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem167703368812803361","file":"file167703368825709846","dirname":"dirname167703368862606357","subdirname":"subdirname167703368873905424","subdirname1":"subdirname1167703368897506089"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703368812803361')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:28 GMT',
  'ETag',
  '"0x8DB147E4C69C7C5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '21a65107-f01e-0019-6667-4679ba000000',
  'x-ms-client-request-id',
  'c19d2908-a2fc-4fdc-893b-6e568bc49373',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 02:41:27 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703368812803361/file167703368825709846')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:28 GMT',
  'ETag',
  '"0x8DB147E4C7ED568"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '53f96708-501f-004d-5d67-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'c5629623-8053-485e-9c40-e95f3d50b847',
  'Date',
  'Wed, 22 Feb 2023 02:41:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167703368812803361/file167703368825709846', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '53f96709-501f-004d-5e67-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '173700a1-e66f-42b5-9b07-4573504e9629',
  'Date',
  'Wed, 22 Feb 2023 02:41:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167703368812803361/file167703368825709846')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:28 GMT',
  'ETag',
  '"0x8DB147E4CA49233"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '53f9670a-501f-004d-5f67-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'edfac1de-7bd6-4cec-80e6-18152787602d',
  'Date',
  'Wed, 22 Feb 2023 02:41:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703368812803361/dirname167703368862606357')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:28 GMT',
  'ETag',
  '"0x8DB147E4CB60226"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '53f9670b-501f-004d-6067-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '92d9426a-08b9-42d3-9285-0fe3871ee835',
  'Date',
  'Wed, 22 Feb 2023 02:41:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703368812803361/dirname167703368862606357/.%2Fadir%2F..%2Fanotherdir%2F..%2F.%2Fsubdirname167703368873905424')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:28 GMT',
  'ETag',
  '"0x8DB147E4CC7FF5B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '53f9670c-501f-004d-6167-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '060a2321-f5e7-42d6-981e-0e2867ca2763',
  'Date',
  'Wed, 22 Feb 2023 02:41:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem167703368812803361')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133215072889667419","etag":"0x8DB147E4CC7FF5B","expiryTime":"0","group":"$superuser","isDirectory":"true","lastModified":"Wed, 22 Feb 2023 02:41:28 GMT","name":"dirname167703368862606357/subdirname167703368873905424","owner":"$superuser","permissions":"rwxr-x---"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53f9670d-501f-004d-6267-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'f9d15c88-8d52-40af-b3ff-1d3d2e19438b',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 22 Feb 2023 02:41:28 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703368812803361/dirname167703368862606357/.%2Fadir%2F..%2F..%2Fanotherdir%2F..%2F.%2Fsubdirname1167703368897506089')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:29 GMT',
  'ETag',
  '"0x8DB147E4CEB11F8"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '53f9670e-501f-004d-6367-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'aa44dfbd-02d5-4c5f-afa5-53004515aee3',
  'Date',
  'Wed, 22 Feb 2023 02:41:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem167703368812803361')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133215072888488486","etag":"0x8DB147E4CB60226","expiryTime":"0","group":"$superuser","isDirectory":"true","lastModified":"Wed, 22 Feb 2023 02:41:28 GMT","name":"dirname167703368862606357","owner":"$superuser","permissions":"rwxr-x---"},{"contentLength":"11","creationTime":"133215072884872552","etag":"0x8DB147E4CA49233","expiryTime":"0","group":"$superuser","lastModified":"Wed, 22 Feb 2023 02:41:28 GMT","name":"file167703368825709846","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133215072891965944","etag":"0x8DB147E4CEB11F8","expiryTime":"0","group":"$superuser","isDirectory":"true","lastModified":"Wed, 22 Feb 2023 02:41:29 GMT","name":"subdirname1167703368897506089","owner":"$superuser","permissions":"rwxr-x---"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53f9670f-501f-004d-6467-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '1a77edc8-8f86-4eee-97dc-bc0e9acd9add',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 22 Feb 2023 02:41:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167703368812803361')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '21a65215-f01e-0019-5767-4679ba000000',
  'x-ms-client-request-id',
  'fe7ba830-910f-4124-9c32-df5c7767c60a',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 02:41:28 GMT'
]);
