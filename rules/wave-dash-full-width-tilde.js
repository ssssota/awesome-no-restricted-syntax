export default {
  description: "Full-width tilde and wave dash are easily confused",
  rules: [
    {
      selector: ":matches(Literal[value=/～/],TemplateElement[value.raw=/～/])",
      message: "Do not use full-width tilde. Use wave dash instead.",
    },
  ],
  sampleCode: `
// bad
var foo = '～';
var bar = \`～\`;
// good
var foo = '〜';
var bar = \`〜\`;
`,
};
