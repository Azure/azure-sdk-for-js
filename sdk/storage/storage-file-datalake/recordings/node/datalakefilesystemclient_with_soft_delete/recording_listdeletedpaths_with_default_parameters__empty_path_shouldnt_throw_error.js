let nock = require('nock');

module.exports.hash = "b25902fe286895443e434cbb6cbaccb6";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162071853795905447","file0":"file0162071853826601400","file1":"file1162071853857502169","file2":"file2162071853887701822"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071853795905447')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 11 May 2021 07:35:38 GMT',
  'ETag',
  '"0x8D9144F5F2B2210"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4bb70-f01e-0012-3238-463670000000',
  'x-ms-client-request-id',
  'd60c9475-7930-411a-a0c7-32badf3dbaf8',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:35:37 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071853795905447/file0162071853826601400')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:38 GMT',
  'ETag',
  '"0x8D9144F5F5BACD5"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e130-601f-0000-0938-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'a30abd0a-bc43-4ba7-8d2a-b5a6d936da8c',
  'Date',
  'Tue, 11 May 2021 07:35:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071853795905447/file1162071853857502169')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:38 GMT',
  'ETag',
  '"0x8D9144F5F8B022E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e166-601f-0000-3f38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '43bbf99d-7e23-45c3-a828-31613bc5dd9a',
  'Date',
  'Tue, 11 May 2021 07:35:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071853795905447/file2162071853887701822')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:39 GMT',
  'ETag',
  '"0x8D9144F5FB8F9AB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e1ad-601f-0000-0638-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '54f5e3d8-1715-4407-ac37-b91ce907ff00',
  'Date',
  'Tue, 11 May 2021 07:35:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071853795905447/file0162071853826601400')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921393651333',
  'x-ms-request-id',
  '1270e1cc-601f-0000-2438-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'c6b300f4-ab57-4bd2-80dc-069bac9eac99',
  'Date',
  'Tue, 11 May 2021 07:35:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071853795905447/file1162071853857502169')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921396967484',
  'x-ms-request-id',
  '1270e21c-601f-0000-7438-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '42eeac74-2b5b-49ab-b1c4-4c52bc3dad63',
  'Date',
  'Tue, 11 May 2021 07:35:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071853795905447/file2162071853887701822')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921400408259',
  'x-ms-request-id',
  '1270e243-601f-0000-1b38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '7f6b1611-9d6c-4a7c-b692-6fc4d4898e7c',
  'Date',
  'Tue, 11 May 2021 07:35:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162071853795905447')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162071853795905447\"><Blobs><Blob><Name>file0162071853826601400</Name><DeletionId>132651921393651333</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:38 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:38 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:39 GMT</Expiry-Time><Etag>0x8D9144F5F5BACD5</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:39 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1162071853857502169</Name><DeletionId>132651921396967484</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:38 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:38 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:39 GMT</Expiry-Time><Etag>0x8D9144F5F8B022E</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:39 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file2162071853887701822</Name><DeletionId>132651921400408259</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:39 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:39 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:40 GMT</Expiry-Time><Etag>0x8D9144F5FB8F9AB</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:40 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4bc1b-f01e-0012-4338-463670000000',
  'x-ms-client-request-id',
  '442410ec-8940-4162-839d-1e971e003a3a',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 May 2021 07:35:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071853795905447')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4bc52-f01e-0012-6838-463670000000',
  'x-ms-client-request-id',
  'f6a8dcef-b9dc-482b-86c8-23cf68dcd464',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:35:40 GMT'
]);
