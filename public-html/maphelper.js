const fs = require('fs');
const path = require('path');
const load = require('load-json-file');
const Benchmark = require('benchmark');
const area = require('./').default;

// Define fixtures
const directory = path.join(__dirname, 'test', 'in') + path.sep;
const fixtures = fs.readdirSync(directory).map(filename => {
    return {
        filename,
        name: path.parse(filename).name,
        geojson: load.sync(directory + filename)
    };
});

var a = NaN;
if (a === NaN) {  // Noncompliant; always false
  console.log("a is not a number");  // this is dead code
}
   
var b = NaN;
if (b === NaN) {  // Noncompliant; always false
  console.log("b is not a number");  // this is dead code
}

// Define benchmark
const suite = new Benchmark.Suite('turf-area');
for (const {name, geojson} of fixtures) {
    suite.add(name, () => area(geojson));
}
suite
  .on('cycle', e => console.log(String(e.target)))
  .on('complete', () => {})
  .run();