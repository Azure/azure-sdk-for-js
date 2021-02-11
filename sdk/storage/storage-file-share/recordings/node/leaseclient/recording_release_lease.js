let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613034892706964","dir":"dir157613035007309920","file":"file157613035134709854"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613034892706964')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:10 GMT',
  'ETag',
  '"0x8D77EC86808E87B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbdd2a96-501a-0024-1eb1-b0649b000000',
  'x-ms-client-request-id',
  '2f8a78af-9705-419f-b00d-6264243bea69',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:09 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613034892706964/dir157613035007309920')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:11 GMT',
  'ETag',
  '"0x8D77EC868C97E14"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45e22131-e01a-0021-7bb1-b0b640000000',
  'x-ms-client-request-id',
  '7312b46c-58e0-4fcd-8037-215248ac33e1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:59:11.2808980Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:11.2808980Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:11.2808980Z',
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
  'Thu, 12 Dec 2019 05:59:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613034892706964/dir157613035007309920/file157613035134709854')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:12 GMT',
  'ETag',
  '"0x8D77EC8697CEF5E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '624a2969-901a-002b-44b1-b012f7000000',
  'x-ms-client-request-id',
  '109c8579-3919-4304-8ed8-e2be0ef803de',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:59:12.4568926Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:12.4568926Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:12.4568926Z',
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
  'Thu, 12 Dec 2019 05:59:12 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613034892706964/dir157613035007309920/file157613035134709854')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:12 GMT',
  'ETag',
  '"0x8D77EC8697CEF5E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6669d5d-001a-0039-0bb1-b06927000000',
  'x-ms-client-request-id',
  '8651b94f-959a-47ea-94a7-7dafac5ab895',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'f6086f7a-6844-46c3-904c-d4114e81e9a5',
  'Date',
  'Thu, 12 Dec 2019 05:59:13 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613034892706964/dir157613035007309920/file157613035134709854')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:12 GMT',
  'ETag',
  '"0x8D77EC8697CEF5E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6669d61-001a-0039-0cb1-b06927000000',
  'x-ms-client-request-id',
  '5a5dfb6b-f123-4c26-85fb-74802991f6e4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:13 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share157613034892706964/dir157613035007309920/file157613035134709854')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:12 GMT',
  'ETag',
  '"0x8D77EC8697CEF5E"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '624a296f-901a-002b-45b1-b012f7000000',
  'x-ms-client-request-id',
  '582d2365-b778-47ce-a5cf-ea2ef8d7573b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2019-12-12T05:59:12.4568926Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:12.4568926Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:12.4568926Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Thu, 12 Dec 2019 05:59:13 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613034892706964')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbdd2a9d-501a-0024-1fb1-b0649b000000',
  'x-ms-client-request-id',
  'f8265789-a86b-4d2a-ab1f-35021c04174d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:13 GMT'
]);
