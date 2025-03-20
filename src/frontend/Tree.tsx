import React, { useState } from "react";
// import '../index.css';
import "../assets/Tree.css";

type TreeNode = {
  id: number | null;
  name: string;
  children?: TreeNode[];
  state?: any[];
  props?: any[];
  [key: string]: any;
};

type TreeProps = { tree: TreeNode[]; zoom: number };

const Tree: React.FC<TreeProps> = ({ tree, zoom }) => {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const handleNodeClick = (node: TreeNode) => {
    // console.log("NODE CLICKED", node);
    setSelectedNode(node);
  };

  const createNode = (node: TreeNode) => {
    return (
      <div className='tree-node' onClick={() => handleNodeClick(node)}>
        {node.name}
      </div>
    );
  };

  const renderTree = (nodes: TreeNode[] | TreeNode) => {
    //this is the root node
    if (!Array.isArray(nodes)) {
      return (
        <div className='tree-branch'>
          <div key={nodes.id} className='tree-item'>
            {createNode(nodes)}
            {nodes.children && nodes.children.length > 0 && (
              <div className='tree-children'>{renderTree(nodes.children)}</div>
            )}
          </div>
        </div>
      );
    }
    return (
      <div className='tree-branch'>
        {nodes.map((node: TreeNode) => (
          <div key={node.id} className='tree-item'>
            {createNode(node)}
            {node.children && node.children.length > 0 && (
              <div className='tree-children'>{renderTree(node.children)}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className='tree-container' style={{ transform: `scale(${zoom})` }}>
        {renderTree(tree)}
      </div>
      {selectedNode && (
        <div className='node-info'>
          <h3>{`Name: ${selectedNode.name}`}</h3>
          {selectedNode.props && Object.keys(selectedNode.props).length > 0 ? (
            <>
              <h3>Props:</h3>
              <p>
                {selectedNode.props &&
                  Object.entries(selectedNode.props).map(([key, value]) => (
                    <li key={key}>{`${key}: ${value}`}</li>
                  ))}
              </p>
            </>
          ) : (
            <h3>Props: None</h3>
          )}
        </div>
      )}
    </>
  );
};

export default Tree;
