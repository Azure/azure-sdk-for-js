let nock = require('nock');

module.exports.hash = "079e3a5273b4a9e3b9eb92ac43b394ae";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383029357401715","file":"file165383029385606279","testdir":"testdir165383029466103314"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383029357401715')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:18:14 GMT',
  'ETag',
  '"0x8DA4175AFB00BC5"',
  'x-ms-request-id',
  '84b4a822-a01e-0003-7b5e-731608000000',
  'x-ms-client-request-id',
  'e66d9f52-dbdb-4ba0-bb02-6496d02ca9d0',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:18:13 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383029357401715/file165383029385606279')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:14 GMT',
  'ETag',
  '"0x8DA4175AFDFF0B7"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91df6da-a01f-0003-0a5e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'f2f55f0d-d6a9-48ab-91e8-36bf75f4d528',
  'Date',
  'Sun, 29 May 2022 13:18:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383029357401715/file165383029385606279', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91df6db-a01f-0003-0b5e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'c019fd1b-c5a5-4f2d-90fb-1c8ba9582b29',
  'Date',
  'Sun, 29 May 2022 13:18:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383029357401715/file165383029385606279')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:14 GMT',
  'ETag',
  '"0x8DA4175B030C027"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'd91df6dc-a01f-0003-0c5e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'e84b21fb-de04-4047-b09d-3f8ee7964b40',
  'Date',
  'Sun, 29 May 2022 13:18:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383029357401715/testdir165383029466103314')
  .query(true)
  .reply(400, {"error":{"code":"ExpiryNotSupportedForDirectory","message":"Set Expiry is not supported for a directory\nRequestId:d91df6dd-a01f-0003-0d5e-731608000000\nTime:2022-05-29T13:18:15.1726510Z"}}, [
  'Content-Length',
  '190',
  'Content-Type',
  'application/json;charset=utf-8',
  'x-ms-error-code',
  'ExpiryNotSupportedForDirectory',
  'x-ms-request-id',
  'd91df6dd-a01f-0003-0d5e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '1bf99bc9-0fdf-4362-9b4a-2b45c0c452e2',
  'Date',
  'Sun, 29 May 2022 13:18:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383029357401715')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a825-a01e-0003-7c5e-731608000000',
  'x-ms-client-request-id',
  'aa43b4a3-e4e9-4aea-91ad-5f681beea710',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:18:14 GMT'
]);
