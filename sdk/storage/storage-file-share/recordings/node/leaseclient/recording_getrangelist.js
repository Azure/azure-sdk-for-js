let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613048197706573","dir":"dir157613048312609018","file":"file157613048427501015"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613048197706573')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:01:23 GMT',
  'ETag',
  '"0x8D77EC8B75691B7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3cb5419b-701a-0041-71b1-b0cadf000000',
  'x-ms-client-request-id',
  'd37065ff-bff2-4761-9a4a-cd47c2debb0c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 06:01:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613048197706573/dir157613048312609018')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:01:24 GMT',
  'ETag',
  '"0x8D77EC8B8071AF9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '08c82339-501a-0034-65b1-b0a1f3000000',
  'x-ms-client-request-id',
  '0bff7587-ead0-402e-a4a8-2ea15f0e7ae6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T06:01:24.2246905Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:01:24.2246905Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:01:24.2246905Z',
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
  'Thu, 12 Dec 2019 06:01:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613048197706573/dir157613048312609018/file157613048427501015')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:01:25 GMT',
  'ETag',
  '"0x8D77EC8B8B7584B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6669e2b-001a-0039-3cb1-b06927000000',
  'x-ms-client-request-id',
  '77cc1295-348e-4c4c-b9b6-3cb5964c51c2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T06:01:25.3796939Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:01:25.3796939Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:01:25.3796939Z',
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
  'Thu, 12 Dec 2019 06:01:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613048197706573/dir157613048312609018/file157613048427501015')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:01:25 GMT',
  'ETag',
  '"0x8D77EC8B8B7584B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6845b676-b01a-002c-69b1-b07e94000000',
  'x-ms-client-request-id',
  'e6806eff-5059-4bb1-99d1-367ed9e22f96',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'dd546272-0e38-4088-947c-81d00541e6a3',
  'Date',
  'Thu, 12 Dec 2019 06:01:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share157613048197706573/dir157613048312609018/file157613048427501015')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges />", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:01:25 GMT',
  'ETag',
  '"0x8D77EC8B8B7584B"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6669e46-001a-0039-41b1-b06927000000',
  'x-ms-client-request-id',
  '392e99f5-dbc2-4428-86dc-59174574a198',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-length',
  '11',
  'Date',
  'Thu, 12 Dec 2019 06:01:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share157613048197706573/dir157613048312609018/file157613048427501015')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIdMismatchWithFileOperation</Code><Message>The lease ID specified did not match the lease ID for the file.\nRequestId:d6669e48-001a-0039-42b1-b06927000000\nTime:2019-12-12T06:01:42.2396849Z</Message></Error>", [
  'Content-Length',
  '264',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6669e48-001a-0039-42b1-b06927000000',
  'x-ms-client-request-id',
  '8bce71bc-419a-4f37-b424-8864440936f3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'LeaseIdMismatchWithFileOperation',
  'Date',
  'Thu, 12 Dec 2019 06:01:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share157613048197706573/dir157613048312609018/file157613048427501015')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges />", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:01:25 GMT',
  'ETag',
  '"0x8D77EC8B8B7584B"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6669e4a-001a-0039-43b1-b06927000000',
  'x-ms-client-request-id',
  'd9cd9b30-dc71-478a-9069-9f300f9a6599',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-length',
  '11',
  'Date',
  'Thu, 12 Dec 2019 06:01:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613048197706573')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3cb541b8-701a-0041-76b1-b0cadf000000',
  'x-ms-client-request-id',
  '9f9ff75c-9aa1-4303-8e96-49f56c1c76c1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 06:01:42 GMT'
]);
