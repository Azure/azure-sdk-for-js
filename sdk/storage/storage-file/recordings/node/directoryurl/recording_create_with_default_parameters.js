let nock = require('nock');

module.exports.testInfo = {"share":"share156775314518105066","dir":"dir156775314568905562"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775314518105066')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:05 GMT',
  'ETag',
  '"0x8D73297B510686C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b58d6036-201a-0132-1180-6409f9000000',
  'x-ms-client-request-id',
  '28edb71a-fbf4-44da-857f-2d28a3a9c5f9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775314518105066/dir156775314568905562')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:05 GMT',
  'ETag',
  '"0x8D73297B54FD6F0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '907a8ac5-201a-00c9-4880-644a6e000000',
  'x-ms-client-request-id',
  'fd12aa6a-cfdb-4560-9937-a173d8b5d49f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:05.9573488Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:05.9573488Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:05.9573488Z',
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
  'Fri, 06 Sep 2019 06:59:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775314518105066')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd3afd356-701a-00a6-6e80-64409d000000',
  'x-ms-client-request-id',
  'ea2fb249-5563-4ff9-80cf-d88fbbf29ef7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:05 GMT',
  'Connection',
  'close' ]);

