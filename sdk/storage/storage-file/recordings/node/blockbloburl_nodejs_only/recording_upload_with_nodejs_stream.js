let nock = require('nock');

module.exports.testInfo = {"share":"share156044274891200029","dir":"dir156044274915300160","file":"file156044274941006104","randomstring":"randomstring156044274941001736"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044274891200029')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:18:53 GMT',
  'ETag',
  '"0x8D6EFE027C37706"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9e7233d2-201a-00d7-3bc9-2130b6000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:18:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044274891200029/dir156044274915300160')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:18:54 GMT',
  'ETag',
  '"0x8D6EFE027E9F4E8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4e937fbd-d01a-000e-12c9-21969a000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:18:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044274891200029/dir156044274915300160/file156044274941006104')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:18:54 GMT',
  'ETag',
  '"0x8D6EFE028115A06"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '328a7736-501a-0036-34c9-21d7c3000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:18:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044274891200029/dir156044274915300160/file156044274941006104', "randomstring156044274941001736")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'uk9EWhyWw1jP7ut7WV1bzw==',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:18:54 GMT',
  'ETag',
  '"0x8D6EFE02844F653"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8baf2fe1-001a-00ad-6ec9-215afb000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:18:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156044274891200029/dir156044274915300160/file156044274941006104')
  .reply(200, "randomstring156044274941001736", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:18:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6EFE02844F653"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b9e5885b-001a-00e9-32c9-218697000000',
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
  'Thu, 13 Jun 2019 09:18:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044274891200029')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22a362c3-801a-0070-35c9-210955000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:18:54 GMT',
  'Connection',
  'close' ]);

