let nock = require('nock');

module.exports.hash = "e91ca03d21f183894985a79020054507";

module.exports.testInfo = {"uniqueName":{"share":"share164421962098609339","sourcedir":"sourcedir164421962123504286","destfile":"destfile164421962151001555"},"newDate":{"tmr":"2022-02-07T07:40:21.235Z"}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164421962098609339')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 07 Feb 2022 07:40:21 GMT',
  'ETag',
  '"0x8D9EA0D184B9139"',
  'x-ms-request-id',
  '1da71517-a01a-0003-6df5-1b1608000000',
  'x-ms-client-request-id',
  '382891af-414e-4fd8-a422-41777c106563',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Mon, 07 Feb 2022 07:40:21 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164421962098609339/sourcedir164421962123504286')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 07 Feb 2022 07:40:21 GMT',
  'ETag',
  '"0x8D9EA0D18757B8D"',
  'x-ms-request-id',
  '1da71519-a01a-0003-6ef5-1b1608000000',
  'x-ms-client-request-id',
  '34549808-4dde-4bda-a581-3bc48e964e9c',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-07T07:40:21.5462797Z',
  'x-ms-file-last-write-time',
  '2022-02-07T07:40:21.5462797Z',
  'x-ms-file-creation-time',
  '2022-02-07T07:40:21.5462797Z',
  'x-ms-file-permission-key',
  '12098348342869812368*3117928199373521617',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 07 Feb 2022 07:40:21 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164421962098609339/destfile164421962151001555')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 07 Feb 2022 07:40:21 GMT',
  'ETag',
  '"0x8D9EA0D189D00FD"',
  'x-ms-request-id',
  '1da7151a-a01a-0003-6ff5-1b1608000000',
  'x-ms-client-request-id',
  '9d836fa3-7b0d-4a12-893a-d4d021449464',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-07T07:40:21.8052861Z',
  'x-ms-file-last-write-time',
  '2022-02-07T07:40:21.8052861Z',
  'x-ms-file-creation-time',
  '2022-02-07T07:40:21.8052861Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 07 Feb 2022 07:40:21 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164421962098609339/destfile164421962151001555')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 07 Feb 2022 07:40:22 GMT',
  'ETag',
  '"0x8D9EA0D18C570B7"',
  'x-ms-request-id',
  '1da7151b-a01a-0003-70f5-1b1608000000',
  'x-ms-client-request-id',
  '6f90f25e-f5d2-416d-a61a-b47f16aec2b3',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-07T07:40:22.0702903Z',
  'x-ms-file-last-write-time',
  '2022-02-07T07:40:21.5462797Z',
  'x-ms-file-creation-time',
  '2022-02-07T07:40:21.5462797Z',
  'x-ms-file-permission-key',
  '12098348342869812368*3117928199373521617',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 07 Feb 2022 07:40:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share164421962098609339/sourcedir164421962123504286')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:1da7151c-a01a-0003-71f5-1b1608000000\nTime:2022-02-07T07:40:22.3356383Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '1da7151c-a01a-0003-71f5-1b1608000000',
  'x-ms-client-request-id',
  '1d626672-d600-4861-a1f4-b73551ea21d7',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 07 Feb 2022 07:40:22 GMT'
]);
