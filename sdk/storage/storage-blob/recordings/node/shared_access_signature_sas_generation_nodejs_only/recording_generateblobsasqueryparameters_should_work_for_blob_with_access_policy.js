let nock = require('nock');

module.exports.testInfo = {"now":"2019-07-05T09:25:35.397Z","tmr":"2019-07-05T09:25:35.397Z","container":"container156231873539705672","blob":"blob156231873567103191"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231873539705672')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:22:16 GMT',
  'ETag',
  '"0x8D7012A45864A36"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9a5568e-501e-0112-6d13-334cdf000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:22:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231873539705672/blob156231873567103191')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:22:16 GMT',
  'ETag',
  '"0x8D7012A45B2C5C4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '140a5046-001e-0128-6c13-330f7c000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:22:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231873539705672', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-07-05T09:20:35.3970000Z</Start><Expiry>2019-07-06T09:25:35.3970000Z</Expiry><Permission>racwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:22:17 GMT',
  'ETag',
  '"0x8D7012A4654B3B0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e795ff4d-701e-0082-6613-339fc6000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:22:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156231873539705672/blob156231873567103191')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:22:16 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7012A45B2C5C4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ef000d42-401e-0124-5113-33e18d000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:22:16 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:22:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231873539705672')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b5f7d492-001e-010a-3e13-33614a000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:22:17 GMT',
  'Connection',
  'close' ]);

