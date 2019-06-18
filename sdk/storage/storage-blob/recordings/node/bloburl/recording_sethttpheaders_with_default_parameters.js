let nock = require('nock');

module.exports.testInfo = {"container":"container156058638370201829","blob":"blob156058638475602609"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058638370201829')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:13:03 GMT',
  'ETag',
  '"0x8D6F1694A3A25CF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ef684027-601e-0035-3152-23d4c4000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:13:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058638370201829/blob156058638475602609', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:13:04 GMT',
  'ETag',
  '"0x8D6F1694AA476B8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bb9252b0-901e-0081-0e52-23d8c6000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sat, 15 Jun 2019 08:13:04 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058638370201829/blob156058638475602609')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:13:04 GMT',
  'ETag',
  '"0x8D6F1694ADD9288"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9df9d8e1-301e-00a5-0f52-234188000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:13:04 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156058638370201829/blob156058638475602609')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:13:04 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6F1694ADD9288"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f362538b-501e-00b5-5e52-23776e000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Sat, 15 Jun 2019 08:13:04 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 15 Jun 2019 08:13:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156058638370201829')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '325adf6a-901e-00c5-5652-2304aa000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:13:04 GMT',
  'Connection',
  'close' ]);

