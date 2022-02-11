let nock = require('nock');

module.exports.hash = "25164c75415b1b6d9f23fa0d52853d6f";

module.exports.testInfo = {"uniqueName":{"share":"share164420388435807982","dir":"dir164420388533008754","file":"file164420388642700155","destfile":"destfile164420388741902944"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164420388435807982')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 07 Feb 2022 03:18:05 GMT',
  'ETag',
  '"0x8D9E9E875050214"',
  'x-ms-request-id',
  'f3918699-701a-0008-69d1-1bc247000000',
  'x-ms-client-request-id',
  '2199c001-f426-4633-9779-17390e3ea08b',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Mon, 07 Feb 2022 03:18:05 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164420388435807982/dir164420388533008754')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 07 Feb 2022 03:18:06 GMT',
  'ETag',
  '"0x8D9E9E875ABA6DB"',
  'x-ms-request-id',
  '1d6c0e5f-601a-0002-1ad1-1be805000000',
  'x-ms-client-request-id',
  '4fb0705f-9995-410b-bab8-0ec067c0fb33',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-07T03:18:06.5503963Z',
  'x-ms-file-last-write-time',
  '2022-02-07T03:18:06.5503963Z',
  'x-ms-file-creation-time',
  '2022-02-07T03:18:06.5503963Z',
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
  'Mon, 07 Feb 2022 03:18:06 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164420388435807982/dir164420388533008754/file164420388642700155')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 07 Feb 2022 03:18:07 GMT',
  'ETag',
  '"0x8D9E9E87644B31F"',
  'x-ms-request-id',
  '7440774b-e01a-0001-57d1-1b1b65000000',
  'x-ms-client-request-id',
  'f38ec15d-cf59-4122-99a6-00f8a7386aa7',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-07T03:18:07.5534111Z',
  'x-ms-file-last-write-time',
  '2022-02-07T03:18:07.5534111Z',
  'x-ms-file-creation-time',
  '2022-02-07T03:18:07.5534111Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 07 Feb 2022 03:18:07 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164420388435807982/destfile164420388741902944')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 07 Feb 2022 03:18:08 GMT',
  'ETag',
  '"0x8D9E9E876E6C02E"',
  'x-ms-request-id',
  '0550e31e-601a-0004-1ad1-1b0ec4000000',
  'x-ms-client-request-id',
  'efba7c56-20af-48a6-a00b-2df5eede69e1',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-07T03:18:08.6154286Z',
  'x-ms-file-last-write-time',
  '2022-02-07T03:18:07.5534111Z',
  'x-ms-file-creation-time',
  '2022-02-07T03:18:07.5534111Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 07 Feb 2022 03:18:08 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164420388435807982/destfile164420388741902944')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 07 Feb 2022 03:18:08 GMT',
  'ETag',
  '"0x8D9E9E876E6C02E"',
  'x-ms-request-id',
  '6bc21ab7-a01a-0005-2fd1-1bf0c9000000',
  'x-ms-client-request-id',
  'dbb382e6-9dee-47fa-b3a7-c6f2be49aa57',
  'x-ms-version',
  '2021-04-10',
  'x-ms-meta-key1',
  'vala',
  'x-ms-meta-key2',
  'valb',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2022-02-07T03:18:08.6154286Z',
  'x-ms-file-last-write-time',
  '2022-02-07T03:18:07.5534111Z',
  'x-ms-file-creation-time',
  '2022-02-07T03:18:07.5534111Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-key1,x-ms-meta-key2,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 07 Feb 2022 03:18:09 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164420388435807982/dir164420388533008754/file164420388642700155')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0550e323-601a-0004-1bd1-1b0ec4000000',
  'x-ms-client-request-id',
  '45b64f75-fe39-4b72-8431-ebdb73aae57f',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 07 Feb 2022 03:18:10 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164420388435807982')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0f57ea03-201a-0000-08d1-1be568000000',
  'x-ms-client-request-id',
  'dc0a4890-ab4f-4693-b333-0c20e5e58dd3',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Mon, 07 Feb 2022 03:18:11 GMT',
  'Connection',
  'close'
]);
