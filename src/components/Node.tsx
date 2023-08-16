import { useState } from 'react';
import { TNode } from './HelloWorld';

const Node = ({ nodes, level }: { nodes: TNode; level: number }) => {
  const [show, setShow] = useState<boolean>(false);
  const hasChildren = nodes.children.length > 0;
  return (
    <div>
      <button onClick={() => setShow((prev) => !prev)}>
        {hasChildren && (show ? 'Close ' : 'Open ')}
        {nodes.node}
      </button>
      {show && hasChildren && (
        <div style={{ paddingLeft: `${1 * level}rem` }}>
          {nodes.children.map((item) => (
            <Node
              nodes={item}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Node;
