let nock = require('nock');

module.exports.testInfo = {"share":"share156775315109704742","dir":"dir156775315153300432"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775315109704742')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:11 GMT',
  'ETag',
  '"0x8D73297B88CA0FE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6baad0ad-b01a-0152-4c80-647566000000',
  'x-ms-client-request-id',
  '48cbde00-2cbb-4dae-ad01-8cb9c30a75fc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:10 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775315109704742/dir156775315153300432')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:11 GMT',
  'ETag',
  '"0x8D73297B8CD2CF9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4d8090df-101a-00c2-6680-64b105000000',
  'x-ms-client-request-id',
  'a97ac5ed-5fc5-4a88-aaec-a4fe6dcafd33',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:11.8119161Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:11.8119161Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:11.8119161Z',
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
  'Fri, 06 Sep 2019 06:59:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775315109704742/dir156775315153300432')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:12 GMT',
  'ETag',
  '"0x8D73297B90E647E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0dee93e2-401a-00f0-5980-64b172000000',
  'x-ms-client-request-id',
  '431a19e8-8352-4c98-82e3-c6f6cc05048a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:12.2393214Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:11.8119161Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:11.8119161Z',
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
  'Fri, 06 Sep 2019 06:59:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775315109704742/dir156775315153300432')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:12 GMT',
  'ETag',
  '"0x8D73297B90E647E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '67105a31-f01a-0143-6480-64efd2000000',
  'x-ms-client-request-id',
  '33b0074e-3e10-4ae9-85d1-976d4f049da2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-06T06:59:12.2393214Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:11.8119161Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:11.8119161Z',
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
  'Fri, 06 Sep 2019 06:59:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775315109704742')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b0b5dcca-a01a-00e8-4a80-646e15000000',
  'x-ms-client-request-id',
  '827e1027-a691-423a-aaae-cedc05ebdbe3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:12 GMT',
  'Connection',
  'close' ]);

