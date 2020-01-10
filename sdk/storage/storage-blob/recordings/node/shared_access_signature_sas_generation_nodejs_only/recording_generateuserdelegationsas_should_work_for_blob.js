let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-11T02:25:52.739Z","tmr":"2019-09-11T02:25:52.739Z","container":"container156816875324700414","blob":"blob156816875367207681"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2019-09-11T01:25:52Z</Start><Expiry>2019-09-12T02:25:52Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>f27c2809-dfd7-4dbc-b5ed-b8b3b9341335</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2019-09-11T01:25:52Z</SignedStart><SignedExpiry>2019-09-12T02:25:52Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2019-02-02</SignedVersion><Value>hqY/U2XC1kOyEmo+ZmbM+3tIMpmDZselDd5RwskV4hY=</Value></UserDelegationKey>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8fec2faa-b01e-0009-3b48-687c72000000',
  'x-ms-client-request-id',
  'ac030ea9-54bb-4c57-8096-63954aa2cd32',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:25:52 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816875324700414')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:25:53 GMT',
  'ETag',
  '"0x8D7365F5EC589A0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbedf712-701e-001f-3f48-68bdec000000',
  'x-ms-client-request-id',
  'b48ef270-6dfc-4bef-90ce-fcd01f86e321',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:25:53 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816875324700414/blob156816875367207681')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:25:54 GMT',
  'ETag',
  '"0x8D7365F5F059B37"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be46570b-201e-0007-4c48-689079000000',
  'x-ms-client-request-id',
  '184d0e26-0f60-44bc-bf85-c02388286103',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:25:53 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156816875324700414/blob156816875367207681')
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
  'Wed, 11 Sep 2019 02:25:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365F5F059B37"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7a372f6e-301e-003a-1148-68255f000000',
  'x-ms-client-request-id',
  'cc9a9614-40eb-457d-84bf-86044fb4dc5b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Wed, 11 Sep 2019 02:25:54 GMT',
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
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:25:54 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816875324700414')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'af58df1a-501e-0008-3d48-687d8f000000',
  'x-ms-client-request-id',
  '859be13a-cfcf-462c-83d5-539fefda6fa3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:25:54 GMT' ]);

