let nock = require('nock');

module.exports.testInfo = {"share":"share156758470560408632","dir":"dir156758470600807849"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758470560408632')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:11:45 GMT',
  'ETag',
  '"0x8D7310F872D8DE6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '123a8c34-501a-0037-0ff8-62252f000000',
  'x-ms-client-request-id',
  'bd96021e-946b-40d2-be9e-e9d57de585eb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:11:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758470560408632/dir156758470600807849')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:11:46 GMT',
  'ETag',
  '"0x8D7310F876EF9EB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69e7ed8a-401a-00f0-61f8-62b172000000',
  'x-ms-client-request-id',
  '49c6d929-7e0d-4c1f-bfd9-34f77e253064',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:11:46.2682091Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:11:46.2682091Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:11:46.2682091Z',
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
  'Wed, 04 Sep 2019 08:11:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758470560408632/dir156758470600807849')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:11:46 GMT',
  'ETag',
  '"0x8D7310F87ADBFD0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '83365eee-601a-00e7-05f8-621879000000',
  'x-ms-client-request-id',
  'd9fc6caf-f19f-4d51-99e7-559545de1020',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:11:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156758470560408632/dir156758470600807849')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:11:46 GMT',
  'ETag',
  '"0x8D7310F87ADBFD0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a3cf7297-401a-0124-6bf8-62ff2e000000',
  'x-ms-client-request-id',
  'a31d9847-d625-4239-bdcb-af7572351700',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-meta-key0',
  'val0',
  'x-ms-meta-keya',
  'vala',
  'x-ms-meta-keyb',
  'valb',
  'x-ms-file-change-time',
  '2019-09-04T08:11:46.6795984Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:11:46.2682091Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:11:46.2682091Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-meta-key0,x-ms-meta-keya,x-ms-meta-keyb,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:11:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758470560408632')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7879c199-a01a-014e-7cf8-622706000000',
  'x-ms-client-request-id',
  'ab673598-bf6e-486f-9cca-b7aa7fd6202d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:11:46 GMT',
  'Connection',
  'close' ]);

