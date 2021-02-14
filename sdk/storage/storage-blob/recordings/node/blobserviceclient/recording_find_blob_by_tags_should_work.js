let nock = require('nock');

module.exports.hash = "4bf78c4c9f0c24e97416ae3079e3d654";

module.exports.testInfo = {"uniqueName":{"container1":"container1160587627347606823","key":"key160587627463508352","key2":"key2160587627463501129","blobname1":"blobname1160587627463504264","val1":"val1160587627463603343","blobname2":"blobname2160587627492006116","val2":"val2160587627492108159","blobname3":"blobname3160587627519809613","val3":"val3160587627519900338"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1160587627347606823')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 20 Nov 2020 12:44:34 GMT',
  'ETag',
  '"0x8D88D5208A6D2B7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cbbdde0-201e-001c-3e3a-bf88a2000000',
  'x-ms-client-request-id',
  'f8f403cc-f16c-42ce-a992-98369e59c567',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 20 Nov 2020 12:44:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1160587627347606823/blobname1160587627463504264')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 20 Nov 2020 12:44:34 GMT',
  'ETag',
  '"0x8D88D5208D36007"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cbbde0c-201e-001c-673a-bf88a2000000',
  'x-ms-client-request-id',
  'f88d89fa-d1fc-47ca-b012-57e305dad876',
  'x-ms-version',
  '2020-04-08',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-20T12:44:34.7830279Z',
  'Date',
  'Fri, 20 Nov 2020 12:44:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1160587627347606823/blobname2160587627492006116')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 20 Nov 2020 12:44:35 GMT',
  'ETag',
  '"0x8D88D5208FDAC17"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cbbde33-201e-001c-083a-bf88a2000000',
  'x-ms-client-request-id',
  'b20b5415-2eac-461c-9200-55eb872be61d',
  'x-ms-version',
  '2020-04-08',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-20T12:44:35.0602263Z',
  'Date',
  'Fri, 20 Nov 2020 12:44:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1160587627347606823/blobname3160587627519809613')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 20 Nov 2020 12:44:35 GMT',
  'ETag',
  '"0x8D88D5209281F3C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cbbdeae-201e-001c-6f3a-bf88a2000000',
  'x-ms-client-request-id',
  'd86ba81a-77f1-41b8-8020-74119b5aeb62',
  'x-ms-version',
  '2020-04-08',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-20T12:44:35.3384252Z',
  'Date',
  'Fri, 20 Nov 2020 12:44:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key160587627463508352=&apos;val1160587627463603343&apos;</Where><Blobs><Blob><Name>blobname1160587627463504264</Name><ContainerName>container1160587627347606823</ContainerName><Tags><TagSet><Tag><Key>key160587627463508352</Key><Value>val1160587627463603343</Value></Tag></TagSet></Tags></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cbbe08c-201e-001c-683a-bf88a2000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'cb69da13-dc85-450a-bb20-0177f9458e56',
  'Date',
  'Fri, 20 Nov 2020 12:44:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key160587627463508352=&apos;val2160587627492108159&apos;</Where><Blobs><Blob><Name>blobname2160587627492006116</Name><ContainerName>container1160587627347606823</ContainerName><Tags><TagSet><Tag><Key>key160587627463508352</Key><Value>val2160587627492108159</Value></Tag></TagSet></Tags></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cbbe0c1-201e-001c-173a-bf88a2000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'd7bb0d3d-9172-4ea0-82f5-f8e63e78c638',
  'Date',
  'Fri, 20 Nov 2020 12:44:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key2160587627463501129=&apos;default&apos;</Where><MaxResults>1</MaxResults><Blobs><Blob><Name>blobname1160587627463504264</Name><ContainerName>container1160587627347606823</ContainerName><Tags><TagSet><Tag><Key>key2160587627463501129</Key><Value>default</Value></Tag></TagSet></Tags></Blob></Blobs><NextMarker>2!308!MDAwMDQ1IWNvbnRhaW5lcjExNjA1ODc2MjczNDc2MDY4MjMBMDFENkJGM0FFNjMwMDU1QyEwMDAwMjchYmxvYm5hbWUyMTYwNTg3NjI3NDkyMDA2MTE2ITAwMDAxNSEIAAAABwAAAGRlZmF1bHQhMDAwMDAxITAhMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVohMDAwMDM2ITNkMzk2NGIyLTcxYWMtNDJhMy04N2Q3LTFmNGFhNmIwMWI1MCEwMDAwMjIha2V5MjE2MDU4NzYyNzQ2MzUwMTEyOSE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cbbe10f-201e-001c-5b3a-bf88a2000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'cd11ddb2-8276-42dd-9bb4-eee2163c1945',
  'Date',
  'Fri, 20 Nov 2020 12:44:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Marker>2!308!MDAwMDQ1IWNvbnRhaW5lcjExNjA1ODc2MjczNDc2MDY4MjMBMDFENkJGM0FFNjMwMDU1QyEwMDAwMjchYmxvYm5hbWUyMTYwNTg3NjI3NDkyMDA2MTE2ITAwMDAxNSEIAAAABwAAAGRlZmF1bHQhMDAwMDAxITAhMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVohMDAwMDM2ITNkMzk2NGIyLTcxYWMtNDJhMy04N2Q3LTFmNGFhNmIwMWI1MCEwMDAwMjIha2V5MjE2MDU4NzYyNzQ2MzUwMTEyOSE-</Marker><Where>key2160587627463501129=&apos;default&apos;</Where><MaxResults>1</MaxResults><Blobs><Blob><Name>blobname2160587627492006116</Name><ContainerName>container1160587627347606823</ContainerName><Tags><TagSet><Tag><Key>key2160587627463501129</Key><Value>default</Value></Tag></TagSet></Tags></Blob></Blobs><NextMarker>2!308!MDAwMDQ1IWNvbnRhaW5lcjExNjA1ODc2MjczNDc2MDY4MjMBMDFENkJGM0FFNjMwMDU1QyEwMDAwMjchYmxvYm5hbWUzMTYwNTg3NjI3NTE5ODA5NjEzITAwMDAxNSEIAAAABwAAAGRlZmF1bHQhMDAwMDAxITAhMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVohMDAwMDM2IWVmMzFlMTg5LTRjNDYtNDExMC1hMjVkLWZkZWFjMWE3NmQ2ZiEwMDAwMjIha2V5MjE2MDU4NzYyNzQ2MzUwMTEyOSE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cbbe12f-201e-001c-783a-bf88a2000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '897a1c38-eb3b-468f-bed4-bd0b968cbeab',
  'Date',
  'Fri, 20 Nov 2020 12:44:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Marker>2!308!MDAwMDQ1IWNvbnRhaW5lcjExNjA1ODc2MjczNDc2MDY4MjMBMDFENkJGM0FFNjMwMDU1QyEwMDAwMjchYmxvYm5hbWUzMTYwNTg3NjI3NTE5ODA5NjEzITAwMDAxNSEIAAAABwAAAGRlZmF1bHQhMDAwMDAxITAhMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVohMDAwMDM2IWVmMzFlMTg5LTRjNDYtNDExMC1hMjVkLWZkZWFjMWE3NmQ2ZiEwMDAwMjIha2V5MjE2MDU4NzYyNzQ2MzUwMTEyOSE-</Marker><Where>key2160587627463501129=&apos;default&apos;</Where><MaxResults>1</MaxResults><Blobs><Blob><Name>blobname3160587627519809613</Name><ContainerName>container1160587627347606823</ContainerName><Tags><TagSet><Tag><Key>key2160587627463501129</Key><Value>default</Value></Tag></TagSet></Tags></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cbbe157-201e-001c-133a-bf88a2000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '6fa3e1fd-2141-4a50-8e87-e1110e1fe7d7',
  'Date',
  'Fri, 20 Nov 2020 12:44:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>@container=&apos;container1160587627347606823&apos; AND key160587627463508352=&apos;val1160587627463603343&apos; AND key2160587627463501129=&apos;default&apos;</Where><Blobs><Blob><Name>blobname1160587627463504264</Name><ContainerName>container1160587627347606823</ContainerName><Tags><TagSet><Tag><Key>key160587627463508352</Key><Value>val1160587627463603343</Value></Tag><Tag><Key>key2160587627463501129</Key><Value>default</Value></Tag></TagSet></Tags></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cbbe197-201e-001c-463a-bf88a2000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '44abe90c-2d6e-446e-ac08-ebfb64036089',
  'Date',
  'Fri, 20 Nov 2020 12:44:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container1160587627347606823')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cbbe1d6-201e-001c-753a-bf88a2000000',
  'x-ms-client-request-id',
  'e7a6fddd-b4c8-436f-a1df-5f7c8516b091',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 20 Nov 2020 12:44:39 GMT'
]);
