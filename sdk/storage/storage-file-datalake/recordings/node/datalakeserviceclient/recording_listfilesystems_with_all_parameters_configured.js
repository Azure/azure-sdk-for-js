let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem1":"filesystem1157534992824607288"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem1157534992824607288x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 05:06:10 GMT',
  'ETag',
  '"0x8D777AE836F91AE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '27c2169e-901e-006c-1797-a9ee4d000000',
  'x-ms-client-request-id',
  'bc15c13a-3362-4ddc-8073-73eca059802b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:06:10 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem1157534992824607288x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 05:06:12 GMT',
  'ETag',
  '"0x8D777AE8420AEF8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '700587a7-d01e-00ac-5597-a96409000000',
  'x-ms-client-request-id',
  'fb55b93f-5343-4744-aa8f-887565a4d98c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:06:11 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Prefix>filesystem1157534992824607288</Prefix><MaxResults>1</MaxResults><Containers><Container><Name>filesystem1157534992824607288x1</Name><Properties><Last-Modified>Tue, 03 Dec 2019 05:06:10 GMT</Last-Modified><Etag>\"0x8D777AE836F91AE\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties><Metadata><key>val</key></Metadata></Container></Containers><NextMarker>/fakestorageaccount/filesystem1157534992824607288x2</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '30ef45e6-901e-000a-5297-a95c17000000',
  'x-ms-client-request-id',
  '4feaa842-6903-49b0-8251-34a0e96fbe46',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 05:06:12 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Prefix>filesystem1157534992824607288</Prefix><Marker>/fakestorageaccount/filesystem1157534992824607288x2</Marker><MaxResults>1</MaxResults><Containers><Container><Name>filesystem1157534992824607288x2</Name><Properties><Last-Modified>Tue, 03 Dec 2019 05:06:12 GMT</Last-Modified><Etag>\"0x8D777AE8420AEF8\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties><Metadata><key>val</key></Metadata></Container></Containers><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '30ef46b5-901e-000a-1197-a95c17000000',
  'x-ms-client-request-id',
  '9740a5ec-1c89-4869-b41d-3cb231605e6f',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 05:06:12 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem1157534992824607288x1')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '27c21cb6-901e-006c-3c97-a9ee4d000000',
  'x-ms-client-request-id',
  '89ed69c9-af5a-4b20-9196-2db719ecffbb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:06:13 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem1157534992824607288x2')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70058cbf-d01e-00ac-0997-a96409000000',
  'x-ms-client-request-id',
  'ed82dacf-a2b9-486e-9021-bd9d383ca08e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:06:13 GMT' ]);
