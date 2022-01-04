let nock = require('nock');

module.exports.hash = "9ca13cbe2dd5355275437a98bb8a9142";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000', {"id":"00000000-0000-0000-0000-000000000000","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://contoso.com/sign-up","termsOfServiceUrl":"https://contoso.com/terms","privacyPolicyUrl":"https://contoso.com/privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}})
  .query(true)
  .reply(201, {"id":"00000000-0000-0000-0000-000000000000","status":"draft","reviewNotes":[],"costs":[{"amount":650,"currencyCode":"USD","billingFrequency":"once"},{"amount":1000,"currencyCode":"USD","billingFrequency":"monthly"}],"statusUpdatedDate":"2022-01-04T06:19:53.697+00:00","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://contoso.com/sign-up","termsOfServiceUrl":"https://contoso.com/terms","privacyPolicyUrl":"https://contoso.com/privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://smstestapp.communication.azure.com/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000',
  'Request-Context',
  'appId=',
  'MS-CV',
  'e1rMq+Af2UO6gTonz6yfRA.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '2917ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0B+fTYQAAAABTkR6d6BtCQKp/lcaTso0tTUlBMzAxMDAwMTA5MDMxADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 04 Jan 2022 06:19:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(200, {"id":"00000000-0000-0000-0000-000000000000","status":"draft","reviewNotes":[],"costs":[{"amount":650,"currencyCode":"USD","billingFrequency":"once"},{"amount":1000,"currencyCode":"USD","billingFrequency":"monthly"}],"statusUpdatedDate":"2022-01-04T06:19:53.697+00:00","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://contoso.com/sign-up","termsOfServiceUrl":"https://contoso.com/terms","privacyPolicyUrl":"https://contoso.com/privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '6cktp6spBUGak/tD0v2exw.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '1489ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0CufTYQAAAACQ08tL6aNDTJfjIs8NS0d0TUlBMzAxMDAwMTA5MDMxADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 04 Jan 2022 06:19:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(204, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'tzaIIk/ZqEOv0/V2WckOpg.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '544ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0C+fTYQAAAADfw4SGaNqhQp8x+vj+VbOBTUlBMzAxMDAwMTA5MDMxADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 04 Jan 2022 06:19:56 GMT'
]);
