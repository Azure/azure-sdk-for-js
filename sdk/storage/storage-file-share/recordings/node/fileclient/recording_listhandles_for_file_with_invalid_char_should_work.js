let nock = require('nock');

module.exports.hash = "dd4542059d39a7de420bdb64fea81cdc";

module.exports.testInfo = {"uniqueName":{"share":"share167569196797808310","dir":"dir167569196799104222","file":"file167569196801400947","file￾":"file￾167569196801503745"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167569196797808310')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 13:59:27 GMT',
  'ETag',
  '"0x8DB084A5CC355D8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7091c9f6-c01a-0090-5333-3a1807000000',
  'x-ms-client-request-id',
  'b577ae0c-aa17-4243-a09d-5308b5dba2d3',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 13:59:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167569196797808310/dir167569196799104222')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 13:59:28 GMT',
  'ETag',
  '"0x8DB084A5CC72B78"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7091c9f8-c01a-0090-5433-3a1807000000',
  'x-ms-client-request-id',
  '26cca839-6558-4760-a2fe-471f9e75c93f',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T13:59:28.0215928Z',
  'x-ms-file-last-write-time',
  '2023-02-06T13:59:28.0215928Z',
  'x-ms-file-creation-time',
  '2023-02-06T13:59:28.0215928Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 13:59:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167569196797808310/file%EF%BF%BE167569196801503745')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 13:59:28 GMT',
  'ETag',
  '"0x8DB084A5CC9C32E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7091c9f9-c01a-0090-5533-3a1807000000',
  'x-ms-client-request-id',
  'aa1fbc95-d39e-448b-a305-2057c3fc0e85',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T13:59:28.0385838Z',
  'x-ms-file-last-write-time',
  '2023-02-06T13:59:28.0385838Z',
  'x-ms-file-creation-time',
  '2023-02-06T13:59:28.0385838Z',
  'x-ms-file-permission-key',
  '13809038870468939698*1658283376881248060',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 13:59:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167569196797808310/file%EF%BF%BE167569196801503745')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7091c9fa-c01a-0090-5633-3a1807000000',
  'x-ms-client-request-id',
  '76d8c2cb-625f-44e0-a220-e91a18347b10',
  'x-ms-version',
  '2021-12-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 06 Feb 2023 13:59:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167569196797808310')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7091c9fb-c01a-0090-5733-3a1807000000',
  'x-ms-client-request-id',
  'ca613457-61af-4e49-ab54-8bd8c8d9f43c',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 13:59:27 GMT'
]);
