let nock = require('nock');

module.exports.testInfo = {"container":"container155683095180707818","blob":"blob155683095231509959"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155683095180707818')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 02 May 2019 21:02:32 GMT',
  'ETag',
  '"0x8D6CF417E8FDFB9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c6c0ad57-401e-0093-7c2a-010b13000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 02 May 2019 21:02:31 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155683095180707818')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '013385f5-e01e-0052-582a-0180aa000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 02 May 2019 21:02:31 GMT',
  'Connection',
  'close' ]);

