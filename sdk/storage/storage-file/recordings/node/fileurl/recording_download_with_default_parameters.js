let nock = require('nock');

module.exports.testInfo = {"share":"share155837987026904262","dir":"dir155837987088607983","file":"file155837987138409145"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155837987026904262')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 20 May 2019 19:17:50 GMT',
  'ETag',
  '"0x8D6DD57D9F9A649"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd4794e4f-601a-006a-1c40-0fc1f3000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 20 May 2019 19:17:50 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155837987026904262/dir155837987088607983')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 20 May 2019 19:17:51 GMT',
  'ETag',
  '"0x8D6DD57DA435883"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5175e508-c01a-004e-5740-0f58bd000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 20 May 2019 19:17:51 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155837987026904262/dir155837987088607983/file155837987138409145')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 20 May 2019 19:17:51 GMT',
  'ETag',
  '"0x8D6DD57DA87C0DA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2abc88cb-b01a-000e-0440-0f7153000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 20 May 2019 19:17:51 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155837987026904262/dir155837987088607983/file155837987138409145', "Hello World")
  .query({"comp":"range"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 20 May 2019 19:17:52 GMT',
  'ETag',
  '"0x8D6DD57DAC76D63"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66a2ea60-101a-0021-7440-0ff069000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 20 May 2019 19:17:51 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155837987026904262/dir155837987088607983/file155837987138409145')
  .reply(200, "Hello World", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 20 May 2019 19:17:52 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6DD57DAC76D63"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ffddf1db-801a-006b-3440-0fc00e000000',
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
  'Mon, 20 May 2019 19:17:51 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155837987026904262')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e7fb5697-d01a-0073-4f40-0fed9b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 20 May 2019 19:17:52 GMT',
  'Connection',
  'close' ]);

