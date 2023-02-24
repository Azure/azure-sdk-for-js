let nock = require('nock');

module.exports.hash = "4d573cf2ae266dd22c92e82ceb63b78f";

module.exports.testInfo = {"uniqueName":{"share":"share167747856140305957","dir":"dir167747856166208259","file":"file167747856192204138"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747856140305957')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:16:01 GMT',
  'ETag',
  '"0x8DB188A19B7E83C"',
  'x-ms-request-id',
  '1775ea00-e01a-0001-5b72-4a1b65000000',
  'x-ms-client-request-id',
  'd5bfce5d-1ae4-40b4-9b61-e9138bdfffa2',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:16:01 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747856140305957/dir167747856166208259....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:16:02 GMT',
  'ETag',
  '"0x8DB188A19E0FE01"',
  'x-ms-request-id',
  '1775ea02-e01a-0001-5c72-4a1b65000000',
  'x-ms-client-request-id',
  '85beb736-1f62-4380-a323-d5d9c4e0ae4c',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:16:02.1786113Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:16:02.1786113Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:16:02.1786113Z',
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
  'Mon, 27 Feb 2023 06:16:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747856140305957/dir167747856166208259..../file167747856192204138....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:16:02 GMT',
  'ETag',
  '"0x8DB188A1A085CCD"',
  'x-ms-request-id',
  '1775ea03-e01a-0001-5d72-4a1b65000000',
  'x-ms-client-request-id',
  '21063d05-30b4-457b-87ba-a1560738b853',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:16:02.4366285Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:16:02.4366285Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:16:02.4366285Z',
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
  'Mon, 27 Feb 2023 06:16:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747856140305957/dir167747856166208259..../file167747856192204138....')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '1775ea04-e01a-0001-5e72-4a1b65000000',
  'x-ms-client-request-id',
  'b61188b8-2aef-4ab2-a9c4-40475224316e',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 06:16:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747856140305957')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775ea05-e01a-0001-5f72-4a1b65000000',
  'x-ms-client-request-id',
  '27433276-3b8c-4982-b6a0-d696f3232934',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:16:02 GMT'
]);
