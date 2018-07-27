var Tree = {
  hasChild: function(node) {
    return _.isNil(node.child) ? false : true;
  },

  hasNext: function(node) {
    return _.isNil(node.next) ? false : true;
  },

  traverse: function(tree, startingNodeId, fn) {
    if(_.isNil(tree.nodes[startingNodeId])) return;
    var node = tree.nodes[startingNodeId];
    fn(tree, node);
    if(this.hasChild(node))
      this._traverse(tree, node.child, fn);
  },

  _traverse: function(tree, nodeId, fn) {
    if(_.isNil(tree.nodes[nodeId])) return; // base case
    var node = tree.nodes[nodeId];
    fn(tree, node);
    if(this.hasChild(node))
      this._traverse(tree, node.child, fn);
    if(this.hasNext(node))
      this._traverse(tree, node.next, fn);
  },

  get: function(tree, id) {
    return tree.nodes[id];
  },

  parent: function(tree, id) {
    var node = this.get(tree, id);
    var parentId = node.parent;
    var parent = parentId === null ? null : this.get(tree, parentId);
    return parent;
  },

  child: function(tree, id) {
    var node = this.get(tree, id);
    var childId = node.child;
    var child = (childId === null) ? null : this.get(tree, childId);
    return child;
  },

  next: function(tree, id) {
    var node = this.get(tree, id);
    var nextId = node.next;
    var next = (nextId === null) ? null : this.get(tree, nextId);
    return next;
  },

  previous: function(tree, id) {
    var node = this.get(tree, id);
    var previousId = node.previous;
    var previous = (previousId === null) ? null : this.get(tree, previousId);
    return previous;
  },

  // TODO: was hasChild
  hasChildDescendant: function(tree, parentId, childId) {
    var that = this;
    var node = this.get(tree, childId);
    var out = false;

    var walk = function(node) {
      if(node.parent === parentId) out = true;
      var parent = that.parent(tree, node.id);
      if(parent !== null) walk(parent);
    };

    walk(node);

    return out;
  },

  getTemplate: function(tree) {
    var newId = String(tree.nextId++);
    return {
      "id": newId,
      "label": "new_"+newId,
      "next": null,
      "previous": null,
      "child": null,
      "parent": null
    };
  },

  createNode: function(tree, toId) {
    var tmpl = this.getTemplate(tree);
    tree.node[tmpl.id] = tmpl;
    var shouldBeChild = (toId === tree.rootId) ? true : false;
    return this.moveNode(tree, tmpl.id, toId, shouldBeChild);
  },

  cloneNode: function(tree, cloneId) {
    var that = this

    var _clone = function(node) {
      var newId = String(tree.nextId++);
      var clone = _.cloneDeep(node);

      clone.id = newId;
      clone.name = clone.name + "_copy";
      clone.next = null;
      clone.previous = null;
      clone.parent = null;
      clone.child = null;

      tree.node[newId] = clone;
      return clone
    }

    var map = {}
    var node = this.get(tree, cloneId);
    var rootClone = _clone(node)
    map[node.id] = rootClone.id

    var walkDown = function(compRef, fn) {
      fn(compRef)
      if(compRef.next !== null) walkDown(that.get(tree, compRef.next), fn)
      if(compRef.child !== null) walkDown(that.get(tree, compRef.child), fn)
    }

    if(node.child !== null) {
      // create the child clones
      walkDown(this.get(tree, node.child), function(node) {
        var clone = _clone(node)
        map[node.id] = clone.id
      })

      // setup links for all children
      walkDown(this.get(tree, node.child), function(node) {
        var cloneNode = that.get(tree, map[node.id])
        if(node.next !== null) cloneNode.next = map[node.next]
        if(node.prev !== null) cloneNode.prev = map[node.prev]
        if(node.parent !== null) cloneNode.parent = map[node.parent]
        if(node.child !== null) cloneNode.child = map[node.child]
      })

      rootClone.child = map[node.child]
    }

    return this.moveNode(tree, rootClone.id, cloneId, false);
  },

  deleteNode: function(tree, id) {
    var that = this;
    if(tree.rootId === id) return tree;

    this.removeFromTree(tree, id);

    var deleteNode = function(id) {
      var node = that.get(tree, id);
      if(node.child !== null) deleteNode(node.child);
      if(node.next !== null) deleteNode(node.next);
      delete tree.node[id];
    };
    deleteNode(id);

    return tree;
  },

  addNext: function(tree, toId, id) {
    var toNode = this.get(tree, toId);
    var toNextNode = this.next(tree, toId);
    var node = this.get(tree, id);

    if(toNextNode !== null) {
      toNextNode.previous = id;
      node.next = toNextNode.id;
    }

    node.parent = toNode.parent;
    node.previous = toId;
    toNode.next = id;
  },

  addChild: function(tree, toId, id) {
    var toNode = this.get(tree, toId);
    var toChildNode = this.child(tree, toId);
    var node = this.get(tree, id);

    if(toChildNode !== null) {
      node.next = toNode.child;
      toChildNode.previous = id;
    }

    toNode.child = id;
    node.parent = toId;
  },

  removeFromTree: function(tree, id) {
    var node = this.get(tree, id);
    var parent = this.parent(tree, id);
    var next = this.next(tree, id);
    var previous = this.previous(tree, id);

    if(parent === null) return tree; // new node

    if(previous === null) {
      // update the parent
      parent.child = node.next;
    } else {
      // update the previous
      previous.next = node.next;
    }

    if(next !== null) {
      // update the next
      next.previous = node.previous;
    }

    node.parent = null;
    node.next = null;
    node.previous = null;

    return tree;
  },

  moveNode: function(tree, fromId, toId, shouldBeChild) {
    var hasChild = this.hasChild(tree, fromId, toId);
    if(fromId === toId || hasChild) return tree;

    this.removeFromTree(tree, fromId);

    if(toId === tree.rootId || shouldBeChild === true) {
      this.addChild(tree, toId, fromId);
    } else {
      this.addNext(tree, toId, fromId);
    }

    return tree;
  }
};
