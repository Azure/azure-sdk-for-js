let nock = require('nock');

module.exports.testInfo = {"share":"share156775315320805063","dir":"dir156775315365103130","now":"2019-09-06T06:59:14.514Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775315320805063')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:13 GMT',
  'ETag',
  '"0x8D73297B9CF882D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cdc83c7b-801a-0034-0580-64c44b000000',
  'x-ms-client-request-id',
  '98948957-aaa9-4e80-a16c-f02633c074cb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775315320805063/dir156775315365103130')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:13 GMT',
  'ETag',
  '"0x8D73297BA11BB96"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1e0cf473-b01a-0072-4780-64f0cc000000',
  'x-ms-client-request-id',
  'c947afe2-ae61-4b12-b22d-8b149508c6e3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:13.9389334Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:13.9389334Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:13.9389334Z',
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
  'Fri, 06 Sep 2019 06:59:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775315320805063')
  .query(true)
  .reply(200, {"permission":"O:SYG:SYD:(A;OICI;FA;;;BA)(A;OICI;FA;;;SY)(A;;0x1200a9;;;BU)(A;OICIIO;GXGR;;;BU)(A;OICI;0x1301bf;;;AU)(A;;FA;;;SY)(A;OICIIO;GA;;;CO)"}, [ 'Content-Length',
  '149',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7a3058bf-c01a-013a-4e80-6413f6000000',
  'x-ms-client-request-id',
  '36003185-3e8c-484e-a8f4-5872cead1c9f',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 06:59:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775315320805063/dir156775315365103130')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:14 GMT',
  'ETag',
  '"0x8D73297BA949FFE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '172b3321-101a-00a0-4880-647322000000',
  'x-ms-client-request-id',
  '4f6515d4-8871-474a-a246-83f7790a7366',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:14.7967486Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:14.5140000Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:14.5140000Z',
  'x-ms-file-permission-key',
  '13648784823690285809*8787082347076103240',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Directory | Archive | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 06:59:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775315320805063/dir156775315365103130')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:14 GMT',
  'ETag',
  '"0x8D73297BA949FFE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31a3d345-b01a-00a9-6880-6436f1000000',
  'x-ms-client-request-id',
  'a0beb2c9-7ab3-44dc-810c-687fed4d1ec1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-06T06:59:14.7967486Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:14.5140000Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:14.5140000Z',
  'x-ms-file-permission-key',
  '13648784823690285809*8787082347076103240',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Directory | Archive | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 06:59:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775315320805063')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17f09117-001a-00de-3680-64e365000000',
  'x-ms-client-request-id',
  '0e9e2af5-90a7-409b-91bf-7ea6aaa82f3c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:14 GMT',
  'Connection',
  'close' ]);

