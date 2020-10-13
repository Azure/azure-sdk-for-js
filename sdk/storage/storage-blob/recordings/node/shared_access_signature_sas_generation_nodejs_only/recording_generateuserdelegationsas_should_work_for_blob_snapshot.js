let nock = require('nock');

module.exports.hash = "3b306e0dbe654c15df49dd0c3ca1d177";

module.exports.testInfo = {"uniqueName":{"container":"container160258360024207047","blob":"blob160258360052609781"},"newDate":{"now":"2020-10-13T10:06:39.490Z","tmr":"2020-10-13T10:06:39.490Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU4MzI5OSwibmJmIjoxNjAyNTgzMjk5LCJleHAiOjE2MDI2Njk5OTksImFpbyI6IkUyUmdZTERqVmc1NjRCcWhhYlpXK3RUcmJZWTJBQT09IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJFU0RzSXZnZzJrQ0VEWENURENZREFBIiwidmVyIjoiMS4wIn0.F15c63d7bZahRpel-4k2dAGx279ehjAhTGhY78bRw1sIBpjH-IcOY23ZeynUT2Q958JeHfXk2FMAmynxUbAaHVGFJx4rp-6-1rrQ4F57uhGKVQMkEwpIkMijEQ4kefYHUYYyuMhTI7rYfuWUDFkgTRkcGHh0TYlIlOS-yoF2O7Wb4OIiZoPrZeDS41ylDYU4farqhPpmLueIBrWr107Vm9RCbEpx5fR8OVUq8flEO5m6Qzgcz2066JHNDp33ZKatNSkVj0UIklwoPzNQoslVe3ne2dFF4EsqchNjam6t2xVdqTtGYvpkiOAsTsj2v6NtiJlA9miAc2ioQn8kemLBlA"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '22ec2011-20f8-40da-840d-70930c260300',
  'x-ms-ests-server',
  '2.1.11154.7 - EASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ato6duSMdw1BnT8_rEQbOWZ00ISJAQAAAC9zF9cOAAAA; expires=Thu, 12-Nov-2020 10:06:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 10:06:39 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T09:06:39Z</Start><Expiry>2020-10-14T10:06:39Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2020-10-13T09:06:39Z</SignedStart><SignedExpiry>2020-10-14T10:06:39Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>qyO2Fbb+hypzmtYXilzghvJsY70OloarL+hzEriW5kk=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c653-601e-002d-0f48-a179c2000000',
  'x-ms-client-request-id',
  '5664c334-4bae-444e-9881-b05bb23695c0',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:06:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258360024207047')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:06:40 GMT',
  'ETag',
  '"0x8D86F5FADF3AEDE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c65a-601e-002d-1548-a179c2000000',
  'x-ms-client-request-id',
  '2fa2ae3f-df56-4d4e-890a-4785c07be4c0',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:06:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258360024207047/blob160258360052609781')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:06:40 GMT',
  'ETag',
  '"0x8D86F5FAE1F1E4F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c662-601e-002d-1b48-a179c2000000',
  'x-ms-client-request-id',
  '4f668a6b-59af-42b3-ad76-101662a11e41',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-10-13T10:06:40.6776399Z',
  'Date',
  'Tue, 13 Oct 2020 10:06:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258360024207047/blob160258360052609781')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:06:40 GMT',
  'ETag',
  '"0x8D86F5FAE1F1E4F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c66c-601e-002d-2548-a179c2000000',
  'x-ms-client-request-id',
  '4d5f618f-c25b-46ae-b3a6-3a8cbf70651b',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-10-13T10:06:40.9688452Z',
  'x-ms-snapshot',
  '2020-10-13T10:06:40.9678452Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Tue, 13 Oct 2020 10:06:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160258360024207047/blob160258360052609781')
  .query(true)
  .reply(200, [], [
  'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '1024',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:06:40 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D86F5FAE1F1E4F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c674-601e-002d-2d48-a179c2000000',
  'x-ms-client-request-id',
  'a87f964d-3d6a-4957-8384-8098675618cf',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Tue, 13 Oct 2020 10:06:40 GMT',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 13 Oct 2020 10:06:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160258360024207047')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c67d-601e-002d-3448-a179c2000000',
  'x-ms-client-request-id',
  'cd1deccb-77a9-4a2a-a67d-1eadc51dd996',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:06:40 GMT'
]);
