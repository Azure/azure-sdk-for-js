# Release History

## 1.0.0-beta.4 (Unreleased)

### Added

- `SmsClient` added a constructor that supports `TokenCredential`.

### Breaking Changes

- `SendRequest` renamed to `SmsSendRequest`.
- `SendOptions` renamed to `SmsSendOptions` and now has an additional field `tag` to add a custom tag to delivery reports (when enabled).
- `send` no longer returns `RestResponse`, now returns an array of `SmsSendResults`. This contains fields to validate success/failure of each sent message.

## 1.0.0-beta.3 (2020-11-16)

Updated `@azure/communication-sms` version.

## 1.0.0-beta.2 (2020-10-06)

Updated `@azure/communication-sms` version.

## 1.0.0-beta.1 (2020-09-22)

The first preview of the Azure Communication Sms Client has the following features:

- send a SMS message from an acquired phone number.
- optionally enable delivery reports.
