let nock = require('nock');

module.exports.testInfo = {"now":"2019-08-15T08:52:40.326Z","tmr":"2019-08-15T08:52:40.327Z","container":"container156585916138801913"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2019-08-15T07:52:40Z</Start><Expiry>2019-08-16T08:52:40Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>324ed67c-1c74-4563-816e-c4be5f675ef1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2019-08-15T07:52:40Z</SignedStart><SignedExpiry>2019-08-16T08:52:40Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2018-11-09</SignedVersion><Value>gaRT+uAN7L0V6OqkbkL66wtACBGDdZHEXvBLH4o4LCI=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '023a5ebf-601e-00fb-5c46-53f68c000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:48:42 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585916138801913')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:48:43 GMT',
  'ETag',
  '"0x8D7215D60DCF9FF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd49b5fcd-201e-003b-5846-537cc8000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:48:44 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156585916138801913')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156585916138801913\"><Blobs /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94ac25cf-701e-004e-4246-53fb73000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 15 Aug 2019 08:48:45 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156585916138801913')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '25f1610d-201e-0019-6346-5312fe000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:48:45 GMT',
  'Connection',
  'close'
]);

