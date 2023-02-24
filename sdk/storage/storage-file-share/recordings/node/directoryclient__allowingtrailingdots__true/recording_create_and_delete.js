let nock = require('nock');

module.exports.hash = "3fbee41d1b434cf32e04302642a24451";

module.exports.testInfo = {"uniqueName":{"share":"share167875879973104105","dir":"dir167875880279000395","dir1":"dir1167875880312604858"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875879973104105')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:22 GMT',
  'ETag',
  '"0x8DB242EE4CAC3D9"',
  'x-ms-request-id',
  'fd6a9f2d-e01a-0007-6417-56fda4000000',
  'x-ms-client-request-id',
  '4119ad68-2034-46c6-bc86-814a2291430f',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875879973104105/dir167875880279000395.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:23 GMT',
  'ETag',
  '"0x8DB242EE4FF78F0"',
  'x-ms-request-id',
  'fd6a9f30-e01a-0007-6517-56fda4000000',
  'x-ms-client-request-id',
  'd0e11c4b-fb4b-48b4-884e-cbfce51f9bcb',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:23.2100592Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:23.2100592Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:23.2100592Z',
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
  'Tue, 14 Mar 2023 01:53:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875879973104105/dir1167875880312604858...')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:23 GMT',
  'ETag',
  '"0x8DB242EE5296FC2"',
  'x-ms-request-id',
  'fd6a9f32-e01a-0007-6617-56fda4000000',
  'x-ms-client-request-id',
  '800904e9-e6ed-45d2-8cec-84a062f816d4',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:23.4850754Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:23.4850754Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:23.4850754Z',
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
  'Tue, 14 Mar 2023 01:53:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875879973104105/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167875879973104105\" DirectoryPath=\"\"><DirectoryId>0</DirectoryId><Entries><Directory><Name>dir1167875880312604858...</Name><FileId>11529285414812647424</FileId><Properties /></Directory><Directory><Name>dir167875880279000395.</Name><FileId>13835128424026341376</FileId><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'fd6a9f34-e01a-0007-6817-56fda4000000',
  'x-ms-client-request-id',
  'ea72a46f-31e2-45e0-af2b-e77e378a6922',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875879973104105/dir1167875880312604858...')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9f35-e01a-0007-6917-56fda4000000',
  'x-ms-client-request-id',
  'b5cab908-d23a-4387-8063-3a9fd17b38e1',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875879973104105/dir1167875880312604858...')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:fd6a9f36-e01a-0007-6a17-56fda4000000\nTime:2023-03-14T01:53:24.3036655Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'fd6a9f36-e01a-0007-6a17-56fda4000000',
  'x-ms-client-request-id',
  'b1b54154-cf8b-4c30-95a9-5739a63c83dc',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875879973104105')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9f37-e01a-0007-6b17-56fda4000000',
  'x-ms-client-request-id',
  'fc19a78a-866d-4d16-8c67-7340a30dae1e',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:24 GMT'
]);
