let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534999218909418","file":"file157534999333409585"},"newDate":{"now":"2019-12-03T05:13:11.028Z","tmr":"2019-12-03T05:13:11.028Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2019-12-03T04:13:11Z</Start><Expiry>2019-12-08T05:13:11Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>324ed67c-1c74-4563-816e-c4be5f675ef1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2019-12-03T04:13:11Z</SignedStart><SignedExpiry>2019-12-08T05:13:11Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2019-02-02</SignedVersion><Value>m32yGAtQ101vePX+/ce1FinBQ+UgSGe709TeatwLblo=</Value></UserDelegationKey>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '08fc1786-b01e-0070-0497-a9365a000000',
  'x-ms-client-request-id',
  '79eaf5fc-a788-4fd1-80cd-9d2a187d0270',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:07:13 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534999218909418')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 05:07:14 GMT',
  'ETag',
  '"0x8D777AEA98C807C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '490118a3-501e-0071-7597-a937a7000000',
  'x-ms-client-request-id',
  'f71f62ee-5861-4fba-a2cd-4c6cfc320a58',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:07:14 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534999218909418/file157534999333409585')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 05:07:16 GMT',
  'ETag',
  '"0x8D777AEAA3D03BC"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1a6f1b9-a01f-004d-7e97-a9837c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '1ff8c8bb-7762-49ff-b9b1-6b2648be0524',
  'Date',
  'Tue, 03 Dec 2019 05:07:15 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534999218909418/file157534999333409585')
  .query(true)
  .reply(200, [], [ 'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '0',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Tue, 03 Dec 2019 05:07:16 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777AEAA3D03BC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '30efffe2-901e-000a-6497-a95c17000000',
  'x-ms-client-request-id',
  'b11c846a-dba9-4f12-b773-9700fdd33891',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 05:07:16 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 05:07:16 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534999218909418')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '490121a8-501e-0071-5f97-a937a7000000',
  'x-ms-client-request-id',
  '80ed30a1-8398-4ad8-92dc-2400b4354bed',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:07:17 GMT' ]);
