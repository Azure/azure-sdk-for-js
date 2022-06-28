let nock = require('nock');

module.exports.hash = "7df2cd653650c9e81a6d4e8b4b759c51";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383017492307162","file":"file165383017645201297","testfile":"testfile165383017839109650"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383017492307162')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:16 GMT',
  'ETag',
  '"0x8DA417569A3883F"',
  'x-ms-request-id',
  '84b4a74c-a01e-0003-795e-731608000000',
  'x-ms-client-request-id',
  '6778a750-4269-4b2e-9a48-8f4b429174d5',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:15 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383017492307162/file165383017645201297')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:18 GMT',
  'ETag',
  '"0x8DA41756A8F1214"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '3f217539-601f-0004-465e-730ec4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '0f0d2580-7926-44e7-8e8c-f8192af8ad5d',
  'Date',
  'Sun, 29 May 2022 13:16:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383017492307162/file165383017645201297', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '3f21753a-601f-0004-475e-730ec4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '91691713-2d96-4914-98d9-e80521b9adf6',
  'Date',
  'Sun, 29 May 2022 13:16:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383017492307162/file165383017645201297')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:18 GMT',
  'ETag',
  '"0x8DA41756AE39DD8"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '3f21753b-601f-0004-485e-730ec4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '2f5deeca-6f47-4825-ac3a-7f176be84d49',
  'Date',
  'Sun, 29 May 2022 13:16:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383017492307162/testfile165383017839109650')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:18 GMT',
  'ETag',
  '"0x8DA41756B0BD550"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '3f21753c-601f-0004-495e-730ec4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '7e0794d2-b6b1-488e-ba75-03aae062a7e5',
  'Date',
  'Sun, 29 May 2022 13:16:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383017492307162/testfile165383017839109650')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:18 GMT',
  'ETag',
  '"0x8DA41756B0BD550"',
  'Vary',
  'Origin',
  'x-ms-owner',
  '25fb43dd-e251-48a8-903b-e924f405299a',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'x-ms-acl',
  'user::rw-,group::r--,other::---',
  'x-ms-request-id',
  '3f21753d-601f-0004-4a5e-730ec4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'f985d2cc-04c0-45e6-b7a4-6c036860c6b1',
  'Date',
  'Sun, 29 May 2022 13:16:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383017492307162')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a751-a01e-0003-7b5e-731608000000',
  'x-ms-client-request-id',
  'c97fec44-d1e7-4a15-b28d-b1cefde1b2d0',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:19 GMT'
]);
