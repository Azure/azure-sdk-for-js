let nock = require('nock');

module.exports.hash = "a8c1614d9192eeeb80b61ab33c7f68db";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383028005109886","file":"file165383028032200022","testdir":"testdir165383028115305473"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028005109886')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:18:00 GMT',
  'ETag',
  '"0x8DA4175A7A1ABF9"',
  'x-ms-request-id',
  '84b4a804-a01e-0003-665e-731608000000',
  'x-ms-client-request-id',
  '295d5b7c-7390-46ee-99e7-03f650e24502',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:59 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028005109886/file165383028032200022')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:00 GMT',
  'ETag',
  '"0x8DA4175A7D2BE5F"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96d6-201f-0000-525e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '79fc762c-87c4-4563-a984-10fa4b9250a3',
  'Date',
  'Sun, 29 May 2022 13:18:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383028005109886/file165383028032200022', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96d7-201f-0000-535e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'c16a4198-c7ad-417e-b68b-b46faf133924',
  'Date',
  'Sun, 29 May 2022 13:18:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383028005109886/file165383028032200022')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:01 GMT',
  'ETag',
  '"0x8DA4175A8240969"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '478a96d8-201f-0000-545e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '4caca499-ac6c-479f-9d67-11839b510c64',
  'Date',
  'Sun, 29 May 2022 13:18:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028005109886/testdir165383028115305473')
  .query(true)
  .reply(400, {"error":{"code":"ExpiryNotSupportedForDirectory","message":"Set Expiry is not supported for a directory\nRequestId:478a96d9-201f-0000-555e-73e568000000\nTime:2022-05-29T13:18:01.6666518Z"}}, [
  'Content-Length',
  '190',
  'Content-Type',
  'application/json;charset=utf-8',
  'x-ms-error-code',
  'ExpiryNotSupportedForDirectory',
  'x-ms-request-id',
  '478a96d9-201f-0000-555e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '48a2acb2-5d16-44e7-a6e6-ea84ca9aef84',
  'Date',
  'Sun, 29 May 2022 13:18:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383028005109886')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a806-a01e-0003-675e-731608000000',
  'x-ms-client-request-id',
  '59da8a83-11a4-4bc6-9539-801bb9b8edca',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:18:01 GMT'
]);
