var nodes = new vis.DataSet([
  {id: 1, label: 'Node 1'},
  {id: 2, label: 'Node 2'},
  {id: 3, label: 'Node 3'},
  {id: 4, label: 'Node 4'},
  {id: 5, label: 'Node 5'}
]);

// create an array with edges
var edges = new vis.DataSet([
  {from: 1, to: 3},
  {from: 1, to: 2},
  {from: 2, to: 4},
  {from: 2, to: 5},
  {from: 3, to: 3}
]);

  var network = null;
  var offsetx, offsety, scale, positionx, positiony, duration, easingFunction, doButton, focusButton, showButton;
  var statusUpdateSpan;
  var finishMessage = '';
  var showInterval = false;
  var showPhase = 1;
  var amountOfNodes = 5;

  function destroy() {
    if (network !== null) {
      network.destroy();
      network = null;
    }
  }
  function draw() {
    destroy();
    statusUpdateSpan = document.getElementById('statusUpdate');
    doButton = document.getElementById('btnDo');
    focusButton = document.getElementById('btnFocus');
    showButton = document.getElementById('btnShow');

    // randomly create some nodes and edges
    var data = getScaleFreeNetwork(amountOfNodes);

    // create a network
    var container = document.getElementById('mynetwork');
    var options = {
      physics: {
        stabilization: {
          iterations: 1200
        }
      }
    };
    network = new vis.Network(container, data, options);

    // add event listeners
    network.on('select', function(params) {
      document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
    });
    network.on('animationFinished', function() {
      statusUpdateSpan.innerHTML = finishMessage;
    })
  }

  function fitAnimated() {
      var options = {offset: {x:0,y:0},
        duration: 500,
      };
      network.fit({animation:options});
    }

  var _r;
  var row;
  function focusNode() {
    row = document.getElementById("_nodes");
    _r = row.options[row.selectedIndex].value;
    var nodeId = _r
    var options = {
      // position: {x:positionx,y:positiony}, // this is not relevant when focusing on nodes
      scale: 2.0,
      offset: {x:0,y:0},
      animation: {
        duration: 500
      }
    };
    statusUpdateSpan.innerHTML = 'Focusing on node: ' + nodeId;
    finishMessage = 'Node: ' + nodeId + ' in focus.';
    network.focus(nodeId, options);
  }
