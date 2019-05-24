let nock = require('nock');

module.exports.testInfo = {"container":"container155873886844409100"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873886844409100')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:01:08 GMT',
  'ETag',
  '"0x8D6E09BB531B9AA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9ca00fb3-d01e-0015-8084-125fc1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:01:07 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873886844409100')
  .query({"comp":"lease","restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:01:08 GMT',
  'ETag',
  '"0x8D6E09BB531B9AA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '195795bb-101e-008b-0884-122686000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Fri, 24 May 2019 23:01:08 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155873886844409100')
  .query({"restype":"container"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:01:08 GMT',
  'ETag',
  '"0x8D6E09BB531B9AA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0b1337ff-701e-003a-7a84-12defb000000',
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
  'Fri, 24 May 2019 23:01:09 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873886844409100')
  .query({"comp":"lease","restype":"container"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:01:08 GMT',
  'ETag',
  '"0x8D6E09BB531B9AA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'caf0871c-301e-009c-1584-12e6e5000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-lease-id',
  '3c7e72eb-b430-4526-bc53-d8ecef03798f',
  'Date',
  'Fri, 24 May 2019 23:01:08 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155873886844409100')
  .query({"restype":"container"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:01:08 GMT',
  'ETag',
  '"0x8D6E09BB531B9AA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ff723684-d01e-0073-8084-12ed9b000000',
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
  'Fri, 24 May 2019 23:01:09 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873886844409100')
  .query({"comp":"lease","restype":"container"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:01:08 GMT',
  'ETag',
  '"0x8D6E09BB531B9AA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b4ebe079-b01e-004a-3e84-12ad3f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:01:10 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873886844409100')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '712487fd-801e-0085-6684-12ca8d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:01:10 GMT',
  'Connection',
  'close' ]);

