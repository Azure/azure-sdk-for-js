let nock = require('nock');

module.exports.testInfo = {"share":"share157129154314706038","dir":"dir157129154372005804"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157129154314706038')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 17 Oct 2019 05:52:23 GMT',
  'ETag',
  '"0x8D752C62EAEDA7A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ebf08629-a01a-0052-45af-847b0e000000',
  'x-ms-client-request-id',
  'c13c88bf-9b48-4f45-b341-c343293bc36a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 17 Oct 2019 05:52:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157129154314706038/dir157129154372005804')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 17 Oct 2019 05:52:24 GMT',
  'ETag',
  '"0x8D752C62F4C7C64"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c395f26-501a-0065-53af-84d7a1000000',
  'x-ms-client-request-id',
  '7ac7e980-d8db-4e4b-8443-4602c02ee954',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-10-17T05:52:24.6758500Z',
  'x-ms-file-last-write-time',
  '2019-10-17T05:52:24.6758500Z',
  'x-ms-file-creation-time',
  '2019-10-17T05:52:24.6758500Z',
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
  'Thu, 17 Oct 2019 05:52:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157129154314706038/dir157129154372005804')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '794833c2-a01a-0034-0caf-84c954000000',
  'x-ms-client-request-id',
  '77719150-668e-4321-8e97-38f803aa252c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-number-of-handles-closed',
  '0',
  'Date',
  'Thu, 17 Oct 2019 05:52:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157129154314706038')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ff4f65a8-701a-005b-16af-846180000000',
  'x-ms-client-request-id',
  'e0bb8e86-ef52-4dba-8821-fca041149601',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 17 Oct 2019 05:52:25 GMT',
  'Connection',
  'close' ]);

