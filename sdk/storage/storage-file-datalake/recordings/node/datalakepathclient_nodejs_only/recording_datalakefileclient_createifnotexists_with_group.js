let nock = require('nock');

module.exports.hash = "19f8fa5e2e9c4de926a645e7744d6a0d";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383018454601019","file":"file165383018481603425","testfile":"testfile165383018636709482"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383018454601019')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:25 GMT',
  'ETag',
  '"0x8DA41756EB4C6C7"',
  'x-ms-request-id',
  '84b4a763-a01e-0003-085e-731608000000',
  'x-ms-client-request-id',
  'd29e7f89-3701-43d6-be3c-8fe7ffa23db1',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:24 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383018454601019/file165383018481603425')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:26 GMT',
  'ETag',
  '"0x8DA41756F4F2736"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91df6a6-a01f-0003-755e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '90e0e76f-befe-4c9f-b395-aab9792d02b8',
  'Date',
  'Sun, 29 May 2022 13:16:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383018454601019/file165383018481603425', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91df6a7-a01f-0003-765e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '1418fb44-d9be-4faa-a9b8-e541ed19baf7',
  'Date',
  'Sun, 29 May 2022 13:16:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383018454601019/file165383018481603425')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:26 GMT',
  'ETag',
  '"0x8DA41756FA54331"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'd91df6a8-a01f-0003-775e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '7634e90a-e545-4206-8361-7d2c3c579845',
  'Date',
  'Sun, 29 May 2022 13:16:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383018454601019/testfile165383018636709482')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:26 GMT',
  'ETag',
  '"0x8DA41756FCC4B98"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91df6a9-a01f-0003-785e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'a40957f4-3e38-4615-88e6-c0ce4630436d',
  'Date',
  'Sun, 29 May 2022 13:16:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383018454601019/testfile165383018636709482')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:26 GMT',
  'ETag',
  '"0x8DA41756FCC4B98"',
  'Vary',
  'Origin',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '67089e35-dc13-458b-b06e-d873b8406284',
  'x-ms-permissions',
  'rw-r-----',
  'x-ms-acl',
  'user::rw-,group::r--,other::---',
  'x-ms-request-id',
  'd91df6aa-a01f-0003-795e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '26f95eb1-cbcc-4698-be4a-759eea1468af',
  'Date',
  'Sun, 29 May 2022 13:16:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383018454601019')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a768-a01e-0003-0c5e-731608000000',
  'x-ms-client-request-id',
  'ac3d0df8-f4c5-4187-a0b3-e03dae007dc1',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:27 GMT'
]);
