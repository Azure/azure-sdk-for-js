let nock = require('nock');

module.exports.hash = "2ce21994968230234eaf0afb1c7651e4";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383028169908574","file":"file165383028196704139","testdir":"testdir165383028275608852"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028169908574')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:18:02 GMT',
  'ETag',
  '"0x8DA4175A89CD952"',
  'x-ms-request-id',
  '84b4a807-a01e-0003-685e-731608000000',
  'x-ms-client-request-id',
  'ad1d24fb-5091-4ab6-85f8-4580c14184cd',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:18:01 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028169908574/file165383028196704139')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:02 GMT',
  'ETag',
  '"0x8DA4175A8C7F3D8"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96da-201f-0000-565e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '883beea0-5bb5-465b-a6a4-4fb86e663294',
  'Date',
  'Sun, 29 May 2022 13:18:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383028169908574/file165383028196704139', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96db-201f-0000-575e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '7b56ef89-92db-405a-a1f7-a782a65eb715',
  'Date',
  'Sun, 29 May 2022 13:18:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383028169908574/file165383028196704139')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:03 GMT',
  'ETag',
  '"0x8DA4175A918BB9C"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '478a96dc-201f-0000-585e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'a93f2f1f-2a96-4503-91d2-3ed680f8d77a',
  'Date',
  'Sun, 29 May 2022 13:18:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028169908574/testdir165383028275608852')
  .query(true)
  .reply(400, {"error":{"code":"ExpiryNotSupportedForDirectory","message":"Set Expiry is not supported for a directory\nRequestId:478a96de-201f-0000-595e-73e568000000\nTime:2022-05-29T13:18:03.2687069Z"}}, [
  'Content-Length',
  '190',
  'Content-Type',
  'application/json;charset=utf-8',
  'x-ms-error-code',
  'ExpiryNotSupportedForDirectory',
  'x-ms-request-id',
  '478a96de-201f-0000-595e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'b8a6a6f4-265c-468e-8932-64170f3dac8a',
  'Date',
  'Sun, 29 May 2022 13:18:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383028169908574')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a809-a01e-0003-695e-731608000000',
  'x-ms-client-request-id',
  '02365838-a9e6-4ade-bd96-f23fb0586f2b',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:18:02 GMT'
]);
