let nock = require('nock');

module.exports.hash = "4c04065618f5452e1e47cd971b646b06";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383020154901295","file":"file165383020182009553","testfile":"testfile165383020265403938"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383020154901295')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:42 GMT',
  'ETag',
  '"0x8DA417578D76AB6"',
  'x-ms-request-id',
  '84b4a786-a01e-0003-1a5e-731608000000',
  'x-ms-client-request-id',
  '31c688fc-461b-446f-a8c9-55efcf58de77',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:41 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383020154901295/file165383020182009553')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:42 GMT',
  'ETag',
  '"0x8DA4175790736FC"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '15533bd0-e01f-0007-045e-73fda4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '6d2031fc-5f97-4d2f-a238-de0e72c6082f',
  'Date',
  'Sun, 29 May 2022 13:16:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383020154901295/file165383020182009553', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '15533bd1-e01f-0007-055e-73fda4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '3b5662da-f1ea-4a7a-9bcc-3408fd3c317c',
  'Date',
  'Sun, 29 May 2022 13:16:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383020154901295/file165383020182009553')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:42 GMT',
  'ETag',
  '"0x8DA4175795A45AD"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '15533bd2-e01f-0007-065e-73fda4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '49a5a440-1e2b-401c-a70b-7893943f0c8d',
  'Date',
  'Sun, 29 May 2022 13:16:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383020154901295/testfile165383020265403938')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:43 GMT',
  'ETag',
  '"0x8DA417579826835"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '15533bd3-e01f-0007-075e-73fda4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '48be1e82-d137-41c3-aa03-304e30ab06f8',
  'Date',
  'Sun, 29 May 2022 13:16:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383020154901295/testfile165383020265403938')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:43 GMT',
  'ETag',
  '"0x8DA417579826835"',
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
  '15533bd4-e01f-0007-085e-73fda4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'f7559344-6e77-416b-acd1-286300775e3a',
  'Date',
  'Sun, 29 May 2022 13:16:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383020154901295')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a788-a01e-0003-1b5e-731608000000',
  'x-ms-client-request-id',
  '8c4a2b8c-3c12-4a33-9b73-38b46c66b477',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:43 GMT'
]);
