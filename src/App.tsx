import { useState, useEffect } from "react";
import "./App.css";

// Extend the Window interface
declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: {
      getFiberRoots: () => Set<any>;
    };
  }
}

function App() {
  const [count, setCount] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  // Create a unique root element for the app
  useEffect(() => {
    const root = document.createElement("div");
    root.id = "erin-popup-root";
    document.body.appendChild(root);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(root);
    };
  }, []);

  useEffect(() => {
    // Function to count React components
    const countReactComponents = () => {
      const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!hook) {
        console.log("React DevTools not detected.");
        return null;
      }
      const reactInstances = hook.getFiberRoots();
      console.log("React DevTools detected.", reactInstances);
      let count = 0;
      console.log("these are the react instances...");
      reactInstances.forEach((root) => {
        console.log(root);
        let node = root.current;
        while (node) {
          if (node.elementType) {
            count++;
          }
          node = node.child;
        }
      });

      return count;
    };

    // Update the component count
    const componentCount = countReactComponents();
    setCount(componentCount);
  }, []);

  return (
    <div className='popup-container'>
      <div className='popup-content'>
        <button className='close-button' onClick={() => setIsVisible(false)}>
          ×
        </button>
        <h1>ERIN Horbacz</h1>
        <div className='card'>
          <p>count is {count}</p>
        </div>
        <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
      </div>
    </div>
  );
}

export default App;
