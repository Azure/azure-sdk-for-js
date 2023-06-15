# Tool Documentation: Customizing Generated Azure SDK Libraries in TypeScript

This tool streamlines the process of customizing generated Azure SDK libraries in TypeScript. It reduces the time and error associated with manually modifying or enhancing generated code, allowing developers to focus on improving the user experience.

## Problem Statement

Azure SDK library creation heavily relies on code generation. However, we often need to tweak the generated code. Currently, we manually wrap the generated client class within another class, modifying the methods that need adjustment. This process requires significant boilerplate code to proxy unmodified methods, leading to potential human errors and inefficient time usage.

One possible solution is to inherit from the generated class and override the methods needing customization. However, this approach exposes an inheritance structure to the customer, leading to potential confusion and misuse. Moreover, this methodology contradicts the JavaScript ecosystem's preferences against classical inheritance.

## Our Solution: A Customization Tool

Our solution is a tool that defines mirror modules for customizations. In this model, the customizations are written in separate files that mirror the structure of the generated code they're adjusting. The tool then applies these customizations to the generated file, reducing the need for extensive boilerplate code and potential human errors.

### How It Works

Given a generated model.ts file, if you want to change the type of the `data` property, you would:

1. Maintain the original generated file:

```ts
// {project-root}/sources/generated/api/models.ts

interface Foo {
  id: number;
  data: any;
}
```

2. Create a manual file in a sibling directory, mirroring the structure and file name of the generated code:

```ts
// {project-root}/sources/custom/api/models.ts

interface Foo {
  data: Record<string, unknown>;
}
```

In this manual file, define the properties needing customization.

3. Run the following command:

```bash
dev-tool customizations apply
```

The tool will then apply the custom file to the generated file:

- If the interface does not exist in the generated file, it will copy the interface as is.
- If the interface exists in the generated file, it will add any new properties to the generated interface and replace properties with the same name with the custom version.

The output will be stored in `{project-root}/src`:

```ts
// {project-root}/src/api/models.ts

interface Foo {
  id: number;
  data: Record<string, unknown>;
}
```

The code built and shipped will be under `{project-root}/src`.

### Current Features

As of today, the `customizations` command supports:

**Interfaces**

- Add new interfaces
- Add new properties to a generated interface
- Replace existing properties with custom properties
- (Experimental) Tag a property for removal

**Type Aliases**

- Add new type aliases
- Replace existing type aliases

**Functions**

- Add new functions
- Replace entire functions
- Add method overloads
- Enhance a generated function. The generated function will be made private and available to the custom function. The custom function replaces the generated one.

**Classes**

- Add new classes
- Add and replace properties
- Add, replace, and enhance constructors
- Add, replace, and enhance methods
- Add constructor and method overloads
