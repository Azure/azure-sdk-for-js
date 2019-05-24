let nock = require('nock');

module.exports.testInfo = {"share":"share155873382389901559","dir":"dir155873382425606325","file":"file155873382459603894"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873382389901559')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:03 GMT',
  'ETag',
  '"0x8D6E08FF66D54B9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '50ec7e41-701a-0013-2578-12a8b9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:37:03 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873382389901559/dir155873382425606325')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:04 GMT',
  'ETag',
  '"0x8D6E08FF6A09DAE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e750dbaf-101a-008b-4478-122686000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:37:03 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873382389901559/dir155873382425606325/file155873382459603894')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:04 GMT',
  'ETag',
  '"0x8D6E08FF6DA07BA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cbb23caf-201a-004f-5278-125940000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:37:03 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873382389901559/dir155873382425606325/file155873382459603894', "Hello")
  .query({"comp":"range"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:05 GMT',
  'ETag',
  '"0x8D6E08FF71CC24B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8be6a67-b01a-0063-5078-12db7d000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:37:04 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873382389901559/dir155873382425606325/file155873382459603894', "World")
  .query({"comp":"range"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:05 GMT',
  'ETag',
  '"0x8D6E08FF75A99F7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '65f440cd-b01a-0027-2078-120711000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:37:05 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155873382389901559/dir155873382425606325/file155873382459603894')
  .reply(206, "HelloWor", [ 'Content-Length',
  '8',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-7/10',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:05 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6E08FF75A99F7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3865b142-401a-0093-0678-120b13000000',
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
  'Fri, 24 May 2019 21:37:05 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873382389901559')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1231a898-601a-0043-0a78-12b7b1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:37:05 GMT',
  'Connection',
  'close' ]);

