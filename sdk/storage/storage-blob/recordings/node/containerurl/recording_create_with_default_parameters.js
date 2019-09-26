let nock = require('nock');

module.exports.testInfo = {"container":"container156776197578006007"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776197578006007')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:16 GMT',
  'ETag',
  '"0x8D732AC4478A045"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4601d0a9-701e-0110-3f95-64cce6000000',
  'x-ms-client-request-id',
  '963e0efb-f6db-41a6-b500-40bb2621631c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776197578006007')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d252443-101e-014b-7595-64f5dd000000',
  'x-ms-client-request-id',
  '08619c82-8336-4803-a0b1-2dac83b4a073',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:15 GMT',
  'Connection',
  'close' ]);

