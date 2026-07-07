export const contentType: OperationParameter = {
    parameterPath: ["options", "contentType"],
    mapper: {
      defaultValue: "application/json",
      isConstant: true,
      serializedName: "Content-Type",
      type: {
        name: "String",
      },
    },
  };