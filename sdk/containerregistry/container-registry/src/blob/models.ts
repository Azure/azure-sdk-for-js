export {
  ContainerRegistryCreateManifestOptionalParams,
  ContainerRegistryBlobDeleteBlobOptionalParams,
  ContainerRegistryBlobGetBlobOptionalParams,
  ContainerRegistryDeleteManifestOptionalParams,
  ContainerRegistryBlobGetBlobResponse,
  ContainerRegistryBlobGetBlobHeaders,
  Manifest,
  OCIManifest,
  Descriptor,
  Annotations,
} from "../generated";

import { ContainerRegistryCreateManifestOptionalParams } from "../generated";

export interface UploadManifestOptions extends ContainerRegistryCreateManifestOptionalParams {
  tag?: string;
}
