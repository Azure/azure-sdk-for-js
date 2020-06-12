let nock = require('nock');

module.exports.hash = "0ec74020251a40add7f4ac37fe842c42";

module.exports.testInfo = {"uniqueName":{"container1":"container1159196218851703967","key":"key159196218890702959","key2":"key2159196218890709285","blobname1":"blobname1159196218890707438","val1":"val1159196218890903986","blobname2":"blobname2159196218970407993","val2":"val2159196218970608898","blobname3":"blobname3159196219072701843","val3":"val3159196219072908927"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159196218851703967')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 12 Jun 2020 11:43:07 GMT',
  'ETag',
  '"0x8D80EC5C6B01CE1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8acb137b-301e-0050-80ae-408ff0000000',
  'x-ms-client-request-id',
  '36ea54a2-c790-43f1-8062-311cbd3fef25',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 12 Jun 2020 11:43:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159196218851703967/blobname1159196218890707438')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 12 Jun 2020 11:43:08 GMT',
  'ETag',
  '"0x8D80EC5C702974D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8acb14de-301e-0050-54ae-408ff0000000',
  'x-ms-client-request-id',
  '3d83a93d-6274-45ec-8379-fa3a54fd2bbf',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-12T11:43:08.3117160Z',
  'Date',
  'Fri, 12 Jun 2020 11:43:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159196218851703967/blobname2159196218970407993')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 12 Jun 2020 11:43:09 GMT',
  'ETag',
  '"0x8D80EC5C7B42D9B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8acb1763-301e-0050-4cae-408ff0000000',
  'x-ms-client-request-id',
  '176e8038-72b5-4837-b0f5-23379168a3cd',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-12T11:43:09.4745499Z',
  'Date',
  'Fri, 12 Jun 2020 11:43:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159196218851703967/blobname3159196219072701843')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 12 Jun 2020 11:43:10 GMT',
  'ETag',
  '"0x8D80EC5C80A9ADB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8acb1922-301e-0050-02ae-408ff0000000',
  'x-ms-client-request-id',
  '9d182d50-972b-4065-90f0-ef545e8386d8',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-12T11:43:10.0409563Z',
  'Date',
  'Fri, 12 Jun 2020 11:43:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key159196218890702959=&apos;val1159196218890903986&apos;</Where><Blobs><Blob><Name>blobname1159196218890707438</Name><ContainerName>container1159196218851703967</ContainerName><TagValue>val1159196218890903986</TagValue></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8acb2163-301e-0050-0bae-408ff0000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'ebd077ed-cf26-457f-8db7-b2074c72ae69',
  'Date',
  'Fri, 12 Jun 2020 11:43:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key159196218890702959=&apos;val2159196218970608898&apos;</Where><Blobs><Blob><Name>blobname2159196218970407993</Name><ContainerName>container1159196218851703967</ContainerName><TagValue>val2159196218970608898</TagValue></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8acb2474-301e-0050-68ae-408ff0000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '21a1936a-a9ee-4945-a151-0130f2156dc9',
  'Date',
  'Fri, 12 Jun 2020 11:43:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key2159196218890709285=&apos;default&apos;</Where><MaxResults>1</MaxResults><Blobs><Blob><Name>blobname1159196218890707438</Name><ContainerName>container1159196218851703967</ContainerName><TagValue>default</TagValue></Blob></Blobs><NextMarker>2!308!MDAwMDQ1IWNvbnRhaW5lcjExNTkxOTYyMTg4NTE3MDM5NjcBMDFENjQwQUVBNDM5NjAzNyEwMDAwMjchYmxvYm5hbWUyMTU5MTk2MjE4OTcwNDA3OTkzITAwMDAxNSEIAAAABwAAAGRlZmF1bHQhMDAwMDAxITAhMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVohMDAwMDM2IWExNjE5MTEzLTc5Y2UtNDFlYi1iZjhkLTQzN2YyOWMyMTdjOSEwMDAwMjIha2V5MjE1OTE5NjIxODg5MDcwOTI4NSE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8acb26fd-301e-0050-56ae-408ff0000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '29798daf-27ad-4ef9-ab66-1082c6c0539a',
  'Date',
  'Fri, 12 Jun 2020 11:43:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Marker>2!308!MDAwMDQ1IWNvbnRhaW5lcjExNTkxOTYyMTg4NTE3MDM5NjcBMDFENjQwQUVBNDM5NjAzNyEwMDAwMjchYmxvYm5hbWUyMTU5MTk2MjE4OTcwNDA3OTkzITAwMDAxNSEIAAAABwAAAGRlZmF1bHQhMDAwMDAxITAhMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVohMDAwMDM2IWExNjE5MTEzLTc5Y2UtNDFlYi1iZjhkLTQzN2YyOWMyMTdjOSEwMDAwMjIha2V5MjE1OTE5NjIxODg5MDcwOTI4NSE-</Marker><Where>key2159196218890709285=&apos;default&apos;</Where><MaxResults>1</MaxResults><Blobs><Blob><Name>blobname2159196218970407993</Name><ContainerName>container1159196218851703967</ContainerName><TagValue>default</TagValue></Blob></Blobs><NextMarker>2!308!MDAwMDQ1IWNvbnRhaW5lcjExNTkxOTYyMTg4NTE3MDM5NjcBMDFENjQwQUVBNDM5NjAzNyEwMDAwMjchYmxvYm5hbWUzMTU5MTk2MjE5MDcyNzAxODQzITAwMDAxNSEIAAAABwAAAGRlZmF1bHQhMDAwMDAxITAhMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVohMDAwMDM2ITk1NzAwMjlmLWVhZjctNDkxZC04YzVjLWZiMzIxZDVlNTE1OCEwMDAwMjIha2V5MjE1OTE5NjIxODg5MDcwOTI4NSE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8acb295f-301e-0050-16ae-408ff0000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '360135bc-1f54-4324-8666-d176dd242d68',
  'Date',
  'Fri, 12 Jun 2020 11:43:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Marker>2!308!MDAwMDQ1IWNvbnRhaW5lcjExNTkxOTYyMTg4NTE3MDM5NjcBMDFENjQwQUVBNDM5NjAzNyEwMDAwMjchYmxvYm5hbWUzMTU5MTk2MjE5MDcyNzAxODQzITAwMDAxNSEIAAAABwAAAGRlZmF1bHQhMDAwMDAxITAhMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVohMDAwMDM2ITk1NzAwMjlmLWVhZjctNDkxZC04YzVjLWZiMzIxZDVlNTE1OCEwMDAwMjIha2V5MjE1OTE5NjIxODg5MDcwOTI4NSE-</Marker><Where>key2159196218890709285=&apos;default&apos;</Where><MaxResults>1</MaxResults><Blobs><Blob><Name>blobname3159196219072701843</Name><ContainerName>container1159196218851703967</ContainerName><TagValue>default</TagValue></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8acb2b21-301e-0050-49ae-408ff0000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '21c74bd5-fdb8-485e-a291-cbd5d5d17b6a',
  'Date',
  'Fri, 12 Jun 2020 11:43:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container1159196218851703967')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8acb2e11-301e-0050-12ae-408ff0000000',
  'x-ms-client-request-id',
  '23393f7e-d61c-4fc1-86cb-7c315faede6a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 12 Jun 2020 11:43:17 GMT'
]);
