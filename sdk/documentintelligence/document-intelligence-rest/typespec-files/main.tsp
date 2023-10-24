import "@typespec/rest";
import "@typespec/http";
import "@azure-tools/typespec-azure-core";
import "./routes.tsp";

using Azure.Core;
using TypeSpec.Versioning;
using TypeSpec.Rest;
using TypeSpec.Http;

@doc("Extracts content, layout, and structured data from documents.")
@versioned(Versions)
@useAuth(ApiKeyAuth<ApiKeyLocation.header, "Ocp-Apim-Subscription-Key">)
@service({title: "Document Intelligence"})
@server(
  "{endpoint}/formrecognizer",
  "Extracts content, layout, and structured data from documents.",
  {
    @doc("The Document Intelligence service endpoint.")
    endpoint: string,
  }
)
namespace DocumentIntelligence;

@doc("Service API versions.")
enum Versions {
  @useDependency(Azure.Core.Versions.v1_0_Preview_2)
  @doc("The 2022-08-31 version of the DocumentIntelligence service.")
  v2022_08_31: "2022-08-31",

  @useDependency(Azure.Core.Versions.v1_0_Preview_2)
  @doc("The 2023-07-31 version of the DocumentIntelligence service.")
  v2023_07_31: "2023-07-31",

  @useDependency(Azure.Core.Versions.v1_0_Preview_2)
  @doc("The 2023-10-31-preview version of the DocumentIntelligence service.")
  v2023_10_31_preview: "2023-10-31-preview",
}
