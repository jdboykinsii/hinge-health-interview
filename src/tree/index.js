import React from 'react';
import './index.css'
import staticData from './data.json';
import {renderToString} from "react-dom/server";

export default function Tree() {
    let stringAsTree = "";
    /*
     Approach:
     We'll be given an object.
     we'll prepend a <ul>
     For every key:
         We'll create a node.
         We'll treat the "name" of that key as the name of the animal to print.
         If the key  "name" has a value of an empty object:
             we'll consider that node to be complete, and will append
                 <li><a>{$keyName}</a></li>

         if the key "name" has a value, and is NOT an empty object:
             we'll append this html:
                 <li><a>{$keyName}</a>
                 and then recurse.

     At the end of this loop, we'll append a </li> and a </ul>
    */
    const parseTree = (passedObj) => {
        stringAsTree += '<ul class="animalTree">';

        for(const [key, value] of Object.entries(passedObj)){
            if(Object.keys(passedObj[key]).length === 0){
                stringAsTree += `<li><a>${key}</a></li>`;
            } else {
                stringAsTree += `<li><a>${key}</a>`
                parseTree(passedObj[key]);
                stringAsTree += "</li>";
            }
        }

        stringAsTree += "</ul>";
    }

    parseTree(staticData);

    return (
        <div className="tree" dangerouslySetInnerHTML={{__html: stringAsTree}}></div>
    )
}
