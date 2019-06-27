let nock = require('nock');

module.exports.testInfo = {"container":"container156150793465603564","blob":"blob156150793494804880"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150793465603564')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:12:14 GMT',
  'ETag',
  '"0x8D6F9CAF1723131"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f04d837-801e-00d1-09b3-2bc7ce000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 26 Jun 2019 00:12:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150793465603564/blob156150793494804880', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:12:15 GMT',
  'ETag',
  '"0x8D6F9CAF19FAB8F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3933e9ee-301e-0062-2eb3-2b3d49000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 26 Jun 2019 00:12:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150793465603564/blob156150793494804880')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:12:15 GMT',
  'ETag',
  '"0x8D6F9CAF19FAB8F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'de1ee83f-101e-0031-34b3-2b2146000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Wed, 26 Jun 2019 00:12:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156150793465603564/blob156150793494804880')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:12:15 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6F9CAF19FAB8F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9abe1a77-401e-0022-31b3-2b14a7000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Wed, 26 Jun 2019 00:12:15 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'infinite',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 26 Jun 2019 00:12:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150793465603564/blob156150793494804880')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:12:15 GMT',
  'ETag',
  '"0x8D6F9CAF19FAB8F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a3e47d90-c01e-00dd-74b3-2b293f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 26 Jun 2019 00:12:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156150793465603564')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd4b41caf-201e-0039-47b3-2b3a35000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 26 Jun 2019 00:12:15 GMT',
  'Connection',
  'close' ]);

