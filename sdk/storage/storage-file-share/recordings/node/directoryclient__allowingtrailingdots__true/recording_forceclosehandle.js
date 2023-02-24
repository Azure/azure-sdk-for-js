let nock = require('nock');

module.exports.hash = "a18176223400c2cc573fcb6318812029";

module.exports.testInfo = {"uniqueName":{"share":"share167875881880805597","dir":"dir167875881907207595"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881880805597')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:39 GMT',
  'ETag',
  '"0x8DB242EEE8230E4"',
  'x-ms-request-id',
  '0b0de359-701a-0008-7217-56c247000000',
  'x-ms-client-request-id',
  'f015a6b6-f7a4-49bc-b5dd-5a5afa6f1801',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881880805597/dir167875881907207595.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:39 GMT',
  'ETag',
  '"0x8DB242EEEAD8CFC"',
  'x-ms-request-id',
  '0b0de35b-701a-0008-7317-56c247000000',
  'x-ms-client-request-id',
  '8c166760-0b61-43a7-a0bf-f5f35baa9c12',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:39.4503932Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:39.4503932Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:39.4503932Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875881880805597/dir167875881907207595.')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '0b0de35c-701a-0008-7417-56c247000000',
  'x-ms-client-request-id',
  '534209ed-2cb2-4043-9e7a-fc5b3cfc27a4',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875881880805597')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de35d-701a-0008-7517-56c247000000',
  'x-ms-client-request-id',
  '41eae5fc-f394-4095-a25e-d43c9c2954d9',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:39 GMT'
]);
