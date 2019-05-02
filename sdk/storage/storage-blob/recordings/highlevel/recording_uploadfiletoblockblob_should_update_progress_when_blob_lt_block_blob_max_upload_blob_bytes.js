let nock = require('nock');

module.exports.testInfo = {"container":"container155683095360304553","blob":"blob155683095400105705"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155683095360304553')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 02 May 2019 21:02:33 GMT',
  'ETag',
  '"0x8D6CF417F930020"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e1209223-101e-0021-512a-01f069000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 02 May 2019 21:02:33 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155683095360304553')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ec0d42d9-601e-0025-2a2a-0105eb000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 02 May 2019 21:02:33 GMT',
  'Connection',
  'close' ]);

