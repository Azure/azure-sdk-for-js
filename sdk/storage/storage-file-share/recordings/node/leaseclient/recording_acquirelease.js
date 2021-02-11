let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613026033806948","dir":"dir157613026177607756","file":"file157613026312900584"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613026033806948')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:57:41 GMT',
  'ETag',
  '"0x8D77EC83364C961"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f44c91f8-301a-0040-26b1-b09503000000',
  'x-ms-client-request-id',
  '3ada9419-b9a1-4d8a-95cc-751ea93ac20e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:57:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613026033806948/dir157613026177607756')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:57:43 GMT',
  'ETag',
  '"0x8D77EC834326D1E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd53422c0-901a-0014-80b1-b0da54000000',
  'x-ms-client-request-id',
  '1db6cf30-c5e3-4aec-85a6-bf5d8d9e6989',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:57:43.0493470Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:57:43.0493470Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:57:43.0493470Z',
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
  'Thu, 12 Dec 2019 05:57:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613026033806948/dir157613026177607756/file157613026312900584')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:57:44 GMT',
  'ETag',
  '"0x8D77EC834EA4BC4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5200c302-a01a-0042-34b1-b02bbb000000',
  'x-ms-client-request-id',
  '608c805d-c286-421d-97cd-cfc92e2be52c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:57:44.2543556Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:57:44.2543556Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:57:44.2543556Z',
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
  'Thu, 12 Dec 2019 05:57:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613026033806948/dir157613026177607756/file157613026312900584')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:57:44 GMT',
  'ETag',
  '"0x8D77EC834EA4BC4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2242be07-a01a-0020-45b1-b0e99c000000',
  'x-ms-client-request-id',
  '75b3c1b4-21fb-4cb0-8e43-539202a7693d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Thu, 12 Dec 2019 05:57:45 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share157613026033806948/dir157613026177607756/file157613026312900584')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:57:44 GMT',
  'ETag',
  '"0x8D77EC834EA4BC4"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5200c306-a01a-0042-35b1-b02bbb000000',
  'x-ms-client-request-id',
  'd6735338-2563-421f-84d3-53810ae28394',
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
  '2019-12-12T05:57:44.2543556Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:57:44.2543556Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:57:44.2543556Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Thu, 12 Dec 2019 05:57:45 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613026033806948/dir157613026177607756/file157613026312900584')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:57:44 GMT',
  'ETag',
  '"0x8D77EC834EA4BC4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2242be0a-a01a-0020-46b1-b0e99c000000',
  'x-ms-client-request-id',
  '4ac7dac4-e470-4e48-8ac5-bbd843477334',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:57:45 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613026033806948')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f44c9219-301a-0040-33b1-b09503000000',
  'x-ms-client-request-id',
  '7b488584-a60d-47b6-b128-f41bbefc8207',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:57:45 GMT'
]);
