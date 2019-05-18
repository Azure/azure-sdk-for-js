let nock = require('nock');

module.exports.testInfo = {"1container-with-dash":"1container-with-dash155666304622705418"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash155666304622705418')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Apr 2019 22:24:06 GMT',
  'ETag',
  '"0x8D6CDBA8F0C16DC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5e5a2603-301e-001f-56a3-ff4648000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 30 Apr 2019 22:24:06 GMT',
  'Connection',
  'close' ]);

