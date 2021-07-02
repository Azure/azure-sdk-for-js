let nock = require('nock');

module.exports.hash = "22a209bdb4e31bac8b8207c18ad87fe1";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162072634270703448","file0":"file0162072634421906782","file1":"file1162072634563606025","file2":"file2162072634594402772"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162072634270703448')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 11 May 2021 09:45:44 GMT',
  'ETag',
  '"0x8D914618BD8BEF3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f076240a-801e-0045-1c4a-469843000000',
  'x-ms-client-request-id',
  'e4d2f27d-ced1-49e1-8d9b-ce50c92eca49',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 09:45:43 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162072634270703448/file0162072634421906782')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 09:45:45 GMT',
  'ETag',
  '"0x8D914618CBE739A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '844ae1be-801f-0055-394a-465d2b000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '184a4202-1bdd-41f2-9b45-91e6b1e8a32d',
  'Date',
  'Tue, 11 May 2021 09:45:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162072634270703448/file1162072634563606025')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 09:45:45 GMT',
  'ETag',
  '"0x8D914618CEDD373"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '844ae1d6-801f-0055-514a-465d2b000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'c5d22683-11c3-40f9-a55e-e7de3ebb66c2',
  'Date',
  'Tue, 11 May 2021 09:45:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162072634270703448/file2162072634594402772')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 09:45:46 GMT',
  'ETag',
  '"0x8D914618D1C4F10"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '844ae1f1-801f-0055-6c4a-465d2b000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '98dd7a4d-91c9-4ca6-b149-1ce02e7784fe',
  'Date',
  'Tue, 11 May 2021 09:45:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162072634270703448/file0162072634421906782')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651999464592864',
  'x-ms-request-id',
  '844ae21c-801f-0055-174a-465d2b000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '4d98c954-3271-4120-bdc1-db8c7857e71e',
  'Date',
  'Tue, 11 May 2021 09:45:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162072634270703448/file0162072634421906782')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 09:45:46 GMT',
  'ETag',
  '"0x8D914618D81FF9F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '844ae22f-801f-0055-2a4a-465d2b000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '2200d8d7-3dcb-4c01-b3d5-8b6f360bb034',
  'Date',
  'Tue, 11 May 2021 09:45:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162072634270703448/file0162072634421906782')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651999471067238',
  'x-ms-request-id',
  '844ae230-801f-0055-2b4a-465d2b000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '338d161f-3817-405b-b04e-60df9754c9eb',
  'Date',
  'Tue, 11 May 2021 09:45:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162072634270703448/file1162072634563606025')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651999474328505',
  'x-ms-request-id',
  '844ae234-801f-0055-2f4a-465d2b000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'e500cb86-7c5a-47b0-a743-4d60830debef',
  'Date',
  'Tue, 11 May 2021 09:45:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162072634270703448/file1162072634563606025')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 09:45:47 GMT',
  'ETag',
  '"0x8D914618E147771"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '844ae237-801f-0055-324a-465d2b000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'dd720c63-c7aa-4efb-8d63-e3b044be5aaf',
  'Date',
  'Tue, 11 May 2021 09:45:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162072634270703448/file1162072634563606025')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651999480660383',
  'x-ms-request-id',
  '844ae243-801f-0055-3e4a-465d2b000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '83fec30b-838b-4a85-83ad-e4043d52ae81',
  'Date',
  'Tue, 11 May 2021 09:45:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162072634270703448/file2162072634594402772')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651999483924458',
  'x-ms-request-id',
  '844ae251-801f-0055-4c4a-465d2b000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '469906c4-9642-4a8c-a7a8-92d133b3305e',
  'Date',
  'Tue, 11 May 2021 09:45:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162072634270703448/file2162072634594402772')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 09:45:48 GMT',
  'ETag',
  '"0x8D914618EA61B5B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '844ae255-801f-0055-4f4a-465d2b000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '867f3115-5bfb-4e6e-bbef-72038dede8c4',
  'Date',
  'Tue, 11 May 2021 09:45:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162072634270703448/file2162072634594402772')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651999490195514',
  'x-ms-request-id',
  '844ae273-801f-0055-6d4a-465d2b000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'c05f674c-996e-4069-8571-f415c993fb9d',
  'Date',
  'Tue, 11 May 2021 09:45:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162072634270703448')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162072634270703448\"><Blobs><Blob><Name>file0162072634421906782</Name><DeletionId>132651999464592864</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 09:45:45 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 09:45:45 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 09:45:46 GMT</Expiry-Time><Etag>0x8D914618CBE739A</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 09:45:46 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file0162072634421906782</Name><DeletionId>132651999471067238</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 09:45:46 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 09:45:46 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 09:45:47 GMT</Expiry-Time><Etag>0x8D914618D81FF9F</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 09:45:47 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1162072634563606025</Name><DeletionId>132651999474328505</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 09:45:45 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 09:45:45 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 09:45:47 GMT</Expiry-Time><Etag>0x8D914618CEDD373</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 09:45:47 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1162072634563606025</Name><DeletionId>132651999480660383</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 09:45:47 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 09:45:47 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 09:45:48 GMT</Expiry-Time><Etag>0x8D914618E147771</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 09:45:48 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file2162072634594402772</Name><DeletionId>132651999483924458</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 09:45:46 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 09:45:46 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 09:45:48 GMT</Expiry-Time><Etag>0x8D914618D1C4F10</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 09:45:48 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file2162072634594402772</Name><DeletionId>132651999490195514</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 09:45:48 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 09:45:48 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 09:45:49 GMT</Expiry-Time><Etag>0x8D914618EA61B5B</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 09:45:49 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f07627a0-801e-0045-174a-469843000000',
  'x-ms-client-request-id',
  '06ccdd91-7bdb-4428-8aa5-5d034756c96c',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 May 2021 09:45:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162072634270703448')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f07627ef-801e-0045-594a-469843000000',
  'x-ms-client-request-id',
  'a9b29425-bdc0-4820-88ce-2611cc296e25',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 09:45:49 GMT'
]);
