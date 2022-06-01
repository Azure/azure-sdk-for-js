let nock = require('nock');

module.exports.hash = "20d7cc7212bf01cf8cd5df81f73ca374";

module.exports.testInfo = {"uniqueName":{"share":"share163947023270101167","dir":"dir163947023295006018","destdir":"destdir163947023320806264"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023270101167')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:53 GMT',
  'ETag',
  '"0x8D9BEDB104C4418"',
  'x-ms-request-id',
  '88abb7da-601a-0004-15c3-f00ec4000000',
  'x-ms-client-request-id',
  '453b80da-177a-4f14-8101-791da7813893',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:23:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023270101167/dir163947023295006018')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:53 GMT',
  'ETag',
  '"0x8D9BEDB1073E3ED"',
  'x-ms-request-id',
  '88abb7dc-601a-0004-16c3-f00ec4000000',
  'x-ms-client-request-id',
  'a1c2268c-2924-4d5d-ad2d-401beb2e55a4',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:53.2781549Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:53.2781549Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:53.2781549Z',
  'x-ms-file-permission-key',
  '10165108698639110817*121971141114590432',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:23:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023270101167/destdir163947023320806264')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:53 GMT',
  'ETag',
  '"0x8D9BEDB109ACDB0"',
  'x-ms-request-id',
  '88abb7dd-601a-0004-17c3-f00ec4000000',
  'x-ms-client-request-id',
  '3dbe299c-1428-4f6f-ae52-3040e44ad8c3',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:53.5331760Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:53.5331760Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:53.5331760Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:23:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023270101167/destdir163947023320806264')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceAlreadyExists</Code><Message>The specified resource already exists.\nRequestId:88abb7df-601a-0004-18c3-f00ec4000000\nTime:2021-12-14T08:23:53.7865226Z</Message></Error>", [
  'Content-Length',
  '228',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '88abb7df-601a-0004-18c3-f00ec4000000',
  'x-ms-client-request-id',
  '9eca2a7a-2ede-49af-b71b-f22ebe438622',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceAlreadyExists',
  'Date',
  'Tue, 14 Dec 2021 08:23:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share163947023270101167/dir163947023295006018')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:53 GMT',
  'ETag',
  '"0x8D9BEDB1073E3ED"',
  'x-ms-request-id',
  '88abb7e0-601a-0004-19c3-f00ec4000000',
  'x-ms-client-request-id',
  '144888ed-60b7-407a-8e7e-0af26e40ab4a',
  'x-ms-version',
  '2021-04-10',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:23:53.2781549Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:53.2781549Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:53.2781549Z',
  'x-ms-file-permission-key',
  '10165108698639110817*121971141114590432',
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
  'Tue, 14 Dec 2021 08:23:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163947023270101167/destdir163947023320806264')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:53 GMT',
  'ETag',
  '"0x8D9BEDB109ACDB0"',
  'x-ms-request-id',
  '88abb7e1-601a-0004-1ac3-f00ec4000000',
  'x-ms-client-request-id',
  'bdf5af33-f30c-494d-98ef-ef9b3d886d2b',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:23:53.5331760Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:53.5331760Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:53.5331760Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Dec 2021 08:23:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163947023270101167')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '88abb7e2-601a-0004-1bc3-f00ec4000000',
  'x-ms-client-request-id',
  '06489f0a-8d8f-4c9e-875b-8be0a8a1f68f',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:23:53 GMT'
]);
