let nock = require('nock');

module.exports.hash = "cbdf1540420c7743b54cbd8c686956dd";

module.exports.testInfo = {"uniqueName":{"share":"share167747746164405407","dir":"dir167747746190101571","file":"file167747746216208670"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746164405407')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:42 GMT',
  'ETag',
  '"0x8DB18878A33A6E8"',
  'x-ms-request-id',
  'e51cf6db-601a-0004-5e70-4a0ec4000000',
  'x-ms-client-request-id',
  'cd45161a-c547-4bba-afb4-e7812680e1bf',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746164405407/dir167747746190101571....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:42 GMT',
  'ETag',
  '"0x8DB18878A5CDA8D"',
  'x-ms-request-id',
  'e51cf6dd-601a-0004-5f70-4a0ec4000000',
  'x-ms-client-request-id',
  'de6f0cd7-34af-4514-b8c5-586a410eef06',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:42.4049805Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:42.4049805Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:42.4049805Z',
  'x-ms-file-permission-key',
  '13895902193744473398*5510371786133343095',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:57:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747746164405407/dir167747746190101571..../file167747746216208670....')
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:e51cf6de-601a-0004-6070-4a0ec4000000\nTime:2023-02-27T05:57:42.6549657Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'e51cf6de-601a-0004-6070-4a0ec4000000',
  'x-ms-client-request-id',
  '12e1e246-8712-488a-ac4f-d60984a5f05e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Mon, 27 Feb 2023 05:57:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746164405407/dir167747746190101571..../file167747746216208670....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:42 GMT',
  'ETag',
  '"0x8DB18878AA8FF5A"',
  'x-ms-request-id',
  'e51cf6df-601a-0004-6170-4a0ec4000000',
  'x-ms-client-request-id',
  '2aaf5ed7-5a70-41a0-aaa6-1c39b202cf73',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:42.9039962Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:42.9039962Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:42.9039962Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:57:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747746164405407/dir167747746190101571..../file167747746216208670....')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf6e0-601a-0004-6270-4a0ec4000000',
  'x-ms-client-request-id',
  '660b11ff-38ff-4b1e-8e94-d67651cc09c5',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747746164405407')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf6e2-601a-0004-6370-4a0ec4000000',
  'x-ms-client-request-id',
  '9742a49d-6702-4d87-8e54-f9d6934965c5',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:42 GMT'
]);
