let nock = require('nock');

module.exports.testInfo = {"share":"share156044259623906223","dir":"dir156044259647200674","file":"file156044259671305643"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044259623906223')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:21 GMT',
  'ETag',
  '"0x8D6EFDFCCC1F567"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7330e282-101a-0031-0ac8-212146000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:16:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044259623906223/dir156044259647200674')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:21 GMT',
  'ETag',
  '"0x8D6EFDFCCE6F273"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbb21dc2-a01a-006c-2ac8-21d142000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044259623906223/dir156044259647200674/file156044259671305643')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:21 GMT',
  'ETag',
  '"0x8D6EFDFCD0EF3E8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb84f825-601a-001c-54c8-21a286000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044259623906223/dir156044259647200674/file156044259671305643', "Hello")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:21 GMT',
  'ETag',
  '"0x8D6EFDFCD37DFF9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab6d12ec-001a-0043-19c8-215078000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044259623906223/dir156044259647200674/file156044259671305643', "World")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:22 GMT',
  'ETag',
  '"0x8D6EFDFCD6252F3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e76d697d-701a-002a-1fc8-210fd4000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156044259623906223/dir156044259647200674/file156044259671305643')
  .reply(206, "HelloWor", [ 'Content-Length',
  '8',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-7/10',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:22 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6EFDFCD6252F3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7258b6ee-c01a-00dd-67c8-21293f000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Range,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Jun 2019 09:16:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044259623906223')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c80d70bd-b01a-0015-75c8-21b808000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:16:22 GMT',
  'Connection',
  'close' ]);

