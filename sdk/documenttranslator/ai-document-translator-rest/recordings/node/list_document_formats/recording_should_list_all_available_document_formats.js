let nock = require('nock');

module.exports.hash = "0ca3e29b892f5298b8efa775881d1dbb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/translator/text/batch/v1.0-preview.1/documents/formats')
  .reply(200, ["1f8b0800000000000400ad55514fc23010fe2f7d1586f8c8ab42349148842889e1a1ae3768ecd6a62d6386f0dfbd6e0c31ac5b35be6cd9eeeefbbededdbeed494ec516c8e86d4f12a9536ac988cc04e5d9020a4b7a24e102c68585cc709919cc2391c5c0aa476299e16bbbf85450beb7583050aed44573d075c5ead03b037f52902d53f12a356b8667322e9af0a95282c7d462e220cf582411a84845056cfa3249780c58bc4db12ada21bed232066378b64e45544742c4cd34184c2db99a452a65ff41a43ae34189e78f2132e7584099d90078265508f30f2acd370d8aace85ad56dad90f2634ab99862fbe91a9ad5a5661d222e454115622beb3d8a9b204933d706a3187177efee96396d1433a92d7d177077eccca40a342f084bba0e774cf1d22d1f1f2613df603bd10bc193e4aab838121946d7083a8c86e5f586fc245dcc5f3c5fbdc95d03b101de0662ac6f40514d2db07e692ca6f584b73eb218c97c2cc79817f499c71b675e6dd3d1b6b37fc7142f8d33b07a11bc46d645921ae7531d4bb703ad24cf6c902b057e51ea84da4a3e2e6208b299405a70789dd656b7d5ff0b922ce8a0921a6e4a773b99995ba16001dd1d974cfd51c8afccbe16d4390ac98246d1a0e7cce52fe4ac0e5fdc22565b28080000"], [
  'Cache-Control',
  'public,max-age=1',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'ETag',
  '"44A88B37BE223B6C068718250B179D652514ABB810E8DD9DCD271B2759493859"',
  'Retry-After',
  '1',
  'Vary',
  'Accept-Encoding',
  'X-RequestId',
  'dcee9cb2-e45a-47f0-bd44-0c38c03ed251',
  'Set-Cookie',
  'ARRAffinity=5dd610bbbfcdcce1e8b7e036dad4b7c92b91df5adc2f4b536e67d2a5eff0940e;Path=/;HttpOnly;Secure;Domain=doctrans.westus.microsofttranslator.com',
  'Set-Cookie',
  'ARRAffinitySameSite=5dd610bbbfcdcce1e8b7e036dad4b7c92b91df5adc2f4b536e67d2a5eff0940e;Path=/;HttpOnly;SameSite=None;Secure;Domain=doctrans.westus.microsofttranslator.com',
  'X-Powered-By',
  'ASP.NET',
  'apim-request-id',
  'dcee9cb2-e45a-47f0-bd44-0c38c03ed251',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 13 Apr 2021 00:01:09 GMT'
]);
