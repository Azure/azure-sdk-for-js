let nock = require('nock');

module.exports.hash = "c7113748d1ed73a1ba8c558fc6632aff";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162071854107403586","file0":"file0162071854138303524","file1":"file1162071854169407537"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071854107403586')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 11 May 2021 07:35:41 GMT',
  'ETag',
  '"0x8D9144F61067BDE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4bc72-f01e-0012-0538-463670000000',
  'x-ms-client-request-id',
  '2f8428f2-6cab-4445-a868-0cc14435c55b',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:35:40 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071854107403586/file0162071854138303524')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:41 GMT',
  'ETag',
  '"0x8D9144F6138043C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e337-601f-0000-0f38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'fb9dc4cc-0775-4c7f-ae44-a2643d6b7cd0',
  'Date',
  'Tue, 11 May 2021 07:35:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071854107403586/file1162071854169407537')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:41 GMT',
  'ETag',
  '"0x8D9144F6166E658"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e370-601f-0000-4838-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '23f01cec-252c-4895-9df0-493beaf62609',
  'Date',
  'Tue, 11 May 2021 07:35:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071854107403586/file0162071854138303524')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921421849086',
  'x-ms-request-id',
  '1270e39b-601f-0000-7338-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'fb421667-25ff-4ad0-9567-69997406d3f4',
  'Date',
  'Tue, 11 May 2021 07:35:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071854107403586/file1162071854169407537')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921425101635',
  'x-ms-request-id',
  '1270e407-601f-0000-5f38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'a5a59377-8451-473c-81ce-50aec8f4ff5d',
  'Date',
  'Tue, 11 May 2021 07:35:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162071854107403586')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162071854107403586\"><MaxResults>1</MaxResults><Blobs><Blob><Name>file0162071854138303524</Name><DeletionId>132651921421849086</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:41 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:41 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:42 GMT</Expiry-Time><Etag>0x8D9144F6138043C</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:42 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker>2!348!MDAwMjE2IU9UVXpOamN5TnpFd09ERXpNVGsxTkRJNU1DQXdJQzl6WldGdWJuTmxZMkZ1WVhKNUFUQXhSRFl3T1RRd09UYzNRVEpCUkRNdkpIUnlZWE5vTDJacGJHVnplWE4wWlcweE5qSXdOekU0TlRReE1EYzBNRE0xT0RZQk1ERkVOelEyTXpnelJUaEdRemN6T0FJdlptbHNaVEV4TmpJd056RTROVFF4TmprME1EYzFNemNCTWpBeU1TMHdOUzB4TVZRd056b3pOVG8wTWk0MU1UQXhOak0xV2c9PSEwMDAwMjghMjAyMS0wNS0xMVQwNzozNTo0Mi44MzIzNzMzWiE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4bd10-f01e-0012-7638-463670000000',
  'x-ms-client-request-id',
  '7385dedf-d66e-4f1f-8442-a70ec31273a3',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 May 2021 07:35:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162071854107403586')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162071854107403586\"><Marker>2!348!MDAwMjE2IU9UVXpOamN5TnpFd09ERXpNVGsxTkRJNU1DQXdJQzl6WldGdWJuTmxZMkZ1WVhKNUFUQXhSRFl3T1RRd09UYzNRVEpCUkRNdkpIUnlZWE5vTDJacGJHVnplWE4wWlcweE5qSXdOekU0TlRReE1EYzBNRE0xT0RZQk1ERkVOelEyTXpnelJUaEdRemN6T0FJdlptbHNaVEV4TmpJd056RTROVFF4TmprME1EYzFNemNCTWpBeU1TMHdOUzB4TVZRd056b3pOVG8wTWk0MU1UQXhOak0xV2c9PSEwMDAwMjghMjAyMS0wNS0xMVQwNzozNTo0Mi44MzIzNzMzWiE-</Marker><MaxResults>2</MaxResults><Blobs><Blob><Name>file1162071854169407537</Name><DeletionId>132651921425101635</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:41 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:41 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:42 GMT</Expiry-Time><Etag>0x8D9144F6166E658</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:42 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4bd44-f01e-0012-1f38-463670000000',
  'x-ms-client-request-id',
  '25ac19c2-9c2e-4868-8220-7c61b1f3b98d',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 May 2021 07:35:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071854107403586')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4bd59-f01e-0012-3238-463670000000',
  'x-ms-client-request-id',
  'b98c3698-fb35-45ad-82f6-f76341996b8f',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:35:42 GMT'
]);
