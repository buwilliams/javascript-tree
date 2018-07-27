var TreeJson = {
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
