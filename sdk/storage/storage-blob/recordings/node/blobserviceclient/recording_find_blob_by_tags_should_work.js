let nock = require('nock');

module.exports.hash = "4b85ed9ce9fb0d046c9216243246450c";

module.exports.testInfo = {"uniqueName":{"container1":"container1159227439943806411","key":"key159227440063502634","key2":"key2159227440063508429","blobname1":"blobname1159227440063507702","val1":"val1159227440063702419","blobname2":"blobname2159227440094109162","val2":"val2159227440094309109","blobname3":"blobname3159227440123509267","val3":"val3159227440123706015"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159227439943806411')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 16 Jun 2020 02:26:40 GMT',
  'ETag',
  '"0x8D8119CB3DA7C94"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e1be66e0-e01e-0043-7185-43abfc000000',
  'x-ms-client-request-id',
  '2e9f1da6-336c-4cd8-a041-b086f7e5f7b8',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 16 Jun 2020 02:26:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159227439943806411/blobname1159227440063507702')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 16 Jun 2020 02:26:40 GMT',
  'ETag',
  '"0x8D8119CB40BD6AC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e1be67a2-e01e-0043-2a85-43abfc000000',
  'x-ms-client-request-id',
  'bdfdd0b6-57bd-4f62-8f69-603ea90e9c21',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-16T02:26:40.6170284Z',
  'Date',
  'Tue, 16 Jun 2020 02:26:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159227439943806411/blobname2159227440094109162')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 16 Jun 2020 02:26:40 GMT',
  'ETag',
  '"0x8D8119CB439308B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e1be683e-e01e-0043-4485-43abfc000000',
  'x-ms-client-request-id',
  '0aa29bb0-96fa-4eaf-a91e-7f1dd8984a51',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-16T02:26:40.9142411Z',
  'Date',
  'Tue, 16 Jun 2020 02:26:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159227439943806411/blobname3159227440123509267')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 16 Jun 2020 02:26:41 GMT',
  'ETag',
  '"0x8D8119CB465EE00"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e1be68bf-e01e-0043-4385-43abfc000000',
  'x-ms-client-request-id',
  '5a340ce3-6756-41d7-9204-c568d94ad66d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-16T02:26:41.2074496Z',
  'Date',
  'Tue, 16 Jun 2020 02:26:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key159227440063502634=&apos;val1159227440063702419&apos;</Where><Blobs><Blob><Name>blobname1159227440063507702</Name><ContainerName>container1159227439943806411</ContainerName><TagValue>val1159227440063702419</TagValue></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e1be6dad-e01e-0043-0585-43abfc000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'dffd0dec-c1fe-4341-b533-2fb7509534e2',
  'Date',
  'Tue, 16 Jun 2020 02:26:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key159227440063502634=&apos;val2159227440094309109&apos;</Where><Blobs><Blob><Name>blobname2159227440094109162</Name><ContainerName>container1159227439943806411</ContainerName><TagValue>val2159227440094309109</TagValue></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e1be6ee1-e01e-0043-3485-43abfc000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '1a11dfe9-e691-422e-916c-046601fb2a0b',
  'Date',
  'Tue, 16 Jun 2020 02:26:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key2159227440063508429=&apos;default&apos;</Where><MaxResults>1</MaxResults><Blobs><Blob><Name>blobname1159227440063507702</Name><ContainerName>container1159227439943806411</ContainerName><TagValue>default</TagValue></Blob></Blobs><NextMarker>2!308!MDAwMDQ1IWNvbnRhaW5lcjExNTkyMjc0Mzk5NDM4MDY0MTEBMDFENjQzODU5MTYzQTc3OSEwMDAwMjchYmxvYm5hbWUyMTU5MjI3NDQwMDk0MTA5MTYyITAwMDAxNSEIAAAABwAAAGRlZmF1bHQhMDAwMDAxITAhMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVohMDAwMDM2ITlmMGZhZDA2LTE4OWItNDk5OS05MTllLWZjZTk3MmQ0ODdiYyEwMDAwMjIha2V5MjE1OTIyNzQ0MDA2MzUwODQyOSE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e1be6f9f-e01e-0043-6585-43abfc000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '9a13b838-e15f-4dff-a978-cdfcb41f4912',
  'Date',
  'Tue, 16 Jun 2020 02:26:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Marker>2!308!MDAwMDQ1IWNvbnRhaW5lcjExNTkyMjc0Mzk5NDM4MDY0MTEBMDFENjQzODU5MTYzQTc3OSEwMDAwMjchYmxvYm5hbWUyMTU5MjI3NDQwMDk0MTA5MTYyITAwMDAxNSEIAAAABwAAAGRlZmF1bHQhMDAwMDAxITAhMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVohMDAwMDM2ITlmMGZhZDA2LTE4OWItNDk5OS05MTllLWZjZTk3MmQ0ODdiYyEwMDAwMjIha2V5MjE1OTIyNzQ0MDA2MzUwODQyOSE-</Marker><Where>key2159227440063508429=&apos;default&apos;</Where><MaxResults>1</MaxResults><Blobs><Blob><Name>blobname2159227440094109162</Name><ContainerName>container1159227439943806411</ContainerName><TagValue>default</TagValue></Blob></Blobs><NextMarker>2!308!MDAwMDQ1IWNvbnRhaW5lcjExNTkyMjc0Mzk5NDM4MDY0MTEBMDFENjQzODU5MTYzQTc3OSEwMDAwMjchYmxvYm5hbWUzMTU5MjI3NDQwMTIzNTA5MjY3ITAwMDAxNSEIAAAABwAAAGRlZmF1bHQhMDAwMDAxITAhMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVohMDAwMDM2ITcwMzQ0ZTI4LWNiYjctNDYwNi1iZDJmLWJkYzhiZjlmZWNlYSEwMDAwMjIha2V5MjE1OTIyNzQ0MDA2MzUwODQyOSE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e1be7082-e01e-0043-3c85-43abfc000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'e203e2b7-f526-41d6-9d51-22a179ef0641',
  'Date',
  'Tue, 16 Jun 2020 02:26:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Marker>2!308!MDAwMDQ1IWNvbnRhaW5lcjExNTkyMjc0Mzk5NDM4MDY0MTEBMDFENjQzODU5MTYzQTc3OSEwMDAwMjchYmxvYm5hbWUzMTU5MjI3NDQwMTIzNTA5MjY3ITAwMDAxNSEIAAAABwAAAGRlZmF1bHQhMDAwMDAxITAhMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVohMDAwMDM2ITcwMzQ0ZTI4LWNiYjctNDYwNi1iZDJmLWJkYzhiZjlmZWNlYSEwMDAwMjIha2V5MjE1OTIyNzQ0MDA2MzUwODQyOSE-</Marker><Where>key2159227440063508429=&apos;default&apos;</Where><MaxResults>1</MaxResults><Blobs><Blob><Name>blobname3159227440123509267</Name><ContainerName>container1159227439943806411</ContainerName><TagValue>default</TagValue></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e1be7137-e01e-0043-6a85-43abfc000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '990eeded-74c4-43ff-b59f-315879a40b74',
  'Date',
  'Tue, 16 Jun 2020 02:26:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container1159227439943806411')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e1be71f0-e01e-0043-1885-43abfc000000',
  'x-ms-client-request-id',
  'a72f6748-d11e-4449-9b06-98d71cabd224',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 16 Jun 2020 02:26:45 GMT'
]);
