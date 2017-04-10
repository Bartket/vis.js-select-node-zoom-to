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
    var data = {
    nodes: nodes,
    edges: edges
  };

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
  function focusNode() {
    input_val = document.getElementById("_nodes2");
    node_num = input_val.value;
    var nodeId = node_num
    var options = {
      // position: {x:positionx,y:positiony}, // this is not relevant when focusing on nodes
      scale: 2.0,
      offset: {x:0,y:0},
      animation: {
        duration: 500
      }
    };
    statusUpdateSpan.innerHTML = 'Focusing on PG: ' + nodeId;
    finishMessage = 'PG: ' + nodeId + ' in focus.';
    network.focus(nodeId, options);
  }
