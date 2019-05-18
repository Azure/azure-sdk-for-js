let nock = require('nock');

module.exports.testInfo = {"share":"share155613726478008711","dir":"dir155613726512005838","file":"file155613726545901525"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613726478008711')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:05 GMT',
  'ETag',
  '"0x8D6C8F260C65941"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '871d2597-f01a-0002-0ddb-fa9fa2000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:21:04 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613726478008711/dir155613726512005838')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:05 GMT',
  'ETag',
  '"0x8D6C8F260FAEF18"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '82ba3bf0-901a-0056-12db-fa7528000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:21:05 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613726478008711/dir155613726512005838/file155613726545901525')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:05 GMT',
  'ETag',
  '"0x8D6C8F2612D2BBE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '994e5b2b-e01a-001d-3adb-fa44b2000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:21:04 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613726478008711/dir155613726512005838/file155613726545901525')
  .query({"comp":"metadata"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:06 GMT',
  'ETag',
  '"0x8D6C8F26160A118"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be49f26f-701a-005c-5ddb-fa6ca1000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:21:05 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share155613726478008711/dir155613726512005838/file155613726545901525')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:06 GMT',
  'ETag',
  '"0x8D6C8F26160A118"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1328d415-201a-0088-52db-fa2581000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-meta-a,x-ms-meta-b,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 24 Apr 2019 20:21:05 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613726478008711/dir155613726512005838/file155613726545901525')
  .query({"comp":"metadata"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:06 GMT',
  'ETag',
  '"0x8D6C8F261C7D9F6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '097d2229-101a-008b-44db-fa2686000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:21:06 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share155613726478008711/dir155613726512005838/file155613726545901525')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:06 GMT',
  'ETag',
  '"0x8D6C8F261C7D9F6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7310a7e0-101a-0003-13db-fa9e5f000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 24 Apr 2019 20:21:06 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613726478008711')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2d735709-601a-002e-61db-fa1d9f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:21:06 GMT',
  'Connection',
  'close' ]);
