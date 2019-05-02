let nock = require('nock');

module.exports.testInfo = {"container":"container155683095278806688","blob":"blob155683095318900855"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155683095278806688')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 02 May 2019 21:02:33 GMT',
  'ETag',
  '"0x8D6CF417F16AF12"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f825d84c-401e-001b-4a2a-01b3ca000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 02 May 2019 21:02:32 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155683095278806688')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '16cfce92-e01e-0070-0a2a-01ee9c000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 02 May 2019 21:02:32 GMT',
  'Connection',
  'close' ]);

