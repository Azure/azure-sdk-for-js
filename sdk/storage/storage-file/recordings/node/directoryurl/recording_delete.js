let nock = require('nock');

module.exports.testInfo = {"share":"share156775315577209511","dir":"dir156775315617500958"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775315577209511')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:16 GMT',
  'ETag',
  '"0x8D73297BB5357C6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58a34a57-701a-0052-1280-648b6b000000',
  'x-ms-client-request-id',
  'c32ec7e2-37a0-48e5-ba6b-9b8f95196368',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775315577209511/dir156775315617500958')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:16 GMT',
  'ETag',
  '"0x8D73297BB925094"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e0b1ba27-e01a-008b-6480-64f3ee000000',
  'x-ms-client-request-id',
  'd8cbce1b-cd05-4346-b499-dccc7c3328be',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:16.4593300Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:16.4593300Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:16.4593300Z',
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
  'Fri, 06 Sep 2019 06:59:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775315577209511')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c73121ce-b01a-00e4-4580-64f91d000000',
  'x-ms-client-request-id',
  'feb52615-7f05-45c9-a471-0efbfb039b63',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:15 GMT',
  'Connection',
  'close' ]);

