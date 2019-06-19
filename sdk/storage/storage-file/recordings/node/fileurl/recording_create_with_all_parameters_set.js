let nock = require('nock');

module.exports.testInfo = {"share":"share156093648956905025","dir":"dir156093648983904788","file":"file156093649011105702"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093648956905025')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:08 GMT',
  'ETag',
  '"0x8D6F498054543A7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3126e471-001a-00eb-0480-26c06a000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:25:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093648956905025/dir156093648983904788')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:08 GMT',
  'ETag',
  '"0x8D6F498056EAE73"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'abee303a-501a-003f-5980-26894a000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 19 Jun 2019 09:25:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093648956905025/dir156093648983904788/file156093649011105702')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:08 GMT',
  'ETag',
  '"0x8D6F49805979A93"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '77544838-201a-00b3-2580-26c411000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 19 Jun 2019 09:25:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156093648956905025/dir156093648983904788/file156093649011105702')
  .reply(200, ["0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"], [ 'Cache-Control',
  'fileCacheControl',
  'Content-Length',
  '512',
  'Content-Type',
  'fileContentType',
  'Content-Encoding',
  'fileContentEncoding',
  'Content-Language',
  'fileContentLanguage',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:08 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6F49805979A93"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aa37e9a8-201a-00b8-2d80-26dc65000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-meta-key1',
  'vala',
  'x-ms-meta-key2',
  'valb',
  'Content-Disposition',
  'fileContentDisposition',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-meta-key1,x-ms-meta-key2,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,Content-Disposition,x-ms-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 19 Jun 2019 09:25:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156093648956905025/dir156093648983904788/file156093649011105702')
  .reply(200, [], [ 'Cache-Control',
  'fileCacheControl',
  'Content-Length',
  '512',
  'Content-Type',
  'fileContentType',
  'Content-Encoding',
  'fileContentEncoding',
  'Content-Language',
  'fileContentLanguage',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:08 GMT',
  'ETag',
  '"0x8D6F49805979A93"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0919ae0c-c01a-0018-2f80-261303000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-meta-key1',
  'vala',
  'x-ms-meta-key2',
  'valb',
  'Content-Disposition',
  'fileContentDisposition',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-meta-key1,x-ms-meta-key2,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,Content-Disposition,x-ms-type,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 19 Jun 2019 09:25:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156093648956905025')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0824cf00-f01a-0039-3980-267e32000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:25:08 GMT',
  'Connection',
  'close' ]);

