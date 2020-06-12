let nock = require('nock');

module.exports.hash = "df3bcfef7788177a7953760e520e309f";

module.exports.testInfo = {"uniqueName":{"container":"container159195940246107854","blob":"blob159195940379508746"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159195940246107854')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 12 Jun 2020 10:56:42 GMT',
  'ETag',
  '"0x8D80EBF4AAC82AE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c540d3-501e-0046-78a8-407927000000',
  'x-ms-client-request-id',
  '66b75bba-4807-498c-98b3-43463f85c30a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 12 Jun 2020 10:56:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159195940246107854/blob159195940379508746', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 12 Jun 2020 10:56:43 GMT',
  'ETag',
  '"0x8D80EBF4ADCBBF6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54165-501e-0046-80a8-407927000000',
  'x-ms-client-request-id',
  'cbfd6584-abea-4046-bac7-369e136aa5d9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-12T10:56:43.0447606Z',
  'Date',
  'Fri, 12 Jun 2020 10:56:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159195940246107854/blob159195940379508746', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c541ec-501e-0046-70a8-407927000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'ebefe377-31da-417a-9585-bbad27bdacf8',
  'Date',
  'Fri, 12 Jun 2020 10:56:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159195940246107854/blob159195940379508746')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '162',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54302-501e-0046-70a8-407927000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'f5157c6c-effc-4770-9ebf-0bd00405318a',
  'Date',
  'Fri, 12 Jun 2020 10:56:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159195940246107854/blob159195940379508746')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 12 Jun 2020 10:56:43 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D80EBF4ADCBBF6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c543ae-501e-0046-0aa8-407927000000',
  'x-ms-client-request-id',
  'd7962cc5-3797-40ce-a683-3280841ba8df',
  'x-ms-version',
  '2019-12-12',
  'x-ms-tag-count',
  '2',
  'x-ms-version-id',
  '2020-06-12T10:56:43.0447606Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Fri, 12 Jun 2020 10:56:43 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Fri, 12 Jun 2020 10:56:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159195940246107854/blob159195940379508746')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 12 Jun 2020 10:56:43 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D80EBF4ADCBBF6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54435-501e-0046-80a8-407927000000',
  'x-ms-client-request-id',
  'be65c5ec-b8f6-4444-9f59-3ed1b652ee4d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-tag-count',
  '2',
  'x-ms-version-id',
  '2020-06-12T10:56:43.0447606Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Fri, 12 Jun 2020 10:56:43 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Date',
  'Fri, 12 Jun 2020 10:56:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159195940246107854')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container159195940246107854\"><Blobs><Blob><Name>blob159195940379508746</Name><VersionId>2020-06-12T10:56:43.0447606Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Fri, 12 Jun 2020 10:56:43 GMT</Creation-Time><Last-Modified>Fri, 12 Jun 2020 10:56:43 GMT</Last-Modified><Etag>0x8D80EBF4ADCBBF6</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>2</TagCount></Properties><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54506-501e-0046-33a8-407927000000',
  'x-ms-client-request-id',
  'f59807bc-1776-46a9-85e3-c3e90e1969aa',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 12 Jun 2020 10:56:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159195940246107854')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c545a6-501e-0046-41a8-407927000000',
  'x-ms-client-request-id',
  '1508dff0-5de9-4718-bfea-0f8085dcb919',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 12 Jun 2020 10:56:44 GMT'
]);
