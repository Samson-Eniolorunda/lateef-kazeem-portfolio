import next from "eslint-config-next";

export default [...next, { ignores: ["legacy/**", ".next/**", "node_modules/**"] }];
