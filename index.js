// Imports needed packages
const fs = require('fs');
const inquirer = require('inquirer');
const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');
// defining triangle class
class Triangle {
  constructor(size, color) {
    this.size = size;
    this.color = color;
  }
//   renders the SVG polygon to a triangle 
  render() {
    const points = `0,200 300,200 150,0`;
    return `<polygon points="${points}" fill="${this.color}"></polygon>`;
}}
// Defining square class
class Square {
  constructor(size, color) {
    this.size = size;
    this.color = color;
  }
//   renders the SVG rectangle to a square
  render() {
    return `<rect width="${this.size}" height="${this.size}" fill="${this.color}"></rect>`;
}}
//   defines circle class
class Circle {
  constructor(radius, color) {
    this.radius = radius;
    this.color = color;
  }
//   renders SVG circle
  render(svgWidth, svgHeight) {
// x and y coordinat of the circles center. Added this because the circle 
// was not rendering in the 300x200 window center. 
    const cx = svgWidth / 2; 
    const cy = svgHeight / 2; 
    return `<circle cx="${cx}" cy="${cy}" r="${this.radius}" fill="${this.color}"></circle>`;
}}
// Creates the SVG window and Document
const window = createSVGWindow();
const document = window.document;
registerWindow(window, document);
// prompts the user for 4 inputs for the SVG file
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter the text (1-3 characters):',
      validate: (value) => {
        if (value.length > 0 && value.length <= 3) {
          return true;
        }
        return 'Please enter 1-3 characters.';
      },
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (e.g., red, #00ff00):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose the background shape:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape background color (e.g., blue, #ff0000):',
    },
  ]);
};
// takes in user input and generates it to the SVG file 
const generateSVG = (text, textColor, shape, shapeColor) => {
    // defines size of SVG canvas
    const svgWidth = 300;
    const svgHeight = 200;
    const svg = SVG().size(svgWidth, svgHeight);
    switch (shape) {
      case 'circle':
        // calculates the appropriate size of each shape and adds shape color
        const circleSize = Math.min(svgWidth, svgHeight);
        const circle = new Circle(circleSize / 2, shapeColor);
        svg.add(circle.render(svgWidth, svgHeight));
        break;
      case 'triangle':
        const triangleSize = Math.min(svgWidth, svgHeight) * 0.5;
        const triangle = new Triangle(triangleSize, shapeColor);
        svg.add(triangle.render());
        break;
      case 'square':
        const squareSize = Math.min(svgWidth, svgHeight);
        const square = new Square(squareSize, shapeColor);
        svg.add(square.render());
        break;
      default:
        break;
    }
    // calculates the bounding box of the shape
    const shapeBBox = svg.bbox();
    // creates text element in the SVG.
    const textElement = svg.text(text).fill(textColor).font({ size: 50 });
    // gets width and heighth from bbox
    const textWidth = textElement.bbox().width;
    const textHeight = textElement.bbox().height;
    const textX = shapeBBox.cx - textWidth / 2;
    const textY = shapeBBox.cy + textHeight / 2.5;
    // moves text in the center of all shapes
    textElement.move(textX, textY);
    return svg.svg();
};
promptUser()
  .then((answers) => {
    // generated SVG based on user inputs 
    const svgContent = generateSVG(
      answers.text,
      answers.textColor,
      answers.shape,
      answers.shapeColor
    );
    // confirm svg file was generated
    const outputFileName = 'logo.svg';
    fs.writeFileSync(outputFileName, svgContent);
    console.log(`Generated ${outputFileName}`);
  })
//   throws error if criteria isnt met
  .catch((error) => {
    console.error('An error occurred:', error);
  });
//   export to index.test.js
  module.exports = { generateSVG };
