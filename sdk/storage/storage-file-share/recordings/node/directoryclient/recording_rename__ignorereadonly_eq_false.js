let nock = require('nock');

module.exports.hash = "f69ad4cb8829fe160e35eea3b923674f";

module.exports.testInfo = {"uniqueName":{"share":"share163947023625902842","dir":"dir163947023651107643","destdir":"destdir163947023676404453"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023625902842')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:56 GMT',
  'ETag',
  '"0x8D9BEDB126BD209"',
  'x-ms-request-id',
  '88abb7ed-601a-0004-24c3-f00ec4000000',
  'x-ms-client-request-id',
  '900991cc-8ced-45a4-b7d3-19dd3e58d8bc',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:23:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023625902842/dir163947023651107643')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:56 GMT',
  'ETag',
  '"0x8D9BEDB1292FBBE"',
  'x-ms-request-id',
  '88abb7ef-601a-0004-25c3-f00ec4000000',
  'x-ms-client-request-id',
  'c5a43f2e-fb7d-41ee-9433-9af9bb2b0a11',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:56.8373694Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:56.8373694Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:56.8373694Z',
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
  'Tue, 14 Dec 2021 08:23:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023625902842/destdir163947023676404453')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:57 GMT',
  'ETag',
  '"0x8D9BEDB12B96FCE"',
  'x-ms-request-id',
  '88abb7f0-601a-0004-26c3-f00ec4000000',
  'x-ms-client-request-id',
  '575d8f31-1ff0-4ee8-ad0b-9580c687e76a',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:57.0893774Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:57.0893774Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:57.0893774Z',
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
  'Tue, 14 Dec 2021 08:23:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023625902842/destdir163947023676404453')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ReadOnlyAttribute</Code><Message>The specified resource is read-only and cannot be modified at this time.\nRequestId:88abb7f1-601a-0004-27c3-f00ec4000000\nTime:2021-12-14T08:23:57.3367631Z</Message></Error>", [
  'Content-Length',
  '258',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '88abb7f1-601a-0004-27c3-f00ec4000000',
  'x-ms-client-request-id',
  '7194a56c-5d22-4ed7-b158-b34cbf44079a',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ReadOnlyAttribute',
  'Date',
  'Tue, 14 Dec 2021 08:23:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share163947023625902842/dir163947023651107643')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:56 GMT',
  'ETag',
  '"0x8D9BEDB1292FBBE"',
  'x-ms-request-id',
  '88abb7f2-601a-0004-28c3-f00ec4000000',
  'x-ms-client-request-id',
  '1ffc5067-1b2d-43d7-bb04-f37ad56842dd',
  'x-ms-version',
  '2021-04-10',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:23:56.8373694Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:56.8373694Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:56.8373694Z',
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
  'Tue, 14 Dec 2021 08:23:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163947023625902842/destdir163947023676404453')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:57 GMT',
  'ETag',
  '"0x8D9BEDB12B96FCE"',
  'x-ms-request-id',
  '88abb7f3-601a-0004-29c3-f00ec4000000',
  'x-ms-client-request-id',
  'e2138f4c-b78e-4737-8c56-1919e0e9a9f6',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:23:57.0893774Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:57.0893774Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:57.0893774Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'ReadOnly | Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Dec 2021 08:23:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163947023625902842')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '88abb7f4-601a-0004-2ac3-f00ec4000000',
  'x-ms-client-request-id',
  '837b69cc-4221-4a32-8775-3d5420f6ad01',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:23:58 GMT'
]);
