let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{"now":"2019-12-03T05:12:38.190Z","tmr":"2019-12-03T05:12:38.194Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2019-12-03T06:12:38Z</Start><Expiry>2019-12-04T05:12:38Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>324ed67c-1c74-4563-816e-c4be5f675ef1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2019-12-03T06:12:38Z</SignedStart><SignedExpiry>2019-12-04T05:12:38Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2019-02-02</SignedVersion><Value>8MsGAT04kfgnEnSiawpJDNcTyJ/HcSmKC8O01InfMj4=</Value></UserDelegationKey>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '30efa223-901e-000a-7397-a95c17000000',
  'x-ms-client-request-id',
  '63b64c0c-b0fe-498d-b530-0ceede8e8888',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:06:39 GMT' ]);
