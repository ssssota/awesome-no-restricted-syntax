export default {
  description: 'Use `.toString()` instead of template literal if you want to convert a value to string.',
  rules: [
    {
      selector: 'TemplateLiteral[quasis.0.value.raw=""][quasis.1.tail=true][quasis.1.value.raw=""]',
      message: 'Use `.toString()` instead of template literal if you want to convert a value to string.'
    }
  ],
  sampleCode: `
// Bad
var foo = \`\${bar}\`;
// Good
var foo = bar.toString();
`,
};
