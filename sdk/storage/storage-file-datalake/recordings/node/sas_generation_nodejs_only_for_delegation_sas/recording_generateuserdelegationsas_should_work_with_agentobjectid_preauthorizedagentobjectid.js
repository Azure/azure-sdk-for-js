let nock = require('nock');

module.exports.hash = "3989fdb0b96130e65077bdaf1ec162cc";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160119534928207862","directory":"directory160119535006806265","file":"file160119535129300958","newFile":"newFile160119535219701256"},"newDate":{"now":"2020-09-27T08:29:07.896Z","tmr":"2020-09-27T08:29:07.899Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-09-27T07:29:07Z</Start><Expiry>2020-10-02T08:29:07Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2020-09-27T07:29:07Z</SignedStart><SignedExpiry>2020-10-02T08:29:07Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>n7l+WyBU729HYlmsyySs+b1doLOdUjpiyNGwih71kdA=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a8db1f9-e01e-0088-4ba8-94a8a9000000',
  'x-ms-client-request-id',
  '94edd8a1-7450-4b2f-b1f4-a9f3b9972568',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 08:29:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119534928207862')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 08:29:09 GMT',
  'ETag',
  '"0x8D862BF680168AD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a8db24b-e01e-0088-7ba8-94a8a9000000',
  'x-ms-client-request-id',
  '116e3845-066b-48f9-8860-015fd152ec8f',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 08:29:09 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119534928207862/directory160119535006806265')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 08:29:11 GMT',
  'ETag',
  '"0x8D862BF68EA46EC"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4e38adcf-201f-0001-80a8-94127c000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'b9e61ccd-859d-4ac2-8e77-373c75e355e0',
  'Date',
  'Sun, 27 Sep 2020 08:29:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119534928207862/directory160119535006806265/file160119535129300958')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 08:29:11 GMT',
  'ETag',
  '"0x8D862BF692346C1"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4e38add0-201f-0001-01a8-94127c000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '13bc96e3-4e77-4654-aafc-f4410bcb5eb3',
  'Date',
  'Sun, 27 Sep 2020 08:29:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160119534928207862/%2F')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 08:29:09 GMT',
  'ETag',
  '"0x8D862BF682FEFE2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '4e38add2-201f-0001-03a8-94127c000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'b3bc8ae1-c329-4c40-972a-8344e7638b0c',
  'Date',
  'Sun, 27 Sep 2020 08:29:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119534928207862/newFile160119535219701256')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 08:29:12 GMT',
  'ETag',
  '"0x8D862BF69C60FD2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4e38add4-201f-0001-05a8-94127c000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '8ad6f1e6-ebc3-490a-a66c-43a44547afe3',
  'Date',
  'Sun, 27 Sep 2020 08:29:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119534928207862/newFile160119535219701256')
  .query(true)
  .reply(403, {"error":{"code":"AuthorizationPermissionMismatch","message":"This request is not authorized to perform this operation using this permission.\nRequestId:4e38add5-201f-0001-06a8-94127c000000\nTime:2020-09-27T08:29:12.9183732Z"}}, [
  'Content-Length',
  '227',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'x-ms-request-id',
  '4e38add5-201f-0001-06a8-94127c000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '081286cf-8a72-4c92-8ae4-ca8c9a2b7891',
  'Date',
  'Sun, 27 Sep 2020 08:29:12 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119534928207862/newFile160119535219701256')
  .query(true)
  .reply(409, {"error":{"code":"PathAlreadyExists","message":"The specified path already exists.\nRequestId:4e38add6-201f-0001-07a8-94127c000000\nTime:2020-09-27T08:29:13.2576143Z"}}, [
  'Content-Length',
  '168',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'PathAlreadyExists',
  'x-ms-request-id',
  '4e38add6-201f-0001-07a8-94127c000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '0dbc702c-fb99-41c3-bbda-16eddd89e264',
  'Date',
  'Sun, 27 Sep 2020 08:29:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160119534928207862')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a8db511-e01e-0088-44a8-94a8a9000000',
  'x-ms-client-request-id',
  'b0b4dd4a-93cd-4dde-88e7-d15c2271455d',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 08:29:13 GMT'
]);
