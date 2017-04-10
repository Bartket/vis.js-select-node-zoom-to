var nodes = new vis.DataSet([
  {id: 0, label: 'PG 0'},
  {id: 1, label: 'PG 1'},
  {id: 2, label: 'PG 2'},
  {id: 3, label: 'PG 3'},
  {id: 4, label: 'PG 4'}
]);

// create an array with edges
var edges = new vis.DataSet([
  {from: 0, to: 2},
  {from: 0, to: 1},
  {from: 1, to: 3},
  {from: 1, to: 4},
]);
