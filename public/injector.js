// Define the global function
window.reactTree = function () {
  // Inject the CSS
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "http://localhost:8080/assets/react-tree-index.css"; // Replace with the correct URL
  document.head.appendChild(link);

  // Inject the React app script
  const script = document.createElement("script");
  script.src = "https://your-domain.com/path-to-your-script/react-tree.js"; // Replace with the actual URL
  script.onload = () => {
    console.log("React Tree script injected successfully!");
  };
  script.onerror = () => {
    console.error("Failed to inject React Tree script.");
  };

  // Inject the script into the document
  document.head.appendChild(script);
};
