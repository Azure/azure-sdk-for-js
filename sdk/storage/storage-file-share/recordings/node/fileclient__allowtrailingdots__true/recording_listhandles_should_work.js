let nock = require('nock');

module.exports.hash = "4d573cf2ae266dd22c92e82ceb63b78f";

module.exports.testInfo = {"uniqueName":{"share":"share167747748828504062","dir":"dir167747748853808190","file":"file167747748880006414"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748828504062')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:08 GMT',
  'ETag',
  '"0x8DB18879A14CABC"',
  'x-ms-request-id',
  'e51cf766-601a-0004-4270-4a0ec4000000',
  'x-ms-client-request-id',
  '8df070de-c3e3-497c-a31d-13ab4c6a9680',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:58:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748828504062/dir167747748853808190....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:09 GMT',
  'ETag',
  '"0x8DB18879A3DB9F6"',
  'x-ms-request-id',
  'e51cf768-601a-0004-4370-4a0ec4000000',
  'x-ms-client-request-id',
  'b2cf10df-bfdd-4e56-af79-83c3a218d83f',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:58:09.0445302Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:09.0445302Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:58:09.0445302Z',
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
  'Mon, 27 Feb 2023 05:58:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748828504062/dir167747748853808190..../file167747748880006414....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:09 GMT',
  'ETag',
  '"0x8DB18879A64CA47"',
  'x-ms-request-id',
  'e51cf769-601a-0004-4470-4a0ec4000000',
  'x-ms-client-request-id',
  '6b31c8e6-52ce-4ff4-abb7-a7378fbd1554',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:58:09.3005383Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:09.3005383Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:58:09.3005383Z',
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
  'Mon, 27 Feb 2023 05:58:09 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747748828504062/dir167747748853808190..../file167747748880006414....')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'e51cf76a-601a-0004-4570-4a0ec4000000',
  'x-ms-client-request-id',
  '84478ed8-cfb9-4bb9-b9e4-e8e36bb95361',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 05:58:09 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747748828504062')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf76b-601a-0004-4670-4a0ec4000000',
  'x-ms-client-request-id',
  '052e3701-83a7-4199-a96d-566b2ab94b0e',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:58:09 GMT'
]);
