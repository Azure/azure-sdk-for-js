let nock = require('nock');

module.exports.testInfo = {"share":"share155873371611602550"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873371611602550')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:35:16 GMT',
  'ETag',
  '"0x8D6E08FB639E6B5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '21f1fc11-c01a-004e-7c78-1258bd000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:35:15 GMT',
  'Connection',
  'close' ]);

