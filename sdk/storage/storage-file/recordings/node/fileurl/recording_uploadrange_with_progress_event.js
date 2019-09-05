let nock = require('nock');

module.exports.testInfo = {"share":"share156767540974201756","dir":"dir156767541014408234","file":"file156767541054500385"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767540974201756')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:30 GMT',
  'ETag',
  '"0x8D731E2B7124A7F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f554c4b6-e01a-000d-42cb-633f57000000',
  'x-ms-client-request-id',
  '0a22ec72-9719-4630-9a2b-4caabc7129d6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767540974201756/dir156767541014408234')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:30 GMT',
  'ETag',
  '"0x8D731E2B74FC2AA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '089072b5-f01a-010e-67cb-63203e000000',
  'x-ms-client-request-id',
  '2877f095-07a9-44d3-9fc4-2f73c9af58a3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:23:30.4042154Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:23:30.4042154Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:23:30.4042154Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 05 Sep 2019 09:23:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767540974201756/dir156767541014408234/file156767541054500385')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:30 GMT',
  'ETag',
  '"0x8D731E2B78D018C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4e9c7a9-d01a-00af-38cb-63054e000000',
  'x-ms-client-request-id',
  'de5b3da2-305a-4808-a5bf-93745ce36b22',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:23:30.8055948Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:23:30.8055948Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:23:30.8055948Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 05 Sep 2019 09:23:30 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767540974201756/dir156767541014408234/file156767541054500385', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:31 GMT',
  'ETag',
  '"0x8D731E2B7CB7948"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f12c8915-701a-00d4-03cb-6347d2000000',
  'x-ms-client-request-id',
  '41660364-1735-4107-95f5-11be0c028732',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 05 Sep 2019 09:23:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767540974201756')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '134f56ba-701a-0099-62cb-63883e000000',
  'x-ms-client-request-id',
  '5dbb9038-3502-4180-9220-d3aa7e61b415',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:31 GMT',
  'Connection',
  'close' ]);

