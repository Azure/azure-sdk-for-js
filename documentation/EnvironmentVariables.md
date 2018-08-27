## Environment Variables Setup

```bash
export AZURE_SUBSCRIPTION_ID=<A Guid>
export CLIENT_ID=<A Guid> # Application Id provided by Azure Active Directory (SPN for service principal auth)
export DOMAIN=<A Guid or the domain name of your org> contosoCorp.com
export AZURE_USERNAME=<Your org-id user name> user@contosoCorp.com # Only set this if you are using user authentication
export AZURE_PASSWORD=<Your Password> # Only set this if you are using user authentication
export APPLICATION_SECRET=<Your service principal password or secret> # Only set this if you are using service principal auth
export NOCK_OFF=true
export AZURE_NOCK_RECORD=
```