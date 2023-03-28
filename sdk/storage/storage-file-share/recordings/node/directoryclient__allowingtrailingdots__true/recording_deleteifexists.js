let nock = require('nock');

module.exports.hash = "607a58b0e161151afbb4eaa4b16abc74";

module.exports.testInfo = {"uniqueName":{"share":"share167875881409101328","dir":"dir167875881434906854","dir1":"dir1167875881461504309"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881409101328')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:34 GMT',
  'ETag',
  '"0x8DB242EEBB23B66"',
  'x-ms-request-id',
  '0b0de33e-701a-0008-5f17-56c247000000',
  'x-ms-client-request-id',
  '342b6517-15c7-4478-9b5d-f7c8ed014261',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881409101328/dir167875881434906854.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:34 GMT',
  'ETag',
  '"0x8DB242EEBDC63EA"',
  'x-ms-request-id',
  '0b0de342-701a-0008-6017-56c247000000',
  'x-ms-client-request-id',
  '57174f72-0bce-44c5-bb6a-fd24a79a8539',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:34.7241962Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:34.7241962Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:34.7241962Z',
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
  'Tue, 14 Mar 2023 01:53:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881409101328/dir1167875881461504309...')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:34 GMT',
  'ETag',
  '"0x8DB242EEC02A959"',
  'x-ms-request-id',
  '0b0de344-701a-0008-6117-56c247000000',
  'x-ms-client-request-id',
  '6da642c2-30e4-48aa-a51b-13fb1a87726a',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:34.9750105Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:34.9750105Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:34.9750105Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875881409101328/dir1167875881461504309...')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de345-701a-0008-6217-56c247000000',
  'x-ms-client-request-id',
  'ddd0e0d7-7385-4a2f-a933-faa2be80710c',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875881409101328/dir1167875881461504309...')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:0b0de346-701a-0008-6317-56c247000000\nTime:2023-03-14T01:53:35.4989715Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '0b0de346-701a-0008-6317-56c247000000',
  'x-ms-client-request-id',
  '49229b27-f408-497a-a568-8a482ebce6ce',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Tue, 14 Mar 2023 01:53:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875881409101328')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de348-701a-0008-6517-56c247000000',
  'x-ms-client-request-id',
  'dc5e695b-8021-4607-aaa0-239efb2765e9',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:35 GMT'
]);
