# Writing Performance Tests

## Setting up the project

To add perf tests for the `sdk/<service>/<service-sdk>` package, follow the steps below.

1. Create a new folder for the perf tests.

   Path- `sdk/<service>/perf-tests/<service-sdk>`

   (Create the `perf-tests` folder if that doesn't exist)

2. This new project will part of rush, with the package name `@azure-tests/<service-sdk>`. Since, it is part of rush, add the following entry in `rush.json`

   ```
       {
         "packageName": "@azure-tests/<service-sdk>",
         "projectFolder": "sdk/<service>/perf-tests/<service-sdk>",
         "versionPolicyName": "test"
       }

   ```

3. Tests will live under `sdk/<service>/perf-tests/<service-sdk>/test`
4. Add a `package.json` such as [example-perf-package.json](https://github.com/Azure/azure-sdk-for-js/blob/fe9b1e5a50946f53b6491d7f67b2420d8ee1b229/sdk/storage/perf-tests/storage-file-datalake/package.json) at `sdk/<service>/perf-tests/<service-sdk>` folder.

   Make sure to import your `<service-sdk>` and the `test-utils-perfstress` project.

   ```json
     "devDependencies": {
        "@azure/<service-sdk>": "^<version-in-master-branch>",
        "@azure/test-utils-perfstress": "^1.0.0"
      }
   ```

   _Note: `"@azure/test-utils-perfstress"` is not a published npm package._

   Set the name of the package and mark it as private.

   ```json
    "name": "@azure-tests/<service-sdk>",
    "private": true,
   ```

5. Run `rush update` and commit the changes to the `pnpm-lock` file.
6. Copy the `tsconfig.json`, `sample.env`(and `.env`) files that are present at the `sdk/<service>/<service-sdk>` to `sdk/<service>/perf-tests/<service-sdk>`.

   Set the `compilerOptions.module` to `commonjs` in the `tsconfig` to allow running the tests with `ts-node`.

   ```json
     "module": "commonjs"
   ```

### For perf-testing track 1 version of the same package

(_Skip this section if your service does not have or does not care about a track-1 version._)

1. If there is an old major version of your package that needs to be compared, create the folder as `sdk/<service>/perf-tests/<service-sdk>-track-1`

2. It is expected that the track-1 perf tests are counterparts of track-2 tests, so they need to have the same names as specified in the track-2 tests for convenience.

3. Add a `package.json` such as [example-track-1-perf-package.json](https://github.com/Azure/azure-sdk-for-js/blob/fe9b1e5a50946f53b6491d7f67b2420d8ee1b229/sdk/storage/perf-tests/storage-blob-track-1/package.json) at `sdk/<service>/perf-tests/<service-sdk>` folder.

   Make sure to import your `<service-sdk>` and the `test-utils-perfstress` project.

   ```json
     "devDependencies": {
        "@azure/<service-sdk>": "^<latest-track-1-version>",
        "@azure/test-utils-perfstress": "file:../../../test-utils/perfstress/azure-test-utils-perfstress-1.0.0.tgz",
      }
   ```

   Set the name of the package and mark it as private.

   ```json
    "name": "@azure-tests/<service-sdk>-track-1",
    "private": true,
   ```

   _Note: Track-1 packages will not be managed by `rush`, instead `npm` will be used to manage/run the track-1 tests, you can copy the readme such as the [storage-blob-perf-tests-readme](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/perf-tests/storage-blob-track-1/README.md) for instructions._

   Make sure to add the "setup" step in package.json.

   ```json
       "setup": "node ../../../../common/tools/perf-tests-track-1-setup.js",
   ```

4. Run `rush update` and run `npm run setup` to be able to use the perf framework for track-1 perf tests.

   _`npm run setup` installs the dependencies specified in `package.json`_

5. Repeat the step 6 from the previous section for the track-1 too.

## Writing perf tests

## Running the perf tests

4. Pom file structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">


<parent>
  <groupId>com.azure</groupId>
  <artifactId>azure-client-sdk-parent</artifactId>
  <version>1.7.0</version> <!-- {x-version-update;com.azure:azure-client-sdk-parent;current} -->
  <relativePath>../../parents/azure-client-sdk-parent</relativePath>
</parent>

<modelVersion>4.0.0</modelVersion>

<groupId>com.azure</groupId>
<artifactId>azure-<service-name>-perf</artifactId>
<version>1.0.0-beta.1</version> <!-- {x-version-update;com.azure:azure-storage-perf;current} -->
<packaging>jar</packaging>

<dependencies>
  <dependency>
    <groupId>com.azure</groupId>
    <artifactId><sdk-artifact-id></artifactId>
    <version><sdk-version></version> <!-- {x-version-update;com.azure:azure-storage-blob;current} -->
  </dependency>
  <dependency>
    <groupId>com.azure</groupId>
    <artifactId>perf-test-core</artifactId>
    <version>1.0.0-beta.1</version> <!-- {x-version-update;com.azure:perf-test-core;current} -->
  </dependency>
</dependencies>

<build>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-assembly-plugin</artifactId>
      <version>3.2.0</version> <!-- {x-version-update;org.apache.maven.plugins:maven-assembly-plugin;external_dependency} -->
      <executions>
        <execution>
          <phase>package</phase>
          <goals>
            <goal>single</goal>
          </goals>
          <configuration>
            <archive>
              <manifest>
                <mainClass>
                  com.azure.<service>.<sub-service>.<your-main-class-from-step-1-below>
                </mainClass>
              </manifest>
            </archive>
            <descriptorRefs>
              <descriptorRef>jar-with-dependencies</descriptorRef>
            </descriptorRefs>
          </configuration>
        </execution>
      </executions>
    </plugin>
  </plugins>
</build>
</project>
```

3. **Main Class**: The project's main class should follow the following structure:

```xml
/**
 * Runs the <Service-Name> performance test.
 *
 * <p>To run from command line. Package the project into a jar with dependencies via mvn clean package.
 * Then run the program via java -jar 'compiled-jar-with-dependencies-path' </p>
 *
 * <p> To run from IDE, set all the required environment variables in IntelliJ via Run -&gt; EditConfigurations section.
 * Then run the App's main method via IDE.</p>
 */
public class App {
    public static void main(String[] args) {
        Class<?>[] testClasses;

        try {
            testClasses = new Class<?>[] {
                Class.forName("com.azure.<service>.<sub-package>.perf.<APIName>Test"),
                Class.forName("com.azure.<service>.<sub-package>.perf.<APIName>Test")
            };
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

        PerfStressProgram.run(testClasses, args);
    }
}
```

4. Performance Test Class Structure:
   Create your performance Test classes under the `com.azure.<service>.<sub-package>.perf` package.

Create abstract test classes for doing client setup and clean up that is shared across all performance test classes.

![](https://jogiles.blob.core.windows.net/azure-sdk-wiki/java-perf-tests.png)

The leaf nodes will be the performance test classes. Here is the sample structure of abstract Test class:

```java
public abstract class ServiceTest<TOptions extends PerfStressOptions> extends PerfStressTest<TOptions> {
    protected final <ServiceClientName> serviceClientName;
    protected final <ServiceClientAsyncName> serviceClientAsyncName;
    public ServiceTest(TOptions options) {
        super(options);

        // Setup the service client
    }
}
```

Here is the sample structure of Performance Test class:

```java
// The Options class specifies the options bundle which can be passed via command-line arguments.
// The default options class PerfStressOptions is available in the framework.
// To provide any custom options bundle. Create your options class extending from PerfStressOptions and specify it // below.
public class <API-NAME>Test extends ServiceTest<{OptionsClass}> {
    public <API-NAME>Test({OptionsClass} options) {
        super(options);
    // Optional Client setup is any child client needs to be setup specifically for this test.
    }

    // Required resource setup goes here.
    public Mono<Void> globalSetupAsync() {
        return super.globalSetupAsync()
                    .then(<service-call-to-perform-setup>)
                    .then();
    }


    // Perform the API call to be tested here
    @Override
    public void run() {
        serviceClient.apiCall();
    }

    // Perform the Async API call to be tested here
    @Override
    public Mono<Void> runAsync() {
        return serviceAsyncClient.apiCall()
            .map(<process-output>
            }).then();
    }

}
```

For Reference, look at Storage Performance Tests setup structure [here](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-perf).

### Specifying Custom Options

The `PerfStressOptions` class in the performance framework comes with default options bundle applicable to any generic performance test. If there is a need to provide custom options to the performance test then a custom options class needs to be created extending `PerfStressOptions` and then it should be referenced in the performance test class setup above.

![](https://github.com/g2vinay/KVSpec/blob/master/PerfOptions.png)

## Executing the performance test.

1. Compile the performance project into a standalone jar.
   `mvn clean package -f <path-to-perf-project-pom>`

2. Execute the perf test: `java -jar <path-to-packaged-jar-with-dependencies-from-step-1> <options-for-the-test>`
