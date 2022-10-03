let nock = require('nock');

module.exports.hash = "8bcb0a06bcc62a04b909ff45cb8d06f1";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383017926803611","file":"file165383017954205180","testfile":"testfile165383018107702716"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383017926803611')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:19 GMT',
  'ETag',
  '"0x8DA41756B8F5BD3"',
  'x-ms-request-id',
  '84b4a752-a01e-0003-7c5e-731608000000',
  'x-ms-client-request-id',
  'feca7a18-5351-4d00-95d4-43905ff37982',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:19 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383017926803611/file165383017954205180')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:20 GMT',
  'ETag',
  '"0x8DA41756C2A6C00"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96ab-201f-0000-425e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'fda8968c-1ce8-4965-b243-75bbb3d9e806',
  'Date',
  'Sun, 29 May 2022 13:16:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383017926803611/file165383017954205180', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96ac-201f-0000-435e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '40005921-5474-46be-9ada-0a498b6228a5',
  'Date',
  'Sun, 29 May 2022 13:16:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383017926803611/file165383017954205180')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:21 GMT',
  'ETag',
  '"0x8DA41756C7DD18D"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '478a96ad-201f-0000-445e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '300d384b-b1b7-4bc2-841c-118e7406d3e5',
  'Date',
  'Sun, 29 May 2022 13:16:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383017926803611/testfile165383018107702716')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:21 GMT',
  'ETag',
  '"0x8DA41756CA55F8B"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96ae-201f-0000-455e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '73358bd7-d41e-4f63-80f8-e75d96b13e9a',
  'Date',
  'Sun, 29 May 2022 13:16:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383017926803611/testfile165383018107702716')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:21 GMT',
  'ETag',
  '"0x8DA41756CA55F8B"',
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
  '478a96af-201f-0000-465e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '1c2a6033-5ce8-4501-81e7-71da030a67c2',
  'Date',
  'Sun, 29 May 2022 13:16:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383017926803611')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a757-a01e-0003-7d5e-731608000000',
  'x-ms-client-request-id',
  '3e3a0089-346b-4314-8efb-56fcae1e92d5',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:21 GMT'
]);
