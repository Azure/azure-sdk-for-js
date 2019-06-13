let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-05-24T21:39:28.727Z","share":"share155873396872705801","dir":"dir155873396952109020","file":"file155873396985802398"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873396872705801')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:39:29 GMT',
  'ETag',
  '"0x8D6E0904CFAA9D2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f7d8aff-d01a-0073-5a79-12ed9b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:39:28 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873396872705801/dir155873396952109020')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:39:29 GMT',
  'ETag',
  '"0x8D6E0904D376226"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '258b7722-b01a-004a-5a79-12ad3f000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:39:28 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873396872705801/dir155873396952109020/file155873396985802398')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:39:29 GMT',
  'ETag',
  '"0x8D6E0904D80FBC7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7171e089-801a-0085-4879-12ca8d000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:39:29 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share155873396872705801/dir155873396952109020/file155873396985802398')
  .query({"sv":"2016-05-31","spr":"https%2Chttp","st":"2019-05-24T21%3A34%3A28Z","se":"2019-05-25T21%3A39%3A28Z","sip":"0.0.0.0-255.255.255.255","sr":"f","sp":"rcwd","sig":"APiSJ2nKUDChkg%2BUmPkuE07VlVUlduXGos%2BwrgBp0OE%3D","rscc":"cache-control-override","rscd":"content-disposition-override","rsce":"content-encoding-override","rscl":"content-language-override","rsct":"content-type-override"})
  .reply(200, [], [ 'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '1024',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Fri, 24 May 2019 21:39:29 GMT',
  'ETag',
  '"0x8D6E0904D80FBC7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43848c02-201a-000b-3f79-12852c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-type',
  'File',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:39:30 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873396872705801')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a3ec7229-d01a-001e-0879-1247b5000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:39:31 GMT',
  'Connection',
  'close' ]);

