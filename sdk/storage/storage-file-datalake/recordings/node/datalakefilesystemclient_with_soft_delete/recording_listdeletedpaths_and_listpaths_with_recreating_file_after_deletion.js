let nock = require('nock');

module.exports.hash = "c6b2d5304942ccb53c37f9d9f7c3d260";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154751722504597","file0":"file0169154751741702383","file1":"file1169154751755605161","file2":"file2169154751769301452"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751722504597')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:36 GMT',
  'ETag',
  '"0x8DB987EF03F2C69"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26aaf-101e-002e-7c67-caab16000000',
  'x-ms-client-request-id',
  'fde8d8eb-d0c6-47ad-a984-ad7b8ea2c37d',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:35 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751722504597/file0169154751741702383')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:36 GMT',
  'ETag',
  '"0x8DB987EF05E2739"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f2b-f01f-0054-4267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '3a16422e-0b04-4b22-88ee-75c7c1f5adb2',
  'Date',
  'Wed, 09 Aug 2023 02:18:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751722504597/file1169154751755605161')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:37 GMT',
  'ETag',
  '"0x8DB987EF072AD75"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f2d-f01f-0054-4467-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '616dd829-86c6-4d40-98d3-ce5a6a1fbce4',
  'Date',
  'Wed, 09 Aug 2023 02:18:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751722504597/file2169154751769301452')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:37 GMT',
  'ETag',
  '"0x8DB987EF087C08B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f2e-f01f-0054-4567-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '35b14a86-be9d-438c-aab5-4a5943db7109',
  'Date',
  'Wed, 09 Aug 2023 02:18:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751722504597/file0169154751741702383')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211173218035',
  'x-ms-request-id',
  'f1673f30-f01f-0054-4767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '92ae4bce-bc87-47d1-a412-b0c7c1afee5a',
  'Date',
  'Wed, 09 Aug 2023 02:18:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751722504597/file0169154751741702383')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:37 GMT',
  'ETag',
  '"0x8DB987EF0B5F4E1"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f31-f01f-0054-4867-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '1ba6a9e3-2a33-45c6-a4cd-671bf5367cd9',
  'Date',
  'Wed, 09 Aug 2023 02:18:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751722504597/file1169154751755605161')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211176164026',
  'x-ms-request-id',
  'f1673f33-f01f-0054-4a67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'dbb8b066-72a4-4a3b-92da-3a8f1541af5d',
  'Date',
  'Wed, 09 Aug 2023 02:18:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751722504597/file1169154751755605161')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:37 GMT',
  'ETag',
  '"0x8DB987EF0DF88B7"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f34-f01f-0054-4b67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '3dbc341b-698a-487f-add3-5dd000c48948',
  'Date',
  'Wed, 09 Aug 2023 02:18:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751722504597/file2169154751769301452')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211178576568',
  'x-ms-request-id',
  'f1673f36-f01f-0054-4d67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '63112cdc-3836-45a6-8c11-3a480c20eb6f',
  'Date',
  'Wed, 09 Aug 2023 02:18:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751722504597/file2169154751769301452')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:37 GMT',
  'ETag',
  '"0x8DB987EF1048F51"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f3b-f01f-0054-5267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '24fa39ab-6a90-430c-a843-8f7557d73fd4',
  'Date',
  'Wed, 09 Aug 2023 02:18:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154751722504597')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem169154751722504597\"><Blobs><Blob><Name>file0169154751741702383</Name><DeletionId>133360211173218035</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:36 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:36 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:37 GMT</Expiry-Time><Etag>0x8DB987EF05E2739</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:37 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1169154751755605161</Name><DeletionId>133360211176164026</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:37 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:37 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:37 GMT</Expiry-Time><Etag>0x8DB987EF072AD75</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:37 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file2169154751769301452</Name><DeletionId>133360211178576568</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:37 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:37 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:37 GMT</Expiry-Time><Etag>0x8DB987EF087C08B</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:37 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26b77-101e-002e-2967-caab16000000',
  'x-ms-client-request-id',
  'e4db97a4-3291-45c8-b13a-6d794ac75d5e',
  'x-ms-version',
  '2023-08-03',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:37 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154751722504597')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133360211174814945","etag":"0x8DB987EF0B5F4E1","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:37 GMT","name":"file0169154751741702383","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133360211177539767","etag":"0x8DB987EF0DF88B7","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:37 GMT","name":"file1169154751755605161","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133360211179966289","etag":"0x8DB987EF1048F51","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:37 GMT","name":"file2169154751769301452","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1673f3f-f01f-0054-5667-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '89bbeebb-9098-42e8-beb3-7e43856877fa',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751722504597')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26b9c-101e-002e-4a67-caab16000000',
  'x-ms-client-request-id',
  '298b546e-0954-4a2b-ada0-2d80fcba1ca5',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:37 GMT'
]);
