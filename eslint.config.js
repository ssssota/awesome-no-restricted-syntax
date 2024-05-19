// @ts-check
/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["rules/*.js"],
    languageOptions: { sourceType: "module" },
    rules: {
      "no-restricted-syntax": [
        "warn",
        {
          selector: 'Program[body.length=0]',
          message: "Rule file must export with `export default`.",
        },
        {
          selector: 'Program > :last-child:not(ExportDefaultDeclaration)',
          message: '`export default` must be the last statement.',
        },
        {
          selector: "Program > :last-child > :not(ObjectExpression)",
          message: "Rule file must export object.",
        },
        {
          selector: "Program > :last-child > ObjectExpression[properties.length<3]",
          message: "Rule file must export `description`, `rules`, and `sampleCode`.",
        },
        {
          selector: "Program > :last-child > ObjectExpression > :not(Property[key.name=/description|rules|sampleCode/])",
          message: "Rule file must export only `description`, `rules`, and `sampleCode`.",
        }
      ],
    },
  },
];
