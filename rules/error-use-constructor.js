export default {
  description: 'Use `new` operator to create Error(NativeError) instances.',
  rules: [
    {
      selector: "CallExpression[callee.name=/(Eval|Range|Reference|Syntax|Type|URI)?Error/]",
      message: "Please use the 'new' operator.",
    }
  ],
  sampleCode: `
// Bad
Error();
// Good
new Error();
`,
};
