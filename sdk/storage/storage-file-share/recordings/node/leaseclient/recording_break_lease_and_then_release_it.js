let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613035460804153","dir":"dir157613035575205251","file":"file157613035690708904"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613035460804153')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:15 GMT',
  'ETag',
  '"0x8D77EC86B6BC05B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f44c9364-301a-0040-50b1-b09503000000',
  'x-ms-client-request-id',
  'fde006a2-7a12-4ef6-bbe0-94e227b4a06c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613035460804153/dir157613035575205251')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:16 GMT',
  'ETag',
  '"0x8D77EC86C1BDE55"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dfc002fd-501a-001b-09b1-b0ac38000000',
  'x-ms-client-request-id',
  'e9cc8d59-03c6-405b-8b7c-99c778d3eb3e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:59:16.8539221Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:16.8539221Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:16.8539221Z',
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
  'Thu, 12 Dec 2019 05:59:16 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613035460804153/dir157613035575205251/file157613035690708904')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:18 GMT',
  'ETag',
  '"0x8D77EC86CCC909C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '624a2975-901a-002b-48b1-b012f7000000',
  'x-ms-client-request-id',
  '2375c24d-de9a-489b-826c-630b17180183',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:59:18.0119196Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:18.0119196Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:18.0119196Z',
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
  'Thu, 12 Dec 2019 05:59:17 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613035460804153/dir157613035575205251/file157613035690708904')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:18 GMT',
  'ETag',
  '"0x8D77EC86CCC909C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f44c9372-301a-0040-57b1-b09503000000',
  'x-ms-client-request-id',
  'df65c767-28b6-4c82-9802-6e51f589b917',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  '85a49e48-5e0c-4da5-91d2-dc78dad6a777',
  'Date',
  'Thu, 12 Dec 2019 05:59:18 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share157613035460804153/dir157613035575205251/file157613035690708904')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:18 GMT',
  'ETag',
  '"0x8D77EC86CCC909C"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '624a2979-901a-002b-49b1-b012f7000000',
  'x-ms-client-request-id',
  'cd287aad-6f6d-4592-81ed-cec4c100588e',
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
  '2019-12-12T05:59:18.0119196Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:18.0119196Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:18.0119196Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Thu, 12 Dec 2019 05:59:18 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613035460804153/dir157613035575205251/file157613035690708904')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:18 GMT',
  'ETag',
  '"0x8D77EC86CCC909C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f44c9374-301a-0040-58b1-b09503000000',
  'x-ms-client-request-id',
  '2bca87e2-efcd-4f06-826d-3d286c531abe',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-time',
  '0',
  'Date',
  'Thu, 12 Dec 2019 05:59:19 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share157613035460804153/dir157613035575205251/file157613035690708904')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:18 GMT',
  'ETag',
  '"0x8D77EC86CCC909C"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '624a297a-901a-002b-4ab1-b012f7000000',
  'x-ms-client-request-id',
  'c6557f45-c676-4535-88f6-b0637496cefd',
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
  '2019-12-12T05:59:18.0119196Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:18.0119196Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:18.0119196Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Thu, 12 Dec 2019 05:59:20 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613035460804153/dir157613035575205251/file157613035690708904')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:18 GMT',
  'ETag',
  '"0x8D77EC86CCC909C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f44c9376-301a-0040-59b1-b09503000000',
  'x-ms-client-request-id',
  '4b63dd63-a2b5-4e69-934d-d3c31085e431',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:19 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613035460804153')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f44c937a-301a-0040-5cb1-b09503000000',
  'x-ms-client-request-id',
  'c9114940-1520-4e43-a149-792c6fb1c85c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:20 GMT'
]);
