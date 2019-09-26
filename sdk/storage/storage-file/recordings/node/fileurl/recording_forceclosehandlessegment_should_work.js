let nock = require('nock');

module.exports.testInfo = {"share":"share156775323566809403","dir":"dir156775323608303403","file":"file156775323648707304"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775323566809403')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:35 GMT',
  'ETag',
  '"0x8D73297EAF37E49"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17f0917c-001a-00de-4a80-64e365000000',
  'x-ms-client-request-id',
  'a5c8dcf8-a979-4895-8dc9-c72f89e6f78a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775323566809403/dir156775323608303403')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:36 GMT',
  'ETag',
  '"0x8D73297EB320D92"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29677100-b01a-0142-6180-64b00e000000',
  'x-ms-client-request-id',
  '906e04cf-cc0e-43ef-9606-21047ba9452c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:00:36.3591058Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:00:36.3591058Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:00:36.3591058Z',
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
  'Fri, 06 Sep 2019 07:00:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775323566809403/dir156775323608303403/file156775323648707304')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:36 GMT',
  'ETag',
  '"0x8D73297EB6FE8D3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '88c7d9f1-b01a-0000-3c80-64f783000000',
  'x-ms-client-request-id',
  '1b9a37c8-9ce8-4479-b0c9-96464517a64a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:00:36.7644883Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:00:36.7644883Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:00:36.7644883Z',
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
  'Fri, 06 Sep 2019 07:00:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775323566809403/dir156775323608303403/file156775323648707304')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ebd60755-f01a-00e5-1580-64a6c1000000',
  'x-ms-client-request-id',
  'a697967b-0dd0-40ec-8e9a-d9f93db9c804',
  'x-ms-version',
  '2019-02-02',
  'x-ms-number-of-handles-closed',
  '0',
  'Date',
  'Fri, 06 Sep 2019 07:00:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775323566809403')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ebd60758-f01a-00e5-1680-64a6c1000000',
  'x-ms-client-request-id',
  'bcea6687-7493-4875-a983-c61fdea927b8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:37 GMT',
  'Connection',
  'close' ]);

