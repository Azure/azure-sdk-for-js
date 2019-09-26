let nock = require('nock');

module.exports.testInfo = {"share":"share156775314137802028","dir":"dir156775314181604968"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775314137802028')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:01 GMT',
  'ETag',
  '"0x8D73297B2C20DCE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aed59697-201a-002d-5080-6444f0000000',
  'x-ms-client-request-id',
  'd9e5b4e6-d54a-416c-af64-ea3ce63f06f2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775314137802028/dir156775314181604968')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:02 GMT',
  'ETag',
  '"0x8D73297B305CD76"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b835888e-a01a-001c-3480-64a5e3000000',
  'x-ms-client-request-id',
  'ebfa89e1-e8ed-4587-aca9-4cd2a92cf7b3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:02.1166966Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:02.1166966Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:02.1166966Z',
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
  'Fri, 06 Sep 2019 06:59:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775314137802028/dir156775314181604968')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:02 GMT',
  'ETag',
  '"0x8D73297B3430C60"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd40d4995-f01a-0063-4280-646a78000000',
  'x-ms-client-request-id',
  '50169415-de4b-4901-9d42-9edd02e1a40c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 06:59:02 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775314137802028/dir156775314181604968')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:02 GMT',
  'ETag',
  '"0x8D73297B3430C60"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22ee8b44-b01a-00b9-3580-64f399000000',
  'x-ms-client-request-id',
  '8568e2b6-ee10-44ae-a532-2d3bfd57f250',
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
  '2019-09-06T06:59:02.5180768Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:02.1166966Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:02.1166966Z',
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
  'Fri, 06 Sep 2019 06:59:02 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775314137802028')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1f7c6dd1-201a-00d9-5880-648f06000000',
  'x-ms-client-request-id',
  'adf16e12-213f-46c6-991b-843eb8713ee7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:03 GMT',
  'Connection',
  'close' ]);

