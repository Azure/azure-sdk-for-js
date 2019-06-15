let nock = require('nock');

module.exports.testInfo = {"container":"container155873887953104717","blockblob/0":"blockblob/0155873887991802274","blockblob/1":"blockblob/1155873888020805928"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873887953104717')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:01:19 GMT',
  'ETag',
  '"0x8D6E09BBBD7EE87"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1273c3b-001e-0094-0884-12fd96000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:01:19 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873887953104717/blockblob%2F0155873887991802274')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 24 May 2019 23:01:19 GMT',
  'ETag',
  '"0x8D6E09BBC04DD1E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '080f034b-401e-0093-7084-120b13000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 23:01:19 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873887953104717/blockblob%2F1155873888020805928')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 24 May 2019 23:01:20 GMT',
  'ETag',
  '"0x8D6E09BBC36F2BB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e64531eb-801e-0042-4984-12b64c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 23:01:19 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155873887953104717')
  .query({"prefix":"blockblob","maxresults":"1","include":"snapshots%2Cmetadata%2Cuncommittedblobs%2Ccopy%2Cdeleted","restype":"container","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.blob.core.windows.net/\" ContainerName=\"container155873887953104717\"><Prefix>blockblob</Prefix><MaxResults>1</MaxResults><Blobs><Blob><Name>blockblob/0155873887991802274</Name><Properties><Creation-Time>Fri, 24 May 2019 23:01:19 GMT</Creation-Time><Last-Modified>Fri, 24 May 2019 23:01:19 GMT</Last-Modified><Etag>0x8D6E09BBC04DD1E</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><Metadata><keya>a</keya><keyb>c</keyb></Metadata></Blob></Blobs><NextMarker>2!100!MDAwMDI5IWJsb2NrYmxvYi8xMTU1ODczODg4MDIwODA1OTI4ITAwMDAyOCE5OTk5LTEyLTMxVDIzOjU5OjU5Ljk5OTk5OTlaIQ--</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c7537ceb-901e-0091-4284-1209e9000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:01:19 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155873887953104717')
  .query({"prefix":"blockblob","marker":"2%21100%21MDAwMDI5IWJsb2NrYmxvYi8xMTU1ODczODg4MDIwODA1OTI4ITAwMDAyOCE5OTk5LTEyLTMxVDIzOjU5OjU5Ljk5OTk5OTlaIQ--","maxresults":"2","include":"snapshots%2Cmetadata%2Cuncommittedblobs%2Ccopy%2Cdeleted","restype":"container","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.blob.core.windows.net/\" ContainerName=\"container155873887953104717\"><Prefix>blockblob</Prefix><Marker>2!100!MDAwMDI5IWJsb2NrYmxvYi8xMTU1ODczODg4MDIwODA1OTI4ITAwMDAyOCE5OTk5LTEyLTMxVDIzOjU5OjU5Ljk5OTk5OTlaIQ--</Marker><MaxResults>2</MaxResults><Blobs><Blob><Name>blockblob/1155873888020805928</Name><Properties><Creation-Time>Fri, 24 May 2019 23:01:20 GMT</Creation-Time><Last-Modified>Fri, 24 May 2019 23:01:20 GMT</Last-Modified><Etag>0x8D6E09BBC36F2BB</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><Metadata><keya>a</keya><keyb>c</keyb></Metadata></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43512054-e01e-007b-5184-12f6e8000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:01:20 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873887953104717/blockblob%2F0155873887991802274')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '48a39bd8-201e-0066-3584-122f02000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 24 May 2019 23:01:20 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873887953104717/blockblob%2F1155873888020805928')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2cc44551-201e-0029-2084-12eb1a000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 24 May 2019 23:01:21 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873887953104717')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '788072e4-901e-003b-4184-12df06000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:01:22 GMT',
  'Connection',
  'close' ]);

