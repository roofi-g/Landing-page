import eslintConfig from "@delement/eslint-config-master";

export default [
  ...eslintConfig,

  {
    settings: {
      react: {
        version: "999.999.999",
      },
    },
  },
];