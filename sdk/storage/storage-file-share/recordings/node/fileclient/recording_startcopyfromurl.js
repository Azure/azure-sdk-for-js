let nock = require('nock');

module.exports.hash = "2e34e5ed4803baa834c504ceefa51108";

module.exports.testInfo = {"uniqueName":{"share":"share164549790972607555","dir":"dir164549791108705382","file":"file164549791139707116","copiedfile":"copiedfile164549791169304791"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549790972607555')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:11 GMT',
  'ETag',
  '"0x8D9F5AD586B378A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1808-501a-006b-7f96-274d45000000',
  'x-ms-client-request-id',
  '68249b49-5409-4696-8861-e52739d04462',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 22 Feb 2022 02:45:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549790972607555/dir164549791108705382')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:11 GMT',
  'ETag',
  '"0x8D9F5AD589C92EB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c180b-501a-006b-8096-274d45000000',
  'x-ms-client-request-id',
  'a0f1df02-abe4-4260-8538-d5787eb95d62',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-22T02:45:11.4439403Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:11.4439403Z',
  'x-ms-file-creation-time',
  '2022-02-22T02:45:11.4439403Z',
  'x-ms-file-permission-key',
  '1348922918165632443*8819015832131519026',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 22 Feb 2022 02:45:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549790972607555/dir164549791108705382/file164549791139707116')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:11 GMT',
  'ETag',
  '"0x8D9F5AD58CA52F7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c180d-501a-006b-0196-274d45000000',
  'x-ms-client-request-id',
  'b02485b8-51ec-4ec1-b997-3b9846bb3c55',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-22T02:45:11.7437687Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:11.7437687Z',
  'x-ms-file-creation-time',
  '2022-02-22T02:45:11.7437687Z',
  'x-ms-file-permission-key',
  '15187149962788154044*8819015832131519026',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 22 Feb 2022 02:45:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549790972607555/dir164549791108705382/copiedfile164549791169304791')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:12 GMT',
  'ETag',
  '"0x8D9F5AD58FEEFC8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c180e-501a-006b-0296-274d45000000',
  'x-ms-client-request-id',
  '030317f5-c891-44df-96a3-5cc61b03e96f',
  'x-ms-version',
  '2021-04-10',
  'x-ms-copy-id',
  'bfe57ca5-1f0f-4a6a-b90d-11ae4d82ccb7',
  'x-ms-copy-status',
  'success',
  'Date',
  'Tue, 22 Feb 2022 02:45:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164549790972607555/dir164549791108705382/file164549791139707116')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:11 GMT',
  'ETag',
  '"0x8D9F5AD58CA52F7"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c180f-501a-006b-0396-274d45000000',
  'x-ms-client-request-id',
  '0107dc9e-f404-4b7b-b7d1-b885fdf6d9c6',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2022-02-22T02:45:11.7437687Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:11.7437687Z',
  'x-ms-file-creation-time',
  '2022-02-22T02:45:11.7437687Z',
  'x-ms-file-permission-key',
  '15187149962788154044*8819015832131519026',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Tue, 22 Feb 2022 02:45:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164549790972607555/dir164549791108705382/copiedfile164549791169304791')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:12 GMT',
  'ETag',
  '"0x8D9F5AD58FEEFC8"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1812-501a-006b-0696-274d45000000',
  'x-ms-client-request-id',
  '8d871012-9b04-4360-b683-62513e5545e0',
  'x-ms-version',
  '2021-04-10',
  'x-ms-copy-id',
  'bfe57ca5-1f0f-4a6a-b90d-11ae4d82ccb7',
  'x-ms-copy-source',
  'https://fakestorageaccount.file.core.windows.net/share164549790972607555/dir164549791108705382/file164549791139707116',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '1024/1024',
  'x-ms-copy-completion-time',
  'Tue, 22 Feb 2022 02:45:12 GMT',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2022-02-22T02:45:12.0885704Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:12.0885704Z',
  'x-ms-file-creation-time',
  '2022-02-22T02:45:12.0885704Z',
  'x-ms-file-permission-key',
  '15187149962788154044*8819015832131519026',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Tue, 22 Feb 2022 02:45:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164549790972607555')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1815-501a-006b-0796-274d45000000',
  'x-ms-client-request-id',
  '77c0d492-51ec-41ba-920c-7913e5d147d0',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 22 Feb 2022 02:45:12 GMT'
]);
