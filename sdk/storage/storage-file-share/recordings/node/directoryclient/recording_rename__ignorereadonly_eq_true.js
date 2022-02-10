let nock = require('nock');

module.exports.hash = "cf63d5b63864698e77e49f3b9191e502";

module.exports.testInfo = {"uniqueName":{"share":"share163947023446405365","dir":"dir163947023471806735","destdir":"destdir163947023497803580"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023446405365')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:54 GMT',
  'ETag',
  '"0x8D9BEDB11594C05"',
  'x-ms-request-id',
  '88abb7e4-601a-0004-1cc3-f00ec4000000',
  'x-ms-client-request-id',
  '2b123256-d3a8-4bd3-903b-0c1de5c5a71c',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:23:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023446405365/dir163947023471806735')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:55 GMT',
  'ETag',
  '"0x8D9BEDB11822432"',
  'x-ms-request-id',
  '88abb7e6-601a-0004-1dc3-f00ec4000000',
  'x-ms-client-request-id',
  'ab139331-552b-45a5-8565-376912cecf12',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:55.0492722Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:55.0492722Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:55.0492722Z',
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
  'Tue, 14 Dec 2021 08:23:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023446405365/destdir163947023497803580')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:55 GMT',
  'ETag',
  '"0x8D9BEDB11A9A9E2"',
  'x-ms-request-id',
  '88abb7e8-601a-0004-1fc3-f00ec4000000',
  'x-ms-client-request-id',
  '31ab2118-f306-430e-9080-0bad996fff54',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:55.3082850Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:55.3082850Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:55.3082850Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'ReadOnly | Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:23:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023446405365/destdir163947023497803580')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:55 GMT',
  'ETag',
  '"0x8D9BEDB11D219A5"',
  'x-ms-request-id',
  '88abb7e9-601a-0004-20c3-f00ec4000000',
  'x-ms-client-request-id',
  'cee1a2de-d881-477d-bd73-95aba9d259db',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:55.5732901Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:55.0492722Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:55.0492722Z',
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
  'Tue, 14 Dec 2021 08:23:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share163947023446405365/destdir163947023497803580')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:55 GMT',
  'ETag',
  '"0x8D9BEDB11D219A5"',
  'x-ms-request-id',
  '88abb7ea-601a-0004-21c3-f00ec4000000',
  'x-ms-client-request-id',
  'cd3e626f-2fe2-4dbd-b967-dee099557127',
  'x-ms-version',
  '2021-04-10',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:23:55.5732901Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:55.0492722Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:55.0492722Z',
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
  'Tue, 14 Dec 2021 08:23:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share163947023446405365/dir163947023471806735')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:88abb7eb-601a-0004-22c3-f00ec4000000\nTime:2021-12-14T08:23:56.0646762Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '88abb7eb-601a-0004-22c3-f00ec4000000',
  'x-ms-client-request-id',
  '91859993-d75a-4d9f-9970-62670b7acaee',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Dec 2021 08:23:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163947023446405365')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '88abb7ec-601a-0004-23c3-f00ec4000000',
  'x-ms-client-request-id',
  '56b3d6cf-39b6-4b84-af6b-58a23c1f9c8a',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:23:55 GMT'
]);
