var Example = {};

Example.app = document.querySelector('#app');

Example.render = function() {
  var domNode = Example.app;
  var currentNode = null;

  Tree.traverse(TreeJson, TreeJson.rootId, function(tree, node) {
    //if(currentNode === null) {
      var newNode = document.createElement("div");
      newNode.innerHTML = node.label;
      newNode.className = "node";
      domNode.appendChild(newNode);
      domNode = newNode;
      currentNode = node;
    //}
    console.log(node.label);
  });
}

Example.render();
