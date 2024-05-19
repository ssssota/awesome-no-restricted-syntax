# How to contribute

We welcome contributions to this project.
Please follow these steps:

1. Fork the repository
2. Create a new branch (There is not naming convention, but it is recommended to use a rule name)
3. Make your rule in the `rules/` directory
4. `corepack enable && pnpm i && pnpm build` to update README.md
5. `pnpm lint` to check your rule
6. Commit your changes and push to the branch
7. Create a pull request

## How to write a rule

First, you need to create a new js file in the `rules/` directory.

e.g. `rules/your-rule.js`

```js
export default {
  description: "Full-width tilde and wave dash are easily confused",
  rules: [
    // Add your rule here
    {
      selector: ":matches(Literal[value=/～/],TemplateElement[value.raw=/～/])",
      message: "Do not use full-width tilde. Use wave dash instead.",
    },
  ],
  // Add your sample code here
  // This is used for playground link in the README.md
  sampleCode: `
// bad
var foo = '～';
var bar = \`～\`;
// good
var foo = '〜';
var bar = \`〜\`;
`,
}
```
