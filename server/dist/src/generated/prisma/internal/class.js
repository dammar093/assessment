import * as runtime from "@prisma/client/runtime/client";
const config = {
    "previewFeatures": [],
    "clientVersion": "7.6.0",
    "engineVersion": "75cbdc1eb7150937890ad5465d861175c6624711",
    "activeProvider": "postgresql",
    "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nenum UserRole {\n  USER\n  ADMIN\n}\n\nmodel User {\n  id       String   @id @default(uuid())\n  name     String\n  email    String   @unique\n  password String\n  role     UserRole @default(USER)\n\n  @@index([email, name, id])\n  @@map(\"users\")\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"UserRole\"}],\"dbName\":\"users\"}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_count\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"name\",\"email\",\"password\",\"UserRole\",\"role\",\"equals\",\"in\",\"notIn\",\"not\",\"lt\",\"lte\",\"gt\",\"gte\",\"contains\",\"startsWith\",\"endsWith\",\"set\"]"),
    graph: "KQkQCBoAACIAMBsAAAQAEBwAACIAMB0BAAAAAR4BACMAIR8BAAAAASABACMAISIAACQiIgEAAAABACABAAAAAQAgCBoAACIAMBsAAAQAEBwAACIAMB0BACMAIR4BACMAIR8BACMAISABACMAISIAACQiIgADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAFHQEAAAABHgEAAAABHwEAAAABIAEAAAABIgAAACICAQgAAAkAIAUdAQAAAAEeAQAAAAEfAQAAAAEgAQAAAAEiAAAAIgIBCAAACwAwAQgAAAsAMAUdAQAoACEeAQAoACEfAQAoACEgAQAoACEiAAApIiICAAAAAQAgCAAADgAgBR0BACgAIR4BACgAIR8BACgAISABACgAISIAACkiIgIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgAxUAACUAIBYAACcAIBcAACYAIAgaAAAaADAbAAAXABAcAAAaADAdAQAbACEeAQAbACEfAQAbACEgAQAbACEiAAAcIiIDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAgaAAAaADAbAAAXABAcAAAaADAdAQAbACEeAQAbACEfAQAbACEgAQAbACEiAAAcIiIOFQAAHgAgFgAAIQAgFwAAIQAgIwEAAAABJAEAAAAEJQEAAAAEJgEAIAAhJwEAAAABKAEAAAABKQEAAAABKgEAAAABKwEAAAABLAEAAAABLQEAAAABBxUAAB4AIBYAAB8AIBcAAB8AICMAAAAiAiQAAAAiCCUAAAAiCCYAAB0iIgcVAAAeACAWAAAfACAXAAAfACAjAAAAIgIkAAAAIgglAAAAIggmAAAdIiIIIwIAAAABJAIAAAAEJQIAAAAEJgIAHgAhJwIAAAABKAIAAAABKQIAAAABKgIAAAABBCMAAAAiAiQAAAAiCCUAAAAiCCYAAB8iIg4VAAAeACAWAAAhACAXAAAhACAjAQAAAAEkAQAAAAQlAQAAAAQmAQAgACEnAQAAAAEoAQAAAAEpAQAAAAEqAQAAAAErAQAAAAEsAQAAAAEtAQAAAAELIwEAAAABJAEAAAAEJQEAAAAEJgEAIQAhJwEAAAABKAEAAAABKQEAAAABKgEAAAABKwEAAAABLAEAAAABLQEAAAABCBoAACIAMBsAAAQAEBwAACIAMB0BACMAIR4BACMAIR8BACMAISABACMAISIAACQiIgsjAQAAAAEkAQAAAAQlAQAAAAQmAQAhACEnAQAAAAEoAQAAAAEpAQAAAAEqAQAAAAErAQAAAAEsAQAAAAEtAQAAAAEEIwAAACICJAAAACIIJQAAACIIJgAAHyIiAAAAAS4BAAAAAQEuAAAAIgIAAAAAAxUABhYABxcACAAAAAMVAAYWAAcXAAgBAgECAwEFBgEGBwEHCAEJCgEKDAILDQMMDwENEQIOEgQREwESFAETFQIYGAUZGQk"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
export function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map