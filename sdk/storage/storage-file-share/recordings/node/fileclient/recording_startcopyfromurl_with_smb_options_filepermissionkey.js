let nock = require('nock');

module.exports.hash = "ad309985dbbd2b44b32ae5d687307a88";

module.exports.testInfo = {"uniqueName":{"share":"share164549791791203114","dir":"dir164549791820100770","file":"file164549791849804095","copiedfile":"copiedfile164549791878809713"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549791791203114')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:18 GMT',
  'ETag',
  '"0x8D9F5AD5CAB0240"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c184c-501a-006b-1d96-274d45000000',
  'x-ms-client-request-id',
  '0c296c7c-653f-4844-8352-a4d2e5dc39a6',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 22 Feb 2022 02:45:17 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549791791203114/dir164549791820100770')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:18 GMT',
  'ETag',
  '"0x8D9F5AD5CD8DA10"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c184e-501a-006b-1e96-274d45000000',
  'x-ms-client-request-id',
  '422cd447-28dd-48f2-850b-023e78125b77',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-22T02:45:18.5498640Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:18.5498640Z',
  'x-ms-file-creation-time',
  '2022-02-22T02:45:18.5498640Z',
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
  'Tue, 22 Feb 2022 02:45:17 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549791791203114/dir164549791820100770/file164549791849804095')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:18 GMT',
  'ETag',
  '"0x8D9F5AD5D053AB1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c184f-501a-006b-1f96-274d45000000',
  'x-ms-client-request-id',
  '102d91c0-b13c-4a79-a8e3-a59e427c93bd',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-22T02:45:18.8406961Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:18.8406961Z',
  'x-ms-file-creation-time',
  '2022-02-22T02:45:18.8406961Z',
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
  'Tue, 22 Feb 2022 02:45:18 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549791791203114', {"permission":"O:S-1-5-21-2127521184-1604012920-1887927527-21560751G:S-1-5-21-2127521184-1604012920-1887927527-513D:(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-397955417-626881126-188441444-3053964)"})
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1851-501a-006b-2196-274d45000000',
  'x-ms-client-request-id',
  'f1da43ee-0156-491b-8109-c3e6320748ac',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-permission-key',
  '3670530694640228663*8819015832131519026',
  'Date',
  'Tue, 22 Feb 2022 02:45:18 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549791791203114/dir164549791820100770/copiedfile164549791878809713')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:19 GMT',
  'ETag',
  '"0x8D9F5AD5D628F3F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1854-501a-006b-2496-274d45000000',
  'x-ms-client-request-id',
  '310508c9-4e3a-4a17-b155-8863905a536c',
  'x-ms-version',
  '2021-04-10',
  'x-ms-copy-id',
  '89156d17-2d70-4fd7-b4f1-d25151004e4e',
  'x-ms-copy-status',
  'success',
  'Date',
  'Tue, 22 Feb 2022 02:45:18 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164549791791203114/dir164549791820100770/file164549791849804095')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:18 GMT',
  'ETag',
  '"0x8D9F5AD5D053AB1"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1855-501a-006b-2596-274d45000000',
  'x-ms-client-request-id',
  '5fc82dd9-2e79-4d93-b579-7b951bbbdc7f',
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
  '2022-02-22T02:45:18.8406961Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:18.8406961Z',
  'x-ms-file-creation-time',
  '2022-02-22T02:45:18.8406961Z',
  'x-ms-file-permission-key',
  '15187149962788154044*8819015832131519026',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Tue, 22 Feb 2022 02:45:18 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164549791791203114/dir164549791820100770/copiedfile164549791878809713')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:19 GMT',
  'ETag',
  '"0x8D9F5AD5D628F3F"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1856-501a-006b-2696-274d45000000',
  'x-ms-client-request-id',
  '6562dca5-7564-455d-abcb-7b488eaa3bec',
  'x-ms-version',
  '2021-04-10',
  'x-ms-copy-id',
  '89156d17-2d70-4fd7-b4f1-d25151004e4e',
  'x-ms-copy-source',
  'https://fakestorageaccount.file.core.windows.net/share164549791791203114/dir164549791820100770/file164549791849804095',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '1024/1024',
  'x-ms-copy-completion-time',
  'Tue, 22 Feb 2022 02:45:19 GMT',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2022-02-22T02:45:19.4523455Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:18.8406961Z',
  'x-ms-file-creation-time',
  '2011-10-05T14:48:00.0000000Z',
  'x-ms-file-permission-key',
  '10974970485353649799*8819015832131519026',
  'x-ms-file-attributes',
  'Hidden | System | Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Tue, 22 Feb 2022 02:45:19 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164549791791203114')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1858-501a-006b-2896-274d45000000',
  'x-ms-client-request-id',
  '703aa4e8-cc99-48dd-9e1d-70015b2c777c',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 22 Feb 2022 02:45:19 GMT'
]);
