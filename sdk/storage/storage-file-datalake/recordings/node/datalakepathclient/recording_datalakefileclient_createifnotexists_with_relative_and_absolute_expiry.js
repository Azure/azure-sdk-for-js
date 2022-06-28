let nock = require('nock');

module.exports.hash = "45031d518a4da858bdbb384d30fa8746";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383026831304042","file":"file165383026858303026","testfile":"testfile165383026938100061"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383026831304042')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:48 GMT',
  'ETag',
  '"0x8DA4175A0A228EF"',
  'x-ms-request-id',
  '84b4a7e7-a01e-0003-545e-731608000000',
  'x-ms-client-request-id',
  'f23c84e6-dbe7-4271-a725-cdd399078d7b',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:48 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383026831304042/file165383026858303026')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:49 GMT',
  'ETag',
  '"0x8DA4175A0CE4F22"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6ee-201f-0006-0a5e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '0e088a66-25e5-4616-be3f-53ef373da4bf',
  'Date',
  'Sun, 29 May 2022 13:17:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383026831304042/file165383026858303026', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6f1-201f-0006-0b5e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'fa1fd392-7a54-49fe-aaff-1bcbe5c65305',
  'Date',
  'Sun, 29 May 2022 13:17:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383026831304042/file165383026858303026')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:49 GMT',
  'ETag',
  '"0x8DA4175A11FBF31"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '34a0c6f2-201f-0006-0c5e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '82ada80a-3f9d-4182-9dbb-c87c36821bf2',
  'Date',
  'Sun, 29 May 2022 13:17:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383026831304042')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a7ea-a01e-0003-555e-731608000000',
  'x-ms-client-request-id',
  '3ec16603-897a-4fbb-8159-8641898bbebd',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:49 GMT'
]);
