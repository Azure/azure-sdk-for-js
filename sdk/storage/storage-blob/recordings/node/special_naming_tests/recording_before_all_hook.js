let nock = require('nock');

module.exports.testInfo = {"1container-with-dash":"1container-with-dash155873892532809477"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash155873892532809477')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:02:05 GMT',
  'ETag',
  '"0x8D6E09BD7207CBD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c44e457-c01e-0023-5484-12f293000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:02:05 GMT',
  'Connection',
  'close' ]);

