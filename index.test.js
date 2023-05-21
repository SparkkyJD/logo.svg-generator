const { generateSVG } = require('./index');

test('generate SVG content for circle shape', () => {
  const svgContent = generateSVG('ABC', 'green', 'circle', 'yellow');
  // checks for correct attributes within circle shape 
  expect(svgContent).toContain('<circle');
  expect(svgContent).toContain('cx="150"');
  expect(svgContent).toContain('cy="100"');
  expect(svgContent).toContain('r="100"');
  // checks for shape background color 
  expect(svgContent).toContain('fill="yellow"');
  // checks for text element
  expect(svgContent).toMatch(/<text[^>]*><tspan[^>]*>ABC<\/tspan><\/text>/);
  // check for text background color
  expect(svgContent).toMatch(/fill="green"/);
});

test('generate SVG content for triangle shape', () => {
  const svgContent = generateSVG('DEF', 'blue', 'triangle', 'red');
  expect(svgContent).toContain('<polygon');
  expect(svgContent).toContain('points="0,200 300,200 150,0"');
  expect(svgContent).toContain('fill="red"');
  expect(svgContent).toMatch(/<text[^>]*><tspan[^>]*>DEF<\/tspan><\/text>/);
  expect(svgContent).toMatch(/fill="blue"/);
});

test('generate SVG content for square shape', () => {
  const svgContent = generateSVG('GHI', 'purple', 'square', 'orange');
  expect(svgContent).toContain('<rect');
  // checks if the the svgContent string has a substring that
  // matches the expresion /x="(\d+(\.\d+)?)"/
  expect(svgContent).toMatch(/x="(\d+(\.\d+)?)"/);
  expect(svgContent).toContain('y="0"');
  expect(svgContent).toContain('width="200"');
  expect(svgContent).toContain('height="200"');
  expect(svgContent).toContain('fill="orange"');
  expect(svgContent).toMatch(/<text[^>]*><tspan[^>]*>GHI<\/tspan><\/text>/);
  expect(svgContent).toMatch(/fill="purple"/);
});

