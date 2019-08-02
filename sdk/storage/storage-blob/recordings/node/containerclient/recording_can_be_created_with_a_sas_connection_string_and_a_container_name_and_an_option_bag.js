let nock = require('nock');

module.exports.testInfo = {"container":"container156464897340508022"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156464897340508022')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 01 Aug 2019 08:42:53 GMT',
  'ETag',
  '"0x8D7165C3E6F726A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a4a008c5-e01e-00ac-2045-485b06000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 01 Aug 2019 08:42:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156464897340508022')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 01 Aug 2019 08:42:53 GMT',
  'ETag',
  '"0x8D7165C3E6F726A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f26b299-701e-00a2-4045-48b70d000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 01 Aug 2019 08:42:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156464897340508022')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7be9335a-501e-00d8-4845-48dd40000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 01 Aug 2019 08:42:53 GMT',
  'Connection',
  'close' ]);

