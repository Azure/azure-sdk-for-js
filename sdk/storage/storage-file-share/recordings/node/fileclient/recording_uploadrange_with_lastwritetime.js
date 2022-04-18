let nock = require('nock');

module.exports.hash = "56bd57a45a3500d148c4497b89f9b0d5";

module.exports.testInfo = {"uniqueName":{"share":"share164267027036700870","dir":"dir164267027138804994","file":"file164267027172900943"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027036700870')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:51 GMT',
  'ETag',
  '"0x8D9DBF5BBDDAF95"',
  'x-ms-request-id',
  '41cd6f45-701a-0008-09de-0dc247000000',
  'x-ms-client-request-id',
  'f9ebaef6-8c00-4dc6-bbda-0dc8b03c2d37',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Thu, 20 Jan 2022 09:17:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027036700870/dir164267027138804994')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:51 GMT',
  'ETag',
  '"0x8D9DBF5BC13C2E9"',
  'x-ms-request-id',
  '41cd6f48-701a-0008-0ade-0dc247000000',
  'x-ms-client-request-id',
  'f91133e4-bd32-4bd4-affc-d39aaf98ee15',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-01-20T09:17:51.8517993Z',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:51.8517993Z',
  'x-ms-file-creation-time',
  '2022-01-20T09:17:51.8517993Z',
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
  'Thu, 20 Jan 2022 09:17:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027036700870/dir164267027138804994/file164267027172900943')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:52 GMT',
  'ETag',
  '"0x8D9DBF5BC3A36D8"',
  'x-ms-request-id',
  '41cd6f4a-701a-0008-0bde-0dc247000000',
  'x-ms-client-request-id',
  '8d875cd8-79a7-4386-9516-b7cbb117cb23',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-01-20T09:17:52.1038040Z',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:52.1038040Z',
  'x-ms-file-creation-time',
  '2022-01-20T09:17:52.1038040Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 20 Jan 2022 09:17:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027036700870/dir164267027138804994/file164267027172900943', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:52 GMT',
  'ETag',
  '"0x8D9DBF5BC6083B7"',
  'x-ms-request-id',
  '41cd6f4b-701a-0008-0cde-0dc247000000',
  'x-ms-client-request-id',
  '8bea078b-dfb5-4663-9d6e-ad5dc4081be7',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:52.1038040Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 20 Jan 2022 09:17:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027036700870/dir164267027138804994/file164267027172900943', "World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:52 GMT',
  'ETag',
  '"0x8D9DBF5BC87E23E"',
  'x-ms-request-id',
  '41cd6f4c-701a-0008-0dde-0dc247000000',
  'x-ms-client-request-id',
  '80db599a-2a37-4bb0-b0e4-9af48fc9e744',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:52.6128190Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 20 Jan 2022 09:17:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share164267027036700870/dir164267027138804994/file164267027172900943')
  .reply(206, "HelloWor", [
  'Content-Length',
  '8',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-7/10',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:52 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9DBF5BC87E23E"',
  'x-ms-request-id',
  '41cd6f4e-701a-0008-0fde-0dc247000000',
  'x-ms-client-request-id',
  '55de8dac-5ba7-4ca7-a653-c76e67f88c57',
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
  '2022-01-20T09:17:52.6128190Z',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:52.6128190Z',
  'x-ms-file-creation-time',
  '2022-01-20T09:17:52.1038040Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Range,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 20 Jan 2022 09:17:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164267027036700870')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '41cd6f4f-701a-0008-10de-0dc247000000',
  'x-ms-client-request-id',
  '392c11ea-ece6-4a8d-a9d8-4961670b11ed',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Thu, 20 Jan 2022 09:17:52 GMT'
]);
