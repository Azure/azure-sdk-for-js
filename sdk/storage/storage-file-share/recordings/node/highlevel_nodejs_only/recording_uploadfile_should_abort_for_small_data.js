let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376646642205732","dir":"dir157376646680703779","file":"file157376646716808790"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376646642205732')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:06 GMT',
  'ETag',
  '"0x8D769488FD31B46"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1e76399b-401a-0053-7731-9b7af3000000',
  'x-ms-client-request-id',
  'd180cf92-3ba0-4b0e-a38b-60c358944dca',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:05 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376646642205732/dir157376646680703779')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:07 GMT',
  'ETag',
  '"0x8D76948900A1253"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f175b68d-d01a-003b-3a31-9b24a2000000',
  'x-ms-client-request-id',
  '79803387-320d-44b0-ab54-5d8c5c8f04c5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:07.1355475Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:07.1355475Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:07.1355475Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 14 Nov 2019 21:21:06 GMT' ]);
