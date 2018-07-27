# JavaScript Tree

## tree.js API

- `hasChild(node)`
- `hasNext(node)`
- `traverse(tree, startingNodeId, fn)`
- `get(tree, id)`
- `parent(tree, id)`
- `child(tree, id)`
- `next(tree, id)`
- `previous(tree, id)`
- `hasChildDescendant(tree, parentId, childId)`
- `getTemplate(tree)`
- `createNode(tree, toId)`
- `cloneNode(tree, cloneId)`
- `deleteNode(tree, id)`
- `addNext(tree, toId, id)`
- `addChild(tree, toId, id)`
- `removeFromTree(tree, id)`
- `moveNode(tree, fromId, toId, shouldBeChild)`

## Data Structure (doubly-linked list)

```javascript
{
  rootId: 1,
  nextId: 6,
  nodes: {
    "1": {
      id: "1",
      label: "Root",
      parent: null,
      child: "2",
      next: null,
      prev: null
    },
    "2": {
      id: "2",
      label: "Node A",
      parent: "1",
      child: "4",
      next: "3",
      prev: null
    },
    "3": {
      id: "3",
      label: "Node B",
      parent: "1",
      child: null,
      next: null,
      prev: "2"
    },
    "4": {
      id: "4",
      label: "Node C",
      parent: "2",
      child: null,
      next: "5",
      prev: null
    },
    "5": {
      id: "5",
      label: "Node D",
      parent: "2",
      child: null,
      next: null,
      prev: "4"
    }
  }
}
```
