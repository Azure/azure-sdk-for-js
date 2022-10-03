let nock = require('nock');

module.exports.hash = "3b0205e050835fe5b62911aaa79b2577";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165391576660206759","file":"file165391576688002472","testfile":"testfile165391576843703220"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165391576660206759')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 30 May 2022 13:02:47 GMT',
  'ETag',
  '"0x8DA423CB19D33A2"',
  'x-ms-request-id',
  '38730bad-201e-0006-4725-7403a9000000',
  'x-ms-client-request-id',
  '0bb9b4be-f473-4a27-9e7e-65c694959f88',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 30 May 2022 13:02:46 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165391576660206759/file165391576688002472')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 30 May 2022 13:02:48 GMT',
  'ETag',
  '"0x8DA423CB23ACAA2"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91e66f9-a01f-0003-6c25-741608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '2ce57baf-6387-4865-beda-aae812e90562',
  'Date',
  'Mon, 30 May 2022 13:02:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165391576660206759/file165391576688002472', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91e66fa-a01f-0003-6d25-741608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '7535eabf-d9c5-4488-b138-1fd6b8cd9e10',
  'Date',
  'Mon, 30 May 2022 13:02:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165391576660206759/file165391576688002472')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 30 May 2022 13:02:48 GMT',
  'ETag',
  '"0x8DA423CB28F4719"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'd91e66fb-a01f-0003-6e25-741608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'bab9d77c-0437-4e17-b280-b24b553e61af',
  'Date',
  'Mon, 30 May 2022 13:02:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165391576660206759/testfile165391576843703220')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 30 May 2022 13:02:49 GMT',
  'ETag',
  '"0x8DA423CB2B6D9F7"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91e66fc-a01f-0003-6f25-741608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'dc26a8be-c7ab-43a5-a4f2-08bc703128d2',
  'Date',
  'Mon, 30 May 2022 13:02:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165391576660206759/testfile165391576843703220')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 30 May 2022 13:02:49 GMT',
  'ETag',
  '"0x8DA423CB2B6D9F7"',
  'Vary',
  'Origin',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x-w-',
  'x-ms-acl',
  'user::rwx,group::r-x,other::-w-',
  'x-ms-request-id',
  'd91e66fd-a01f-0003-7025-741608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'ad2243d7-e167-4a10-bc14-ea99186d7e4c',
  'Date',
  'Mon, 30 May 2022 13:02:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165391576660206759')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '38730baf-201e-0006-4825-7403a9000000',
  'x-ms-client-request-id',
  '500514f1-6ef3-462a-9f89-876a0b3c2afc',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 30 May 2022 13:02:49 GMT'
]);
