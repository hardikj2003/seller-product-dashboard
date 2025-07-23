// For CSS Modules (*.module.css)
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// For standard CSS files (*.css)
declare module "*.css";