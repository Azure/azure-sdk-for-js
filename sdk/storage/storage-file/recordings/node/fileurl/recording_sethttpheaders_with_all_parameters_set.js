let nock = require('nock');

module.exports.testInfo = {"share":"share156044257798800011","dir":"dir156044257823605624","file":"file156044257852806814"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044257798800011')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:02 GMT',
  'ETag',
  '"0x8D6EFDFC1E3BC6B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1cd67e24-901a-006f-10c8-21d245000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:16:02 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044257798800011/dir156044257823605624')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:03 GMT',
  'ETag',
  '"0x8D6EFDFC20A8B3D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '946412ce-501a-005b-27c8-217ded000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:02 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044257798800011/dir156044257823605624/file156044257852806814')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:03 GMT',
  'ETag',
  '"0x8D6EFDFC2359A81"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94d5d7d7-401a-00aa-62c8-21ac7e000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:02 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044257798800011/dir156044257823605624/file156044257852806814')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:03 GMT',
  'ETag',
  '"0x8D6EFDFC25EAD9C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9e33cb83-a01a-0045-3ec8-21a700000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156044257798800011/dir156044257823605624/file156044257852806814')
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
  'Thu, 13 Jun 2019 09:16:03 GMT',
  'ETag',
  '"0x8D6EFDFC25EAD9C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b205e3a-801a-001d-5ec8-21a37b000000',
  'x-ms-version',
  '2018-03-28',
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
  'Thu, 13 Jun 2019 09:16:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044257798800011')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cd6270e6-601a-0094-18c8-211a5f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:16:03 GMT',
  'Connection',
  'close' ]);

