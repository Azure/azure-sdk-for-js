let nock = require('nock');

module.exports.hash = "225342bc54f257faee0103248ddc59dd";

module.exports.testInfo = {"uniqueName":{"container":"container158511669236805116","blob":"blob158511669646200888"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158511669236805116')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 25 Mar 2020 06:11:36 GMT',
  'ETag',
  '"0x8D7D08360141C11"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5866e7db-301e-000f-566c-02f352000000',
  'x-ms-client-request-id',
  'b7c3b932-dcd6-4e44-8cd6-e64865a984f0',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 25 Mar 2020 06:11:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158511669236805116/blob158511669646200888', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 25 Mar 2020 06:11:37 GMT',
  'ETag',
  '"0x8D7D08360A37E50"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5866e856-301e-000f-446c-02f352000000',
  'x-ms-client-request-id',
  'c042277d-609f-414b-a596-e6034624a489',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-25T06:11:37.6845161Z',
  'Date',
  'Wed, 25 Mar 2020 06:11:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158511669236805116/blob158511669646200888')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 25 Mar 2020 06:11:40 GMT',
  'ETag',
  '"0x8D7D083627119AE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5866e90f-301e-000f-6b6c-02f352000000',
  'x-ms-client-request-id',
  '5e503553-0e09-45be-9b31-feb74f0c8777',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-25T06:11:40.7097022Z',
  'Date',
  'Wed, 25 Mar 2020 06:11:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158511669236805116/blob158511669646200888')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 25 Mar 2020 06:11:40 GMT',
  'ETag',
  '"0x8D7D083627119AE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5866e920-301e-000f-786c-02f352000000',
  'x-ms-client-request-id',
  '3587b8b4-f8d1-4ec9-9d35-49570198205e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-25T06:11:41.0089164Z',
  'x-ms-snapshot',
  '2020-03-25T06:11:41.0079164Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Wed, 25 Mar 2020 06:11:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158511669236805116/blob158511669646200888')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidQueryParameterValue</Code><Message>Value for one of the query parameters specified in the request URI is invalid.\nRequestId:5866e932-301e-000f-066c-02f352000000\nTime:2020-03-25T06:11:41.2891209Z</Message><QueryParameterName>versionid</QueryParameterName><QueryParameterValue>2020-03-25T06:11:37.6845161Z</QueryParameterValue><Reason>This operation is only allowed on the root blob. Version id should not be provided.</Reason></Error>", [
  'Content-Length',
  '494',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5866e932-301e-000f-066c-02f352000000',
  'x-ms-client-request-id',
  'c399a343-f3f5-47d0-aa1a-efa9f8374633',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'InvalidQueryParameterValue',
  'Date',
  'Wed, 25 Mar 2020 06:11:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158511669236805116/blob158511669646200888')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidQueryParameterValue</Code><Message>Value for one of the query parameters specified in the request URI is invalid.\nRequestId:5866e94f-301e-000f-186c-02f352000000\nTime:2020-03-25T06:11:41.5833335Z</Message><QueryParameterName>versionid</QueryParameterName><QueryParameterValue>2020-03-25T06:11:40.7097022Z</QueryParameterValue><Reason>This operation is only allowed on the root blob. Version id should not be provided.</Reason></Error>", [
  'Content-Length',
  '494',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5866e94f-301e-000f-186c-02f352000000',
  'x-ms-client-request-id',
  'eb7f104d-7dde-4a87-816f-af32f6db306e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'InvalidQueryParameterValue',
  'Date',
  'Wed, 25 Mar 2020 06:11:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158511669236805116')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5866e963-301e-000f-286c-02f352000000',
  'x-ms-client-request-id',
  'c69694de-4765-4d24-be1e-4643fdd46a73',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 25 Mar 2020 06:11:41 GMT'
]);
