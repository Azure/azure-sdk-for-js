// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface PathsMaorw9DeploymentsDeploymentIdCompletionsPostResponses200ContentApplicationJsonSchemaOutput {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<Post200ApplicationJsonPropertiesItemsItemOutput>;
  usage?: Paths1Phq6SvDeploymentsDeploymentIdCompletionsPostResponses200ContentApplicationJsonSchemaPropertiesUsageOutput;
}

export interface Post200ApplicationJsonPropertiesItemsItemOutput {
  text?: string;
  index?: number;
  logprobs?: PostResponses200ContentApplicationJsonSchemaChoicesItemLogprobsOutput;
  finish_reason?: string;
}

export interface PostResponses200ContentApplicationJsonSchemaChoicesItemLogprobsOutput {
  tokens?: Array<string>;
  token_logprobs?: Array<number>;
  top_logprobs?: Array<Record<string, number>>;
  text_offset?: Array<number>;
}

export interface Paths1Phq6SvDeploymentsDeploymentIdCompletionsPostResponses200ContentApplicationJsonSchemaPropertiesUsageOutput {
  completion_tokens: number;
  prompt_tokens: number;
  total_tokens: number;
}

export interface ErrorResponseOutput {
  error?: ErrorResponseErrorOutput;
}

export interface ErrorResponseErrorOutput {
  code?: string;
  message?: string;
  param?: string;
  type?: string;
}

export interface Paths15Cw454DeploymentsDeploymentIdEmbeddingsPostResponses200ContentApplicationJsonSchemaOutput {
  object: string;
  model: string;
  data: Array<
    Paths1Xmf2L5DeploymentsDeploymentIdEmbeddingsPostResponses200ContentApplicationJsonSchemaPropertiesDataItemsOutput
  >;
  usage: Paths18Tiy9VDeploymentsDeploymentIdEmbeddingsPostResponses200ContentApplicationJsonSchemaPropertiesUsageOutput;
}

export interface Paths1Xmf2L5DeploymentsDeploymentIdEmbeddingsPostResponses200ContentApplicationJsonSchemaPropertiesDataItemsOutput {
  index: number;
  object: string;
  embedding: Array<number>;
}

export interface Paths18Tiy9VDeploymentsDeploymentIdEmbeddingsPostResponses200ContentApplicationJsonSchemaPropertiesUsageOutput {
  prompt_tokens: number;
  total_tokens: number;
}

export interface Paths1H0F83DeploymentsDeploymentIdChatCompletionsPostResponses200ContentApplicationJsonSchemaOutput {
  id: string;
  object: string;
  created: string;
  model: string;
  choices: Array<
    Paths1G4Sf52DeploymentsDeploymentIdChatCompletionsPostResponses200ContentApplicationJsonSchemaPropertiesChoicesItemsOutput
  >;
  usage?: Paths1XcvledDeploymentsDeploymentIdChatCompletionsPostResponses200ContentApplicationJsonSchemaPropertiesUsageOutput;
}

export interface Paths1G4Sf52DeploymentsDeploymentIdChatCompletionsPostResponses200ContentApplicationJsonSchemaPropertiesChoicesItemsOutput {
  index?: number;
  message?: PostResponses200ContentApplicationJsonSchemaChoicesItemMessageOutput;
  finish_reason?: string;
}

export interface PostResponses200ContentApplicationJsonSchemaChoicesItemMessageOutput {
  /** The role of the author of this message. */
  role: "system" | "user" | "assistant";
  /** The contents of the message */
  content: string;
}

export interface Paths1XcvledDeploymentsDeploymentIdChatCompletionsPostResponses200ContentApplicationJsonSchemaPropertiesUsageOutput {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}
