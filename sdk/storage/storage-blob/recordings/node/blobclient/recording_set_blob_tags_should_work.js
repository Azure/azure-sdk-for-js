let nock = require('nock');

module.exports.hash = "a4d11b65b72089c745751a1d6ece724e";

module.exports.testInfo = {"uniqueName":{"container":"container159210827037906396","blob":"blob159210827051603960"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827037906396')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:50 GMT',
  'ETag',
  '"0x8D81019E6C750F1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308bec-201e-003e-0302-42dadf000000',
  'x-ms-client-request-id',
  'f2bd6bdd-b4ec-4c2a-8e1e-d64268f03b27',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827037906396/blob159210827051603960', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:50 GMT',
  'ETag',
  '"0x8D81019E6CC9FC6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308c07-201e-003e-1a02-42dadf000000',
  'x-ms-client-request-id',
  'c5e1cc6a-a621-4cbb-bdd5-8b5b3f16caa6',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:50.5321926Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827037906396/blob159210827051603960', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308c0d-201e-003e-1f02-42dadf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'b85fa6bc-191d-4f1d-b739-6face51b9a7f',
  'Date',
  'Sun, 14 Jun 2020 04:17:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827037906396/blob159210827051603960')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '162',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308c33-201e-003e-4302-42dadf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '64371c2c-a076-4f16-8ad2-3484e7cfce76',
  'Date',
  'Sun, 14 Jun 2020 04:17:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827037906396/blob159210827051603960')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:50 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019E6CC9FC6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308c47-201e-003e-5402-42dadf000000',
  'x-ms-client-request-id',
  '862d8686-8c86-4d29-81f8-fe8b1c8f70a0',
  'x-ms-version',
  '2019-12-12',
  'x-ms-tag-count',
  '2',
  'x-ms-version-id',
  '2020-06-14T04:17:50.5321926Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:50 GMT',
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
  'Sun, 14 Jun 2020 04:17:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827037906396/blob159210827051603960')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:50 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019E6CC9FC6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308c54-201e-003e-6002-42dadf000000',
  'x-ms-client-request-id',
  '2a107c64-abf4-448e-b974-be1b58bb94ba',
  'x-ms-version',
  '2019-12-12',
  'x-ms-tag-count',
  '2',
  'x-ms-version-id',
  '2020-06-14T04:17:50.5321926Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:50 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827037906396')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container159210827037906396\"><Blobs><Blob><Name>blob159210827051603960</Name><VersionId>2020-06-14T04:17:50.5321926Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Sun, 14 Jun 2020 04:17:50 GMT</Creation-Time><Last-Modified>Sun, 14 Jun 2020 04:17:50 GMT</Last-Modified><Etag>0x8D81019E6CC9FC6</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>2</TagCount></Properties><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308c5c-201e-003e-6802-42dadf000000',
  'x-ms-client-request-id',
  'b7ff4b1b-73bf-40d4-969c-7238dc948305',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827037906396')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308c68-201e-003e-7402-42dadf000000',
  'x-ms-client-request-id',
  '5aacca3e-13b9-428a-8d55-bb20ddb8607f',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:49 GMT'
]);
