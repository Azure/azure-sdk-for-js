let nock = require('nock');

module.exports.hash = "bdbd624264fe946aaadf30891e90796e";

module.exports.testInfo = {"uniqueName":{"share":"share167818185243309619","dir":"dir167818185269005555","dir1":"dir1167818185295109009"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818185243309619')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:32 GMT',
  'ETag',
  '"0x8DB1EEF93BE0A3D"',
  'x-ms-request-id',
  '790792c5-a01a-0005-36d8-50f0c9000000',
  'x-ms-client-request-id',
  'fe28fd2a-1bea-4758-8959-0055e4ff54f8',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818185243309619/dir167818185269005555.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:33 GMT',
  'ETag',
  '"0x8DB1EEF93E6C7F8"',
  'x-ms-request-id',
  '790792c7-a01a-0005-37d8-50f0c9000000',
  'x-ms-client-request-id',
  '6a513d17-c367-4961-95de-3f525345b147',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-07T09:37:33.0449400Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:33.0449400Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:33.0449400Z',
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
  'Tue, 07 Mar 2023 09:37:33 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818185243309619/dir1167818185295109009...')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:33 GMT',
  'ETag',
  '"0x8DB1EEF940F5F0E"',
  'x-ms-request-id',
  '790792c8-a01a-0005-38d8-50f0c9000000',
  'x-ms-client-request-id',
  '4f6f559f-56c9-4601-95c8-9f8b7315dc34',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-07T09:37:33.3109518Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:33.3109518Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:33.3109518Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 07 Mar 2023 09:37:33 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167818185243309619/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167818185243309619\" DirectoryPath=\"\"><DirectoryId>0</DirectoryId><Entries><Directory><Name>dir1167818185295109009</Name><FileId>11529285414812647424</FileId><Properties /></Directory><Directory><Name>dir167818185269005555</Name><FileId>13835128424026341376</FileId><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '790792c9-a01a-0005-39d8-50f0c9000000',
  'x-ms-client-request-id',
  '3774e071-0a64-439d-a962-e832025b10c0',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:33 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167818185243309619/dir1167818185295109009...')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '790792ca-a01a-0005-3ad8-50f0c9000000',
  'x-ms-client-request-id',
  'f3e81e9e-6ee1-4b47-babc-9addcff3f285',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:33 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167818185243309619/dir1167818185295109009...')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:790792cb-a01a-0005-3bd8-50f0c9000000\nTime:2023-03-07T09:37:34.0529617Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '790792cb-a01a-0005-3bd8-50f0c9000000',
  'x-ms-client-request-id',
  '4facabdc-6fe8-4a32-95bb-a74c9c3b10fe',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Tue, 07 Mar 2023 09:37:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167818185243309619')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '790792cc-a01a-0005-3cd8-50f0c9000000',
  'x-ms-client-request-id',
  'ed8ba97b-3038-482b-9f5b-e295fa3c5a81',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:34 GMT'
]);
