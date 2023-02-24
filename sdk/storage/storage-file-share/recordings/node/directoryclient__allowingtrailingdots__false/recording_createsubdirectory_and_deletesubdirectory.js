let nock = require('nock');

module.exports.hash = "76c140735a6863c369a21eb1ef61741d";

module.exports.testInfo = {"uniqueName":{"share":"share167875882945508235","dir":"dir167875882970707589","subdir":"subdir167875882999202630"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882945508235')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:49 GMT',
  'ETag',
  '"0x8DB242EF4DA9A73"',
  'x-ms-request-id',
  '0b0de394-701a-0008-1a17-56c247000000',
  'x-ms-client-request-id',
  'c9342896-ff6b-4e5f-89ba-34a567a74516',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882945508235/dir167875882970707589.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:50 GMT',
  'ETag',
  '"0x8DB242EF503D7BE"',
  'x-ms-request-id',
  '0b0de396-701a-0008-1b17-56c247000000',
  'x-ms-client-request-id',
  'd74b8a45-630c-4da4-a215-e50411a978d3',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:50.0822462Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:50.0822462Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:50.0822462Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882945508235/dir167875882970707589./subdir167875882999202630.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:50 GMT',
  'ETag',
  '"0x8DB242EF52D59AF"',
  'x-ms-request-id',
  '0b0de397-701a-0008-1c17-56c247000000',
  'x-ms-client-request-id',
  '0214854b-dd33-4bdc-b7c4-30e3ad65b9c1',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:50.3542703Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:50.3542703Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:50.3542703Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875882945508235/dir167875882970707589.')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167875882945508235\" DirectoryPath=\"dir167875882970707589\"><DirectoryId>13835128424026341376</DirectoryId><Entries><Directory><Name>subdir167875882999202630</Name><FileId>11529285414812647424</FileId><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '0b0de398-701a-0008-1d17-56c247000000',
  'x-ms-client-request-id',
  '4d16c5fc-5f5b-43c2-abb0-230cba0f6ddd',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875882945508235/dir167875882970707589./subdir167875882999202630.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:50 GMT',
  'ETag',
  '"0x8DB242EF52D59AF"',
  'x-ms-request-id',
  '0b0de399-701a-0008-1e17-56c247000000',
  'x-ms-client-request-id',
  'a7147b16-7524-4131-8cdb-d196eb0e63ff',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2023-03-14T01:53:50.3542703Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:50.3542703Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:50.3542703Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875882945508235/dir167875882970707589./subdir167875882999202630.')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de3a7-701a-0008-1f17-56c247000000',
  'x-ms-client-request-id',
  '49a1de58-1fd7-4e07-98db-5dfd0e3c3c42',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875882945508235/dir167875882970707589./subdir167875882999202630.')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:0b0de3a8-701a-0008-2017-56c247000000\nTime:2023-03-14T01:53:51.3870913Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '0b0de3a8-701a-0008-2017-56c247000000',
  'x-ms-client-request-id',
  '063854ba-df9b-4b92-a834-6586b4e5b259',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875882945508235')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de3a9-701a-0008-2117-56c247000000',
  'x-ms-client-request-id',
  'c8a9aaa4-b7fb-40be-8399-70ffcd4fea01',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:51 GMT'
]);
