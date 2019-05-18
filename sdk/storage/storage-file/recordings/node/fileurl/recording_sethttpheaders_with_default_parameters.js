let nock = require('nock');

module.exports.testInfo = {"share":"share155613726748206434","dir":"dir155613726781908135","file":"file155613726817702882"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613726748206434')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:07 GMT',
  'ETag',
  '"0x8D6C8F262627570"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18a9b30f-f01a-0009-0bdb-fa87d6000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:21:07 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613726748206434/dir155613726781908135')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:08 GMT',
  'ETag',
  '"0x8D6C8F262990B59"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eaddbaee-f01a-0020-6bdb-faf194000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:21:08 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613726748206434/dir155613726781908135/file155613726817702882')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:08 GMT',
  'ETag',
  '"0x8D6C8F262CD1D13"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '802fbd26-901a-0074-47db-fa1b1e000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:21:08 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613726748206434/dir155613726781908135/file155613726817702882')
  .query({"comp":"properties"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:08 GMT',
  'ETag',
  '"0x8D6C8F26301F239"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '725ddf1d-001a-0053-6bdb-fa8157000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:21:08 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share155613726748206434/dir155613726781908135/file155613726817702882')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:08 GMT',
  'ETag',
  '"0x8D6C8F26301F239"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e6a87fd-801a-0042-44db-fab64c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 24 Apr 2019 20:21:08 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613726748206434')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3741c071-f01a-0081-26db-fa3f0f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:21:08 GMT',
  'Connection',
  'close' ]);
