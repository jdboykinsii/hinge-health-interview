import React from 'react';
import {useState, useEffect} from 'react'
import './index.css'
import staticData from './data.json';

export default function Tree() {
    const [animalTreeData, setAnimalTreeData] = useState(staticData);

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

        for (const [key, value] of Object.entries(passedObj)) {
            if (Object.keys(passedObj[key]).length === 0) {
                stringAsTree += `<li><a>${key}</a><input id="animalInput" data-key="${key}"/></li>`;
            } else {
                stringAsTree += `<li><a>${key}</a><input id="animalInput" data-key="${key}"/>`
                parseTree(passedObj[key]);
                stringAsTree += "</li>";
            }
        }

        stringAsTree += "</ul>";
    }

    parseTree(animalTreeData);

    const updateInTree = (tag, dataToAppend) => {
        const searchTree = (obj, tag) => {

            if (obj && Object.keys(obj).length === 0) {
                return;
            }

            const entries = Object.entries(obj);

            for(let i = 0; i < entries.length; i++){
                const [key] = entries[i];

                if(key === tag){
                    obj[tag] = {...obj[tag], [dataToAppend]: {}};
                } else {
                    searchTree(obj[key], tag);
                }
            }
        }

        let treeClone = Object.assign({}, animalTreeData);

        searchTree(treeClone, tag);

        return treeClone;
    }

    const handleChange = (evt) => {
        if (evt.key === "Enter") {
            let tag = evt.target.getAttribute("data-key");
            let newValue = evt.target.value;

            let newTreeData = updateInTree(tag, newValue);

            setAnimalTreeData(newTreeData);

            parseTree(animalTreeData);

            evt.target.value = "";
        }
    }

    const bindEventHandlers = () => {
        const treeElem = document.querySelector('.tree');
        const input = treeElem.querySelectorAll('input');
        for (let i = 0; i < input.length; i++) {
            if (input && input.length > 0) {
                input[i].addEventListener('keyup', handleChange);
            }
        }
    }

    useEffect(() => {
        bindEventHandlers();
    }, [animalTreeData]);

    return (
        <div className="tree" dangerouslySetInnerHTML={{__html: stringAsTree}}></div>
    )
}
