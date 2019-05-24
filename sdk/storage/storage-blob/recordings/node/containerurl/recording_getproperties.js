let nock = require('nock');

module.exports.testInfo = {"container":"container155873884233506553"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873884233506553')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:42 GMT',
  'ETag',
  '"0x8D6E09BA5A0B467"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e8e7ddf4-d01e-0078-5984-12f5ef000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:00:41 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155873884233506553')
  .query({"restype":"container"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:42 GMT',
  'ETag',
  '"0x8D6E09BA5A0B467"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0bde199-b01e-0063-1c84-12db7d000000',
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
  'Fri, 24 May 2019 23:00:41 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873884233506553')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '052de02a-d01e-009d-4184-12e718000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:00:42 GMT',
  'Connection',
  'close' ]);

