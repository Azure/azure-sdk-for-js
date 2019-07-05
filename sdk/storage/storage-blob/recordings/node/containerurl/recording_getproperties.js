let nock = require('nock');

module.exports.testInfo = {"container":"container156231860852107242"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231860852107242')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:09 GMT',
  'ETag',
  '"0x8D70129F9E4C029"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '97451699-c01e-00b9-7d12-33dd98000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231860852107242')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:09 GMT',
  'ETag',
  '"0x8D70129F9E4C029"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f760faec-401e-0064-2112-338e36000000',
  'x-ms-version',
  '2018-11-09',
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
  'Fri, 05 Jul 2019 09:20:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231860852107242')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '131bd423-001e-0123-1b12-331708000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:09 GMT',
  'Connection',
  'close' ]);

