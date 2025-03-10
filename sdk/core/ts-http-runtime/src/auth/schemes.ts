export interface BasicAuthScheme {
  type: "http";
  scheme: "basic";
}

export interface BearerAuthScheme {
  type: "http";
  scheme: "bearer";
}

export interface NoAuthAuthScheme {
  type: "noAuth";
}

export interface ApiKeyAuthScheme {
  type: "apiKey";
  apiKeyLocation: "query" | "header" | "cookie";
  name: string;
}

export interface AuthorizationCodeFlow {
  type: "authorizationCode";
  authorizationUrl: string;
  tokenUrl: string;
  refreshUrl?: string;
  scopes?: string[];
}

export interface ClientCredentialsFlow {
  type: "clientCredentials";
  tokenUrl: string;
  refreshUrl?: string[];
  scopes?: string[];
}

export interface ImplicitFlow {
  type: "implicit",
  authorizationUrl: string;
  refreshUrl?: string;
  scopes?: string[];
}

export interface PasswordFlow {
  type: "password";
  tokenUrl: string;
  refreshUrl?: string;
  scopes?: string[];
}

// TODO add other OAuth2 Flow(s) as necessary

export type OAuth2Flow = AuthorizationCodeFlow | ClientCredentialsFlow | ImplicitFlow | PasswordFlow;

export interface OAuth2AuthScheme<TFlows extends OAuth2Flow[]> {
  type: "oauth2";
  flows: TFlows;
}

export type AuthScheme =
  | BasicAuthScheme
  | BearerAuthScheme
  | NoAuthAuthScheme
  | ApiKeyAuthScheme
  | OAuth2AuthScheme<OAuth2Flow[]>;
