let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534998436003922"},"newDate":{"now":"2019-12-03T05:13:03.200Z","tmr":"2019-12-03T05:13:03.200Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2019-12-03T04:13:03Z</Start><Expiry>2019-12-08T05:13:03Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>324ed67c-1c74-4563-816e-c4be5f675ef1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2019-12-03T04:13:03Z</SignedStart><SignedExpiry>2019-12-08T05:13:03Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2019-02-02</SignedVersion><Value>hpm/LX6MmYqmVlLUTqEdRdJIrcRJW8pPj2XwYwsPfnY=</Value></UserDelegationKey>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6dc53197-a01e-0046-7397-a99b08000000',
  'x-ms-client-request-id',
  '92027dcc-93b0-4073-8af0-eb8879b1eb55',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:07:05 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534998436003922')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 05:07:07 GMT',
  'ETag',
  '"0x8D777AEA4E18CD2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f291b67f-101e-0010-6797-a97378000000',
  'x-ms-client-request-id',
  'ecab1c96-46fb-4738-b9a3-8eba3ee24973',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:07:06 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534998436003922')
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
  '817cfcd2-601f-001f-2b97-a99e8e000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '6d35126a-1997-416b-8b48-a8991cd52f92',
  'Date',
  'Tue, 03 Dec 2019 05:07:08 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534998436003922')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f291bc55-101e-0010-4997-a97378000000',
  'x-ms-client-request-id',
  'f8bab07a-59e3-464e-864f-4fd3d7102f57',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:07:08 GMT' ]);
