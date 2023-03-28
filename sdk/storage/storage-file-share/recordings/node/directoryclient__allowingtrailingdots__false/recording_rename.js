let nock = require('nock');

module.exports.hash = "32e2082abb161bace751932bcda07ba4";

module.exports.testInfo = {"uniqueName":{"share":"share167875884214308692","dir":"dir167875884239601574","destdir":"destdir167875884267408908","destdir1":"destdir1167875884372209651"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875884214308692')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:54:02 GMT',
  'ETag',
  '"0x8DB242EFC6AB438"',
  'x-ms-request-id',
  'fd6a9fa2-e01a-0007-3117-56fda4000000',
  'x-ms-client-request-id',
  'faeaf0c0-2d9b-4f9e-aeda-26cd826ea036',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:54:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875884214308692/dir167875884239601574.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:54:02 GMT',
  'ETag',
  '"0x8DB242EFC954240"',
  'x-ms-request-id',
  'fd6a9fa4-e01a-0007-3217-56fda4000000',
  'x-ms-client-request-id',
  '6548510f-beb1-4e93-8f05-2e76835de225',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:54:02.7792960Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:54:02.7792960Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:54:02.7792960Z',
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
  'Tue, 14 Mar 2023 01:54:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875884214308692/destdir167875884267408908....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:54:03 GMT',
  'ETag',
  '"0x8DB242EFCC57ACB"',
  'x-ms-request-id',
  'fd6a9fa5-e01a-0007-3317-56fda4000000',
  'x-ms-client-request-id',
  '94557bdd-8664-46cb-87df-5bb466475cbd',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:54:03.0953163Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:54:02.7792960Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:54:02.7792960Z',
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
  'Tue, 14 Mar 2023 01:54:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875884214308692/destdir167875884267408908....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:54:03 GMT',
  'ETag',
  '"0x8DB242EFCC57ACB"',
  'x-ms-request-id',
  'fd6a9fa6-e01a-0007-3417-56fda4000000',
  'x-ms-client-request-id',
  '72ef358c-2264-4dbf-a00b-ed936a19b7a0',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2023-03-14T01:54:03.0953163Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:54:02.7792960Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:54:02.7792960Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:54:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875884214308692/dir167875884239601574.')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:fd6a9fa7-e01a-0007-3517-56fda4000000\nTime:2023-03-14T01:54:03.5994226Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'fd6a9fa7-e01a-0007-3517-56fda4000000',
  'x-ms-client-request-id',
  'd4ae0bb7-908e-4cac-998b-750955190025',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:54:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875884214308692/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167875884214308692\" DirectoryPath=\"\"><DirectoryId>0</DirectoryId><Entries><Directory><Name>destdir167875884267408908</Name><FileId>13835128424026341376</FileId><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'fd6a9fa8-e01a-0007-3617-56fda4000000',
  'x-ms-client-request-id',
  '2f0705fb-4edb-4211-8c38-32f1c221ea80',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:54:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875884214308692/destdir1167875884372209651....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:54:04 GMT',
  'ETag',
  '"0x8DB242EFD5BF170"',
  'x-ms-request-id',
  'fd6a9fa9-e01a-0007-3717-56fda4000000',
  'x-ms-client-request-id',
  'b4652351-8cca-4040-858c-82cff75fc591',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:54:04.0813936Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:54:02.7792960Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:54:02.7792960Z',
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
  'Tue, 14 Mar 2023 01:54:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875884214308692/destdir1167875884372209651....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:54:04 GMT',
  'ETag',
  '"0x8DB242EFD5BF170"',
  'x-ms-request-id',
  'fd6a9faa-e01a-0007-3817-56fda4000000',
  'x-ms-client-request-id',
  'bfd0e37d-c594-4098-bde6-8ae82d4c2662',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2023-03-14T01:54:04.0813936Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:54:02.7792960Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:54:02.7792960Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:54:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875884214308692/destdir167875884267408908....')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:fd6a9fab-e01a-0007-3917-56fda4000000\nTime:2023-03-14T01:54:04.5724430Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'fd6a9fab-e01a-0007-3917-56fda4000000',
  'x-ms-client-request-id',
  'dd76b130-a3fd-43da-82aa-b118201e93cb',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:54:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875884214308692/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167875884214308692\" DirectoryPath=\"\"><DirectoryId>0</DirectoryId><Entries><Directory><Name>destdir1167875884372209651</Name><FileId>13835128424026341376</FileId><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'fd6a9fac-e01a-0007-3a17-56fda4000000',
  'x-ms-client-request-id',
  'c493a45e-d868-438b-9b50-023124a7e70a',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:54:04 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875884214308692')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9fb6-e01a-0007-3b17-56fda4000000',
  'x-ms-client-request-id',
  '5e1c56e7-1a70-4ca2-aa79-e2848fc7c150',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:54:04 GMT'
]);
