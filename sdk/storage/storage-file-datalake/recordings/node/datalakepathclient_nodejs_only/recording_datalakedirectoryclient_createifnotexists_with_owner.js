let nock = require('nock');

module.exports.hash = "a15737d02460e473c85650228d60f448";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383019219203864","file":"file165383019248005477","testdir":"testdir165383019402707670"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383019219203864')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:32 GMT',
  'ETag',
  '"0x8DA41757343DA5A"',
  'x-ms-request-id',
  '84b4a772-a01e-0003-115e-731608000000',
  'x-ms-client-request-id',
  '3fccbc32-a6b1-4544-bfd6-ae0f90cb1ff3',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:32 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383019219203864/file165383019248005477')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:33 GMT',
  'ETag',
  '"0x8DA417573E41940"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91df6ae-a01f-0003-7a5e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '0889429e-eac1-4dd6-8984-0517da68525c',
  'Date',
  'Sun, 29 May 2022 13:16:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383019219203864/file165383019248005477', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91df6af-a01f-0003-7b5e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '24aed366-fd97-40ca-97ba-915b5018f67b',
  'Date',
  'Sun, 29 May 2022 13:16:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383019219203864/file165383019248005477')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:34 GMT',
  'ETag',
  '"0x8DA41757435D2D7"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'd91df6b0-a01f-0003-7c5e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '858c251d-4385-4557-8393-69008bf4430e',
  'Date',
  'Sun, 29 May 2022 13:16:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383019219203864/testdir165383019402707670')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:34 GMT',
  'ETag',
  '"0x8DA4175745C738E"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91df6b1-a01f-0003-7d5e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '2235c134-ee6c-4e68-b86f-26a567665985',
  'Date',
  'Sun, 29 May 2022 13:16:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383019219203864/testdir165383019402707670')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:34 GMT',
  'ETag',
  '"0x8DA4175745C738E"',
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
  'd91df6b2-a01f-0003-7e5e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'dfc14773-7f90-4ab5-a1bd-a68bd5714903',
  'Date',
  'Sun, 29 May 2022 13:16:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383019219203864')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a774-a01e-0003-125e-731608000000',
  'x-ms-client-request-id',
  '6f371ad6-ada7-4a55-9c29-c82985b79808',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:34 GMT'
]);
