let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613036646907024","dir":"dir157613036761401096","file":"file157613036875308498"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613036646907024')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:27 GMT',
  'ETag',
  '"0x8D77EC8727D0A81"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd577aa7d-c01a-0019-07b1-b01280000000',
  'x-ms-client-request-id',
  '3d6a4c43-6966-44d6-bff6-700cb495a522',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613036646907024/dir157613036761401096')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:28 GMT',
  'ETag',
  '"0x8D77EC8732B9543"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4aba3881-701a-0023-60b1-b008f8000000',
  'x-ms-client-request-id',
  '18a04512-39c7-4ff0-839f-de48cc25d20b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:59:28.7009603Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:28.7009603Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:28.7009603Z',
  'x-ms-file-permission-key',
  '7008756509702647153*693339914461510392',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 12 Dec 2019 05:59:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613036646907024/dir157613036761401096/file157613036875308498')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:29 GMT',
  'ETag',
  '"0x8D77EC873DBFB66"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '202d6c1a-f01a-002d-03b1-b02148000000',
  'x-ms-client-request-id',
  'cc142028-aafb-4b25-9057-04c42debe037',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:59:29.8570086Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:29.8570086Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:29.8570086Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 12 Dec 2019 05:59:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613036646907024/dir157613036761401096/file157613036875308498')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:29 GMT',
  'ETag',
  '"0x8D77EC873DBFB66"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dfc00322-501a-001b-16b1-b0ac38000000',
  'x-ms-client-request-id',
  'f457d24b-d7cd-4042-a878-04878dc650c6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'dd593f35-e627-4c92-bb04-5f8960f447c7',
  'Date',
  'Thu, 12 Dec 2019 05:59:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613036646907024/dir157613036761401096/file157613036875308498')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:29 GMT',
  'ETag',
  '"0x8D77EC873DBFB66"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dfc00325-501a-001b-17b1-b0ac38000000',
  'x-ms-client-request-id',
  '54910c8e-a0a9-416a-8e25-a54b7644d394',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-time',
  '0',
  'Date',
  'Thu, 12 Dec 2019 05:59:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share157613036646907024/dir157613036761401096/file157613036875308498')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:29 GMT',
  'ETag',
  '"0x8D77EC873DBFB66"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '202d6c1e-f01a-002d-04b1-b02148000000',
  'x-ms-client-request-id',
  '93316f1f-bb77-4539-ba54-59f727467a27',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'broken',
  'x-ms-file-change-time',
  '2019-12-12T05:59:29.8570086Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:29.8570086Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:29.8570086Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Thu, 12 Dec 2019 05:59:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613036646907024/dir157613036761401096/file157613036875308498')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:29 GMT',
  'ETag',
  '"0x8D77EC873DBFB66"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dfc00327-501a-001b-18b1-b0ac38000000',
  'x-ms-client-request-id',
  '4d48c7ad-c0a1-4776-accf-70879b8ac470',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'dd593f35-e627-4c92-bb04-5f8960f447c7',
  'Date',
  'Thu, 12 Dec 2019 05:59:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share157613036646907024/dir157613036761401096/file157613036875308498')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:29 GMT',
  'ETag',
  '"0x8D77EC873DBFB66"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '202d6c1f-f01a-002d-05b1-b02148000000',
  'x-ms-client-request-id',
  '0c743943-6a6f-4515-8a00-c6a197649b24',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'infinite',
  'x-ms-file-change-time',
  '2019-12-12T05:59:29.8570086Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:29.8570086Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:29.8570086Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Thu, 12 Dec 2019 05:59:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613036646907024/dir157613036761401096/file157613036875308498')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:29 GMT',
  'ETag',
  '"0x8D77EC873DBFB66"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dfc00328-501a-001b-19b1-b0ac38000000',
  'x-ms-client-request-id',
  '13d5cc40-bb4a-48e4-809a-8ca1dfab932c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613036646907024')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd577aa85-c01a-0019-0ab1-b01280000000',
  'x-ms-client-request-id',
  'cc5617b9-dd5f-433c-bccd-c4e0224d81c4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:32 GMT'
]);
