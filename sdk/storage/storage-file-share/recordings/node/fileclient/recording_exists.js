let nock = require('nock');

module.exports.hash = "9d35b839f8787ab888e77eb6d4ce6c08";

module.exports.testInfo = {"uniqueName":{"share":"share158978108371900572","dir":"dir158978108401803708","file":"file158978108431706300"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978108371900572')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:21 GMT',
  'ETag',
  '"0x8D7FAEF7E552973"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2653-401a-0012-25d8-2cd9df000000',
  'x-ms-client-request-id',
  'd24a9bbc-3e4e-4683-b62a-520501705ca1',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:21 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978108371900572/dir158978108401803708')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:22 GMT',
  'ETag',
  '"0x8D7FAEF7E826D55"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2656-401a-0012-26d8-2cd9df000000',
  'x-ms-client-request-id',
  '8853c31d-dbf0-42b9-93c5-547efcd2883b',
  'x-ms-version',
  '2019-07-07',
  'x-ms-file-change-time',
  '2020-05-18T05:51:22.2819157Z',
  'x-ms-file-last-write-time',
  '2020-05-18T05:51:22.2819157Z',
  'x-ms-file-creation-time',
  '2020-05-18T05:51:22.2819157Z',
  'x-ms-file-permission-key',
  '15783046271365971681*12957844477200427368',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 18 May 2020 05:51:21 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share158978108371900572/dir158978108401803708/file158978108431706300')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2658-401a-0012-28d8-2cd9df000000',
  'x-ms-client-request-id',
  'aeca4849-acf4-444f-be33-12061be7f0eb',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 18 May 2020 05:51:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978108371900572/dir158978108401803708/file158978108431706300')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:22 GMT',
  'ETag',
  '"0x8D7FAEF7EDD4778"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2659-401a-0012-29d8-2cd9df000000',
  'x-ms-client-request-id',
  '4fee2dc2-d702-4738-a6fc-e8d8b8cc9d8c',
  'x-ms-version',
  '2019-07-07',
  'x-ms-file-change-time',
  '2020-05-18T05:51:22.8773240Z',
  'x-ms-file-last-write-time',
  '2020-05-18T05:51:22.8773240Z',
  'x-ms-file-creation-time',
  '2020-05-18T05:51:22.8773240Z',
  'x-ms-file-permission-key',
  '1978041915872117222*12957844477200427368',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 18 May 2020 05:51:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share158978108371900572/dir158978108401803708/file158978108431706300')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:22 GMT',
  'ETag',
  '"0x8D7FAEF7EDD4778"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da265b-401a-0012-2ad8-2cd9df000000',
  'x-ms-client-request-id',
  '263ba5e7-f47c-43fc-ba21-ef446e4d8c96',
  'x-ms-version',
  '2019-07-07',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2020-05-18T05:51:22.8773240Z',
  'x-ms-file-last-write-time',
  '2020-05-18T05:51:22.8773240Z',
  'x-ms-file-creation-time',
  '2020-05-18T05:51:22.8773240Z',
  'x-ms-file-permission-key',
  '1978041915872117222*12957844477200427368',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 18 May 2020 05:51:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share158978108371900572')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da265d-401a-0012-2bd8-2cd9df000000',
  'x-ms-client-request-id',
  '07ecb2b0-62ab-458c-a83e-22fcc20b5376',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:23 GMT'
]);
