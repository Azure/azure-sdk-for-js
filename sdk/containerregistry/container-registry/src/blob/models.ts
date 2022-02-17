import { ContainerRegistryCreateManifestOptionalParams } from "../generated";

export interface UploadManifestOptions extends ContainerRegistryCreateManifestOptionalParams {
  tag?: string;
}
