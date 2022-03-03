let nock = require('nock');

module.exports.hash = "11cfaed206b04c93de0ebdc080ce6f57";

module.exports.testInfo = {"uniqueName":{"share":"share164549791552300925","dir":"dir164549791582508307","file":"file164549791611805589","copiedfile":"copiedfile164549791641208887"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549791552300925')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:15 GMT',
  'ETag',
  '"0x8D9F5AD5B3F9937"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1827-501a-006b-1696-274d45000000',
  'x-ms-client-request-id',
  '26786179-b1af-4dd2-8a35-1211b8e7fce0',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 22 Feb 2022 02:45:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549791552300925/dir164549791582508307')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:16 GMT',
  'ETag',
  '"0x8D9F5AD5B6D7188"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1829-501a-006b-1796-274d45000000',
  'x-ms-client-request-id',
  '32b0b955-d7aa-484e-b861-1b3be28ec122',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-22T02:45:16.1682312Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:16.1682312Z',
  'x-ms-file-creation-time',
  '2022-02-22T02:45:16.1682312Z',
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
  'Tue, 22 Feb 2022 02:45:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549791552300925/dir164549791582508307/file164549791611805589')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:16 GMT',
  'ETag',
  '"0x8D9F5AD5B9A955B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c182a-501a-006b-1896-274d45000000',
  'x-ms-client-request-id',
  '33410ca5-b61f-4549-bef1-6f54ccad004f',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-22T02:45:16.4640603Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:16.4640603Z',
  'x-ms-file-creation-time',
  '2022-02-22T02:45:16.4640603Z',
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
  'Tue, 22 Feb 2022 02:45:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549791552300925/dir164549791582508307/copiedfile164549791641208887')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:16 GMT',
  'ETag',
  '"0x8D9F5AD5BDC2893"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c182b-501a-006b-1996-274d45000000',
  'x-ms-client-request-id',
  '316e58eb-fbdb-4a26-ab1c-ddbbe6969ff4',
  'x-ms-version',
  '2021-04-10',
  'x-ms-copy-id',
  'f01d3a1e-1501-43c3-b852-7977b2415113',
  'x-ms-copy-status',
  'success',
  'Date',
  'Tue, 22 Feb 2022 02:45:16 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164549791552300925/dir164549791582508307/file164549791611805589')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:16 GMT',
  'ETag',
  '"0x8D9F5AD5B9A955B"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c182c-501a-006b-1a96-274d45000000',
  'x-ms-client-request-id',
  'd4bc9bbe-3c09-4da6-a3c5-36ab09707b90',
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
  '2022-02-22T02:45:16.4640603Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:16.4640603Z',
  'x-ms-file-creation-time',
  '2022-02-22T02:45:16.4640603Z',
  'x-ms-file-permission-key',
  '15187149962788154044*8819015832131519026',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Tue, 22 Feb 2022 02:45:16 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164549791552300925/dir164549791582508307/copiedfile164549791641208887')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:16 GMT',
  'ETag',
  '"0x8D9F5AD5BDC2893"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1843-501a-006b-1b96-274d45000000',
  'x-ms-client-request-id',
  '8e6a92aa-5265-43e1-99d9-6f75665e1cf0',
  'x-ms-version',
  '2021-04-10',
  'x-ms-copy-id',
  'f01d3a1e-1501-43c3-b852-7977b2415113',
  'x-ms-copy-source',
  'https://fakestorageaccount.file.core.windows.net/share164549791552300925/dir164549791582508307/file164549791611805589',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '1024/1024',
  'x-ms-copy-completion-time',
  'Tue, 22 Feb 2022 02:45:16 GMT',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2022-02-22T02:45:16.8938131Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:16.4640603Z',
  'x-ms-file-creation-time',
  '2011-10-05T14:48:00.0000000Z',
  'x-ms-file-permission-key',
  '10974970485353649799*8819015832131519026',
  'x-ms-file-attributes',
  'Hidden | System',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Tue, 22 Feb 2022 02:45:16 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164549791552300925')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1848-501a-006b-1c96-274d45000000',
  'x-ms-client-request-id',
  '733cdb61-d4bf-40dc-985b-58f721929339',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 22 Feb 2022 02:45:17 GMT'
]);
