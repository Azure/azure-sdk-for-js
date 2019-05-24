let nock = require('nock');

module.exports.testInfo = {"container":"container155873875065600875"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873875065600875')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:10 GMT',
  'ETag',
  '"0x8D6E09B6EF8F156"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5c8851f3-401e-001b-4b84-12b3ca000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 22:59:10 GMT',
  'Connection',
  'close' ]);

