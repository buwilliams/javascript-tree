const { test, expect } = require('@jest/globals');
const Tree = require('./tree.js');

describe('basic tests', () => {
  test('should create a new tree', () => {
    const t = Tree.createTree();
    expect(t.rootId).toBeNull();
    expect(t.nextId).toEqual(1);
    expect(Object.keys(t.nodes).length).toEqual(0);
  });

  test('should create root node', () => {
    const root = Tree.createRoot(Tree.createTree(), {
      label: 'Root'
    });
    expect(root.rootId).toEqual('1');
    expect(root.nextId).toEqual(2);
    expect(root.nodes['1'].label).toEqual('Root');
    expect(root.nodes['1'].parent).toBeNull();
    expect(root.nodes['1'].child).toBeNull();
    expect(root.nodes['1'].next).toBeNull();
    expect(root.nodes['1'].prev).toBeNull();
  });
});