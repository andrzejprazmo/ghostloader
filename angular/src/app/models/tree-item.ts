export enum TreeItemType {
  Leaf = 0, Branch = 1, DummyBranch = 2
}

export class TreeItem {
  id: number;
  name: string;
  type: TreeItemType;
  children: TreeItem[];

  constructor() {
    this.children = [];
  }
}
