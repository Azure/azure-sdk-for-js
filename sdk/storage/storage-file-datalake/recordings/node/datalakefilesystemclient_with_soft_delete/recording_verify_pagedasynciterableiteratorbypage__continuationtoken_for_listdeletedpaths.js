let nock = require('nock');

module.exports.hash = "3b93776011543ab1449224b56a5786c8";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162071855390206242","file0":"file0162071855421201109","file1":"file1162071855452406728","file2":"file2162071855482508489","file3":"file3162071855512807106"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071855390206242')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 11 May 2021 07:35:54 GMT',
  'ETag',
  '"0x8D9144F68AC01C7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c0ee-f01e-0012-1c38-463670000000',
  'x-ms-client-request-id',
  '2b968098-54e8-4c43-a554-e9db5c013c48',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:35:53 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071855390206242/file0162071855421201109')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:54 GMT',
  'ETag',
  '"0x8D9144F68DEB500"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e740-601f-0000-0b38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '03cbd4bf-eefa-49d3-b2d9-da1c4aacd450',
  'Date',
  'Tue, 11 May 2021 07:35:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071855390206242/file1162071855452406728')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:54 GMT',
  'ETag',
  '"0x8D9144F690CB3CE"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e75b-601f-0000-2638-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '325ba53f-2fba-4607-a3d0-6b17a566585f',
  'Date',
  'Tue, 11 May 2021 07:35:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071855390206242/file2162071855482508489')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:55 GMT',
  'ETag',
  '"0x8D9144F693AE363"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e76b-601f-0000-3538-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'f5828b4f-7e5e-43a6-8cb9-42460b4f1ea9',
  'Date',
  'Tue, 11 May 2021 07:35:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071855390206242/file3162071855512807106')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:55 GMT',
  'ETag',
  '"0x8D9144F6968EAD4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e77f-601f-0000-4938-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '8bc685e7-06e7-41b3-9141-5005d0c58da6',
  'Date',
  'Tue, 11 May 2021 07:35:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071855390206242/file0162071855421201109')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921556330281',
  'x-ms-request-id',
  '1270e783-601f-0000-4d38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'c42f8fae-8a0d-4666-92a8-14f56dba2dce',
  'Date',
  'Tue, 11 May 2021 07:35:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071855390206242/file1162071855452406728')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921559683724',
  'x-ms-request-id',
  '1270e784-601f-0000-4e38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '4aa310d8-f57b-4fe5-b268-26cbde5c40b6',
  'Date',
  'Tue, 11 May 2021 07:35:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071855390206242/file2162071855482508489')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921562962792',
  'x-ms-request-id',
  '1270e791-601f-0000-5a38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'ea6e56b6-1a33-4b5f-92aa-7720421d3827',
  'Date',
  'Tue, 11 May 2021 07:35:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071855390206242/file3162071855512807106')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921566201898',
  'x-ms-request-id',
  '1270e79f-601f-0000-6838-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'f1c3bdd2-f51d-444f-93e6-173132e9ed72',
  'Date',
  'Tue, 11 May 2021 07:35:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162071855390206242')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162071855390206242\"><MaxResults>2</MaxResults><Blobs><Blob><Name>file0162071855421201109</Name><DeletionId>132651921556330281</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:54 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:54 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:55 GMT</Expiry-Time><Etag>0x8D9144F68DEB500</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:55 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1162071855452406728</Name><DeletionId>132651921559683724</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:54 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:54 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:55 GMT</Expiry-Time><Etag>0x8D9144F690CB3CE</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:55 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker>2!348!MDAwMjE2IU5qWTVNalUwTmpjNU1UQXhORGN5T0RneE55QXdJQzl6WldGdWJuTmxZMkZ1WVhKNUFUQXhSRFl3T1RRd09UYzNRVEpCUkRNdkpIUnlZWE5vTDJacGJHVnplWE4wWlcweE5qSXdOekU0TlRVek9UQXlNRFl5TkRJQk1ERkVOelEyTXpnME5qTTFORU5GT0FJdlptbHNaVEl4TmpJd056RTROVFUwT0RJMU1EZzBPRGtCTWpBeU1TMHdOUzB4TVZRd056b3pOVG8xTmk0eU9UWXlOemt5V2c9PSEwMDAwMjghMjAyMS0wNS0xMVQwNzozNTo1Ni45NDE0Nzg3WiE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c1f8-f01e-0012-0538-463670000000',
  'x-ms-client-request-id',
  'df2f0033-b7f1-4ddd-8e28-2ec2a4a2349d',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 May 2021 07:35:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162071855390206242')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162071855390206242\"><MaxResults>2</MaxResults><Blobs><Blob><Name>file0162071855421201109</Name><DeletionId>132651921556330281</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:54 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:54 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:55 GMT</Expiry-Time><Etag>0x8D9144F68DEB500</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:55 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1162071855452406728</Name><DeletionId>132651921559683724</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:54 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:54 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:55 GMT</Expiry-Time><Etag>0x8D9144F690CB3CE</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:55 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker>2!348!MDAwMjE2IU5qWTVNalUwTmpjNU1UQXhORGN5T0RneE55QXdJQzl6WldGdWJuTmxZMkZ1WVhKNUFUQXhSRFl3T1RRd09UYzNRVEpCUkRNdkpIUnlZWE5vTDJacGJHVnplWE4wWlcweE5qSXdOekU0TlRVek9UQXlNRFl5TkRJQk1ERkVOelEyTXpnME5qTTFORU5GT0FJdlptbHNaVEl4TmpJd056RTROVFUwT0RJMU1EZzBPRGtCTWpBeU1TMHdOUzB4TVZRd056b3pOVG8xTmk0eU9UWXlOemt5V2c9PSEwMDAwMjghMjAyMS0wNS0xMVQwNzozNTo1Ny41MTkxNTU2WiE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c234-f01e-0012-3838-463670000000',
  'x-ms-client-request-id',
  '76d97259-404f-4380-9e79-fecd3172238f',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 May 2021 07:35:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071855390206242')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c2b0-f01e-0012-2a38-463670000000',
  'x-ms-client-request-id',
  '52defff3-b33e-4a80-af1c-073267d884e5',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:35:57 GMT'
]);
