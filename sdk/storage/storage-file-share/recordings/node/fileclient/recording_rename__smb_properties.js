let nock = require('nock');

module.exports.hash = "0a9248d8e4f22c09ece69db40608873c";

module.exports.testInfo = {"uniqueName":{"share":"share164847142444103758","dir":"dir164847142593505796","file":"file164847142622306616","destfile":"destfile164847142622402231","sourcefile":"sourcefile164847142647600624"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164847142444103758')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Mar 2022 12:43:46 GMT',
  'ETag',
  '"0x8DA10B899682081"',
  'x-ms-request-id',
  '540255d9-701a-0008-25a1-42c247000000',
  'x-ms-client-request-id',
  '290b5430-0f39-42b6-9d39-eab8d07cf149',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 28 Mar 2022 12:43:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164847142444103758/dir164847142593505796')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Mar 2022 12:43:46 GMT',
  'ETag',
  '"0x8DA10B8999B3234"',
  'x-ms-request-id',
  '540255dc-701a-0008-26a1-42c247000000',
  'x-ms-client-request-id',
  '562a1014-35ea-400c-9512-74466f8b1f4b',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-03-28T12:43:46.3458356Z',
  'x-ms-file-last-write-time',
  '2022-03-28T12:43:46.3458356Z',
  'x-ms-file-creation-time',
  '2022-03-28T12:43:46.3458356Z',
  'x-ms-file-permission-key',
  '1690096059463891404*11228742651815927693',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 28 Mar 2022 12:43:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164847142444103758', {"permission":"O:S-1-5-21-2127521184-1604012920-1887927527-21560751G:S-1-5-21-2127521184-1604012920-1887927527-513D:AI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-397955417-626881126-188441444-3053964)"})
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '540255de-701a-0008-27a1-42c247000000',
  'x-ms-client-request-id',
  '0f79d4b4-d5a7-4898-9c28-29c2ea633cbc',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-permission-key',
  '4328888732566833788*11228742651815927693',
  'Date',
  'Mon, 28 Mar 2022 12:43:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164847142444103758/sourcefile164847142647600624')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Mar 2022 12:43:46 GMT',
  'ETag',
  '"0x8DA10B899E9C7D3"',
  'x-ms-request-id',
  '540255df-701a-0008-28a1-42c247000000',
  'x-ms-client-request-id',
  '4de97c59-fd5d-46ad-8af4-b3eaccc13be1',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-03-28T12:43:46.8608467Z',
  'x-ms-file-last-write-time',
  '2022-03-28T12:43:46.8608467Z',
  'x-ms-file-creation-time',
  '2022-03-28T12:43:46.8608467Z',
  'x-ms-file-permission-key',
  '8782974441151326443*11228742651815927693',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 28 Mar 2022 12:43:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164847142444103758/destfile164847142622402231')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Mar 2022 12:43:47 GMT',
  'ETag',
  '"0x8DA10B89A119B42"',
  'x-ms-request-id',
  '540255e0-701a-0008-29a1-42c247000000',
  'x-ms-client-request-id',
  '55c84dde-46b7-46f3-8b50-2f1f6886babc',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2019-10-25T14:48:00.0000000Z',
  'x-ms-file-last-write-time',
  '2019-10-15T14:48:00.0000000Z',
  'x-ms-file-creation-time',
  '2019-10-05T14:48:00.0000000Z',
  'x-ms-file-permission-key',
  '4328888732566833788*11228742651815927693',
  'x-ms-file-attributes',
  'ReadOnly | Hidden',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 28 Mar 2022 12:43:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164847142444103758/destfile164847142622402231')
  .reply(200, "", [
  'Content-Length',
  '2048',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 28 Mar 2022 12:43:47 GMT',
  'ETag',
  '"0x8DA10B89A119B42"',
  'x-ms-request-id',
  '540255e1-701a-0008-2aa1-42c247000000',
  'x-ms-client-request-id',
  '790f5f7e-07e2-4066-bd41-96d0cad3ea02',
  'x-ms-version',
  '2021-06-08',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2019-10-25T14:48:00.0000000Z',
  'x-ms-file-last-write-time',
  '2019-10-15T14:48:00.0000000Z',
  'x-ms-file-creation-time',
  '2019-10-05T14:48:00.0000000Z',
  'x-ms-file-permission-key',
  '4328888732566833788*11228742651815927693',
  'x-ms-file-attributes',
  'ReadOnly | Hidden',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Mar 2022 12:43:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164847142444103758/sourcefile164847142647600624')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '540255e2-701a-0008-2ba1-42c247000000',
  'x-ms-client-request-id',
  '063f5365-c257-484f-ada0-49a4c392d9cf',
  'x-ms-version',
  '2021-06-08',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Mar 2022 12:43:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164847142444103758')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '540255e3-701a-0008-2ca1-42c247000000',
  'x-ms-client-request-id',
  '0f1b2c4d-967a-4bc9-a21c-cd56c6b2b280',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 28 Mar 2022 12:43:47 GMT'
]);
