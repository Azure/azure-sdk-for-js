let nock = require('nock');

module.exports.testInfo = {"container":"container155873879442301559","blob":"blob155873879482004062"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873879442301559')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:54 GMT',
  'ETag',
  '"0x8D6E09B891F7C88"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ebf8961f-401e-0098-6284-121367000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 22:59:53 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873879442301559/blob155873879482004062', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:54 GMT',
  'ETag',
  '"0x8D6E09B895E0BA0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '588e21dd-c01e-0082-7384-123c08000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 22:59:54 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873879442301559/blob155873879482004062')
  .query({"comp":"lease"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:54 GMT',
  'ETag',
  '"0x8D6E09B895E0BA0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '16d67ca2-e01e-001d-4984-1244b2000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Fri, 24 May 2019 22:59:55 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container155873879442301559/blob155873879482004062')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6E09B895E0BA0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '87573fa7-001e-001c-2784-12454f000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Fri, 24 May 2019 22:59:54 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 22:59:55 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873879442301559/blob155873879482004062')
  .query({"comp":"lease"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:54 GMT',
  'ETag',
  '"0x8D6E09B895E0BA0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'caefd963-301e-009c-1284-12e6e5000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-lease-id',
  '3c7e72eb-b430-4526-bc53-d8ecef03798f',
  'Date',
  'Fri, 24 May 2019 22:59:55 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container155873879442301559/blob155873879482004062')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6E09B895E0BA0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ff7167a7-d01e-0073-2884-12ed9b000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Fri, 24 May 2019 22:59:54 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 22:59:55 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873879442301559/blob155873879482004062')
  .query({"comp":"lease"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:54 GMT',
  'ETag',
  '"0x8D6E09B895E0BA0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b4eb2634-b01e-004a-1f84-12ad3f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 22:59:55 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873879442301559')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7123d26c-801e-0085-1284-12ca8d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 22:59:56 GMT',
  'Connection',
  'close' ]);

