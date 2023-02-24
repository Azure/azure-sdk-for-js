let nock = require('nock');

module.exports.hash = "6155c8aacaeb1dda6fc735d2d935b062";

module.exports.testInfo = {"uniqueName":{"share":"share167747853962407195","dir":"dir167747853988108001","file":"file167747854014304657","copiedfile":"copiedfile167747854040005583"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853962407195')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:40 GMT',
  'ETag',
  '"0x8DB188A0CBCAB8B"',
  'x-ms-request-id',
  '1775e992-e01a-0001-0b72-4a1b65000000',
  'x-ms-client-request-id',
  '94836f9d-d850-4119-b0ce-18fc2ed7eb05',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853962407195/dir167747853988108001....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:40 GMT',
  'ETag',
  '"0x8DB188A0CE5DD71"',
  'x-ms-request-id',
  '1775e994-e01a-0001-0c72-4a1b65000000',
  'x-ms-client-request-id',
  '0ace2a3d-ff57-4491-ad56-6d5bb78d3052',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:40.4001649Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:40.4001649Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:40.4001649Z',
  'x-ms-file-permission-key',
  '13895902193744473398*5510371786133343095',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853962407195/dir167747853988108001..../file167747854014304657....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:40 GMT',
  'ETag',
  '"0x8DB188A0D0CC667"',
  'x-ms-request-id',
  '1775e995-e01a-0001-0d72-4a1b65000000',
  'x-ms-client-request-id',
  'f602b4ca-2b69-4f0b-81c1-fc3a160b5d38',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:40.6551655Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:40.6551655Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:40.6551655Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853962407195/dir167747853988108001..../copiedfile167747854040005583...')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:41 GMT',
  'ETag',
  '"0x8DB188A0D42A3DE"',
  'x-ms-request-id',
  '1775e996-e01a-0001-0e72-4a1b65000000',
  'x-ms-client-request-id',
  'cfd66dd6-4cac-4833-bd70-664e70c269d7',
  'x-ms-version',
  '2022-11-02',
  'x-ms-copy-id',
  'cc725c89-27c6-4564-851e-b08d2eab7e99',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 27 Feb 2023 06:15:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853962407195/dir167747853988108001..../copiedfile167747854040005583...')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:1775e998-e01a-0001-0f72-4a1b65000000\nTime:2023-02-27T06:15:42.3213006Z</Message></Error>", [
  'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '1775e998-e01a-0001-0f72-4a1b65000000',
  'x-ms-client-request-id',
  '2556cacc-5e22-45aa-bd13-2b5d07e41680',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Mon, 27 Feb 2023 06:15:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747853962407195')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e999-e01a-0001-1072-4a1b65000000',
  'x-ms-client-request-id',
  'ee1b4707-2c0c-4c29-8e40-456c574c5317',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:42 GMT'
]);
