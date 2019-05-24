let nock = require('nock');

module.exports.testInfo = {"container":"container155873888566207772","blockblob0/0":"blockblob0/0155873888612800850","blockblob1/1":"blockblob1/1155873888647507862"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873888566207772')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:01:25 GMT',
  'ETag',
  '"0x8D6E09BBF8863CC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4fcab123-601e-006a-0384-12c1f3000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:01:24 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873888566207772/blockblob0%2F0155873888612800850')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 24 May 2019 23:01:26 GMT',
  'ETag',
  '"0x8D6E09BBFC10C6C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12580cc1-901e-0019-1184-12b130000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 23:01:25 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873888566207772/blockblob1%2F1155873888647507862')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 24 May 2019 23:01:26 GMT',
  'ETag',
  '"0x8D6E09BBFFEBCED"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '465ba26c-501e-0040-6d84-12b4b6000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 23:01:25 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155873888566207772')
  .query({"prefix":"blockblob","delimiter":"%2F","maxresults":"1","include":"metadata%2Cuncommittedblobs%2Ccopy%2Cdeleted","restype":"container","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.blob.core.windows.net/\" ContainerName=\"container155873888566207772\"><Prefix>blockblob</Prefix><MaxResults>1</MaxResults><Delimiter>/</Delimiter><Blobs><BlobPrefix><Name>blockblob0/</Name></BlobPrefix></Blobs><NextMarker>2!100!MDAwMDMwIWJsb2NrYmxvYjEvMTE1NTg3Mzg4ODY0NzUwNzg2MiEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiE-</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'adcf8c21-101e-002a-0b84-12e81d000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:01:26 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155873888566207772')
  .query({"prefix":"blockblob","delimiter":"%2F","marker":"2%21100%21MDAwMDMwIWJsb2NrYmxvYjEvMTE1NTg3Mzg4ODY0NzUwNzg2MiEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiE-","maxresults":"2","include":"metadata%2Cuncommittedblobs%2Ccopy%2Cdeleted","restype":"container","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.blob.core.windows.net/\" ContainerName=\"container155873888566207772\"><Prefix>blockblob</Prefix><Marker>2!100!MDAwMDMwIWJsb2NrYmxvYjEvMTE1NTg3Mzg4ODY0NzUwNzg2MiEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiE-</Marker><MaxResults>2</MaxResults><Delimiter>/</Delimiter><Blobs><BlobPrefix><Name>blockblob1/</Name></BlobPrefix></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '875e0bdf-301e-0079-4484-12f412000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:01:26 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155873888566207772')
  .query({"prefix":"blockblob0%2F","delimiter":"%2F","maxresults":"2","include":"metadata%2Cuncommittedblobs%2Ccopy%2Cdeleted","restype":"container","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.blob.core.windows.net/\" ContainerName=\"container155873888566207772\"><Prefix>blockblob0/</Prefix><MaxResults>2</MaxResults><Delimiter>/</Delimiter><Blobs><Blob><Name>blockblob0/0155873888612800850</Name><Properties><Creation-Time>Fri, 24 May 2019 23:01:26 GMT</Creation-Time><Last-Modified>Fri, 24 May 2019 23:01:26 GMT</Last-Modified><Etag>0x8D6E09BBFC10C6C</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><Metadata><keya>a</keya><keyb>c</keyb></Metadata></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ba6e321b-f01e-0064-1f84-122df8000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:01:26 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873888566207772/blockblob0%2F0155873888612800850')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '75778ee1-f01e-008a-3484-12277b000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 24 May 2019 23:01:27 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873888566207772/blockblob1%2F1155873888647507862')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9db1c110-c01e-0089-0e84-12247c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 24 May 2019 23:01:28 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873888566207772')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53453a19-401e-005f-6384-126fa6000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:01:28 GMT',
  'Connection',
  'close' ]);

