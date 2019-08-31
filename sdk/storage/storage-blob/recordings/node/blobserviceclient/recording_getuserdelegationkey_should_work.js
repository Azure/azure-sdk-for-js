let nock = require('nock');

module.exports.testInfo = {"now":"2019-08-15T08:54:38.649Z","tmr":"2019-08-15T08:54:38.650Z"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2019-08-15T09:54:38Z</Start><Expiry>2019-08-16T08:54:38Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>324ed67c-1c74-4563-816e-c4be5f675ef1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2019-08-15T09:54:38Z</SignedStart><SignedExpiry>2019-08-16T08:54:38Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2018-11-09</SignedVersion><Value>3EwiLHQ7uiTNRJBsln7E0f0D3vcm6Yvde4604uciCTo=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '04d22971-201e-005d-3b46-53ce92000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:50:40 GMT',
  'Connection',
  'close'
]);

