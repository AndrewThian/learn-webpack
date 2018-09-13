import { sum, sub } from "./math";

/**
 * because the file itself doesn't export any code, when we import it like this, 
 we're making sure that it just runs(gets executed)
 *
 * tl;dr:
 * 
 * executes the module/file via import
 * 
 * webpack doesn't actually go out and automatically include every js file
 to make sure this following file gets included into our bundle.js
 we need to make sure we import it in at least one location.
 */
import "./image_viewer";

/**
 * when importing anything not js, we need to define the extension
 * we need to configure webpack to deal with css imports by including two loaders:
 * 
 * css-loader - knows how to deal with css imports
 * style-loader - takes css imports and adds them to the HTML document
 */
import "../styles/image_viewer.css"


const total = sum(1,2)
console.log(total)