let nock = require('nock');

module.exports.testInfo = {"share":"share156758476250909505","dir":"dir156758476294900163","file":"file156758476335800247"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758476250909505')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:42 GMT',
  'ETag',
  '"0x8D7310FA91B70B3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bb07bb9-201a-0084-71f8-628582000000',
  'x-ms-client-request-id',
  '238b8bda-3406-4399-937c-a85d8b7e7bd2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758476250909505/dir156758476294900163')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:43 GMT',
  'ETag',
  '"0x8D7310FA95C6C1C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cf05f434-701a-0042-06f8-624e03000000',
  'x-ms-client-request-id',
  '21eab80d-754d-4404-8df8-41a0798fd27e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:43.1891484Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:43.1891484Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:43.1891484Z',
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
  'Wed, 04 Sep 2019 08:12:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758476250909505/dir156758476294900163/file156758476335800247')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:43 GMT',
  'ETag',
  '"0x8D7310FA99ABCB3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '499f4e20-f01a-00a8-39f8-62692d000000',
  'x-ms-client-request-id',
  '32ebcba4-e485-4316-856d-9f3ce78cbf6b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:43.5975347Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:43.5975347Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:43.5975347Z',
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
  'Wed, 04 Sep 2019 08:12:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758476250909505/dir156758476294900163/file156758476335800247')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8c9440b5-401a-0134-75f8-623a46000000',
  'x-ms-client-request-id',
  'baab99d5-2b59-47fa-92a5-dee39fc82135',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758476250909505')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c4aa6e89-001a-0048-7ff8-62eab4000000',
  'x-ms-client-request-id',
  'a0ebe8b3-ff63-4725-bd72-0433ff5108c2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:43 GMT',
  'Connection',
  'close' ]);

