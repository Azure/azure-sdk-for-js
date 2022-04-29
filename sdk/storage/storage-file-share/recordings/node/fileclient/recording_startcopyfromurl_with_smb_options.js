let nock = require('nock');

module.exports.hash = "e61b12c2940a84ff06ca3620ddac4e52";

module.exports.testInfo = {"uniqueName":{"share":"share164249311330007817","dir":"dir164249311356301141","file":"file164249311384406709","copiedfile":"copiedfile164249311411907707"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164249311330007817')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 18 Jan 2022 08:05:13 GMT',
  'ETag',
  '"0x8D9DA59419EE4B9"',
  'x-ms-request-id',
  'fe550b6b-201a-0006-3242-0c03a9000000',
  'x-ms-client-request-id',
  '53b12834-fc51-4967-b4bd-a452c4ee87e2',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Tue, 18 Jan 2022 08:05:12 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164249311330007817/dir164249311356301141')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 18 Jan 2022 08:05:14 GMT',
  'ETag',
  '"0x8D9DA5941C94F5F"',
  'x-ms-request-id',
  'fe550b6d-201a-0006-3342-0c03a9000000',
  'x-ms-client-request-id',
  '14b5a76d-da6c-4f9e-a5be-9c8de44a0d75',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-01-18T08:05:14.0292447Z',
  'x-ms-file-last-write-time',
  '2022-01-18T08:05:14.0292447Z',
  'x-ms-file-creation-time',
  '2022-01-18T08:05:14.0292447Z',
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
  'Tue, 18 Jan 2022 08:05:14 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164249311330007817/dir164249311356301141/file164249311384406709')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 18 Jan 2022 08:05:14 GMT',
  'ETag',
  '"0x8D9DA5941F3E208"',
  'x-ms-request-id',
  'fe550b6e-201a-0006-3442-0c03a9000000',
  'x-ms-client-request-id',
  'c20f0bfd-645a-4ca7-80b0-814dac0b15c3',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-01-18T08:05:14.3082504Z',
  'x-ms-file-last-write-time',
  '2022-01-18T08:05:14.3082504Z',
  'x-ms-file-creation-time',
  '2022-01-18T08:05:14.3082504Z',
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
  'Tue, 18 Jan 2022 08:05:14 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164249311330007817/dir164249311356301141/copiedfile164249311411907707')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 18 Jan 2022 08:05:14 GMT',
  'ETag',
  '"0x8D9DA59423CD211"',
  'x-ms-request-id',
  'fe550b6f-201a-0006-3542-0c03a9000000',
  'x-ms-client-request-id',
  '8db4fde4-063a-4766-8861-37c4053b4e90',
  'x-ms-version',
  '2021-06-08',
  'x-ms-copy-id',
  '5f280fd9-f0cf-4b5c-9ba8-bcde3433b337',
  'x-ms-copy-status',
  'success',
  'Date',
  'Tue, 18 Jan 2022 08:05:14 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164249311330007817/dir164249311356301141/file164249311384406709')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 18 Jan 2022 08:05:14 GMT',
  'ETag',
  '"0x8D9DA5941F3E208"',
  'x-ms-request-id',
  'fe550b70-201a-0006-3642-0c03a9000000',
  'x-ms-client-request-id',
  '023666c7-7f19-4f93-b4c6-2e9ad954a55d',
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
  '2022-01-18T08:05:14.3082504Z',
  'x-ms-file-last-write-time',
  '2022-01-18T08:05:14.3082504Z',
  'x-ms-file-creation-time',
  '2022-01-18T08:05:14.3082504Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 18 Jan 2022 08:05:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164249311330007817/dir164249311356301141/copiedfile164249311411907707')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 18 Jan 2022 08:05:14 GMT',
  'ETag',
  '"0x8D9DA59423CD211"',
  'x-ms-request-id',
  'fe550b71-201a-0006-3742-0c03a9000000',
  'x-ms-client-request-id',
  '1da52686-9270-48b7-b2f5-17239a58ecd9',
  'x-ms-version',
  '2021-06-08',
  'x-ms-copy-id',
  '5f280fd9-f0cf-4b5c-9ba8-bcde3433b337',
  'x-ms-copy-source',
  'https://fakestorageaccount.file.core.windows.net/share164249311330007817/dir164249311356301141/file164249311384406709',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '1024/1024',
  'x-ms-copy-completion-time',
  'Tue, 18 Jan 2022 08:05:14 GMT',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2011-10-05T14:48:00.0000000Z',
  'x-ms-file-last-write-time',
  '2022-01-18T08:05:14.3082504Z',
  'x-ms-file-creation-time',
  '2011-10-05T14:48:00.0000000Z',
  'x-ms-file-permission-key',
  '14512997697466488420*3117928199373521617',
  'x-ms-file-attributes',
  'Hidden | System',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 18 Jan 2022 08:05:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164249311330007817')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fe550b72-201a-0006-3842-0c03a9000000',
  'x-ms-client-request-id',
  'ae34d658-49d3-4387-988e-cf3595060316',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Tue, 18 Jan 2022 08:05:15 GMT'
]);
