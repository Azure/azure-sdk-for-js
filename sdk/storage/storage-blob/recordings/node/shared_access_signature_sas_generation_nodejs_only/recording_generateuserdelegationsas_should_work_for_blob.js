let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-06T09:29:21.055Z","tmr":"2019-09-06T09:29:21.055Z","container":"container156776216152307726","blob":"blob156776216192908674"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2019-09-06T08:29:21Z</Start><Expiry>2019-09-07T09:29:21Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>a923f8d0-d4ce-4280-9135-5ea685c38026</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2019-09-06T08:29:21Z</SignedStart><SignedExpiry>2019-09-07T09:29:21Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2019-02-02</SignedVersion><Value>yovAIJF7Jvwuruobmcuq89rQLBZf07VoDcdSJg1MPVQ=</Value></UserDelegationKey>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '90405b38-001e-0005-1495-642558000000',
  'x-ms-client-request-id',
  '249a2416-008d-49d6-b058-51381448fb88',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:29:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776216152307726')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:29:21 GMT',
  'ETag',
  '"0x8D732ACB32F7FF6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4cbca863-801e-00d0-5295-64cad5000000',
  'x-ms-client-request-id',
  '63765206-a740-47ba-9915-282b0a11693f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:29:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776216152307726/blob156776216192908674')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:29:22 GMT',
  'ETag',
  '"0x8D732ACB36DA259"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1194877b-001e-003a-4895-64edfb000000',
  'x-ms-client-request-id',
  'b64824c5-be8e-4444-8d74-a80539cfff3b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:29:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156776216152307726/blob156776216192908674')
  .query(true)
  .reply(200, [], [ 'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '1024',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:29:22 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D732ACB36DA259"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecb18ef1-c01e-00ee-5395-645daa000000',
  'x-ms-client-request-id',
  'ce3cb57c-cc68-4c56-a4be-7b8508bdcc4c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 06 Sep 2019 09:29:22 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:29:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776216152307726')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f56a10f-601e-0085-7995-64da5e000000',
  'x-ms-client-request-id',
  '690de8ac-88a6-4669-9292-bc57a37fd953',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:29:22 GMT',
  'Connection',
  'close' ]);

