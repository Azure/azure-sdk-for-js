let nock = require('nock');

module.exports.testInfo = {"container":"container156464896774400269","blob":"blob156464896804302154"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156464896774400269')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 01 Aug 2019 08:42:47 GMT',
  'ETag',
  '"0x8D7165C3B10A143"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8c78fcdc-001e-0061-5f45-483e4e000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 01 Aug 2019 08:42:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156464896774400269/blob156464896804302154', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 01 Aug 2019 08:42:48 GMT',
  'ETag',
  '"0x8D7165C3B3DEA74"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'abec6008-301e-002d-2b45-48f951000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 01 Aug 2019 08:42:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156464896774400269')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '809dc160-401e-00e5-3045-486866000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 01 Aug 2019 08:42:47 GMT',
  'Connection',
  'close' ]);

