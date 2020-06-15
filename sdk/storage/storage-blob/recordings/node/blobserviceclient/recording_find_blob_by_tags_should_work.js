let nock = require('nock');

module.exports.hash = "dd7a91564a0c33d834140fadb85525f2";

module.exports.testInfo = {"uniqueName":{"container1":"container1159210827477909112","key":"key159210827479503303","key2":"key2159210827479506597","blobname1":"blobname1159210827479506992","val1":"val1159210827479501088","blobname2":"blobname2159210827481107997","val2":"val2159210827481104876","blobname3":"blobname3159210827482604531","val3":"val3159210827482605322"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159210827477909112')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E95725BA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130923e-201e-003e-4e02-42dadf000000',
  'x-ms-client-request-id',
  'e5ff72d2-1d79-4c6c-b6c0-87cb28ce5bea',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159210827477909112/blobname1159210827479506992')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E959B3F5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309247-201e-003e-5602-42dadf000000',
  'x-ms-client-request-id',
  '3ca4c5db-94d8-4fb0-9ed1-53fa8ea167f6',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:54.8122101Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159210827477909112/blobname2159210827481107997')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E95BFE4F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130924e-201e-003e-5d02-42dadf000000',
  'x-ms-client-request-id',
  '0b93a9e0-44cd-4b84-9625-a7f85e88504c',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:54.8272207Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159210827477909112/blobname3159210827482604531')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E95E48A9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309254-201e-003e-6302-42dadf000000',
  'x-ms-client-request-id',
  'f58022f0-a5a7-41d8-95dd-f525fce46c79',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:54.8422313Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key159210827479503303=&apos;val1159210827479501088&apos;</Where><Blobs><Blob><Name>blobname1159210827479506992</Name><ContainerName>container1159210827477909112</ContainerName><TagValue>val1159210827479501088</TagValue></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13095a5-201e-003e-8002-42dadf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'cfb79d17-3c47-407a-afa2-2c1065b46706',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key159210827479503303=&apos;val2159210827481104876&apos;</Where><Blobs><Blob><Name>blobname2159210827481107997</Name><ContainerName>container1159210827477909112</ContainerName><TagValue>val2159210827481104876</TagValue></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309642-201e-003e-1502-42dadf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '2e53d7e7-1cab-4b9d-95e6-b9d5975a880f',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key2159210827479506597=&apos;default&apos;</Where><MaxResults>1</MaxResults><Blobs><Blob><Name>blobname1159210827479506992</Name><ContainerName>container1159210827477909112</ContainerName><TagValue>default</TagValue></Blob></Blobs><NextMarker>2!308!MDAwMDQ1IWNvbnRhaW5lcjExNTkyMTA4Mjc0Nzc5MDkxMTIBMDFENjQyMDJDNkUwNzhFMyEwMDAwMjchYmxvYm5hbWUyMTU5MjEwODI3NDgxMTA3OTk3ITAwMDAxNSEIAAAABwAAAGRlZmF1bHQhMDAwMDAxITAhMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVohMDAwMDM2ITFmOTIxN2IwLWY4MjctNGIzZi1hOTU3LTlhZjUxMjA5ZjYzNiEwMDAwMjIha2V5MjE1OTIxMDgyNzQ3OTUwNjU5NyE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309648-201e-003e-1902-42dadf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '520a00a3-87aa-4517-a940-711c25751526',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Marker>2!308!MDAwMDQ1IWNvbnRhaW5lcjExNTkyMTA4Mjc0Nzc5MDkxMTIBMDFENjQyMDJDNkUwNzhFMyEwMDAwMjchYmxvYm5hbWUyMTU5MjEwODI3NDgxMTA3OTk3ITAwMDAxNSEIAAAABwAAAGRlZmF1bHQhMDAwMDAxITAhMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVohMDAwMDM2ITFmOTIxN2IwLWY4MjctNGIzZi1hOTU3LTlhZjUxMjA5ZjYzNiEwMDAwMjIha2V5MjE1OTIxMDgyNzQ3OTUwNjU5NyE-</Marker><Where>key2159210827479506597=&apos;default&apos;</Where><MaxResults>1</MaxResults><Blobs><Blob><Name>blobname2159210827481107997</Name><ContainerName>container1159210827477909112</ContainerName><TagValue>default</TagValue></Blob></Blobs><NextMarker>2!308!MDAwMDQ1IWNvbnRhaW5lcjExNTkyMTA4Mjc0Nzc5MDkxMTIBMDFENjQyMDJDNkUwNzhFMyEwMDAwMjchYmxvYm5hbWUzMTU5MjEwODI3NDgyNjA0NTMxITAwMDAxNSEIAAAABwAAAGRlZmF1bHQhMDAwMDAxITAhMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVohMDAwMDM2ITBlMWFhNDQ2LTIxYTQtNGYzNC1hMDk1LTkwMjVjY2U1ZTU2YyEwMDAwMjIha2V5MjE1OTIxMDgyNzQ3OTUwNjU5NyE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309653-201e-003e-2402-42dadf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '13fdb176-af07-412b-8a4e-37709dec32a7',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Marker>2!308!MDAwMDQ1IWNvbnRhaW5lcjExNTkyMTA4Mjc0Nzc5MDkxMTIBMDFENjQyMDJDNkUwNzhFMyEwMDAwMjchYmxvYm5hbWUzMTU5MjEwODI3NDgyNjA0NTMxITAwMDAxNSEIAAAABwAAAGRlZmF1bHQhMDAwMDAxITAhMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVohMDAwMDM2ITBlMWFhNDQ2LTIxYTQtNGYzNC1hMDk1LTkwMjVjY2U1ZTU2YyEwMDAwMjIha2V5MjE1OTIxMDgyNzQ3OTUwNjU5NyE-</Marker><Where>key2159210827479506597=&apos;default&apos;</Where><MaxResults>1</MaxResults><Blobs><Blob><Name>blobname3159210827482604531</Name><ContainerName>container1159210827477909112</ContainerName><TagValue>default</TagValue></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130965a-201e-003e-2b02-42dadf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '06eafac4-6d82-4fd4-a1e0-7443acc87c06',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container1159210827477909112')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309662-201e-003e-3302-42dadf000000',
  'x-ms-client-request-id',
  'b140e5cd-9f2b-464b-af2d-d8cb1f8a299f',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);
