let nock = require('nock');

module.exports.testInfo = {"container":"container155873876696901528","blob":"blob155873876727601325"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873876696901528')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:26 GMT',
  'ETag',
  '"0x8D6E09B78B4655D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1344a6ae-601e-0007-7784-126bdd000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 22:59:26 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873876696901528/blob155873876727601325', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:27 GMT',
  'ETag',
  '"0x8D6E09B78E1AC12"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4fc9aab5-601e-006a-3f84-12c1f3000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 22:59:26 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873876696901528/blob155873876727601325')
  .query({"comp":"lease"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:27 GMT',
  'ETag',
  '"0x8D6E09B78E1AC12"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1256e244-901e-0019-5f84-12b130000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Fri, 24 May 2019 22:59:27 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container155873876696901528/blob155873876727601325')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:27 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6E09B78E1AC12"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '465ab319-501e-0040-5184-12b4b6000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Fri, 24 May 2019 22:59:27 GMT',
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
  'Fri, 24 May 2019 22:59:27 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873876696901528/blob155873876727601325')
  .query({"comp":"lease"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:27 GMT',
  'ETag',
  '"0x8D6E09B78E1AC12"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'adce241d-101e-002a-0b84-12e81d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 22:59:27 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873876696901528')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '875ce955-301e-0079-5684-12f412000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 22:59:28 GMT',
  'Connection',
  'close' ]);

