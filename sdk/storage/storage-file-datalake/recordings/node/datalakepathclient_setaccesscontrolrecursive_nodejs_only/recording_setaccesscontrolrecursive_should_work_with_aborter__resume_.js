let nock = require('nock');

module.exports.hash = "835a4fe414fa17af5fb3dcaf02c635cc";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159298729201709528","file":"file159298729232103417","directory":"directory159298729324206729","subdirectory1":"subdirectory1159298729324204273","fileName1":"fileName1159298729324200941","fileName2":"fileName2159298729324206383","subdirectory2":"subdirectory2159298729324200374","fileName3":"fileName3159298729324200055","fileName4":"fileName4159298729324207946"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729201709528')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:08 GMT',
  'ETag',
  '"0x8D818188674D914"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9cc3d67-501e-0079-2f01-4ab184000000',
  'x-ms-client-request-id',
  'f45544f7-406c-4df5-a25f-d2e7dc638787',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Wed, 24 Jun 2020 08:28:08 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729201709528/file159298729232103417')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:09 GMT',
  'ETag',
  '"0x8D8181886A7ED5A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85d0-901f-0014-7101-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '1bcfe0ea-a34d-4c24-9cce-ea631a315d61',
  'Date',
  'Wed, 24 Jun 2020 08:28:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298729201709528/file159298729232103417', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '9b1d85d1-901f-0014-7201-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '915616f0-31c2-4457-9db2-b92baefe4906',
  'Date',
  'Wed, 24 Jun 2020 08:28:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298729201709528/file159298729232103417')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:09 GMT',
  'ETag',
  '"0x8D8181887036932"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '9b1d85d2-901f-0014-7301-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '983f5e12-f6db-45a5-a177-c085b9b0dcf2',
  'Date',
  'Wed, 24 Jun 2020 08:28:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729201709528/directory159298729324206729')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:09 GMT',
  'ETag',
  '"0x8D8181887314D35"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85d3-901f-0014-7401-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '2c879c6f-a4f4-4c1b-8928-1053735e9398',
  'Date',
  'Wed, 24 Jun 2020 08:28:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729201709528/directory159298729324206729/subdirectory1159298729324204273')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:10 GMT',
  'ETag',
  '"0x8D81818876375ED"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85d4-901f-0014-7501-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '18bae8c0-e720-4817-9601-c2eaf0d7e925',
  'Date',
  'Wed, 24 Jun 2020 08:28:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729201709528/directory159298729324206729/subdirectory2159298729324200374')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:10 GMT',
  'ETag',
  '"0x8D81818879067F9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85d5-901f-0014-7601-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '6fc7a7bb-2854-4944-b470-00d4634a8cf3',
  'Date',
  'Wed, 24 Jun 2020 08:28:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729201709528/directory159298729324206729/subdirectory1159298729324204273/fileName1159298729324200941')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:10 GMT',
  'ETag',
  '"0x8D8181887C7EAFA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85d6-901f-0014-7701-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'ae6392a6-826b-4150-a165-621d41be0da1',
  'Date',
  'Wed, 24 Jun 2020 08:28:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729201709528/directory159298729324206729/subdirectory1159298729324204273/fileName2159298729324206383')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:11 GMT',
  'ETag',
  '"0x8D8181887F48A54"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85d8-901f-0014-7801-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '7400bed0-9686-4275-b220-ec9e23698623',
  'Date',
  'Wed, 24 Jun 2020 08:28:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729201709528/directory159298729324206729/subdirectory2159298729324200374/fileName3159298729324200055')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:11 GMT',
  'ETag',
  '"0x8D818188822D523"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85d9-901f-0014-7901-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'd14710e7-bb5e-4a41-94de-0d2c0f061102',
  'Date',
  'Wed, 24 Jun 2020 08:28:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729201709528/directory159298729324206729/subdirectory2159298729324200374/fileName4159298729324207946')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:11 GMT',
  'ETag',
  '"0x8D818188850019B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85db-901f-0014-7a01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '4bf3c4ac-efd4-44ba-bfe7-82580ed04e88',
  'Date',
  'Wed, 24 Jun 2020 08:28:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298729201709528/directory159298729324206729')
  .query(true)
  .reply(200, {"directoriesSuccessful":2,"failedEntries":[],"failureCount":0,"filesSuccessful":0}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-continuation',
  'VBbYj+zewOSY5iYYswEYrQEvYWNsdGVzdGNibjA0cHJkc3RyMDFhATAxRDVBNTg4Q0Q0MTY1MzMvZmlsZXN5c3RlbTE1OTI5ODcyOTIwMTcwOTUyOAEwMUQ2NEEwMTYzRkVCMDhCL2RpcmVjdG9yeTE1OTI5ODcyOTMyNDIwNjcyOS9zdWJkaXJlY3RvcnkxMTU5Mjk4NzI5MzI0MjA0MjczL2ZpbGVOYW1lMTE1OTI5ODcyOTMyNDIwMDk0MRYAAAA=',
  'x-ms-request-id',
  '9b1d85de-901f-0014-7d01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'de51c0f9-aaa6-4322-a30d-799c6297f332',
  'Date',
  'Wed, 24 Jun 2020 08:28:11 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298729201709528/directory159298729324206729')
  .query(true)
  .reply(200, {"directoriesSuccessful":1,"failedEntries":[],"failureCount":0,"filesSuccessful":4}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '9b1d85df-901f-0014-7e01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '5277dc46-8a6f-4346-9cf1-ec38c1ae8cb3',
  'Date',
  'Wed, 24 Jun 2020 08:28:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159298729201709528')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9cc4013-501e-0079-4f01-4ab184000000',
  'x-ms-client-request-id',
  '8aa5f900-0a09-491e-b537-f448dfbf093b',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Wed, 24 Jun 2020 08:28:12 GMT'
]);
