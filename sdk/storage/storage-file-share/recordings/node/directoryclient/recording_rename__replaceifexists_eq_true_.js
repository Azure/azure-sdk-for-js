let nock = require('nock');

module.exports.hash = "240a9e4edc084cd2063b0ec5273f2673";

module.exports.testInfo = {"uniqueName":{"share":"share163947023092404657","dir":"dir163947023117603576","destdir":"destdir163947023143603924"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023092404657')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:51 GMT',
  'ETag',
  '"0x8D9BEDB0F3D672F"',
  'x-ms-request-id',
  '88abb7d2-601a-0004-0ec3-f00ec4000000',
  'x-ms-client-request-id',
  '8da57ee3-23f4-4980-8eda-c6b806fcc722',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:23:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023092404657/dir163947023117603576')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:51 GMT',
  'ETag',
  '"0x8D9BEDB0F65A457"',
  'x-ms-request-id',
  '88abb7d4-601a-0004-0fc3-f00ec4000000',
  'x-ms-client-request-id',
  '50853e4e-ffc1-4832-b7b0-edf6cd0726b4',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:51.5070551Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:51.5070551Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:51.5070551Z',
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
  'Tue, 14 Dec 2021 08:23:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023092404657/destdir163947023143603924')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:51 GMT',
  'ETag',
  '"0x8D9BEDB0F8CDBD3"',
  'x-ms-request-id',
  '88abb7d5-601a-0004-10c3-f00ec4000000',
  'x-ms-client-request-id',
  'a30bf4e4-96b9-4ac0-aa7e-530f796ecdf6',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:51.7640659Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:51.7640659Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:51.7640659Z',
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
  'Tue, 14 Dec 2021 08:23:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023092404657/destdir163947023143603924')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:52 GMT',
  'ETag',
  '"0x8D9BEDB0FB488A2"',
  'x-ms-request-id',
  '88abb7d6-601a-0004-11c3-f00ec4000000',
  'x-ms-client-request-id',
  '735d6f2b-9aa4-4f61-9337-6e2d3c6aee4e',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:52.0240802Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:51.5070551Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:51.5070551Z',
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
  'Tue, 14 Dec 2021 08:23:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share163947023092404657/destdir163947023143603924')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:52 GMT',
  'ETag',
  '"0x8D9BEDB0FB488A2"',
  'x-ms-request-id',
  '88abb7d7-601a-0004-12c3-f00ec4000000',
  'x-ms-client-request-id',
  'ed3865d7-66b8-44a9-be61-95686626d4a7',
  'x-ms-version',
  '2021-04-10',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:23:52.0240802Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:51.5070551Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:51.5070551Z',
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
  'Tue, 14 Dec 2021 08:23:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share163947023092404657/dir163947023117603576')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:88abb7d8-601a-0004-13c3-f00ec4000000\nTime:2021-12-14T08:23:52.5254400Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '88abb7d8-601a-0004-13c3-f00ec4000000',
  'x-ms-client-request-id',
  '50271474-37ef-4229-8b06-499c24c7b5cf',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Dec 2021 08:23:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163947023092404657')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '88abb7d9-601a-0004-14c3-f00ec4000000',
  'x-ms-client-request-id',
  '26204ec1-32fa-46a2-af25-00cf60e4abb7',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:23:52 GMT'
]);
