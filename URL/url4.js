const { URLSearchParams } = require('url');

const params = new URLSearchParams('query=string&key=value');

// Getting a parameter
console.log(params.get('query')); // 'string'

// Adding a new parameter
params.append('newKey', 'newValue');
console.log(params.toString()); // 'query=string&key=value&newKey=newValue'

// Deleting a parameter
params.delete('query');
console.log(params.toString()); // 'key=value&newKey=newValue'

// Iterating over parameters
for (const [key, value] of params) {
  console.log(`${key}: ${value}`);
}
// Output:
// key: value
// newKey: newValue
