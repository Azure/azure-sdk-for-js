let nock = require('nock');

module.exports.hash = "cbdf1540420c7743b54cbd8c686956dd";

module.exports.testInfo = {"uniqueName":{"share":"share167747853425308028","dir":"dir167747853450908865","file":"file167747853476906453"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853425308028')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:34 GMT',
  'ETag',
  '"0x8DB188A0988EC3E"',
  'x-ms-request-id',
  '1775e96a-e01a-0001-6c72-4a1b65000000',
  'x-ms-client-request-id',
  '9ddbd53b-7c9e-4f1e-a832-cea46f98839d',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853425308028/dir167747853450908865....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:35 GMT',
  'ETag',
  '"0x8DB188A09B1D740"',
  'x-ms-request-id',
  '1775e96c-e01a-0001-6d72-4a1b65000000',
  'x-ms-client-request-id',
  '474f49c1-1a7a-4493-bcd7-1dbefd75d952',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:35.0260544Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:35.0260544Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:35.0260544Z',
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
  'Mon, 27 Feb 2023 06:15:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747853425308028/dir167747853450908865..../file167747853476906453....')
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:1775e971-e01a-0001-6e72-4a1b65000000\nTime:2023-02-27T06:15:35.2749233Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '1775e971-e01a-0001-6e72-4a1b65000000',
  'x-ms-client-request-id',
  'd5931e75-b665-4960-8e5a-378f858292a5',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Mon, 27 Feb 2023 06:15:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853425308028/dir167747853450908865..../file167747853476906453....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:35 GMT',
  'ETag',
  '"0x8DB188A09FE49E2"',
  'x-ms-request-id',
  '1775e972-e01a-0001-6f72-4a1b65000000',
  'x-ms-client-request-id',
  '3dec5c40-1ba9-4366-be57-eb3f20be53a9',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:35.5270626Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:35.5270626Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:35.5270626Z',
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
  'Mon, 27 Feb 2023 06:15:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747853425308028/dir167747853450908865..../file167747853476906453....')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e973-e01a-0001-7072-4a1b65000000',
  'x-ms-client-request-id',
  'f02b7904-e964-4b57-8675-7754ee03fcca',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747853425308028')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e974-e01a-0001-7172-4a1b65000000',
  'x-ms-client-request-id',
  'bb8d9370-7b20-40c3-bd95-a0e24a306732',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:35 GMT'
]);
