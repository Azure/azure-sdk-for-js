let nock = require('nock');

module.exports.testInfo = {"share":"share156150562650907764","dir":"dir156150562680307091","file":"file156150562712709858","randomstring":"randomstring156150562712707485"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150562650907764')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:33:46 GMT',
  'ETag',
  '"0x8D6F9C591ADDAAB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9cd9571a-101a-00b2-4cae-2b81eb000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:33:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150562650907764/dir156150562680307091')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:33:47 GMT',
  'ETag',
  '"0x8D6F9C591DAE53F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b581b173-101a-00d4-29ae-2b33b1000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:33:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150562650907764/dir156150562680307091/file156150562712709858')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:33:47 GMT',
  'ETag',
  '"0x8D6F9C5920C5C86"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f5a364c4-901a-002b-67ae-2b0e29000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:33:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150562650907764/dir156150562680307091/file156150562712709858', "randomstring156150562712707485")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'Y0bbPnQcZIn7hGv7GWv2sw==',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:33:47 GMT',
  'ETag',
  '"0x8D6F9C5923B6443"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c1efb8e-901a-00e7-54ae-2b6a9c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:33:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156150562650907764/dir156150562680307091/file156150562712709858')
  .reply(200, "randomstring156150562712707485", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:33:47 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6F9C5923B6443"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd5695677-c01a-007c-66ae-2be7a4000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:33:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150562650907764')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd569567a-c01a-007c-67ae-2be7a4000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:33:47 GMT',
  'Connection',
  'close' ]);

