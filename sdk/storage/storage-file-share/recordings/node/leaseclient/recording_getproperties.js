let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613052372007336","dir":"dir157613052486207034","file":"file157613052601705480"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613052372007336')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:02:04 GMT',
  'ETag',
  '"0x8D77EC8D037DFE6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d134d7b-f01a-003d-42b1-b0e420000000',
  'x-ms-client-request-id',
  'f5290a7a-85b6-416b-8414-fcd4e456c2a1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 06:02:04 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613052372007336/dir157613052486207034')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:02:05 GMT',
  'ETag',
  '"0x8D77EC8D0E78ECC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6669e69-001a-0039-48b1-b06927000000',
  'x-ms-client-request-id',
  'a27b85a8-f60a-4a13-9891-8d8dc3cf46ad',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T06:02:05.9609804Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:02:05.9609804Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:02:05.9609804Z',
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
  'Thu, 12 Dec 2019 06:02:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613052372007336/dir157613052486207034/file157613052601705480')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:02:07 GMT',
  'ETag',
  '"0x8D77EC8D199C9A0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3cb541dc-701a-0041-7db1-b0cadf000000',
  'x-ms-client-request-id',
  'dc75b63a-0c94-4633-bb77-082a87f72bed',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T06:02:07.1290272Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:02:07.1290272Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:02:07.1290272Z',
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
  'Thu, 12 Dec 2019 06:02:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613052372007336/dir157613052486207034/file157613052601705480')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:02:07 GMT',
  'ETag',
  '"0x8D77EC8D199C9A0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6669e6f-001a-0039-4bb1-b06927000000',
  'x-ms-client-request-id',
  '205f40cf-1479-4c05-84b5-9d0195d52792',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'f9ea8c8b-0338-40c5-9e5b-c86bdb5608fa',
  'Date',
  'Thu, 12 Dec 2019 06:02:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share157613052372007336/dir157613052486207034/file157613052601705480')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:02:07 GMT',
  'ETag',
  '"0x8D77EC8D199C9A0"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3cb541e0-701a-0041-7eb1-b0cadf000000',
  'x-ms-client-request-id',
  '1dceaab5-a664-4d33-8b05-b6526eb6329a',
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
  '2019-12-12T06:02:07.1290272Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:02:07.1290272Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:02:07.1290272Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Thu, 12 Dec 2019 06:02:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share157613052372007336/dir157613052486207034/file157613052601705480')
  .reply(412, "", [
  'Transfer-Encoding',
  'chunked',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3cb541e1-701a-0041-7fb1-b0cadf000000',
  'x-ms-client-request-id',
  'bc229853-b0c3-4901-a320-fccdc413df9c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'LeaseIdMismatchWithFileOperation',
  'Date',
  'Thu, 12 Dec 2019 06:02:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share157613052372007336/dir157613052486207034/file157613052601705480')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:02:07 GMT',
  'ETag',
  '"0x8D77EC8D199C9A0"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3cb541e4-701a-0041-80b1-b0cadf000000',
  'x-ms-client-request-id',
  'b48800a2-84c2-482e-8c94-383df54ae664',
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
  '2019-12-12T06:02:07.1290272Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:02:07.1290272Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:02:07.1290272Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Thu, 12 Dec 2019 06:02:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613052372007336')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d134d84-f01a-003d-47b1-b0e420000000',
  'x-ms-client-request-id',
  '386f2e81-e886-449c-a592-e28f1b5934bb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 06:02:08 GMT'
]);
