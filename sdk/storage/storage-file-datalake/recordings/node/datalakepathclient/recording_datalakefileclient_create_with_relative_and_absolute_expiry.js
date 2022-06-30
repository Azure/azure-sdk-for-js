let nock = require('nock');

module.exports.hash = "d679677dbda6c1a5f23c43da8d70711e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383023219108578","file":"file165383023246903231","testfile":"testfile165383023328905612"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383023219108578')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:12 GMT',
  'ETag',
  '"0x8DA41758B1B0CAB"',
  'x-ms-request-id',
  '84b4a7a6-a01e-0003-2e5e-731608000000',
  'x-ms-client-request-id',
  '74c9311e-07fb-425c-a667-67f050600e3e',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:12 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383023219108578/file165383023246903231')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:13 GMT',
  'ETag',
  '"0x8DA41758B48320C"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db29-a01f-0005-5e5e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '3b43146b-c9b0-4e43-aa70-6352cee44b0c',
  'Date',
  'Sun, 29 May 2022 13:17:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383023219108578/file165383023246903231', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db2b-a01f-0005-5f5e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '493bd137-ca10-4e1f-8d48-cfe6073dd459',
  'Date',
  'Sun, 29 May 2022 13:17:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383023219108578/file165383023246903231')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:13 GMT',
  'ETag',
  '"0x8DA41758B9BD254"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '5506db2c-a01f-0005-605e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '43b9cb67-9e9e-4680-aa24-0cb69041b88a',
  'Date',
  'Sun, 29 May 2022 13:17:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383023219108578')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a7aa-a01e-0003-2f5e-731608000000',
  'x-ms-client-request-id',
  '8bf2dc0e-ca64-4e2f-9af9-00b40bcc9f37',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:13 GMT'
]);
