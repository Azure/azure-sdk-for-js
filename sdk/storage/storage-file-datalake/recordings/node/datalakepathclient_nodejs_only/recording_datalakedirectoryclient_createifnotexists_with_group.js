let nock = require('nock');

module.exports.hash = "d41371ee423d3be089f8df3ea2d131e2";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383019482909276","file":"file165383019510601726","testdir":"testdir165383019663408140"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383019482909276')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:35 GMT',
  'ETag',
  '"0x8DA417574D5F39D"',
  'x-ms-request-id',
  '84b4a775-a01e-0003-135e-731608000000',
  'x-ms-client-request-id',
  '00073931-9c0d-434f-ac2e-1446c019a98b',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:34 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383019482909276/file165383019510601726')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:36 GMT',
  'ETag',
  '"0x8DA41757571D006"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6c3-201f-0006-735e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'd89c473b-a00b-4a0d-9adc-f5778157856c',
  'Date',
  'Sun, 29 May 2022 13:16:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383019482909276/file165383019510601726', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6c4-201f-0006-745e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '0359533a-1401-4383-961d-69881e1ce747',
  'Date',
  'Sun, 29 May 2022 13:16:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383019482909276/file165383019510601726')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:36 GMT',
  'ETag',
  '"0x8DA417575C39AEB"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '34a0c6c5-201f-0006-755e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '14c376c2-540b-4522-9847-b7f50a5d6c9e',
  'Date',
  'Sun, 29 May 2022 13:16:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383019482909276/testdir165383019663408140')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:37 GMT',
  'ETag',
  '"0x8DA417575E9C8C7"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6c6-201f-0006-765e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'a9261f8a-b359-4a87-9594-e71902736a84',
  'Date',
  'Sun, 29 May 2022 13:16:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383019482909276/testdir165383019663408140')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:37 GMT',
  'ETag',
  '"0x8DA417575E9C8C7"',
  'Vary',
  'Origin',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '67089e35-dc13-458b-b06e-d873b8406284',
  'x-ms-permissions',
  'rwxr-x---',
  'x-ms-acl',
  'user::rwx,group::r-x,other::---',
  'x-ms-request-id',
  '34a0c6c7-201f-0006-775e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '8219da31-747c-4b80-afb0-26c357a69214',
  'Date',
  'Sun, 29 May 2022 13:16:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383019482909276')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a777-a01e-0003-145e-731608000000',
  'x-ms-client-request-id',
  'ae1faca6-6049-4906-84d7-fdb8dae60df1',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:37 GMT'
]);
