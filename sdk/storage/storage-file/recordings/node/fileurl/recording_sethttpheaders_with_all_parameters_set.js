let nock = require('nock');

module.exports.testInfo = {"share":"share156404672295700752","dir":"dir156404672322406404","file":"file156404672373300153"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404672295700752')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:45 GMT',
  'ETag',
  '"0x8D710E18323D37F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3d6b6289-d01a-0007-51ca-42c813000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:21:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404672295700752/dir156404672322406404')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:45 GMT',
  'ETag',
  '"0x8D710E183713B23"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '50fc55a6-001a-0027-1cca-42a4df000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:21:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404672295700752/dir156404672322406404/file156404672373300153')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:45 GMT',
  'ETag',
  '"0x8D710E1839A7579"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7e678ec6-d01a-0121-61ca-4215f2000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:21:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404672295700752/dir156404672322406404/file156404672373300153')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:46 GMT',
  'ETag',
  '"0x8D710E183C388B8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '525779ce-901a-0126-31ca-42e377000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:21:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156404672295700752/dir156404672322406404/file156404672373300153')
  .reply(200, [], [ 'Cache-Control',
  'fileCacheControl',
  'Content-Length',
  '11',
  'Content-Type',
  'fileContentType',
  'Content-Encoding',
  'fileContentEncoding',
  'Content-Language',
  'fileContentLanguage',
  'Content-MD5',
  'AQIDBA==',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:46 GMT',
  'ETag',
  '"0x8D710E183C388B8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '75713b8d-101a-00d6-48ca-42754c000000',
  'x-ms-version',
  '2018-11-09',
  'Content-Disposition',
  'fileContentDisposition',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,Content-MD5,Content-Disposition,x-ms-type,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Jul 2019 09:21:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156404672295700752')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '95f9bc44-901a-0066-49ca-428ccc000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:21:46 GMT',
  'Connection',
  'close' ]);

