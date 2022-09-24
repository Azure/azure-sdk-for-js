let nock = require('nock');

module.exports.hash = "51a32cba3a4c8aec850599c020cc412e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383018190902903","file":"file165383018218908570","testfile":"testfile165383018371303646"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383018190902903')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:22 GMT',
  'ETag',
  '"0x8DA41756D225F72"',
  'x-ms-request-id',
  '84b4a758-a01e-0003-7e5e-731608000000',
  'x-ms-client-request-id',
  '6de96da0-724c-4f29-85bb-09fb17e55056',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:22 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383018190902903/file165383018218908570')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:23 GMT',
  'ETag',
  '"0x8DA41756DBEC268"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '52432298-601f-0002-1c5e-73e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'ee7676c1-0dac-47d8-aab7-f6829997856a',
  'Date',
  'Sun, 29 May 2022 13:16:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383018190902903/file165383018218908570', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '52432299-601f-0002-1d5e-73e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '2e3cf05f-1004-4073-8c87-c96e9cac74ba',
  'Date',
  'Sun, 29 May 2022 13:16:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383018190902903/file165383018218908570')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:23 GMT',
  'ETag',
  '"0x8DA41756E104A2B"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '5243229a-601f-0002-1e5e-73e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '7ddaabcc-f7c4-4886-a2a8-ffa12eb03e21',
  'Date',
  'Sun, 29 May 2022 13:16:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383018190902903/testfile165383018371303646')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:24 GMT',
  'ETag',
  '"0x8DA41756E38363A"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5243229b-601f-0002-1f5e-73e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '9345ba46-3d64-48d5-85fc-b807911df175',
  'Date',
  'Sun, 29 May 2022 13:16:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383018190902903/testfile165383018371303646')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:24 GMT',
  'ETag',
  '"0x8DA41756E38363A"',
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
  '5243229c-601f-0002-205e-73e805000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'efa0507a-ff1a-4cd4-86e1-ea1ecafaba6b',
  'Date',
  'Sun, 29 May 2022 13:16:24 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383018190902903')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a75a-a01e-0003-7f5e-731608000000',
  'x-ms-client-request-id',
  '919cf11a-afae-4607-a1e2-7d1c8c2b8c43',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:23 GMT'
]);
