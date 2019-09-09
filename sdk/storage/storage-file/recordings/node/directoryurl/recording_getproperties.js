let nock = require('nock');

module.exports.testInfo = {"share":"share156775314349107053","dir":"dir156775314389301808"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775314349107053')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:03 GMT',
  'ETag',
  '"0x8D73297B400F37A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '39622367-e01a-0040-7e80-64f0bb000000',
  'x-ms-client-request-id',
  'bc384d70-e7a6-4053-bceb-6178d6e6d670',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775314349107053/dir156775314389301808')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:04 GMT',
  'ETag',
  '"0x8D73297B43E999C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '83c78239-801a-00a2-4b80-64cd9a000000',
  'x-ms-client-request-id',
  '383e714a-7e6e-4039-a162-cfc589f00462',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:04.1666460Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:04.1666460Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:04.1666460Z',
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
  'Fri, 06 Sep 2019 06:59:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775314349107053/dir156775314389301808')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:04 GMT',
  'ETag',
  '"0x8D73297B43E999C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2781503c-f01a-00f5-0480-6463a9000000',
  'x-ms-client-request-id',
  'b18339b0-b8c6-4f9c-b1d7-8c210a43d70b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-06T06:59:04.1666460Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:04.1666460Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:04.1666460Z',
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
  'Fri, 06 Sep 2019 06:59:04 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775314349107053')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '68da3860-701a-0089-4580-644d56000000',
  'x-ms-client-request-id',
  'f017f558-3d9b-4465-aac3-dfda7c22dad0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:04 GMT',
  'Connection',
  'close' ]);

