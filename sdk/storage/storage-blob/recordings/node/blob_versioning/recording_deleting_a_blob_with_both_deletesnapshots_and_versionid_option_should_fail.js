let nock = require('nock');

module.exports.hash = "225342bc54f257faee0103248ddc59dd";

module.exports.testInfo = {"uniqueName":{"container":"container159218741823804712","blob":"blob159218741852503916"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218741823804712')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:58 GMT',
  'ETag',
  '"0x8D810D22E900975"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46f6ae-701e-006e-24bb-42188f000000',
  'x-ms-client-request-id',
  '588c2e07-8d36-49d9-b4bc-2a626167d421',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:16:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218741823804712/blob159218741852503916', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:58 GMT',
  'ETag',
  '"0x8D810D22EBBB11E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa9398-e01e-0021-03bb-4269db000000',
  'x-ms-client-request-id',
  'e2747464-382c-429f-8626-941f8395ea33',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:16:58.6154270Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218741823804712/blob159218741852503916')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:58 GMT',
  'ETag',
  '"0x8D810D22EE735D9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46f803-701e-006e-72bb-42188f000000',
  'x-ms-client-request-id',
  '997c9903-fa85-41dc-93ca-b59b3426cf02',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:16:58.9016297Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218741823804712/blob159218741852503916')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:58 GMT',
  'ETag',
  '"0x8D810D22EE735D9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa9463-e01e-0021-45bb-4269db000000',
  'x-ms-client-request-id',
  'db6380d1-d73a-463a-b04b-9040b972ba91',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-15T02:16:59.1908338Z',
  'x-ms-snapshot',
  '2020-06-15T02:16:59.1898338Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Mon, 15 Jun 2020 02:16:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218741823804712/blob159218741852503916')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidQueryParameterValue</Code><Message>Value for one of the query parameters specified in the request URI is invalid.\nRequestId:0f46f942-701e-006e-25bb-42188f000000\nTime:2020-06-15T02:16:59.4741506Z</Message><QueryParameterName>versionid</QueryParameterName><QueryParameterValue>2020-06-15T02:16:58.6154270Z</QueryParameterValue><Reason>This operation is only allowed on the root blob. Version id should not be provided.</Reason></Error>", [
  'Content-Length',
  '494',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46f942-701e-006e-25bb-42188f000000',
  'x-ms-client-request-id',
  '54d1f88d-aa1f-4a2d-830c-bd8e3c3c64c8',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'InvalidQueryParameterValue',
  'Date',
  'Mon, 15 Jun 2020 02:16:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218741823804712/blob159218741852503916')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidQueryParameterValue</Code><Message>Value for one of the query parameters specified in the request URI is invalid.\nRequestId:4bfa950c-e01e-0021-61bb-4269db000000\nTime:2020-06-15T02:16:59.7550179Z</Message><QueryParameterName>versionid</QueryParameterName><QueryParameterValue>2020-06-15T02:16:58.9016297Z</QueryParameterValue><Reason>This operation is only allowed on the root blob. Version id should not be provided.</Reason></Error>", [
  'Content-Length',
  '494',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa950c-e01e-0021-61bb-4269db000000',
  'x-ms-client-request-id',
  '65dfd122-faf8-4b95-9ee0-9b294023e53a',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'InvalidQueryParameterValue',
  'Date',
  'Mon, 15 Jun 2020 02:16:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218741823804712')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46faa5-701e-006e-02bb-42188f000000',
  'x-ms-client-request-id',
  '760feece-80cb-4118-90b0-8d52753fb831',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:16:59 GMT'
]);
