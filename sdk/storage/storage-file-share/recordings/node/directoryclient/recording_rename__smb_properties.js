let nock = require('nock');

module.exports.hash = "c90a09a33262e7489eda97a4acd3e701";

module.exports.testInfo = {"uniqueName":{"share":"share163947024158800601","dir":"dir163947024184009458","destdir":"destdir163947024209501284","sourcedir":"sourcedir163947024233803300"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947024158800601')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:24:01 GMT',
  'ETag',
  '"0x8D9BEDB1598DD3D"',
  'x-ms-request-id',
  '88abb805-601a-0004-39c3-f00ec4000000',
  'x-ms-client-request-id',
  '44c7b565-131f-4fa6-b115-01f234357d06',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:24:01 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947024158800601/dir163947024184009458')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:24:02 GMT',
  'ETag',
  '"0x8D9BEDB15C07A60"',
  'x-ms-request-id',
  '88abb808-601a-0004-3ac3-f00ec4000000',
  'x-ms-client-request-id',
  'cd07eb53-4059-417c-a712-a4c6693e2b82',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:24:02.1686880Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:24:02.1686880Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:24:02.1686880Z',
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
  'Tue, 14 Dec 2021 08:24:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947024158800601', {"permission":"O:S-1-5-21-2127521184-1604012920-1887927527-21560751G:S-1-5-21-2127521184-1604012920-1887927527-513D:AI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-397955417-626881126-188441444-3053964)"})
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '88abb80a-601a-0004-3bc3-f00ec4000000',
  'x-ms-client-request-id',
  'be316c40-1b89-4f9e-9b97-ab612764d3cd',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-permission-key',
  '11994942563555057937*121971141114590432',
  'Date',
  'Tue, 14 Dec 2021 08:24:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947024158800601/sourcedir163947024233803300')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:24:02 GMT',
  'ETag',
  '"0x8D9BEDB160B4031"',
  'x-ms-request-id',
  '88abb80b-601a-0004-3cc3-f00ec4000000',
  'x-ms-client-request-id',
  '737cad61-d37f-4fe9-9c7a-9397fefa5523',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:24:02.6587185Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:24:02.6587185Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:24:02.6587185Z',
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
  'Tue, 14 Dec 2021 08:24:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947024158800601/destdir163947024209501284')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:24:02 GMT',
  'ETag',
  '"0x8D9BEDB16316628"',
  'x-ms-request-id',
  '88abb80c-601a-0004-3dc3-f00ec4000000',
  'x-ms-client-request-id',
  'd91a1550-9430-4471-a8fb-11ced64aa359',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:24:02.9087272Z',
  'x-ms-file-last-write-time',
  '2019-10-15T14:48:00.0000000Z',
  'x-ms-file-creation-time',
  '2019-10-05T14:48:00.0000000Z',
  'x-ms-file-permission-key',
  '11994942563555057937*121971141114590432',
  'x-ms-file-attributes',
  'ReadOnly | Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:24:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share163947024158800601/destdir163947024209501284')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:24:02 GMT',
  'ETag',
  '"0x8D9BEDB16316628"',
  'x-ms-request-id',
  '88abb80d-601a-0004-3ec3-f00ec4000000',
  'x-ms-client-request-id',
  '71856f66-439e-4797-9208-3e4cf41ef43e',
  'x-ms-version',
  '2021-04-10',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:24:02.9087272Z',
  'x-ms-file-last-write-time',
  '2019-10-15T14:48:00.0000000Z',
  'x-ms-file-creation-time',
  '2019-10-05T14:48:00.0000000Z',
  'x-ms-file-permission-key',
  '11994942563555057937*121971141114590432',
  'x-ms-file-attributes',
  'ReadOnly | Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Dec 2021 08:24:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share163947024158800601/sourcedir163947024233803300')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:88abb80e-601a-0004-3fc3-f00ec4000000\nTime:2021-12-14T08:24:03.3991703Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '88abb80e-601a-0004-3fc3-f00ec4000000',
  'x-ms-client-request-id',
  '0b349620-4d6f-4d19-92e7-b828dfd46e39',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Dec 2021 08:24:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163947024158800601')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '88abb80f-601a-0004-40c3-f00ec4000000',
  'x-ms-client-request-id',
  'ea1e9a33-0cc3-4849-8991-9b8760836615',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:24:03 GMT'
]);
