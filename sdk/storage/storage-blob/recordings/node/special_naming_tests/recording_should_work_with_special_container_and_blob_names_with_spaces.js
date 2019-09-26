let nock = require('nock');

module.exports.testInfo = {"blob empty":"blob empty156776207233107584"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash156776207192807442/blob%20empty156776207233107584', "A")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:27:52 GMT',
  'ETag',
  '"0x8D732AC7E058C9A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb504175-e01e-0032-7995-64f7f4000000',
  'x-ms-client-request-id',
  'aa114bc3-4450-4eef-80f7-57a8cecead58',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'PiO3pTJ67n0=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:27:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash156776207192807442')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"1container-with-dash156776207192807442\"><Prefix>blob empty156776207233107584</Prefix><Blobs><Blob><Name>blob empty156776207233107584</Name><Properties><Creation-Time>Fri, 06 Sep 2019 09:27:52 GMT</Creation-Time><Last-Modified>Fri, 06 Sep 2019 09:27:52 GMT</Last-Modified><Etag>0x8D732AC7E058C9A</Etag><Content-Length>1</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>PiO3pTJ67n0=</Content-CRC64><Content-MD5>f8VicOenD6gaWTW3Lqy+KQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bacb66a-701e-001f-1295-644487000000',
  'x-ms-client-request-id',
  'd4dab312-8f72-4489-86f5-4a8edcc85472',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:27:52 GMT',
  'Connection',
  'close' ]);

