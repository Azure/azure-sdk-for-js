let nock = require('nock');

module.exports.testInfo = {"container":"container155873884633001916"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873884633001916')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:46 GMT',
  'ETag',
  '"0x8D6E09BA8018458"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '86d17671-a01e-001a-2184-12b237000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:00:45 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873884633001916')
  .query({"comp":"lease","restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:46 GMT',
  'ETag',
  '"0x8D6E09BA8018458"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdd9605b-701e-0018-5a84-12b0cd000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Fri, 24 May 2019 23:00:46 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155873884633001916')
  .query({"restype":"container"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:46 GMT',
  'ETag',
  '"0x8D6E09BA8018458"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '730246c8-e01e-003f-4584-122a84000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-has-immutability-policy,x-ms-has-legal-hold,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:00:46 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873884633001916')
  .query({"comp":"lease","restype":"container"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:46 GMT',
  'ETag',
  '"0x8D6E09BA8018458"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53cac8c0-001e-003e-0484-122b79000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:00:46 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873884633001916')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3d1cfac-201e-004f-7184-125940000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:00:46 GMT',
  'Connection',
  'close' ]);

