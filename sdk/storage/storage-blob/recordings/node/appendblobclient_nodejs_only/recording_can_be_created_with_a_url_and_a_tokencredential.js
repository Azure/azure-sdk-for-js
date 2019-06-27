let nock = require('nock');

module.exports.testInfo = {"container":"container156150801520802898","blob":"blob156150801550203342"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150801520802898')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:13:35 GMT',
  'ETag',
  '"0x8D6F9CB2175BF54"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1e2f0442-b01e-00d2-4eb3-2bc4c9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 26 Jun 2019 00:13:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156150801520802898')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a99b6bf8-701e-008b-39b3-2bc14f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 26 Jun 2019 00:13:35 GMT',
  'Connection',
  'close' ]);

