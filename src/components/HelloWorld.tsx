import Node from './Node';

export type TNode = {
  node: string;
  children: TNode[];
};

export default function HelloWorld() {
  const nodes: TNode = {
    node: 'root',
    children: [
      {
        node: 'c1',
        children: [],
      },
      {
        node: 'c2',
        children: [
          {
            node: 'c3',
            children: [
              {
                node: 'c5',
                children: [],
              },
            ],
          },
          {
            node: 'c4',
            children: [],
          },
        ],
      },
    ],
  };
  return (
    <div>
      <Node
        nodes={nodes}
        level={1}
      />
    </div>
  );
}
