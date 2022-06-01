let nock = require('nock');

module.exports.hash = "8d6566e7b15b2e6c218e9759116a1692";

module.exports.testInfo = {"uniqueName":{"container":"container164068022772701728","key":"key164068022967902071","key2":"key2164068022967901328","blobname1":"blobname1164068022967900041","val1":"val1164068022968007298","blobname2":"blobname2164068022996309134","val2":"val2164068022996508153","blobname3":"blobname3164068023022502845","val3":"val3164068023022607979"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164068022772701728')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 28 Dec 2021 08:30:29 GMT',
  'ETag',
  '"0x8D9C9DC4E8E8F03"',
  'x-ms-request-id',
  '00a6cef8-e01e-0007-3ec5-fbfda4000000',
  'x-ms-client-request-id',
  'c868a705-3b2b-42b2-b65b-46b5abdac048',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 28 Dec 2021 08:30:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164068022772701728/blobname1164068022967900041')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 28 Dec 2021 08:30:30 GMT',
  'ETag',
  '"0x8D9C9DC4EBE08DA"',
  'x-ms-request-id',
  '00a6cefb-e01e-0007-3fc5-fbfda4000000',
  'x-ms-client-request-id',
  '8eb984a7-67a9-4133-97b4-57acfadca53c',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 28 Dec 2021 08:30:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164068022772701728/blobname2164068022996309134')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 28 Dec 2021 08:30:30 GMT',
  'ETag',
  '"0x8D9C9DC4EE9D3F5"',
  'x-ms-request-id',
  '00a6cefc-e01e-0007-40c5-fbfda4000000',
  'x-ms-client-request-id',
  '30becfa7-290c-45ea-8a6f-b99c715796f1',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 28 Dec 2021 08:30:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164068022772701728/blobname3164068023022502845')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 28 Dec 2021 08:30:30 GMT',
  'ETag',
  '"0x8D9C9DC4F1159A3"',
  'x-ms-request-id',
  '00a6cefd-e01e-0007-41c5-fbfda4000000',
  'x-ms-client-request-id',
  'cd0beba7-d455-4b1e-9f62-9c68b8f5e498',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 28 Dec 2021 08:30:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164068022772701728')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key164068022967902071=&apos;val1164068022968007298&apos;</Where><Blobs><Blob><Name>blobname1164068022967900041</Name><ContainerName>container164068022772701728</ContainerName><Tags><TagSet><Tag><Key>key164068022967902071</Key><Value>val1164068022968007298</Value></Tag></TagSet></Tags></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '00a6ceff-e01e-0007-43c5-fbfda4000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  'cc3b5bfc-5de7-4010-98b4-e75ed764e7ec',
  'Date',
  'Tue, 28 Dec 2021 08:30:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164068022772701728')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key164068022967902071=&apos;val2164068022996508153&apos;</Where><Blobs><Blob><Name>blobname2164068022996309134</Name><ContainerName>container164068022772701728</ContainerName><Tags><TagSet><Tag><Key>key164068022967902071</Key><Value>val2164068022996508153</Value></Tag></TagSet></Tags></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '00a6cf00-e01e-0007-44c5-fbfda4000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  'a7be1ba2-e43d-4542-b58f-e61fa14d41bf',
  'Date',
  'Tue, 28 Dec 2021 08:30:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164068022772701728')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key2164068022967901328=&apos;default&apos;</Where><MaxResults>1</MaxResults><Blobs><Blob><Name>blobname1164068022967900041</Name><ContainerName>container164068022772701728</ContainerName><Tags><TagSet><Tag><Key>key2164068022967901328</Key><Value>default</Value></Tag></TagSet></Tags></Blob></Blobs><NextMarker>2!308!MDAwMDQ0IWNvbnRhaW5lcjE2NDA2ODAyMjc3MjcwMTcyOAEwMUQ3RkJDNTJDMTg1MjYyITAwMDAyNyFibG9ibmFtZTIxNjQwNjgwMjI5OTYzMDkxMzQhMDAwMDE1IQgAAAAHAAAAZGVmYXVsdCEwMDAwMDEhMCEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiEwMDAwMzYhMGNhNjllMzEtNTRiMy00MzBjLWFhYTctOGVjMWYyNmIzMTg5ITAwMDAyMiFrZXkyMTY0MDY4MDIyOTY3OTAxMzI4IQ--</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '00a6cf01-e01e-0007-45c5-fbfda4000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  'd3ebbaa2-b239-4e53-9b0e-2c7ed34f9dbd',
  'Date',
  'Tue, 28 Dec 2021 08:30:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164068022772701728')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Marker>2!308!MDAwMDQ0IWNvbnRhaW5lcjE2NDA2ODAyMjc3MjcwMTcyOAEwMUQ3RkJDNTJDMTg1MjYyITAwMDAyNyFibG9ibmFtZTIxNjQwNjgwMjI5OTYzMDkxMzQhMDAwMDE1IQgAAAAHAAAAZGVmYXVsdCEwMDAwMDEhMCEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiEwMDAwMzYhMGNhNjllMzEtNTRiMy00MzBjLWFhYTctOGVjMWYyNmIzMTg5ITAwMDAyMiFrZXkyMTY0MDY4MDIyOTY3OTAxMzI4IQ--</Marker><Where>key2164068022967901328=&apos;default&apos;</Where><MaxResults>1</MaxResults><Blobs><Blob><Name>blobname2164068022996309134</Name><ContainerName>container164068022772701728</ContainerName><Tags><TagSet><Tag><Key>key2164068022967901328</Key><Value>default</Value></Tag></TagSet></Tags></Blob></Blobs><NextMarker>2!308!MDAwMDQ0IWNvbnRhaW5lcjE2NDA2ODAyMjc3MjcwMTcyOAEwMUQ3RkJDNTJDMTg1MjYyITAwMDAyNyFibG9ibmFtZTMxNjQwNjgwMjMwMjI1MDI4NDUhMDAwMDE1IQgAAAAHAAAAZGVmYXVsdCEwMDAwMDEhMCEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiEwMDAwMzYhNTZkZTI1MTQtNmY3NC00YTdmLWExMDItNTNjZWM5ZTQ2ZWFlITAwMDAyMiFrZXkyMTY0MDY4MDIyOTY3OTAxMzI4IQ--</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '00a6cf02-e01e-0007-46c5-fbfda4000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  'd6b6dc2f-07c6-4a04-81d7-71d166331a3c',
  'Date',
  'Tue, 28 Dec 2021 08:30:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164068022772701728')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Marker>2!308!MDAwMDQ0IWNvbnRhaW5lcjE2NDA2ODAyMjc3MjcwMTcyOAEwMUQ3RkJDNTJDMTg1MjYyITAwMDAyNyFibG9ibmFtZTMxNjQwNjgwMjMwMjI1MDI4NDUhMDAwMDE1IQgAAAAHAAAAZGVmYXVsdCEwMDAwMDEhMCEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiEwMDAwMzYhNTZkZTI1MTQtNmY3NC00YTdmLWExMDItNTNjZWM5ZTQ2ZWFlITAwMDAyMiFrZXkyMTY0MDY4MDIyOTY3OTAxMzI4IQ--</Marker><Where>key2164068022967901328=&apos;default&apos;</Where><MaxResults>1</MaxResults><Blobs><Blob><Name>blobname3164068023022502845</Name><ContainerName>container164068022772701728</ContainerName><Tags><TagSet><Tag><Key>key2164068022967901328</Key><Value>default</Value></Tag></TagSet></Tags></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '00a6cf03-e01e-0007-47c5-fbfda4000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  'bb1d62ab-22cc-4309-ad55-88b247a318d1',
  'Date',
  'Tue, 28 Dec 2021 08:30:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164068022772701728')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key164068022967902071=&apos;val1164068022968007298&apos; AND key2164068022967901328=&apos;default&apos;</Where><Blobs><Blob><Name>blobname1164068022967900041</Name><ContainerName>container164068022772701728</ContainerName><Tags><TagSet><Tag><Key>key164068022967902071</Key><Value>val1164068022968007298</Value></Tag><Tag><Key>key2164068022967901328</Key><Value>default</Value></Tag></TagSet></Tags></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '00a6cf04-e01e-0007-48c5-fbfda4000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  '1bb3b765-cfad-45a5-a334-1e12d1a0835b',
  'Date',
  'Tue, 28 Dec 2021 08:30:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164068022772701728')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '00a6cf05-e01e-0007-49c5-fbfda4000000',
  'x-ms-client-request-id',
  '481aa1d9-b89d-4cdd-8866-c13585be0e74',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 28 Dec 2021 08:30:34 GMT'
]);
