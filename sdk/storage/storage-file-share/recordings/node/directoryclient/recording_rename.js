let nock = require('nock');

module.exports.hash = "01a18a3393dd67dea0f6b8d573c3bac9";

module.exports.testInfo = {"uniqueName":{"share":"share163947022563503584","dir":"dir163947022725809409","destdir":"destdir163947022756100182"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947022563503584')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:47 GMT',
  'ETag',
  '"0x8D9BEDB0CE19273"',
  'x-ms-request-id',
  '88abb7b3-601a-0004-7ec3-f00ec4000000',
  'x-ms-client-request-id',
  'bc0082ca-d8ea-4c20-83ec-d641439f8c62',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:23:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947022563503584/dir163947022725809409')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:47 GMT',
  'ETag',
  '"0x8D9BEDB0D160607"',
  'x-ms-request-id',
  '88abb7b6-601a-0004-7fc3-f00ec4000000',
  'x-ms-client-request-id',
  '95f7ac91-3664-4182-b7df-19776ee3b312',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:47.6298247Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:47.6298247Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:47.6298247Z',
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
  'Tue, 14 Dec 2021 08:23:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947022563503584/destdir163947022756100182')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:47 GMT',
  'ETag',
  '"0x8D9BEDB0D3D6497"',
  'x-ms-request-id',
  '88abb7b8-601a-0004-80c3-f00ec4000000',
  'x-ms-client-request-id',
  '46979733-86d2-4e3e-91ee-0dc506daf7f6',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:47.8878359Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:47.6298247Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:47.6298247Z',
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
  'Tue, 14 Dec 2021 08:23:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share163947022563503584/destdir163947022756100182')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:47 GMT',
  'ETag',
  '"0x8D9BEDB0D3D6497"',
  'x-ms-request-id',
  '88abb7b9-601a-0004-01c3-f00ec4000000',
  'x-ms-client-request-id',
  '2f952312-dc56-479d-acf1-203372d4dc8c',
  'x-ms-version',
  '2021-04-10',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:23:47.8878359Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:47.6298247Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:47.6298247Z',
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
  'Tue, 14 Dec 2021 08:23:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share163947022563503584/dir163947022725809409')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:88abb7c4-601a-0004-02c3-f00ec4000000\nTime:2021-12-14T08:23:48.4081587Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '88abb7c4-601a-0004-02c3-f00ec4000000',
  'x-ms-client-request-id',
  'c55cfdf4-c61a-4474-a848-8e54f4a4e070',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Dec 2021 08:23:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163947022563503584')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '88abb7c6-601a-0004-03c3-f00ec4000000',
  'x-ms-client-request-id',
  '90956b87-1c2e-4b40-b4b9-6b2787e9af16',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:23:48 GMT'
]);
