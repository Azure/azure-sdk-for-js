let nock = require('nock');

module.exports.testInfo = {"container":"container157186722811500958","blob":"blob157186722866604569"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157186722811500958')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 23 Oct 2019 21:47:08 GMT',
  'ETag',
  '"0x8D758028D9EF35D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0a235ca0-901e-0015-1aeb-89a465000000',
  'x-ms-client-request-id',
  '2ca2c90c-6fc1-44e7-99f2-a44dde43473f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 23 Oct 2019 21:47:08 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157186722811500958')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0a235cd4-901e-0015-47eb-89a465000000',
  'x-ms-client-request-id',
  '1722d76c-9a00-4462-ab49-e3f91bdf8fbd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 23 Oct 2019 21:47:08 GMT' ]);

