// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a `CustomAIModel`. This is a full-replace operation: any optional property omitted from the request body is reset to its default value, or cleared if it has no default. To safely modify a subset of fields (e.g. `description`), perform a GET, modify the returned resource, and PUT it back using the returned ETag via the `If-Match` header. A PUT that changes the immutable `modelId` or `modelSourceResourceId` is rejected.
 *
 * @summary create or update a `CustomAIModel`. This is a full-replace operation: any optional property omitted from the request body is reset to its default value, or cleared if it has no default. To safely modify a subset of fields (e.g. `description`), perform a GET, modify the returned resource, and PUT it back using the returned ETag via the `If-Match` header. A PUT that changes the immutable `modelId` or `modelSourceResourceId` is rejected.
 * x-ms-original-file: 2026-09-02-preview/CustomAIModels_CreateOrUpdate.json
 */
async function createOrUpdateACustomAIModel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.customAIModels.createOrUpdate("rg1", "aimanager1", "custom-model1", {
    properties: {
      modelId: "Qwen/Qwen36-27B-private",
      baseModel: {
        id: "Qwen/Qwen3.6-27B",
        totalWeightSizeBytes: 64700000000,
        config: {
          architectures: ["Qwen3_5ForConditionalGeneration"],
          image_token_id: 248056,
          language_model_only: false,
          model_type: "qwen3_5",
          text_config: {
            attention_bias: false,
            attention_dropout: 0,
            attn_output_gate: true,
            bos_token_id: 248044,
            dtype: "bfloat16",
            eos_token_id: 248044,
            full_attention_interval: 4,
            head_dim: 256,
            hidden_act: "silu",
            hidden_size: 5120,
            initializer_range: 0.02,
            intermediate_size: 17408,
            layer_types: ["linear_attention", "linear_attention", "...", "full_attention"],
            linear_conv_kernel_dim: 4,
            linear_key_head_dim: 128,
            linear_num_key_heads: 16,
            linear_num_value_heads: 48,
            linear_value_head_dim: 128,
            mamba_ssm_dtype: "float32",
            max_position_embeddings: 262144,
            model_type: "qwen3_5_text",
            mtp_num_hidden_layers: 1,
            mtp_use_dedicated_embeddings: false,
            num_attention_heads: 24,
            num_hidden_layers: 64,
            num_key_value_heads: 4,
            output_gate_type: "swish",
            pad_token_id: null,
            partial_rotary_factor: 0.25,
            rms_norm_eps: 0.000001,
            rope_parameters: {
              mrope_interleaved: true,
              mrope_section: [11, 11, 10],
              partial_rotary_factor: 0.25,
              rope_theta: 10000000,
              rope_type: "default",
            },
            tie_word_embeddings: false,
            use_cache: true,
            vocab_size: 248320,
          },
          tie_word_embeddings: false,
          transformers_version: "4.57.1",
          video_token_id: 248057,
          vision_config: {
            deepstack_visual_indexes: [],
            depth: 27,
            hidden_act: "gelu_pytorch_tanh",
            hidden_size: 1152,
            in_channels: 3,
            initializer_range: 0.02,
            intermediate_size: 4304,
            model_type: "qwen3_5",
            num_heads: 16,
            num_position_embeddings: 2304,
            out_hidden_size: 5120,
            patch_size: 16,
            spatial_merge_size: 2,
            temporal_patch_size: 2,
          },
          vision_end_token_id: 248054,
          vision_start_token_id: 248053,
        },
      },
      modelSourceResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ContainerService/aiManagers/aimanager1/modelSources/foundry-private-source",
      description: "Custom Llama 2 7B model for our organization",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateACustomAIModel();
}

main().catch(console.error);
