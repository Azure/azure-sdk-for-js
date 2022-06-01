let nock = require('nock');

module.exports.hash = "04e3607437851531fb1a43a3954b24d9";

module.exports.testInfo = {"uniqueName":{"share":"share163947023978507576","dir":"dir163947024004305093","destdir":"destdir163947024030308179","sourcedir":"sourcedir163947024030301550"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023978507576')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:24:00 GMT',
  'ETag',
  '"0x8D9BEDB14856C98"',
  'x-ms-request-id',
  '88abb7fd-601a-0004-32c3-f00ec4000000',
  'x-ms-client-request-id',
  '82c54683-3b8d-4225-a548-aad53c53e009',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:24:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023978507576/dir163947024004305093')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:24:00 GMT',
  'ETag',
  '"0x8D9BEDB14AE90C2"',
  'x-ms-request-id',
  '88abb7ff-601a-0004-33c3-f00ec4000000',
  'x-ms-client-request-id',
  'b8d9043b-20ae-4acb-a878-54c76827e2ed',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:24:00.3735746Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:24:00.3735746Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:24:00.3735746Z',
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
  'Tue, 14 Dec 2021 08:24:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023978507576/sourcedir163947024030301550')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:24:00 GMT',
  'ETag',
  '"0x8D9BEDB14D52C32"',
  'x-ms-request-id',
  '88abb800-601a-0004-34c3-f00ec4000000',
  'x-ms-client-request-id',
  '1e908652-9d1a-4f48-b220-86332dadbc04',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:24:00.6265906Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:24:00.6265906Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:24:00.6265906Z',
  'x-ms-file-permission-key',
  '10165108698639110817*121971141114590432',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:24:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023978507576/destdir163947024030308179')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:24:00 GMT',
  'ETag',
  '"0x8D9BEDB14FD4E17"',
  'x-ms-request-id',
  '88abb801-601a-0004-35c3-f00ec4000000',
  'x-ms-client-request-id',
  '7a8386fc-d970-42c0-ac70-e38fbc7e5908',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:24:00.8896023Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:24:00.6265906Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:24:00.6265906Z',
  'x-ms-file-permission-key',
  '11994942563555057937*121971141114590432',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:24:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share163947023978507576/destdir163947024030308179')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:24:00 GMT',
  'ETag',
  '"0x8D9BEDB14FD4E17"',
  'x-ms-request-id',
  '88abb802-601a-0004-36c3-f00ec4000000',
  'x-ms-client-request-id',
  '9f98f826-addd-4ed7-a3d1-f052c64f1dc5',
  'x-ms-version',
  '2021-04-10',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:24:00.8896023Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:24:00.6265906Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:24:00.6265906Z',
  'x-ms-file-permission-key',
  '11994942563555057937*121971141114590432',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Dec 2021 08:24:01 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share163947023978507576/sourcedir163947024030301550')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:88abb803-601a-0004-37c3-f00ec4000000\nTime:2021-12-14T08:24:01.3960369Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '88abb803-601a-0004-37c3-f00ec4000000',
  'x-ms-client-request-id',
  'f7eabdd8-221c-4cfd-a63d-6e025a762be9',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Dec 2021 08:24:01 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163947023978507576')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '88abb804-601a-0004-38c3-f00ec4000000',
  'x-ms-client-request-id',
  'd1f5d3ac-bf38-4fd0-8580-e04776089d0a',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:24:01 GMT'
]);
