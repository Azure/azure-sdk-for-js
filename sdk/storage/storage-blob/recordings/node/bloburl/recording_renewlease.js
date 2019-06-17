let nock = require('nock');

module.exports.testInfo = {"container":"container156058639315207170","blob":"blob156058639350400337"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058639315207170')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:13:12 GMT',
  'ETag',
  '"0x8D6F1694F80B9EB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '755bbb18-001e-0043-0552-235078000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:13:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058639315207170/blob156058639350400337', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:13:13 GMT',
  'ETag',
  '"0x8D6F1694FCA6493"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3f213d4b-401e-00c7-4152-230650000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sat, 15 Jun 2019 08:13:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058639315207170/blob156058639350400337')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:13:13 GMT',
  'ETag',
  '"0x8D6F1694FCA6493"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cd2d744b-b01e-0037-7f52-23d63e000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Sat, 15 Jun 2019 08:13:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156058639315207170/blob156058639350400337')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:13:13 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6F1694FCA6493"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'da699ce0-701e-0047-7252-23a5fa000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Sat, 15 Jun 2019 08:13:13 GMT',
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
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 15 Jun 2019 08:13:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156058639315207170/blob156058639350400337')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:13:13 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6F1694FCA6493"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43f63773-e01e-0024-1b52-23e3df000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Sat, 15 Jun 2019 08:13:13 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'expired',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 15 Jun 2019 08:13:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058639315207170/blob156058639350400337')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:13:13 GMT',
  'ETag',
  '"0x8D6F1694FCA6493"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2e7fd1e-101e-00d4-6d52-2333b1000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Sat, 15 Jun 2019 08:13:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156058639315207170/blob156058639350400337')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:13:13 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6F1694FCA6493"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56fc2b00-701e-0080-4952-23d93b000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Sat, 15 Jun 2019 08:13:13 GMT',
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
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 15 Jun 2019 08:13:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058639315207170/blob156058639350400337')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:13:13 GMT',
  'ETag',
  '"0x8D6F1694FCA6493"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4b9ee530-d01e-002c-7452-23f8ac000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:13:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156058639315207170')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2c89c3b-501e-0014-4452-23b9f5000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:13:36 GMT',
  'Connection',
  'close' ]);

