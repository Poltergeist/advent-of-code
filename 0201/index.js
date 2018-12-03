let fs = require("fs");
let path = require("path");
let parseInput = require("./main").parseInput;

fs.readFile(path.resolve(__dirname, "./input"), "utf-8", (err, input = "") =>
  console.log(parseInput(input.split("\n")))
);
