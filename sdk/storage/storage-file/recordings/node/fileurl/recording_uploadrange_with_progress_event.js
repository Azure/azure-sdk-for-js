let nock = require('nock');

module.exports.testInfo = {"share":"share156758478120506973","dir":"dir156758478162904192","file":"file156758478204200009"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758478120506973')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:01 GMT',
  'ETag',
  '"0x8D7310FB43E1324"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf565e6f-601a-002c-1ff8-621b2c000000',
  'x-ms-client-request-id',
  'aa9b3911-31ef-4dd7-a9bf-ecdfdcaa7a8b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:00 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758478120506973/dir156758478162904192')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:01 GMT',
  'ETag',
  '"0x8D7310FB47EB7D8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cef73edb-701a-0020-37f8-628c24000000',
  'x-ms-client-request-id',
  'f80edcbc-4da9-4d88-9bb8-0c9962e5434f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:13:01.8688472Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:13:01.8688472Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:13:01.8688472Z',
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
  'Wed, 04 Sep 2019 08:13:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758478120506973/dir156758478162904192/file156758478204200009')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:02 GMT',
  'ETag',
  '"0x8D7310FB4BD0888"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '029fa2bf-401a-0076-13f8-627dcb000000',
  'x-ms-client-request-id',
  '836e1124-97dc-4a4a-b405-bef98d4e4d29',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:13:02.2772360Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:13:02.2772360Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:13:02.2772360Z',
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
  'Wed, 04 Sep 2019 08:13:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758478120506973/dir156758478162904192/file156758478204200009', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:02 GMT',
  'ETag',
  '"0x8D7310FB4FB803F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bb07bdd-201a-0084-76f8-628582000000',
  'x-ms-client-request-id',
  'ca6f4a3d-7c20-4584-8989-101b3f13dab6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:13:02 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758478120506973')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cef7d75e-901a-0007-29f8-629be0000000',
  'x-ms-client-request-id',
  '435052d3-abb8-4704-a11d-6ac68741a38d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:02 GMT',
  'Connection',
  'close' ]);

