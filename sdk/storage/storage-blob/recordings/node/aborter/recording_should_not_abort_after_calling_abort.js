let nock = require('nock');

module.exports.testInfo = {"container":"container155873875001603142"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873875001603142')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:10 GMT',
  'ETag',
  '"0x8D6E09B6EC430E4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0b3d2a2b-c01e-006c-2984-12368b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 22:59:09 GMT',
  'Connection',
  'close' ]);

