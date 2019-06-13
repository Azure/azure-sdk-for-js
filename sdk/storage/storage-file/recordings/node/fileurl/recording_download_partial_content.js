let nock = require('nock');

module.exports.testInfo = {"share":"share156044263012709500","dir":"dir156044263068707287","file":"file156044263098309677"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044263012709500')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:55 GMT',
  'ETag',
  '"0x8D6EFDFE103D4B4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8933b21c-101a-00d4-2bc8-2133b1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:16:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044263012709500/dir156044263068707287')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:55 GMT',
  'ETag',
  '"0x8D6EFDFE14D6244"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab7e11a7-901a-00e7-29c8-216a9c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044263012709500/dir156044263068707287/file156044263098309677')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:55 GMT',
  'ETag',
  '"0x8D6EFDFE17BA66E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b3ea2171-b01a-00bf-33c8-216ee7000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044263012709500/dir156044263068707287/file156044263098309677', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:56 GMT',
  'ETag',
  '"0x8D6EFDFE1A7EE6E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ffecbce3-b01a-005a-64c8-217c10000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156044263012709500/dir156044263068707287/file156044263098309677')
  .reply(206, "He", [ 'Content-Length',
  '2',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-1/10',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:56 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6EFDFE1A7EE6E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '591f8336-901a-00a8-55c8-21ae84000000',
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
  'Thu, 13 Jun 2019 09:16:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044263012709500')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1a4eec07-f01a-0030-24c8-2120bb000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:16:57 GMT',
  'Connection',
  'close' ]);

