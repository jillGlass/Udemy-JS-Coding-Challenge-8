/*
Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.
*/

class Element {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }
}

class Park extends Element {
  constructor(name, buildYear, area, numTrees) {
    super(name, buildYear);
    this.area = area;
    this.numTrees = numTrees;
  }
  
  treeDensity() {
    const density = this.numTrees / this.area;
    console.log(
      `${this.name} has a tree density of ${density} trees per square km`
    );
  }
}

class Street extends Element {
  constructor(name, buildYear, length, size = 3) {
    super(name, buildYear);
    this.length = length;
    this.size = size;
  }

  classifyStreet() {
    const classification = new Map();
    classification.set(1, "tiny");
    classification.set(2, "small");
    classification.set(3, "normal");
    classification.set(4, "big");
    classification.set(5, "huge");
    console.log(
      `${this.name}, built in ${this.buildYear}, is a ${classification.get(
        this.size
      )} street.`
    );
  }
}

const allParks = [
  new Park("Green Park", 1987, 0.2, 215),
  new Park("National Park", 1894, 2.9, 3541),
  new Park("Oak Park", 1953, 0.4, 949),
];

const allStreets = [
  new Street("Ocean Avenue", 1999, 1.1, 4),
  new Street("Evergreen Street", 2008, 2.7, 2),
  new Street("4th Street", 2015, 0.8),
  new Street("Sunset Boulevard", 1982, 2.5, 5),
];

function calculate(arr) {
    //average of numbers passed in
const sum = arr.reduce((prev, cur, index) => prev + cur, 0);
return [sum, sum / arr.length];
}

function reportParks(allParks) {

    console.log('---PARKS REPORT---')
// Density
allParks.forEach(el => el.treeDensity());

// Average age = sum of all ages/number of parks
const ages = allParks.map(el => new Date().getFullYear() - el.buildYear )
const [totalAge, avAge] = calculate(ages);
console.log(`Our ${allParks.length} parks have an average age of ${avAge} years.`)

// More than 1000 trees
// chain two methods together, findIndex() with map()
// map through all the parks and return number of trees. In the returned array, find the index of those with more than 1000 trees. You can then get the name of that index {allParks[index].name}
const index = allParks.map(el => 
    el.numTrees).findIndex(el => el >= 1000);

    console.log(`${allParks[index].name} has more than 1000 trees.`)

}

function reportStreets(allStreets) {
    console.log('---STREETS REPORT---')
//Total and average length of the town's streets
const length = allStreets.map(el => el.length);
const [totalLength, avLength] = calculate(length);

console.log(`Our ${allStreets.length} streets have a total length of ${totalLength} kilometers with an average length of ${avLength} kilometers`)


// Size classification of all streets: tiny/small/normal/big/huge.
allStreets.forEach(el => el.classifyStreet())

}

reportParks(allParks);
reportStreets(allStreets);