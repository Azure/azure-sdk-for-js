let nock = require('nock');

module.exports.hash = "4e55abf40d1a8d150c6cc2eb0a9bd724";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165391576219806113","file":"file165391576374801154","testfile":"testfile165391576569606934"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165391576219806113')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 30 May 2022 13:02:43 GMT',
  'ETag',
  '"0x8DA423CAFAA0CC1"',
  'x-ms-request-id',
  '38730ba8-201e-0006-4525-7403a9000000',
  'x-ms-client-request-id',
  '716ba000-1bd6-4183-8492-7e66c1f1ec92',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 30 May 2022 13:02:44 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165391576219806113/file165391576374801154')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 30 May 2022 13:02:45 GMT',
  'ETag',
  '"0x8DA423CB0976D7A"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'ab6f6617-701f-0008-6f25-74c247000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '5244dc5a-8d3c-4a2a-929c-c17dfcfa71b7',
  'Date',
  'Mon, 30 May 2022 13:02:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165391576219806113/file165391576374801154', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'ab6f6618-701f-0008-7025-74c247000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '79fd00d7-ba03-4fb2-b11f-2345e7abba50',
  'Date',
  'Mon, 30 May 2022 13:02:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165391576219806113/file165391576374801154')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 30 May 2022 13:02:46 GMT',
  'ETag',
  '"0x8DA423CB0EC7C04"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'ab6f6619-701f-0008-7125-74c247000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'f243debe-857b-4ce5-9147-4378c4242f10',
  'Date',
  'Mon, 30 May 2022 13:02:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165391576219806113/testfile165391576569606934')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 30 May 2022 13:02:46 GMT',
  'ETag',
  '"0x8DA423CB115EEEE"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'ab6f661a-701f-0008-7225-74c247000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '7aad3955-83f7-4577-832e-6ae17895d47a',
  'Date',
  'Mon, 30 May 2022 13:02:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165391576219806113/testfile165391576569606934')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 30 May 2022 13:02:46 GMT',
  'ETag',
  '"0x8DA423CB115EEEE"',
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
  'ab6f661b-701f-0008-7325-74c247000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'a850b702-3507-42aa-9c73-a4d2248a0d2e',
  'Date',
  'Mon, 30 May 2022 13:02:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165391576219806113')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '38730bac-201e-0006-4625-7403a9000000',
  'x-ms-client-request-id',
  'e412ceba-555f-4a0b-af38-e5e6ce1d6b05',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 30 May 2022 13:02:46 GMT'
]);
