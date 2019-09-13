let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-06T09:29:23.241Z","tmr":"2019-09-06T09:29:23.241Z","container":"container156776216371706104","blob":"blob156776216412004575"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2019-09-06T08:29:23Z</Start><Expiry>2019-09-07T09:29:23Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>a923f8d0-d4ce-4280-9135-5ea685c38026</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2019-09-06T08:29:23Z</SignedStart><SignedExpiry>2019-09-07T09:29:23Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2019-02-02</SignedVersion><Value>NJkVkmFW+HWvrvwbX25oSy4mR5E/ox8Ymyfx6bFZKQ8=</Value></UserDelegationKey>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ca723835-c01e-0105-2d95-64db55000000',
  'x-ms-client-request-id',
  '1e5f8590-1ab4-4e3f-a7c8-9e6a1815ccc3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:29:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776216371706104')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:29:24 GMT',
  'ETag',
  '"0x8D732ACB47DDD85"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '789c603c-201e-0150-7195-64cbde000000',
  'x-ms-client-request-id',
  '7def84e6-a5d0-4c32-b3fb-97eeb690b931',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:29:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776216371706104/blob156776216412004575')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:29:24 GMT',
  'ETag',
  '"0x8D732ACB4BA70E7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fab782ec-701e-007d-5395-6486a0000000',
  'x-ms-client-request-id',
  '1ff1ee7c-1030-4a5e-b174-d6f462ae2562',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:29:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776216371706104/blob156776216412004575')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:29:24 GMT',
  'ETag',
  '"0x8D732ACB4BA70E7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8eb8558e-d01e-0144-3895-6483b1000000',
  'x-ms-client-request-id',
  'cce0c496-d8f8-4788-90c2-2a26ef050738',
  'x-ms-version',
  '2019-02-02',
  'x-ms-snapshot',
  '2019-09-06T09:29:24.8099540Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Fri, 06 Sep 2019 09:29:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156776216371706104/blob156776216412004575')
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
  'Fri, 06 Sep 2019 09:29:24 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D732ACB4BA70E7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '058f1ef8-501e-006a-3395-642fab000000',
  'x-ms-client-request-id',
  '621f3cd2-12d1-4490-83ce-52ffdf8daccf',
  'x-ms-version',
  '2019-02-02',
  'x-ms-snapshot',
  '2019-09-06T09:29:24.8099540Z',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 06 Sep 2019 09:29:24 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-snapshot,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:29:25 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776216371706104')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c172ab5-301e-00c5-0695-64dd66000000',
  'x-ms-client-request-id',
  '3d6780ab-3369-42f4-9c35-16eb051d5d37',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:29:25 GMT',
  'Connection',
  'close' ]);

