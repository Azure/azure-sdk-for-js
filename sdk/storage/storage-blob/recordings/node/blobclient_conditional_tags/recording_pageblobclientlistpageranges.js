let nock = require('nock');

module.exports.hash = "c2fea81b57f3fac3359f1771fa736eab";

module.exports.testInfo = {"uniqueName":{"container":"container164933925381206671","blob":"blob164933925526709884","pageBlob":"pageBlob164933925586203653"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933925381206671')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:35 GMT',
  'ETag',
  '"0x8DA189D2C007CB4"',
  'x-ms-request-id',
  '06497dfe-b01e-0009-3c86-4a3c4a000000',
  'x-ms-client-request-id',
  '4d8da448-5a8d-4994-ab24-c60cfb6a88e8',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Thu, 07 Apr 2022 13:47:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933925381206671/blob164933925526709884', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:35 GMT',
  'ETag',
  '"0x8DA189D2C331571"',
  'x-ms-request-id',
  '06497e01-b01e-0009-3d86-4a3c4a000000',
  'x-ms-client-request-id',
  'ea7b5083-1106-4cad-a5fe-c848986ea2f3',
  'x-ms-version',
  '2021-04-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 07 Apr 2022 13:47:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933925381206671/blob164933925526709884', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'x-ms-request-id',
  '06497e02-b01e-0009-3e86-4a3c4a000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  '2c6035f0-a6bf-43f2-b65b-67a781927b77',
  'Date',
  'Thu, 07 Apr 2022 13:47:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933925381206671/pageBlob164933925586203653')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:36 GMT',
  'ETag',
  '"0x8DA189D2C8D6BCB"',
  'x-ms-request-id',
  '06497e03-b01e-0009-3f86-4a3c4a000000',
  'x-ms-client-request-id',
  'a95817a4-ec3a-448d-ba3b-ff686b235ef0',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 07 Apr 2022 13:47:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164933925381206671/pageBlob164933925586203653')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:06497e04-b01e-0009-4086-4a3c4a000000\nTime:2022-04-07T13:47:36.5498243Z</Message></Error>", [
  'Content-Length',
  '253',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'x-ms-error-code',
  'ConditionNotMet',
  'x-ms-request-id',
  '06497e04-b01e-0009-4086-4a3c4a000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  '7ab55a49-10ac-40fa-9a20-b47bbcaf44ed',
  'Date',
  'Thu, 07 Apr 2022 13:47:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164933925381206671/pageBlob164933925586203653')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<PageList/>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:36 GMT',
  'ETag',
  '"0x8DA189D2C8D6BCB"',
  'Vary',
  'Origin',
  'x-ms-blob-content-length',
  '512',
  'x-ms-request-id',
  '06497e05-b01e-0009-4186-4a3c4a000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  'bad22416-98dc-42d0-89d1-46308bbe3366',
  'Date',
  'Thu, 07 Apr 2022 13:47:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164933925381206671')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '06497e06-b01e-0009-4286-4a3c4a000000',
  'x-ms-client-request-id',
  '4a9b3e3f-e32c-48df-b652-d05fafcf885a',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Thu, 07 Apr 2022 13:47:36 GMT'
]);
