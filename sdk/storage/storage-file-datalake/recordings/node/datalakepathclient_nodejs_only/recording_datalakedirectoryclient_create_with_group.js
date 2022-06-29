let nock = require('nock');

module.exports.hash = "89e6a326091a86e3e074c93aa7606833";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383018979506351","file":"file165383019006500479","testdir":"testdir165383019138409126"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383018979506351')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:30 GMT',
  'ETag',
  '"0x8DA417571D59D9A"',
  'x-ms-request-id',
  '84b4a76f-a01e-0003-0f5e-731608000000',
  'x-ms-client-request-id',
  'db21b422-f25b-418e-8dc1-174c8c50d0ea',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:29 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383018979506351/file165383019006500479')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:31 GMT',
  'ETag',
  '"0x8DA4175724E40EA"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '524322a4-601f-0002-265e-73e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'd57981e0-bfb9-47a8-8cb8-b3667cc61776',
  'Date',
  'Sun, 29 May 2022 13:16:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383018979506351/file165383019006500479', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '524322a5-601f-0002-275e-73e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '3f947b12-e4ea-4b73-8921-99643051445a',
  'Date',
  'Sun, 29 May 2022 13:16:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383018979506351/file165383019006500479')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:31 GMT',
  'ETag',
  '"0x8DA417572A27D8C"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '524322a6-601f-0002-285e-73e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '24d45fc1-12d5-4ffd-9432-ff5603fc5c45',
  'Date',
  'Sun, 29 May 2022 13:16:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383018979506351/testdir165383019138409126')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:31 GMT',
  'ETag',
  '"0x8DA417572C912D4"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '524322a7-601f-0002-295e-73e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '08ad93ba-9518-4d69-a69e-5065cca9e5d7',
  'Date',
  'Sun, 29 May 2022 13:16:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383018979506351/testdir165383019138409126')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:31 GMT',
  'ETag',
  '"0x8DA417572C912D4"',
  'Vary',
  'Origin',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '67089e35-dc13-458b-b06e-d873b8406284',
  'x-ms-permissions',
  'rwxr-x---',
  'x-ms-acl',
  'user::rwx,group::r-x,other::---',
  'x-ms-request-id',
  '524322a8-601f-0002-2a5e-73e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'c91bda85-9e22-4d78-8f9b-53f195fbad18',
  'Date',
  'Sun, 29 May 2022 13:16:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383018979506351')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a771-a01e-0003-105e-731608000000',
  'x-ms-client-request-id',
  'f640b31d-0ed7-47fe-93de-6f1820541c28',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:32 GMT'
]);
