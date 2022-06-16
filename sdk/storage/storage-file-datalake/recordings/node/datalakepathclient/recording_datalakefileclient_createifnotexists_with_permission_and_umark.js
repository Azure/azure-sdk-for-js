let nock = require('nock');

module.exports.hash = "4e90cf5eabb95a9f626d1c68c6877db2";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383023741607620","file":"file165383023768603941","testfile":"testfile165383023853208763"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383023741607620')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:17 GMT',
  'ETag',
  '"0x8DA41758E379D74"',
  'x-ms-request-id',
  '84b4a7b5-a01e-0003-365e-731608000000',
  'x-ms-client-request-id',
  'f624f993-a3e7-4fd0-a8b2-b8e243b354ad',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:17 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383023741607620/file165383023768603941')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:18 GMT',
  'ETag',
  '"0x8DA41758E6891B4"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db36-a01f-0005-695e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '9296d5ec-cca8-4560-91f1-f9cf69f7d1d5',
  'Date',
  'Sun, 29 May 2022 13:17:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383023741607620/file165383023768603941', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db37-a01f-0005-6a5e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'c9f4d991-f671-4d60-b9bc-3a4a35cd50aa',
  'Date',
  'Sun, 29 May 2022 13:17:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383023741607620/file165383023768603941')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:18 GMT',
  'ETag',
  '"0x8DA41758EBC352B"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '5506db38-a01f-0005-6b5e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '9076a246-a8be-4490-9e9b-0434b0997076',
  'Date',
  'Sun, 29 May 2022 13:17:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383023741607620/testfile165383023853208763')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:19 GMT',
  'ETag',
  '"0x8DA41758EE47804"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db39-a01f-0005-6c5e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '367c896b-4979-4914-a887-c647f82a2d15',
  'Date',
  'Sun, 29 May 2022 13:17:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383023741607620/testfile165383023853208763')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:19 GMT',
  'ETag',
  '"0x8DA41758EE47804"',
  'Vary',
  'Origin',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwx-w----',
  'x-ms-acl',
  'user::rwx,group::-w-,other::---',
  'x-ms-request-id',
  '5506db3a-a01f-0005-6d5e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'fe16b806-021d-47bc-8f18-468f8f65e1cc',
  'Date',
  'Sun, 29 May 2022 13:17:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383023741607620')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a7b8-a01e-0003-385e-731608000000',
  'x-ms-client-request-id',
  '3334cc60-83a6-48d4-92fa-e20794c97826',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:19 GMT'
]);
