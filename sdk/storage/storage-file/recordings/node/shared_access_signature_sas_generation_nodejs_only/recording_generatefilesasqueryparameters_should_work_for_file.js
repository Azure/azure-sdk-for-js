let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-04-25T01:10:00.490Z","share":"share155615460049006302","dir":"dir155615460090501084","file":"file155615460135607451"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155615460049006302')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 01:10:00 GMT',
  'ETag',
  '"0x8D6C91ABDB61C30"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5e178330-a01a-005e-5903-fb6e5b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Apr 2019 01:09:59 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155615460049006302/dir155615460090501084')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 01:10:01 GMT',
  'ETag',
  '"0x8D6C91ABDF803A2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6a9e14b5-401a-0032-4a03-fbc588000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Apr 2019 01:10:00 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155615460049006302/dir155615460090501084/file155615460135607451')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 01:10:01 GMT',
  'ETag',
  '"0x8D6C91ABE3A48BC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8550db85-301a-0097-1703-fbfe91000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Apr 2019 01:10:01 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share155615460049006302/dir155615460090501084/file155615460135607451')
  .query({"sv":"2016-05-31","spr":"https%2Chttp","st":"2019-04-25T01%3A05%3A00Z","se":"2019-04-26T01%3A10%3A00Z","sip":"0.0.0.0-255.255.255.255","sr":"f","sp":"rcwd","sig":"iw7jKAiI5WpS1mZiNokdyaV5taiwpIzAZzFFOCsJ7Hk%3D","rscc":"cache-control-override","rscd":"content-disposition-override","rsce":"content-encoding-override","rscl":"content-language-override","rsct":"content-type-override"})
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
  'Thu, 25 Apr 2019 01:10:01 GMT',
  'ETag',
  '"0x8D6C91ABE3A48BC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'deb09279-c01a-000a-6503-fb84d1000000',
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
  'Thu, 25 Apr 2019 01:10:01 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155615460049006302')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7a27a6b5-f01a-0064-0903-fb2df8000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Apr 2019 01:10:01 GMT',
  'Connection',
  'close' ]);
