// const parseFunction = (fn: any) => {
//   const string = `${fn}`;

//   const match = string.match(/function/);
//   if (match == null) return 'fn()';

//   const firstIndex = match[0] ? string.indexOf(match[0]) + match[0].length + 1 : null;
//   if (firstIndex == null) return 'fn()';

//   const lastIndex = string.indexOf('(');
//   const fnName = string.slice(firstIndex, lastIndex);
//   if (fnName.length === 0) return 'fn()';
//   return `${fnName} ()`;
// };

const getProps = (node: any) => {
  try {
    const props: { [key: string]: any } = {};

    function filterProps(propList: any) {
      for (const [key, value] of Object.entries(propList)) {
        if (key === "props") {
          filterProps(propList[key]);
        } else if (value === "children" || typeof value === "object") {
          continue;
        } else if (typeof value === "function") {
          props[key] = "fn()";
        } else if (!value) {
          props[key] = "''";
        } else {
          props[key] = `"${value}"`;
        }
      }
    }

    filterProps(node.memoizedProps);

    // const keys = Object.keys(node.memoizedProps);
    // keys.forEach((prop) => {
    //   const value = node.memoizedProps[prop];
    //   if (typeof value === 'function') {
    //     props[prop] = parseFunction(value);
    //     // TODO - get these objects to work, almost always children property
    //   } else if (typeof node.memoizedProps[prop] === 'object') {
    //     // console.log("PROP Object: ", node.memoizedProps[prop]);

    //     props[prop] = 'object*';

    //     // TODO - parse object
    //   }
    //   else props[prop] = node.memoizedProps[prop];
    // });
    return props;
  } catch (e) {
    return {};
  }
};

export const traverse = (node: any, parentArr: any) => {
  const newComponent = {
    name: null,
    children: [],
    state: [],
    props: {} as { [key: string]: any },
    id: null,
    isDOM: false,
  };

  // get name and type
  if (node.type) {
    if (node.type.name) {
      newComponent.name = node.type.name;
      newComponent.isDOM = false;
    } else if (node?.type?.render?.displayName) {
      newComponent.name = node?.type?.render?.displayName;
      newComponent.isDOM = false;
    } else {
      newComponent.name = node.type;
      newComponent.isDOM = true;
    }

    if (typeof newComponent.name !== "string") {
      newComponent.isDOM = true;
    }
  }

  //if this is just a regular dom element, do not add it to the tree (ex.- div)
  if ((newComponent.isDOM && !(newComponent.name === "root")) || !newComponent.name) {
    if (node.child != null) traverse(node.child, parentArr);
    if (node.sibling != null) traverse(node.sibling, parentArr);
    return;
  }

  // TODO ** only works on local host **
  // get ID
  if (node._debugID) newComponent.id = node._debugID;
  if (node.memoizedState) newComponent.state = node.memoizedState;
  if (node.memoizedProps) newComponent.props = getProps(node);

  newComponent.children = [];
  parentArr.push(newComponent);
  if (node.child != null) traverse(node.child, newComponent.children);
  if (node.sibling != null) traverse(node.sibling, parentArr);
  // if (!newComponent.isDOM || newComponent.name === 'root') {
  //   // console.log('adding component', newComponent)
  //   parentArr.push(newComponent);
  //   if (node.child != null) traverse(node.child, newComponent.children);
  //   if (node.sibling != null) traverse(node.sibling, parentArr);
  // } else {
  //   // console.log('will NOT add this element', newComponent)
  //   if (node.child != null) traverse(node.child, parentArr);
  //   if (node.sibling != null) traverse(node.sibling, parentArr);
  // }
};
