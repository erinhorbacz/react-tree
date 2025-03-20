import { useState, useEffect, useRef } from "react";
import { traverse } from "./backend/functions.tsx";
import Popup from "./frontend/Popup.tsx";
import "./assets/Popup.css";

// Extend the Window interface
declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: {
      getFiberRoots: (renderId: number) => Set<any>;
      onCommitFiberRoot: (rendererId: number, root: any) => void;
      renderers: Map<number, any>;
    };
  }
}

function App() {
  const [tree, setTree] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const originalOnCommitFiberRoot = useRef<((rendererId: number, root: any) => void) | null>(null);

  // Create a unique root element
  useEffect(() => {
    const root = document.createElement("div");
    root.id = "react-tree-root";
    document.body.appendChild(root);
    // Cleanup on unmount
    return () => {
      document.body.removeChild(root);
    };
  }, []);

  const updateTree = () => {
    const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!hook) {
      console.log("React DevTools not detected.");
      return;
    }
    const parentArr: any[] = [];
    const reactInstances = hook.getFiberRoots(1);
    reactInstances.forEach((root) => {
      const modifiedRoot = root.current.stateNode.current;
      modifiedRoot.type = "root";
      traverse(modifiedRoot, parentArr);
    });
    setTree(parentArr[0]);
  };

  useEffect(() => {
    const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!hook) {
      console.log("React DevTools not detected.");
      return;
    }
    if (!originalOnCommitFiberRoot.current) {
      originalOnCommitFiberRoot.current = hook.onCommitFiberRoot;
    }
    hook.onCommitFiberRoot = (rendererId, root) => {
      if (originalOnCommitFiberRoot.current) {
        originalOnCommitFiberRoot.current(rendererId, root);
      }
      if (!isDragging) {
        updateTree();
      }
    };

    if (!isDragging) {
      updateTree();
    }

    return () => {
      if (hook && originalOnCommitFiberRoot.current) {
        hook.onCommitFiberRoot = originalOnCommitFiberRoot.current;
      }
    };
  }, [isDragging]);

  const handleClose = () => {
    setIsVisible(false);
    const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (hook && originalOnCommitFiberRoot.current) {
      hook.onCommitFiberRoot = originalOnCommitFiberRoot.current;
    }
    const injectedScript = document.querySelector('script[src*="react-tree-index.js"]');
    const injectedCssScript = document.querySelector('link[href*="react-tree-index.css"]');
    //remove injected script
    if (injectedScript) {
      console.log("REMOVING INJECTED SCRIPT");
      injectedScript.remove();
    }
    //remove injected css
    if (injectedCssScript) {
      console.log("REMOVING INJECTED CSS");
      injectedCssScript.remove();
    }
    const root = document.getElementById("react-tree-root");
    if (root) {
      root.remove();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Popup
      tree={tree}
      isDragging={isDragging}
      setIsDragging={setIsDragging}
      handleClose={handleClose}
    />
  );
}

export default App;
