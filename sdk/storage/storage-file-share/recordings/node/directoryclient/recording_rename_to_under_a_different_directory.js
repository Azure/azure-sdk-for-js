let nock = require('nock');

module.exports.hash = "c54a1daa9b2a9a5f18095017ceb1c1ac";

module.exports.testInfo = {"uniqueName":{"share":"share166538318463901159","dir":"dir166538318527903266","sourceParentdir":"sourceParentdir166538318545900313","sourcedir":"sourcedir166538318557003101","destParentdir":"destParentdir166538318568406260","destdir":"destdir166538318579708391"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166538318463901159')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 Oct 2022 06:26:25 GMT',
  'ETag',
  '"0x8DAAA885B8619C4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb03a224-d01a-0061-4071-dcc994000000',
  'x-ms-client-request-id',
  'fcb58569-678a-4f14-b4c0-6bb00d96f5a5',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Mon, 10 Oct 2022 06:26:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166538318463901159/dir166538318527903266')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 Oct 2022 06:26:25 GMT',
  'ETag',
  '"0x8DAAA885BAEFA07"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb03a228-d01a-0061-4171-dcc994000000',
  'x-ms-client-request-id',
  '9b4ec22b-6e98-44c1-b08f-d3d7d3114c01',
  'x-ms-version',
  '2021-08-06',
  'x-ms-file-change-time',
  '2022-10-10T06:26:25.6814599Z',
  'x-ms-file-last-write-time',
  '2022-10-10T06:26:25.6814599Z',
  'x-ms-file-creation-time',
  '2022-10-10T06:26:25.6814599Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 10 Oct 2022 06:26:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166538318463901159/sourceParentdir166538318545900313')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 Oct 2022 06:26:25 GMT',
  'ETag',
  '"0x8DAAA885BC2A66A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb03a22c-d01a-0061-4271-dcc994000000',
  'x-ms-client-request-id',
  'b6be6d6f-e724-429f-b874-071a9020cdbf',
  'x-ms-version',
  '2021-08-06',
  'x-ms-file-change-time',
  '2022-10-10T06:26:25.8103914Z',
  'x-ms-file-last-write-time',
  '2022-10-10T06:26:25.8103914Z',
  'x-ms-file-creation-time',
  '2022-10-10T06:26:25.8103914Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 10 Oct 2022 06:26:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166538318463901159/sourceParentdir166538318545900313/sourcedir166538318557003101')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 Oct 2022 06:26:25 GMT',
  'ETag',
  '"0x8DAAA885BD4092A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb03a22d-d01a-0061-4371-dcc994000000',
  'x-ms-client-request-id',
  'd4dc8ae0-495d-4aa6-b127-a9703819a979',
  'x-ms-version',
  '2021-08-06',
  'x-ms-file-change-time',
  '2022-10-10T06:26:25.9243306Z',
  'x-ms-file-last-write-time',
  '2022-10-10T06:26:25.9243306Z',
  'x-ms-file-creation-time',
  '2022-10-10T06:26:25.9243306Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '11529285414812647424',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 10 Oct 2022 06:26:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166538318463901159/destParentdir166538318568406260')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 Oct 2022 06:26:26 GMT',
  'ETag',
  '"0x8DAAA885BE4F6D5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb03a22e-d01a-0061-4471-dcc994000000',
  'x-ms-client-request-id',
  '984be65b-26b3-478c-a4e5-1d27bfcede00',
  'x-ms-version',
  '2021-08-06',
  'x-ms-file-change-time',
  '2022-10-10T06:26:26.0352725Z',
  'x-ms-file-last-write-time',
  '2022-10-10T06:26:26.0352725Z',
  'x-ms-file-creation-time',
  '2022-10-10T06:26:26.0352725Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '10376363910205800448',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 10 Oct 2022 06:26:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166538318463901159/destParentdir166538318568406260/destdir166538318579708391')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 Oct 2022 06:26:26 GMT',
  'ETag',
  '"0x8DAAA885C0635ED"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb03a22f-d01a-0061-4571-dcc994000000',
  'x-ms-client-request-id',
  'dd793c22-39f9-458c-93e0-b2b80d2149cf',
  'x-ms-version',
  '2021-08-06',
  'x-ms-file-change-time',
  '2022-10-10T06:26:26.2531565Z',
  'x-ms-file-last-write-time',
  '2022-10-10T06:26:25.9243306Z',
  'x-ms-file-creation-time',
  '2022-10-10T06:26:25.9243306Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '10376363910205800448',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 10 Oct 2022 06:26:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share166538318463901159/destParentdir166538318568406260/destdir166538318579708391')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 Oct 2022 06:26:26 GMT',
  'ETag',
  '"0x8DAAA885C0635ED"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb03a230-d01a-0061-4671-dcc994000000',
  'x-ms-client-request-id',
  '5d1f454d-97b4-498f-879c-aca37164a41b',
  'x-ms-version',
  '2021-08-06',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2022-10-10T06:26:26.2531565Z',
  'x-ms-file-last-write-time',
  '2022-10-10T06:26:25.9243306Z',
  'x-ms-file-creation-time',
  '2022-10-10T06:26:25.9243306Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '10376363910205800448',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 Oct 2022 06:26:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share166538318463901159/sourceParentdir166538318545900313/sourcedir166538318557003101')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:fb03a231-d01a-0061-4771-dcc994000000\nTime:2022-10-10T06:26:26.5079493Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb03a231-d01a-0061-4771-dcc994000000',
  'x-ms-client-request-id',
  'b19d613e-3f9e-43af-9826-d01a52757b8e',
  'x-ms-version',
  '2021-08-06',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 Oct 2022 06:26:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share166538318463901159')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb03a232-d01a-0061-4871-dcc994000000',
  'x-ms-client-request-id',
  'd815f9f3-d875-4a46-90d4-ac2d0ad1e04e',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Mon, 10 Oct 2022 06:26:25 GMT'
]);
