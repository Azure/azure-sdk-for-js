let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-06T09:29:15.381Z","tmr":"2019-09-06T09:29:15.381Z","container":"container156776215538109741","blob":"blob156776215578104645"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776215538109741')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:29:15 GMT',
  'ETag',
  '"0x8D732ACAF859801"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a9b04db6-d01e-0016-0a95-640154000000',
  'x-ms-client-request-id',
  '8c9dc2ef-fc78-46e6-93a2-ad463c1df122',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:29:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776215538109741/blob156776215578104645')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:29:16 GMT',
  'ETag',
  '"0x8D732ACAFC2EF70"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9ed85384-601e-0071-3a95-6411a8000000',
  'x-ms-client-request-id',
  '5d2d44cf-ba81-42f9-9e04-2b1f30ee36c3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:29:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776215538109741', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-09-06T09:24:15.3810000Z</Start><Expiry>2019-09-07T09:29:15.3810000Z</Expiry><Permission>racwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:29:16 GMT',
  'ETag',
  '"0x8D732ACB0000A15"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8f0061df-c01e-008c-6f95-649f8d000000',
  'x-ms-client-request-id',
  '76b6f438-0238-4805-99d9-f00c3820e88c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:29:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156776215538109741/blob156776215578104645')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:29:16 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D732ACAFC2EF70"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8999424b-601e-00f7-1d95-64dd11000000',
  'x-ms-client-request-id',
  '27501d98-a245-41d5-afcf-4cf267e08501',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 06 Sep 2019 09:29:16 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:29:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776215538109741')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e18b1b17-f01e-010e-5895-64203e000000',
  'x-ms-client-request-id',
  'c14cf60b-8fc9-4642-b416-00a3eba88f31',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:29:16 GMT',
  'Connection',
  'close' ]);

