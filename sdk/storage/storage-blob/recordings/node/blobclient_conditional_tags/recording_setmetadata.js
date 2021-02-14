let nock = require('nock');

module.exports.hash = "2ef9d7e40b75f68c2b9c59d95b8a79c6";

module.exports.testInfo = {"uniqueName":{"container":"container159549959055404710","blob":"blob159549959084807740"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959055404710')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:49 GMT',
  'ETag',
  '"0x8D82EF1EE78839E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104292d1-901e-002b-42da-60cd6c000000',
  'x-ms-client-request-id',
  '3e419866-e289-483a-a7f8-8bd07083375c',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959055404710/blob159549959084807740', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:49 GMT',
  'ETag',
  '"0x8D82EF1EEA585E5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042930b-901e-002b-75da-60cd6c000000',
  'x-ms-client-request-id',
  'f7202301-cb1c-4607-a5dc-d30598e35d1a',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:19:49.8746341Z',
  'Date',
  'Thu, 23 Jul 2020 10:19:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959055404710/blob159549959084807740', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042935c-901e-002b-32da-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '1f129a4c-8f34-4a49-b96c-fd5b778d9848',
  'Date',
  'Thu, 23 Jul 2020 10:19:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959055404710/blob159549959084807740')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:10429372-901e-002b-42da-60cd6c000000\nTime:2020-07-23T10:19:50.4732996Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429372-901e-002b-42da-60cd6c000000',
  'x-ms-client-request-id',
  '056ea29e-a67d-4bd2-a598-429bc2408480',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Date',
  'Thu, 23 Jul 2020 10:19:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959055404710/blob159549959084807740')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:50 GMT',
  'ETag',
  '"0x8D82EF1EF2DBA92"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429394-901e-002b-56da-60cd6c000000',
  'x-ms-client-request-id',
  '157c4947-31eb-4919-926a-5ae30f8eae02',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-07-23T10:19:50.7682722Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 23 Jul 2020 10:19:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549959055404710')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104293b0-901e-002b-6fda-60cd6c000000',
  'x-ms-client-request-id',
  'f41f36ca-10d3-44ad-a99f-44422a21a0e6',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:51 GMT'
]);
