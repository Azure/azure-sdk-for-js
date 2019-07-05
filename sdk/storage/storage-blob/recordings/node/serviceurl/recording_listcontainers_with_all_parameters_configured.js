let nock = require('nock');

module.exports.testInfo = {"container":"container156231867269909028"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231867269909028x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:13 GMT',
  'ETag',
  '"0x8D7012A20263572"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0646ab04-501e-0070-4412-334d52000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231867269909028x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:13 GMT',
  'ETag',
  '"0x8D7012A205071AE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f61b7cf5-101e-00dd-2612-336d38000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Prefix>container156231867269909028</Prefix><MaxResults>1</MaxResults><Containers><Container><Name>container156231867269909028x1</Name><Properties><Last-Modified>Fri, 05 Jul 2019 09:21:13 GMT</Last-Modified><Etag>\"0x8D7012A20263572\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties><Metadata><key>val</key></Metadata></Container></Containers><NextMarker>/fakestorageaccount/container156231867269909028x2</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '766e94f2-901e-00cc-1512-335a23000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:21:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Prefix>container156231867269909028</Prefix><Marker>/fakestorageaccount/container156231867269909028x2</Marker><MaxResults>1</MaxResults><Containers><Container><Name>container156231867269909028x2</Name><Properties><Last-Modified>Fri, 05 Jul 2019 09:21:13 GMT</Last-Modified><Etag>\"0x8D7012A205071AE\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties><Metadata><key>val</key></Metadata></Container></Containers><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbdd8b0d-b01e-001c-7912-33e681000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:21:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231867269909028x1')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bb19080c-301e-00ac-4112-331f01000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231867269909028x2')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26148ac5-b01e-0094-1c12-335e58000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:14 GMT',
  'Connection',
  'close' ]);

