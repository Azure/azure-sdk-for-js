let nock = require('nock');

module.exports.hash = "61fbe042ef8542ff297bd6eedca77156";

module.exports.testInfo = {"uniqueName":{"share":"share167749052400506359","dir":"dir167749052430303966","dir167749052430303966":"dir167749052430303966167749052460308973"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052400506359')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:24 GMT',
  'ETag',
  '"0x8DB18A5F3EA168A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb29d-101a-0070-1b8e-4a9c5e000000',
  'x-ms-client-request-id',
  '7c4134b0-3614-4f67-a874-267218da4b48',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052400506359/dir167749052430303966')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:24 GMT',
  'ETag',
  '"0x8DB18A5F41893B2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb29f-101a-0070-1c8e-4a9c5e000000',
  'x-ms-client-request-id',
  '475f9e9c-0512-46b3-aa25-967a77c09f5b',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:24.6978994Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:24.6978994Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:24.6978994Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:35:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749052400506359/dir167749052430303966167749052460308973')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:a17cb2a1-101a-0070-1e8e-4a9c5e000000\nTime:2023-02-27T09:35:25.0268916Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2a1-101a-0070-1e8e-4a9c5e000000',
  'x-ms-client-request-id',
  '5ee5449c-f993-49c6-b67d-cea137cbf758',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Mon, 27 Feb 2023 09:35:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052400506359/dir167749052430303966167749052460308973')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:25 GMT',
  'ETag',
  '"0x8DB18A5F4780ACB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2a2-101a-0070-1f8e-4a9c5e000000',
  'x-ms-client-request-id',
  '56241dcf-6a84-4520-9629-3063e0ab555e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:25.3235403Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:25.3235403Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:25.3235403Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:35:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749052400506359/dir167749052430303966167749052460308973')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2a5-101a-0070-208e-4a9c5e000000',
  'x-ms-client-request-id',
  '3a3fb091-f0a5-47de-af27-46fa70802574',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749052400506359')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2a8-101a-0070-238e-4a9c5e000000',
  'x-ms-client-request-id',
  'd2b0745c-f83b-47fe-b8c2-c567575a1dd0',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:25 GMT'
]);
