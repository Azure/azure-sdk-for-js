// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
const internalMappers: any = {};

internalMappers.SimpleProduct = {
  type: {
    name: "Composite",
    className: "SimpleProduct",
    modelProperties: {
      id: {
        serializedName: "id",
        constraints: {},
        required: true,
        type: {
          name: "Number"
        }
      },
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      maxProductDisplayName: {
        serializedName: "details.max_product_display_name",
        type: {
          name: "String"
        }
      },
      capacity: {
        defaultValue: "Large",
        isConstant: true,
        serializedName: "details.max_product_capacity",
        type: {
          name: "String"
        }
      }
    }
  }
};

internalMappers.SimpleProductConstFirst = {
  type: {
    name: "Composite",
    className: "SimpleProduct",
    modelProperties: {
      id: {
        serializedName: "id",
        constraints: {},
        required: true,
        type: {
          name: "Number"
        }
      },
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      capacity: {
        defaultValue: "Large",
        isConstant: true,
        serializedName: "details.max_product_capacity",
        type: {
          name: "String"
        }
      },
      maxProductDisplayName: {
        serializedName: "details.max_product_display_name",
        type: {
          name: "String"
        }
      }
    }
  }
};

internalMappers.Cat = {
  required: false,
  serializedName: "cat",
  type: {
    name: "Composite",
    className: "Cat",
    modelProperties: {
      id: {
        required: false,
        serializedName: "id",
        type: {
          name: "Number"
        }
      },
      name: {
        required: false,
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      pettype: {
        required: true,
        serializedName: "pet\\.type",
        type: {
          name: "String"
        }
      },
      color: {
        required: false,
        serializedName: "color",
        type: {
          name: "String"
        }
      },
      hates: {
        required: false,
        serializedName: "hates",
        type: {
          name: "Sequence",
          element: {
            required: false,
            serializedName: "DogElementType",
            type: {
              name: "Composite",
              className: "Dog"
            }
          }
        }
      }
    }
  }
};
internalMappers.Dog = {
  required: false,
  serializedName: "dog",
  type: {
    name: "Composite",
    className: "Dog",
    modelProperties: {
      id: {
        required: false,
        serializedName: "id",
        type: {
          name: "Number"
        }
      },
      name: {
        required: false,
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      pettype: {
        required: true,
        serializedName: "pet\\.type",
        type: {
          name: "String"
        }
      },
      food: {
        required: false,
        serializedName: "food",
        type: {
          name: "String"
        }
      }
    }
  }
};
internalMappers.Fish = {
  required: false,
  serializedName: "Fish",
  type: {
    name: "Composite",
    polymorphicDiscriminator: {
      serializedName: "fish.type",
      clientName: "fishtype"
    },
    uberParent: "Fish",
    className: "Fish",
    modelProperties: {
      species: {
        required: false,
        serializedName: "species",
        type: {
          name: "String"
        }
      },
      length: {
        required: true,
        serializedName: "length",
        type: {
          name: "Number"
        }
      },
      siblings: {
        required: false,
        serializedName: "siblings",
        type: {
          name: "Sequence",
          element: {
            required: false,
            serializedName: "FishElementType",
            type: {
              name: "Composite",
              polymorphicDiscriminator: {
                serializedName: "fish.type",
                clientName: "fishtype"
              },
              uberParent: "Fish",
              className: "Fish"
            }
          }
        }
      },
      fishtype: {
        required: true,
        serializedName: "fish\\.type",
        type: {
          name: "String"
        }
      }
    }
  }
};
internalMappers.Invoice = {
  required: false,
  serializedName: "Invoice",
  type: {
    name: "Composite",
    className: "Invoice",
    modelProperties: {
      invId: {
        serializedName: "invoiceId",
        required: true,
        type: {
          name: "Number"
        }
      },
      invDate: {
        serializedName: "invDate",
        required: false,
        type: {
          name: "Date"
        }
      },
      invProducts: {
        serializedName: "invProducts",
        required: false,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Dictionary",
              value: {
                type: {
                  name: "Composite",
                  className: "Product"
                }
              }
            }
          }
        }
      }
    }
  }
};
internalMappers.Pet = {
  required: false,
  serializedName: "pet",
  type: {
    name: "Composite",
    className: "Pet",
    polymorphicDiscriminator: "pet.type",
    modelProperties: {
      id: {
        required: false,
        serializedName: "id",
        type: {
          name: "Number"
        }
      },
      name: {
        required: false,
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      pettype: {
        required: true,
        serializedName: "pet\\.type",
        type: {
          name: "String"
        }
      }
    }
  }
};
internalMappers.PetAP = {
  required: false,
  serializedName: "PetAP",
  type: {
    name: "Composite",
    additionalProperties: {
      type: {
        name: "String"
      }
    },
    className: "PetAP",
    modelProperties: {
      id: {
        required: true,
        serializedName: "id",
        type: {
          name: "Number"
        }
      },
      name: {
        required: false,
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      eyeColor: {
        required: true,
        serializedName: "eyeColor",
        isConstant: true,
        defaultValue: "brown",
        type: {
          name: "String"
        }
      },
      favoriteFood: {
        required: false,
        serializedName: "favoriteFood",
        defaultValue: "bones",
        type: {
          name: "String"
        }
      },
      status: {
        required: false,
        readOnly: true,
        serializedName: "status",
        type: {
          name: "Boolean"
        }
      },
      odatalocation: {
        required: true,
        serializedName: "@odata\\.location",
        type: {
          name: "String"
        }
      },
      additionalProperties1: {
        required: false,
        serializedName: "additionalProperties",
        type: {
          name: "Dictionary",
          value: {
            required: false,
            serializedName: "NumberElementType",
            type: {
              name: "Number"
            }
          }
        }
      }
    }
  }
};
internalMappers.PetGallery = {
  required: false,
  serializedName: "PetGallery",
  type: {
    name: "Composite",
    className: "PetGallery",
    modelProperties: {
      id: {
        required: false,
        serializedName: "id",
        type: {
          name: "Number"
        }
      },
      name: {
        required: false,
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      pets: {
        required: false,
        serializedName: "pets",
        type: {
          name: "Sequence",
          element: {
            required: false,
            serializedName: "petElementType",
            type: {
              name: "Composite",
              polymorphicDiscriminator: "pet.type",
              uberParent: "Pet",
              className: "Pet"
            }
          }
        }
      }
    }
  }
};
internalMappers.Product = {
  required: false,
  serializedName: "Product",
  type: {
    name: "Composite",
    className: "Product",
    modelProperties: {
      id: {
        serializedName: "id",
        constraints: {},
        required: true,
        type: {
          name: "Number"
        }
      },
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        },
        constraints: {
          MaxLength: 256,
          MinLength: 1,
          Pattern: /^[A-Za-z0-9-._]+$/
        }
      },
      provisioningState: {
        serializedName: "properties.provisioningState",
        required: false,
        type: {
          name: "Enum",
          allowedValues: ["Creating", "Failed", "Succeeded"]
        }
      },
      tags: {
        serializedName: "tags",
        required: false,
        type: {
          name: "Dictionary",
          value: {
            type: {
              name: "String"
            }
          }
        }
      },
      dispatchTime: {
        serializedName: "dispatchTime",
        required: false,
        type: {
          name: "DateTime"
        }
      },
      invoiceInfo: {
        serializedName: "invoiceInfo",
        required: false,
        type: {
          name: "Composite",
          className: "Invoice"
        }
      },
      subProducts: {
        serializedName: "subProducts",
        required: false,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SubProduct"
            }
          }
        }
      }
    }
  }
};
internalMappers.ProductListResult = {
  required: false,
  serializedName: "ProductListResult",
  type: {
    name: "Composite",
    className: "ProductListResult",
    modelProperties: {
      value: {
        serializedName: "",
        required: false,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Product"
            }
          }
        }
      }
    }
  }
};
internalMappers.ProductListResultNextLink = {
  required: false,
  serializedName: "ProductListResultNextLink",
  type: {
    name: "Composite",
    className: "ProductListResultNextLink",
    modelProperties: {
      value: {
        serializedName: "",
        required: false,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Product"
            }
          }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        required: false,
        type: {
          name: "String"
        }
      }
    }
  }
};
internalMappers.SawShark = {
  required: false,
  serializedName: "sawshark",
  type: {
    name: "Composite",
    polymorphicDiscriminator: {
      serializedName: "fish.type",
      clientName: "fishtype"
    },
    uberParent: "Fish",
    className: "Sawshark",
    modelProperties: {
      species: {
        required: false,
        serializedName: "species",
        type: {
          name: "String"
        }
      },
      length: {
        required: true,
        serializedName: "length",
        type: {
          name: "Number"
        }
      },
      siblings: {
        required: false,
        serializedName: "siblings",
        type: {
          name: "Sequence",
          element: {
            required: false,
            serializedName: "FishElementType",
            type: {
              name: "Composite",
              polymorphicDiscriminator: {
                serializedName: "fish.type",
                clientName: "fishtype"
              },
              uberParent: "Fish",
              className: "Fish"
            }
          }
        }
      },
      fishtype: {
        required: true,
        serializedName: "fish\\.type",
        type: {
          name: "String"
        }
      },
      age: {
        required: false,
        serializedName: "age",
        type: {
          name: "Number"
        }
      },
      birthday: {
        required: true,
        serializedName: "birthday",
        type: {
          name: "DateTime"
        }
      },
      picture: {
        required: false,
        serializedName: "picture",
        type: {
          name: "ByteArray"
        }
      }
    }
  }
};
internalMappers.Shark = {
  required: false,
  serializedName: "shark",
  type: {
    name: "Composite",
    polymorphicDiscriminator: {
      serializedName: "fish.type",
      clientName: "fishtype"
    },
    uberParent: "Fish",
    className: "Shark",
    modelProperties: {
      species: {
        required: false,
        serializedName: "species",
        type: {
          name: "String"
        }
      },
      length: {
        required: true,
        serializedName: "length",
        type: {
          name: "Number"
        }
      },
      siblings: {
        required: false,
        serializedName: "siblings",
        type: {
          name: "Sequence",
          element: {
            required: false,
            serializedName: "FishElementType",
            type: {
              name: "Composite",
              polymorphicDiscriminator: {
                serializedName: "fish.type",
                clientName: "fishtype"
              },
              uberParent: "Fish",
              className: "Fish"
            }
          }
        }
      },
      fishtype: {
        required: true,
        serializedName: "fish\\.type",
        type: {
          name: "String"
        }
      },
      age: {
        required: false,
        serializedName: "age",
        type: {
          name: "Number"
        }
      },
      birthday: {
        required: true,
        serializedName: "birthday",
        type: {
          name: "DateTime"
        }
      }
    }
  }
};
internalMappers.SubProduct = {
  required: false,
  serializedName: "SubProduct",
  type: {
    name: "Composite",
    className: "SubProduct",
    modelProperties: {
      subId: {
        serializedName: "subId",
        required: true,
        type: {
          name: "Number"
        }
      },
      subName: {
        serializedName: "subName",
        required: true,
        type: {
          name: "String"
        }
      },
      provisioningState: {
        serializedName: "provisioningState",
        required: false,
        type: {
          name: "Enum",
          allowedValues: ["Creating", "Failed", "Succeeded"]
        }
      },
      makeTime: {
        serializedName: "makeTime",
        required: false,
        type: {
          name: "DateTime"
        }
      },
      invoiceInfo: {
        serializedName: "invoiceInfo",
        required: false,
        type: {
          name: "Composite",
          className: "Invoice"
        }
      }
    }
  }
};

internalMappers.discriminators = {
  Fish: internalMappers.Fish,
  "Fish.shark": internalMappers.Shark,
  "Fish.sawshark": internalMappers.SawShark,
  Pet: internalMappers.Pet,
  "Pet.Cat": internalMappers.Cat,
  "Pet.Dog": internalMappers.Dog
};

export const Mappers = internalMappers;
