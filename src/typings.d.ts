declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}


// declare module "*.svg" {
//   import { ReactElement, SVGProps } from "react";
//   const content: (props: SVGProps<SVGSVGElement>) => ReactElement;
//   export default content;
// }

// declare module "*.svg" {
//   import React = require("react");
//   export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
//   const src: string;
//   export default src;
// }