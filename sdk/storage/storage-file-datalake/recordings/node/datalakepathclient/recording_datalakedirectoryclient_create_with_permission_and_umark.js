let nock = require('nock');

module.exports.hash = "d1e352fe58bdbd0cb65b21897ae54a19";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383027352009314","file":"file165383027379808994","testdir":"testdir165383027461108205"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383027352009314')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:54 GMT',
  'ETag',
  '"0x8DA4175A3BDA85A"',
  'x-ms-request-id',
  '84b4a7f6-a01e-0003-5c5e-731608000000',
  'x-ms-client-request-id',
  'b1fdddbb-66f6-4c19-92f7-97d42fbe2c03',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:53 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383027352009314/file165383027379808994')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:54 GMT',
  'ETag',
  '"0x8DA4175A3EC7625"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6fc-201f-0006-165e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '7873282d-23f7-4281-ad03-3024f0c85a6e',
  'Date',
  'Sun, 29 May 2022 13:17:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383027352009314/file165383027379808994', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6fd-201f-0006-175e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '5857e243-f683-40c5-899d-ea7d532ecd95',
  'Date',
  'Sun, 29 May 2022 13:17:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383027352009314/file165383027379808994')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:54 GMT',
  'ETag',
  '"0x8DA4175A43DAAB2"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '34a0c6fe-201f-0006-185e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '218f4075-a453-4dfb-aeba-c12a1b5b5cd8',
  'Date',
  'Sun, 29 May 2022 13:17:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383027352009314/testdir165383027461108205')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:55 GMT',
  'ETag',
  '"0x8DA4175A463D3D8"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6ff-201f-0006-195e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '78642c30-6393-4e3e-9181-b812631aed77',
  'Date',
  'Sun, 29 May 2022 13:17:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383027352009314/testdir165383027461108205')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:55 GMT',
  'ETag',
  '"0x8DA4175A463D3D8"',
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
  '34a0c700-201f-0006-1a5e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'be3e828d-8d16-4633-af2e-db962f9f3052',
  'Date',
  'Sun, 29 May 2022 13:17:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383027352009314')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a7f8-a01e-0003-5d5e-731608000000',
  'x-ms-client-request-id',
  '9be30976-af82-4a7f-a3f8-88cf651791e4',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:55 GMT'
]);
