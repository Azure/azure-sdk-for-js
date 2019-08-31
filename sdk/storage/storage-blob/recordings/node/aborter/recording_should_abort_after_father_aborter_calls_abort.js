let nock = require('nock');

module.exports.testInfo = {"container":"container156711934555807985"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156711934555807985')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Aug 2019 22:55:45 GMT',
  'ETag',
  '"0x8D72CD406F7F9FB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7448ec7d-701e-00a9-74bc-5eaf79000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 29 Aug 2019 22:55:44 GMT',
  'Connection',
  'close' ]);

