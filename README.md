# JavaScript Tree

A implementation of a doubly-linked list in JavaScript. It's been used in a production system for over 18 months as of writing. I'm working on making it more generic for public use. Feel free to make contributions.

## Benefits

- Handles deeply nested structures, ie. representing File Systems
- Traverse in any direction (up or down)
- Flat JSON structure which is easy to `grok` and alter.
- Straight-forward API for developer happiness
- Takes the pain out of managing nested JSON
- Fast!!! (and can be improved!)

## Tree API

- `traverse(tree, startingNodeId, fn)`
- `get(tree, id)`
- `hasChild(node)`
- `hasChildDescendant(tree, parentId, childId)`
- `hasNext(node)`
- `parent(tree, id)`
- `child(tree, id)`
- `next(tree, id)`
- `previous(tree, id)`
- `getTemplate(tree)`
- `createNode(tree, toId)`
- `addNext(tree, toId, id)`
- `addChild(tree, toId, id)`
- `cloneNode(tree, cloneId)`
- `deleteNode(tree, id)`
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
