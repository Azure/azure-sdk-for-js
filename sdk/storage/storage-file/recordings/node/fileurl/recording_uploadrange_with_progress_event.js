let nock = require('nock');

module.exports.testInfo = {"share":"share156775321440600521","dir":"dir156775321484109913","file":"file156775321525004183"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775321440600521')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:14 GMT',
  'ETag',
  '"0x8D73297DE48FBDB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7a30590d-c01a-013a-5e80-6413f6000000',
  'x-ms-client-request-id',
  'b92b7697-1092-4f69-ac18-343686c32842',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775321440600521/dir156775321484109913')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:15 GMT',
  'ETag',
  '"0x8D73297DE8961A8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbc98cd1-501a-015a-5c80-646f69000000',
  'x-ms-client-request-id',
  '42c0e4ad-5ca5-439f-878e-47730493b23b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:00:15.1210408Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:00:15.1210408Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:00:15.1210408Z',
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
  'Fri, 06 Sep 2019 07:00:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775321440600521/dir156775321484109913/file156775321525004183')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:15 GMT',
  'ETag',
  '"0x8D73297DED4FBEB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45718292-901a-00e3-6380-64957e000000',
  'x-ms-client-request-id',
  'ff9ab3ab-7b5b-45c3-a69f-c8732514bd05',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:00:15.6165099Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:00:15.6165099Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:00:15.6165099Z',
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
  'Fri, 06 Sep 2019 07:00:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775321440600521/dir156775321484109913/file156775321525004183', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:16 GMT',
  'ETag',
  '"0x8D73297DF14370B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c5bcd02-e01a-009b-3080-643686000000',
  'x-ms-client-request-id',
  '14073137-1191-48ee-a0b3-00cab3774871',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 07:00:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775321440600521')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '77ea5000-c01a-001a-6c80-64965c000000',
  'x-ms-client-request-id',
  '7e7ebcdf-1d3a-4189-9b8c-b3c527a12572',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:16 GMT',
  'Connection',
  'close' ]);

