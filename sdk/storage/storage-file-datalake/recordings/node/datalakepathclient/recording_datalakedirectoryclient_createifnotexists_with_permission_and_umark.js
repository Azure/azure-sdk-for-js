let nock = require('nock');

module.exports.hash = "edf0dd626400efe4f909993b5653024d";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383028716302460","file":"file165383028743108349","testdir":"testdir165383028827407813"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028716302460')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:18:07 GMT',
  'ETag',
  '"0x8DA4175ABDE3158"',
  'x-ms-request-id',
  '84b4a812-a01e-0003-705e-731608000000',
  'x-ms-client-request-id',
  'a77ecae7-e05b-45e1-830d-a70295b45a3d',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:18:07 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028716302460/file165383028743108349')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:08 GMT',
  'ETag',
  '"0x8DA4175AC11B41D"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96e8-201f-0000-625e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'fc7c5f72-8bab-40bc-9fbe-79bada6c6865',
  'Date',
  'Sun, 29 May 2022 13:18:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383028716302460/file165383028743108349', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96e9-201f-0000-635e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'de8b398a-4305-41e2-a3f4-e6251c4d0d55',
  'Date',
  'Sun, 29 May 2022 13:18:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383028716302460/file165383028743108349')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:08 GMT',
  'ETag',
  '"0x8DA4175AC621CD7"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '478a96eb-201f-0000-645e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'd8cf3f51-dbaa-40ec-80cf-9f9aeb0e4f7a',
  'Date',
  'Sun, 29 May 2022 13:18:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028716302460/testdir165383028827407813')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:08 GMT',
  'ETag',
  '"0x8DA4175AC88DE52"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96ec-201f-0000-655e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'dd60a31f-4c99-4afe-b2d1-81ea2f9b0b15',
  'Date',
  'Sun, 29 May 2022 13:18:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383028716302460/testdir165383028827407813')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:08 GMT',
  'ETag',
  '"0x8DA4175AC88DE52"',
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
  '478a96ed-201f-0000-665e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'b42b8407-c74f-4967-9712-87b7e424fc0c',
  'Date',
  'Sun, 29 May 2022 13:18:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383028716302460')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a815-a01e-0003-725e-731608000000',
  'x-ms-client-request-id',
  '4f1eec5c-b260-4f2e-afa2-ae7a5da3bebb',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:18:09 GMT'
]);
