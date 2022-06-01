let nock = require('nock');

module.exports.hash = "91c8c80624764c85345812113b7cedac";

module.exports.testInfo = {"uniqueName":{"share":"share164843652924604702","dir":"dir164843653073608355","destdir":"destdir164843653104408727","sourcedir":"sourcedir164843653130507247"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164843652924604702')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Mar 2022 03:02:10 GMT',
  'ETag',
  '"0x8DA10675A382373"',
  'x-ms-request-id',
  '5401f2c8-701a-0008-5e50-42c247000000',
  'x-ms-client-request-id',
  '2708d22d-57cc-4082-b853-71aa92850679',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 28 Mar 2022 03:02:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164843652924604702/dir164843653073608355')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Mar 2022 03:02:11 GMT',
  'ETag',
  '"0x8DA10675A6CE4DF"',
  'x-ms-request-id',
  '5401f2cc-701a-0008-5f50-42c247000000',
  'x-ms-client-request-id',
  '65ff9113-8cca-4e30-9205-9aa063d9fe90',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-03-28T03:02:11.1108319Z',
  'x-ms-file-last-write-time',
  '2022-03-28T03:02:11.1108319Z',
  'x-ms-file-creation-time',
  '2022-03-28T03:02:11.1108319Z',
  'x-ms-file-permission-key',
  '1690096059463891404*11228742651815927693',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 28 Mar 2022 03:02:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164843652924604702', {"permission":"O:S-1-5-21-2127521184-1604012920-1887927527-21560751G:S-1-5-21-2127521184-1604012920-1887927527-513D:AI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-397955417-626881126-188441444-3053964)"})
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '5401f2ce-701a-0008-6050-42c247000000',
  'x-ms-client-request-id',
  'cac791f7-c0be-4317-8c50-8c1aebbb03f7',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-permission-key',
  '4328888732566833788*11228742651815927693',
  'Date',
  'Mon, 28 Mar 2022 03:02:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164843652924604702/sourcedir164843653130507247')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Mar 2022 03:02:11 GMT',
  'ETag',
  '"0x8DA10675ABD2843"',
  'x-ms-request-id',
  '5401f2cf-701a-0008-6150-42c247000000',
  'x-ms-client-request-id',
  '1d032d9b-c8c2-410c-a397-175a2f65c200',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-03-28T03:02:11.6368451Z',
  'x-ms-file-last-write-time',
  '2022-03-28T03:02:11.6368451Z',
  'x-ms-file-creation-time',
  '2022-03-28T03:02:11.6368451Z',
  'x-ms-file-permission-key',
  '1690096059463891404*11228742651815927693',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 28 Mar 2022 03:02:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164843652924604702/destdir164843653104408727')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Mar 2022 03:02:11 GMT',
  'ETag',
  '"0x8DA10675AE45FA7"',
  'x-ms-request-id',
  '5401f2d0-701a-0008-6250-42c247000000',
  'x-ms-client-request-id',
  'f98f465b-380c-4025-b4b0-8250420adbba',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2019-10-25T14:48:00.0000000Z',
  'x-ms-file-last-write-time',
  '2019-10-15T14:48:00.0000000Z',
  'x-ms-file-creation-time',
  '2019-10-05T14:48:00.0000000Z',
  'x-ms-file-permission-key',
  '4328888732566833788*11228742651815927693',
  'x-ms-file-attributes',
  'ReadOnly | Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 28 Mar 2022 03:02:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share164843652924604702/destdir164843653104408727')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Mar 2022 03:02:11 GMT',
  'ETag',
  '"0x8DA10675AE45FA7"',
  'x-ms-request-id',
  '5401f2d1-701a-0008-6350-42c247000000',
  'x-ms-client-request-id',
  '5a80e3b4-766b-456f-afad-c755ef52b627',
  'x-ms-version',
  '2021-06-08',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-10-25T14:48:00.0000000Z',
  'x-ms-file-last-write-time',
  '2019-10-15T14:48:00.0000000Z',
  'x-ms-file-creation-time',
  '2019-10-05T14:48:00.0000000Z',
  'x-ms-file-permission-key',
  '4328888732566833788*11228742651815927693',
  'x-ms-file-attributes',
  'ReadOnly | Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Date',
  'Mon, 28 Mar 2022 03:02:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share164843652924604702/sourcedir164843653130507247')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:5401f2d2-701a-0008-6450-42c247000000\nTime:2022-03-28T03:02:12.4001256Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '5401f2d2-701a-0008-6450-42c247000000',
  'x-ms-client-request-id',
  '41fbb6cd-b3b6-4f11-96ba-7ef048f348cc',
  'x-ms-version',
  '2021-06-08',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Mon, 28 Mar 2022 03:02:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164843652924604702')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '5401f2d3-701a-0008-6550-42c247000000',
  'x-ms-client-request-id',
  'b0062bbd-bc31-491c-835c-42ae7187e755',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 28 Mar 2022 03:02:11 GMT'
]);
