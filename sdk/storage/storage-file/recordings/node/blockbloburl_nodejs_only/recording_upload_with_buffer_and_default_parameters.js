let nock = require('nock');

module.exports.testInfo = {"share":"share156404683587501512","dir":"dir156404683613806963","file":"file156404683640604857","randomstring":"randomstring156404683640707860"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404683587501512')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:23:37 GMT',
  'ETag',
  '"0x8D710E1C671232D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '07b9de50-e01a-0062-5aca-42794e000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:23:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404683587501512/dir156404683613806963')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:23:38 GMT',
  'ETag',
  '"0x8D710E1C69A0C1C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cddfeb28-501a-0119-3cca-4254ab000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:23:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404683587501512/dir156404683613806963/file156404683640604857')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:23:38 GMT',
  'ETag',
  '"0x8D710E1C6C36D88"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '39d5f2ba-201a-00f7-19ca-42187d000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:23:38 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404683587501512/dir156404683613806963/file156404683640604857', "randomstring156404683640707860")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '7BDj4ODb48Vhd6U3R4howQ==',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:23:38 GMT',
  'ETag',
  '"0x8D710E1C6F8B7FD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ca6739c-f01a-0032-62ca-426646000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:23:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156404683587501512/dir156404683613806963/file156404683640604857')
  .reply(200, "randomstring156404683640707860", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:23:38 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D710E1C6F8B7FD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb6697da-201a-00b3-2aca-42c411000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Jul 2019 09:23:38 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156404683587501512')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf4e1bd6-201a-00de-0dca-426e3f000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:23:38 GMT',
  'Connection',
  'close' ]);

