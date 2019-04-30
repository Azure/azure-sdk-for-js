let nock = require('nock');

module.exports.testInfo = {"container":"container155665906486008436"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155665906486008436')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Apr 2019 21:17:45 GMT',
  'ETag',
  '"0x8D6CDB149E6F6DC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1823af07-401e-0032-5a9a-ffc588000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 30 Apr 2019 21:17:44 GMT',
  'Connection',
  'close' ]);

