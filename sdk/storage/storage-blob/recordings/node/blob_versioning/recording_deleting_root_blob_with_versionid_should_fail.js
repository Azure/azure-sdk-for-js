let nock = require('nock');

module.exports.hash = "9a28f69321d9c4b6cfcebf3390e1a80c";

module.exports.testInfo = {"uniqueName":{"container":"container159218741047501233","blob":"blob159218741076107981"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218741047501233')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:50 GMT',
  'ETag',
  '"0x8D810D229EF6918"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46e417-701e-006e-25bb-42188f000000',
  'x-ms-client-request-id',
  '07faf14b-80cf-40f8-9330-8ffee8b71bd3',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:16:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218741047501233/blob159218741076107981', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:50 GMT',
  'ETag',
  '"0x8D810D22A1B61A8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46e4ce-701e-006e-55bb-42188f000000',
  'x-ms-client-request-id',
  '94da0e4d-53a1-497e-b7dc-6bebab66765e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:16:50.8539304Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218741047501233/blob159218741076107981')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:51 GMT',
  'ETag',
  '"0x8D810D22A470D70"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46e568-701e-006e-65bb-42188f000000',
  'x-ms-client-request-id',
  '44a035eb-6f84-4790-a69b-315ace9444a4',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:16:51.1411328Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218741047501233/blob159218741076107981')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46e622-701e-006e-18bb-42188f000000',
  'x-ms-client-request-id',
  'ed32e2ff-4c64-4876-bdc8-f4788e28f83f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 15 Jun 2020 02:16:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159218741047501233/blob159218741076107981')
  .query(true)
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46e699-701e-006e-0cbb-42188f000000',
  'x-ms-client-request-id',
  'e20bac05-fb0c-46fc-ae96-29078ae643ad',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 15 Jun 2020 02:16:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218741047501233/blob159218741076107981')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>OperationNotAllowedOnRootBlob</Code><Message>The specified operation is not allowed on root blob.\nRequestId:0f46e738-701e-006e-26bb-42188f000000\nTime:2020-06-15T02:16:52.0248087Z</Message></Error>", [
  'Content-Length',
  '250',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46e738-701e-006e-26bb-42188f000000',
  'x-ms-client-request-id',
  'f448770f-7560-4883-8564-ac132b1a3027',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'OperationNotAllowedOnRootBlob',
  'Date',
  'Mon, 15 Jun 2020 02:16:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218741047501233')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46e7ef-701e-006e-54bb-42188f000000',
  'x-ms-client-request-id',
  'f22245bf-dff2-4965-94e8-77150ebb0a6c',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:16:51 GMT'
]);
