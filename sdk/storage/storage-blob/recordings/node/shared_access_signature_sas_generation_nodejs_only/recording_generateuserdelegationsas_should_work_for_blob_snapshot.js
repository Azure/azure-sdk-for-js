let nock = require('nock');

module.exports.testInfo = {"now":"2019-08-15T08:52:52.949Z","tmr":"2019-08-15T08:52:52.949Z","container":"container156585917385005247","blob":"blob156585917412009844"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2019-08-15T07:52:52Z</Start><Expiry>2019-08-16T08:52:52Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>324ed67c-1c74-4563-816e-c4be5f675ef1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2019-08-15T07:52:52Z</SignedStart><SignedExpiry>2019-08-16T08:52:52Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2018-11-09</SignedVersion><Value>oNl9JIk2z7ZEoz9y1e3PIdJgO3UN1TN6G/QRNKAaHbs=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5e748e87-401e-0081-4046-539cc1000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:48:55 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585917385005247')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:48:55 GMT',
  'ETag',
  '"0x8D7215D68129991"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '25e34937-001e-0063-4a46-5378b3000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:48:55 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585917385005247/blob156585917412009844')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:48:56 GMT',
  'ETag',
  '"0x8D7215D683C4D83"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4337beb8-001e-00eb-5546-53c06a000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 15 Aug 2019 08:48:55 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585917385005247/blob156585917412009844')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:48:56 GMT',
  'ETag',
  '"0x8D7215D683C4D83"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9bdd79ad-601e-009d-0846-5344d6000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-snapshot',
  '2019-08-15T08:48:56.3374061Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 15 Aug 2019 08:48:55 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156585917385005247/blob156585917412009844')
  .query(true)
  .reply(200, [], [
  'Cache-Control',
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
  'Thu, 15 Aug 2019 08:48:56 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7215D683C4D83"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e1169cc6-d01e-00cb-0446-53aca6000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-snapshot',
  '2019-08-15T08:48:56.3374061Z',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Thu, 15 Aug 2019 08:48:56 GMT',
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
  'x-ms-request-id,Server,x-ms-version,x-ms-snapshot,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 15 Aug 2019 08:48:56 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156585917385005247')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1f8f1de-801e-0079-3f46-5357dc000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:48:56 GMT',
  'Connection',
  'close'
]);

