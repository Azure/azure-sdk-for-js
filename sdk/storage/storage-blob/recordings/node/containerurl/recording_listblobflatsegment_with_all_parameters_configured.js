let nock = require('nock');

module.exports.testInfo = {"container":"container156231864181706517","blockblob/0":"blockblob/0156231864209003294","blockblob/1":"blockblob/1156231864236301712"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231864181706517')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:42 GMT',
  'ETag',
  '"0x8D7012A0DBE7CAB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eefe6328-401e-0124-4a12-33e18d000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231864181706517/blockblob%2F0156231864209003294')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:42 GMT',
  'ETag',
  '"0x8D7012A0DE89AAA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bffce2a5-d01e-00e2-3012-33dae4000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231864181706517/blockblob%2F1156231864236301712')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:43 GMT',
  'ETag',
  '"0x8D7012A0E1298A2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '84745bfe-b01e-0017-4d12-33fef5000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231864181706517')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156231864181706517\"><Prefix>blockblob</Prefix><MaxResults>1</MaxResults><Blobs><Blob><Name>blockblob/0156231864209003294</Name><Properties><Creation-Time>Fri, 05 Jul 2019 09:20:42 GMT</Creation-Time><Last-Modified>Fri, 05 Jul 2019 09:20:42 GMT</Last-Modified><Etag>0x8D7012A0DE89AAA</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties><Metadata><keya>a</keya><keyb>c</keyb></Metadata></Blob></Blobs><NextMarker>2!100!MDAwMDI5IWJsb2NrYmxvYi8xMTU2MjMxODY0MjM2MzAxNzEyITAwMDAyOCE5OTk5LTEyLTMxVDIzOjU5OjU5Ljk5OTk5OTlaIQ--</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7150be92-e01e-004b-5912-330f0c000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:20:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231864181706517')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156231864181706517\"><Prefix>blockblob</Prefix><Marker>2!100!MDAwMDI5IWJsb2NrYmxvYi8xMTU2MjMxODY0MjM2MzAxNzEyITAwMDAyOCE5OTk5LTEyLTMxVDIzOjU5OjU5Ljk5OTk5OTlaIQ--</Marker><MaxResults>2</MaxResults><Blobs><Blob><Name>blockblob/1156231864236301712</Name><Properties><Creation-Time>Fri, 05 Jul 2019 09:20:43 GMT</Creation-Time><Last-Modified>Fri, 05 Jul 2019 09:20:43 GMT</Last-Modified><Etag>0x8D7012A0E1298A2</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties><Metadata><keya>a</keya><keyb>c</keyb></Metadata></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fd865d82-401e-002b-7d12-334a2e000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:20:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231864181706517/blockblob%2F0156231864209003294')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '883ba44a-d01e-0007-3e12-33c813000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 05 Jul 2019 09:20:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231864181706517/blockblob%2F1156231864236301712')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '06a6a0d8-e01e-00a5-5a12-33058f000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 05 Jul 2019 09:20:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231864181706517')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c8ac750-601e-0073-4912-334e55000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:43 GMT',
  'Connection',
  'close' ]);

