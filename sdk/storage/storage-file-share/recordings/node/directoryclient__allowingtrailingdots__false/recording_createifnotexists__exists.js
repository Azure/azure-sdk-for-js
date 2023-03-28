let nock = require('nock');

module.exports.hash = "fa0f6c509fa1edcaae47cef93f435933";

module.exports.testInfo = {"uniqueName":{"share":"share167875882574609492","dir":"dir167875882599909675"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882574609492')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:46 GMT',
  'ETag',
  '"0x8DB242EF2A4C494"',
  'x-ms-request-id',
  '0b0de382-701a-0008-0c17-56c247000000',
  'x-ms-client-request-id',
  '4c7a43fd-9d2e-4b0e-a092-0844282d287e',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:45 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882574609492/dir167875882599909675.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:46 GMT',
  'ETag',
  '"0x8DB242EF2CDD909"',
  'x-ms-request-id',
  '0b0de384-701a-0008-0d17-56c247000000',
  'x-ms-client-request-id',
  '8db52f2a-0b55-479c-b5b2-b11982e0615c',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:46.3729417Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:46.3729417Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:46.3729417Z',
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
  'Tue, 14 Mar 2023 01:53:45 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882574609492/dir167875882599909675.')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceAlreadyExists</Code><Message>The specified resource already exists.\nRequestId:0b0de385-701a-0008-0e17-56c247000000\nTime:2023-03-14T01:53:46.6337564Z</Message></Error>", [
  'Content-Length',
  '228',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '0b0de385-701a-0008-0e17-56c247000000',
  'x-ms-client-request-id',
  'dbeed1bf-bff0-4d13-bc33-f6e98a2f3480',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceAlreadyExists',
  'Date',
  'Tue, 14 Mar 2023 01:53:45 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875882574609492')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de386-701a-0008-0f17-56c247000000',
  'x-ms-client-request-id',
  '395318dd-e4c4-4dd6-8f32-253e1e30519d',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:46 GMT'
]);
