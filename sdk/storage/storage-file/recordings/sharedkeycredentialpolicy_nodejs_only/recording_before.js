let nock = require('nock');

module.exports.testInfo = {"1share-with-dash":"1share-with-dash155623278963402641"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155623278963402641')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 22:53:10 GMT',
  'ETag',
  '"0x8D6C9D0CA295D5A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd218e364-001a-003e-02b9-fb2b79000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Apr 2019 22:53:10 GMT',
  'Connection',
  'close' ]);
