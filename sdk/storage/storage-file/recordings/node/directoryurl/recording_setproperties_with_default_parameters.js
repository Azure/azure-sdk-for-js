let nock = require('nock');

module.exports.testInfo = {"share":"share156758471539007492","dir":"dir156758471590206417"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758471539007492')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:11:55 GMT',
  'ETag',
  '"0x8D7310F8D05DDDB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '909a1d6c-f01a-00b8-1cf8-62ac45000000',
  'x-ms-client-request-id',
  '88cbc395-228a-4562-a4f4-ffad3b3c2472',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:11:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758471539007492/dir156758471590206417')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:11:56 GMT',
  'ETag',
  '"0x8D7310F8D50762F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '353dfd99-301a-0088-5ef8-62128a000000',
  'x-ms-client-request-id',
  '0de2a437-e006-44c6-8a75-d1d9e4a0c9fc',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:11:56.1345583Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:11:56.1345583Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:11:56.1345583Z',
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
  'Wed, 04 Sep 2019 08:11:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758471539007492/dir156758471590206417')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:11:56 GMT',
  'ETag',
  '"0x8D7310F8D8E9FAD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cf19d571-301a-0043-76f8-6211df000000',
  'x-ms-client-request-id',
  'aca0cc16-d536-41cf-af1d-5ec544facdd7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:11:56.5419437Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:11:56.1345583Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:11:56.1345583Z',
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
  'Wed, 04 Sep 2019 08:11:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156758471539007492/dir156758471590206417')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:11:56 GMT',
  'ETag',
  '"0x8D7310F8D8E9FAD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '15704d0f-d01a-0039-34f8-620c9f000000',
  'x-ms-client-request-id',
  'e6f36147-7ed7-4a52-894c-438afa48cb20',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-04T08:11:56.5419437Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:11:56.1345583Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:11:56.1345583Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:11:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758471539007492')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2168d95e-401a-00bd-76f8-627e9e000000',
  'x-ms-client-request-id',
  'bdd4baeb-9949-4827-be6e-a85c446e1939',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:11:56 GMT',
  'Connection',
  'close' ]);

