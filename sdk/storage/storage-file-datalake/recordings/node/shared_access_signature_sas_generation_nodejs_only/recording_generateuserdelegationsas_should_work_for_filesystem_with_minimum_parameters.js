let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534998839803889"},"newDate":{"now":"2019-12-03T05:13:07.166Z","tmr":"2019-12-03T05:13:07.166Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2019-12-03T04:13:07Z</Start><Expiry>2019-12-08T05:13:07Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>324ed67c-1c74-4563-816e-c4be5f675ef1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2019-12-03T04:13:07Z</SignedStart><SignedExpiry>2019-12-08T05:13:07Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2019-02-02</SignedVersion><Value>Q16oZ/MkFWdXp1BEHqhKQd3/v04Qsis6Um6dNCBoMNg=</Value></UserDelegationKey>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f9aa78f8-d01e-0024-0297-a9dcd0000000',
  'x-ms-client-request-id',
  '2b8344f8-ca81-4ba9-bd59-61425ba29eb6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:07:09 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534998839803889')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 05:07:11 GMT',
  'ETag',
  '"0x8D777AEA749DB3A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f9b3a424-301e-006a-2497-a91935000000',
  'x-ms-client-request-id',
  'c0c4a899-2494-4774-8d7d-2354e53848d3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:07:10 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534998839803889')
  .query(true)
  .reply(200, {"paths":[]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fba8f7d2-401f-0021-2d97-a928af000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '77d963b5-9c08-46fd-994a-de476c1bfec6',
  'Date',
  'Tue, 03 Dec 2019 05:07:11 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534998839803889')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f9b3a7c4-301e-006a-0197-a91935000000',
  'x-ms-client-request-id',
  '2be8d73d-ba00-4a8a-8deb-c602d7ce1cc2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:07:11 GMT' ]);
