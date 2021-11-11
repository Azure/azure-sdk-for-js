let nock = require('nock');

module.exports.hash = "4e55c47a99196e4e3af52b6933d5c709";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/translator/text/batch/v1.0-preview.1/documents/formats')
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd179552fb2f6a3471fbd2cb362f9267fd77e34fae8bc28f3d3776dbe6c8a6ad950bb8fc62d7df1fdd147d36a491fb76fae57397fded20b77577815df5ee6b579e3fbbf64e401ff72952f7fef45f9ddaa9ec5c1cfaae93b40e8c2cf56abb298662d35bc7bb99c8d2b02f46e510ae066bb3a3f2fa639bdbc5ed05be32b82bfaaab69de34c5f26251022c7f03d03721f7b2ce1b6aca7dc5915cadda6f00c995d70fa1e8ff09e037a1f99a5ec866cd3ccf0766ea5dd97c035836ae1b42927f02e83076ebb6acaab75f6445f905913fbbc8e3d82d9a0bc0b909b905212410d17ab0d76f1372cfa893785f73fa96bec14f40e9f6c9bc4bdf95f872b08b9755dd6693327faa9479265f443b5ccdce01abdb913f386d32d8ddeffdfcecd9b338f47725bfba09fabbb2383fff8466150dbd3e3eda1def10d0ddf12effbbf751d8e99bd73f499f47ba6c9b4bfa624c0400c06ecf4c40fa6ebbc957599db5f96c9b154b83c65eef616727439d4da9337a31da8b7e3708f455319d43796d9a9dbabd917eda64b01b2830c308f14e4880006153278b067a0aad06fb79595de5f5aa2a96edadb412606dea51256a65a1e285c1ce4fdf4df35ba91940b945b739e0a1ed608f506d86ac98c5788fd58cf1bea9c72a6b8a86b51bcd05831c8385f0eaad10b899e2d56c05685f031122aa834d206e85d08d5351cd6e3515117c3c2d0f0883e87c91d56f67d5d5003d16eedbf1c2fef276263f61f1f117ff98e99733f813f20be6867eaba921a1d01d04bebebb701df0dfefb6bb9fdcec827cc19a3e8ebf7e855f00a38bc3420cdaddfa7c7ab0b7470d7dca122ec522cfeae9bcb8841d5aaccbb62075d8deadf3123a111003acbeff4bfe1fcbaf37dc81090000"], [
  'Cache-Control',
  'public,max-age=1',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'ETag',
  '"CB8FBF9A3D8400AA4D3EB0110E3326A55B1FAB2687669E272DA4FF14FA88FE59"',
  'Retry-After',
  '1',
  'Vary',
  'Accept-Encoding',
  'X-RequestId',
  '759ee7ae-e3ba-4d30-9960-6b86e6bc6541',
  'Set-Cookie',
  'ARRAffinity=53f4a96b1c4fe0ee3118f9ad5503cc06fc63377ccfde033e0776e5f7ac42f04d;Path=/;HttpOnly;Secure;Domain=doctrans.westus.microsofttranslator.com',
  'Set-Cookie',
  'ARRAffinitySameSite=53f4a96b1c4fe0ee3118f9ad5503cc06fc63377ccfde033e0776e5f7ac42f04d;Path=/;HttpOnly;SameSite=None;Secure;Domain=doctrans.westus.microsofttranslator.com',
  'X-Powered-By',
  'ASP.NET',
  'apim-request-id',
  '759ee7ae-e3ba-4d30-9960-6b86e6bc6541',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Nov 2021 17:24:46 GMT'
]);
