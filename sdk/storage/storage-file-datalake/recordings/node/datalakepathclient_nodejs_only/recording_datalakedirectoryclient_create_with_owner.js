let nock = require('nock');

module.exports.hash = "16dd3f8ebfb21bb2953ff5be7f8c9979";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383018716807954","file":"file165383018743807346","testdir":"testdir165383018896401486"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383018716807954')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:27 GMT',
  'ETag',
  '"0x8DA41757044BCE6"',
  'x-ms-request-id',
  '84b4a769-a01e-0003-0d5e-731608000000',
  'x-ms-client-request-id',
  '9f7b2eb9-7546-4197-929e-4d0cb52c39ff',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:27 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383018716807954/file165383018743807346')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:28 GMT',
  'ETag',
  '"0x8DA417570DFDAF0"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5243229e-601f-0002-215e-73e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'e65c52c3-a0c9-482b-a107-c4e09cf193db',
  'Date',
  'Sun, 29 May 2022 13:16:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383018716807954/file165383018743807346', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5243229f-601f-0002-225e-73e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'bc52b709-339b-40c7-9f17-40f49d5ef7cb',
  'Date',
  'Sun, 29 May 2022 13:16:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383018716807954/file165383018743807346')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:29 GMT',
  'ETag',
  '"0x8DA417571316125"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '524322a0-601f-0002-235e-73e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '9570accd-d9ed-4ef9-b359-ede26324e24f',
  'Date',
  'Sun, 29 May 2022 13:16:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383018716807954/testdir165383018896401486')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:29 GMT',
  'ETag',
  '"0x8DA417571583CE6"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '524322a1-601f-0002-245e-73e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '98f75c0b-af9a-43e0-892f-28862b29f789',
  'Date',
  'Sun, 29 May 2022 13:16:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383018716807954/testdir165383018896401486')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:29 GMT',
  'ETag',
  '"0x8DA417571583CE6"',
  'Vary',
  'Origin',
  'x-ms-owner',
  '25fb43dd-e251-48a8-903b-e924f405299a',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x---',
  'x-ms-acl',
  'user::rwx,group::r-x,other::---',
  'x-ms-request-id',
  '524322a2-601f-0002-255e-73e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'f5383958-2654-4c4a-a3de-1afdcfc7f95e',
  'Date',
  'Sun, 29 May 2022 13:16:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383018716807954')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a76c-a01e-0003-0e5e-731608000000',
  'x-ms-client-request-id',
  '8fbd9564-666c-4525-b818-7e90e8bcf3c6',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:29 GMT'
]);
