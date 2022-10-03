let nock = require('nock');

module.exports.hash = "4a8b91c46fb640a6248049eac6509d2b";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165391577191102205","file":"file165391577218102603","testdir":"testdir165391577372104480"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165391577191102205')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 30 May 2022 13:02:52 GMT',
  'ETag',
  '"0x8DA423CB4C6BD3F"',
  'x-ms-request-id',
  '38730bb3-201e-0006-4b25-7403a9000000',
  'x-ms-client-request-id',
  '70b3127f-8724-49b7-bdd9-dd142155fc20',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 30 May 2022 13:02:52 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165391577191102205/file165391577218102603')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 30 May 2022 13:02:53 GMT',
  'ETag',
  '"0x8DA423CB5643A33"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a13738-201f-0006-0425-7403a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '6aaea34e-7237-4dd6-831b-d79e467156ff',
  'Date',
  'Mon, 30 May 2022 13:02:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165391577191102205/file165391577218102603', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a13739-201f-0006-0525-7403a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '7de04c4d-07fa-47ee-b6ca-cdf14fcb74a5',
  'Date',
  'Mon, 30 May 2022 13:02:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165391577191102205/file165391577218102603')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 30 May 2022 13:02:54 GMT',
  'ETag',
  '"0x8DA423CB5B4BCE2"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '34a1373a-201f-0006-0625-7403a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '14e479fd-1cb1-462c-8870-dd74c6389172',
  'Date',
  'Mon, 30 May 2022 13:02:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165391577191102205/testdir165391577372104480')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 30 May 2022 13:02:54 GMT',
  'ETag',
  '"0x8DA423CB5DB691D"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a1373b-201f-0006-0725-7403a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'c388bfaf-4993-457c-92d1-b8a7ac6af4d3',
  'Date',
  'Mon, 30 May 2022 13:02:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165391577191102205/testdir165391577372104480')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 30 May 2022 13:02:54 GMT',
  'ETag',
  '"0x8DA423CB5DB691D"',
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
  '34a1373c-201f-0006-0825-7403a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '9d193989-3021-47c6-aff2-26fb50a89b41',
  'Date',
  'Mon, 30 May 2022 13:02:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165391577191102205')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '38730bb5-201e-0006-4c25-7403a9000000',
  'x-ms-client-request-id',
  '84001d29-70e4-4a44-bf57-4c8755f3939c',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 30 May 2022 13:02:54 GMT'
]);
