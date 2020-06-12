let nock = require('nock');

module.exports.hash = "467dd77f82dae27b49ab3ff9f7eb4d1a";

module.exports.testInfo = {"uniqueName":{"container":"container158459901915803807","blob":"blob158459901939705184"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901915803807')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:39 GMT',
  'ETag',
  '"0x8D7CBCE10432A33"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b94ce-701e-005c-53b6-fd8f9a000000',
  'x-ms-client-request-id',
  '300e06a0-b983-42d9-b330-86596cdb2022',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901915803807/blob158459901939705184', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:39 GMT',
  'ETag',
  '"0x8D7CBCE1067ED9C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e5946-b01e-0088-32b6-fd3fcb000000',
  'x-ms-client-request-id',
  '9e78241f-9eba-471d-8130-53b7fb76acb1',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:39.5162524Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901915803807/blob158459901939705184')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:39 GMT',
  'ETag',
  '"0x8D7CBCE108C6C31"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b95c3-701e-005c-2fb6-fd8f9a000000',
  'x-ms-client-request-id',
  '1c1821c9-3067-436f-b5e3-beab2f687a58',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:39.7574234Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><StorageServiceProperties><Logging><Version>1.0</Version><Read>false</Read><Write>false</Write><Delete>false</Delete><RetentionPolicy><Enabled>false</Enabled></RetentionPolicy></Logging><HourMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>7</Days></RetentionPolicy></HourMetrics><MinuteMetrics><Version>1.0</Version><Enabled>false</Enabled><RetentionPolicy><Enabled>false</Enabled></RetentionPolicy></MinuteMetrics><Cors><CorsRule><AllowedMethods>GET,PUT,POST,HEAD,DELETE,MERGE,OPTIONS,PATCH</AllowedMethods><AllowedOrigins>*</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>86400</MaxAgeInSeconds></CorsRule></Cors><DeleteRetentionPolicy><Enabled>true</Enabled><Days>7</Days></DeleteRetentionPolicy><StaticWebsite><Enabled>false</Enabled></StaticWebsite></StorageServiceProperties>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e5a0c-b01e-0088-5ab6-fd3fcb000000',
  'x-ms-client-request-id',
  'c3196b37-e0a2-40fb-974b-13e6643510f0',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459901915803807/blob158459901939705184')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b9705-701e-005c-4bb6-fd8f9a000000',
  'x-ms-client-request-id',
  'bd04df20-1404-45e0-adec-a5d6a690f58f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 19 Mar 2020 06:23:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158459901915803807/blob158459901939705184')
  .query(true)
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e5b01-b01e-0088-1eb6-fd3fcb000000',
  'x-ms-client-request-id',
  '97cdc424-d74f-4c65-8b6b-f87d28e12a5d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901915803807/blob158459901939705184')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b97c8-701e-005c-63b6-fd8f9a000000',
  'x-ms-client-request-id',
  '8d18edf6-a68f-4ecc-bfa6-2a51d2293d89',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158459901915803807/blob158459901939705184')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:39 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CBCE1067ED9C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e5bb6-b01e-0088-2fb6-fd3fcb000000',
  'x-ms-client-request-id',
  '622f9da6-5247-47ba-b205-5bb7b8926bb8',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-19T06:23:39.5162524Z',
  'x-ms-creation-time',
  'Thu, 19 Mar 2020 06:23:39 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459901915803807')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b98e1-701e-005c-33b6-fd8f9a000000',
  'x-ms-client-request-id',
  'f0ab8bd6-a524-4eb2-aee2-6f0e94349e8e',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:40 GMT'
]);
