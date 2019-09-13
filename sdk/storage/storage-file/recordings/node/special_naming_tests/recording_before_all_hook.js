let nock = require('nock');

module.exports.testInfo = {"1share-with-dash":"1share-with-dash156775327320403860","dir":"dir156775327320401456"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156775327320403860')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:01:13 GMT',
  'ETag',
  '"0x8D7329801555B55"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b7c6557-901a-0118-2980-64d6e9000000',
  'x-ms-client-request-id',
  'aa729720-0a02-45ca-8214-1f573f568260',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:01:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156775327320403860/dir156775327320401456')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:01:13 GMT',
  'ETag',
  '"0x8D732980199CC14"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0e7f30e7-d01a-0074-1f80-64c373000000',
  'x-ms-client-request-id',
  'cbd1850d-dac1-495f-aa1d-3904f863ed00',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:01:13.9488788Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:01:13.9488788Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:01:13.9488788Z',
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
  'Fri, 06 Sep 2019 07:01:13 GMT',
  'Connection',
  'close' ]);

