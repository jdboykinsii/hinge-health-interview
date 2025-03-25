import React from 'react';
import {useState, useEffect} from 'react'
import './index.css'
import staticData from './data.json';

/*
    TODO: These are just some ideas, but could be fun to implement:
    [] What if we used static pathing instead of having to recursively find nested animals?
    [] What about having limits to the levels of nesting?
    [] What about adding an accordion or show/hide based on which level the user clicks on?

 */

export default function Tree() {
    const [animalTreeData, setAnimalTreeData] = useState(staticData);

    let stringAsTree = "";
    /*

    Problem:
    We need to create a structure that can be easily inspected, compiles to HTML, and can eventually
    be rendered on the page as a DOM element.

     Approach:
     We'll be given an object.
     we'll prepend a <ul> to our string representation of a tree.
     For every key:
         We'll create a node, represented as a <li> element.
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

    /*
        Here, we handle updating the tree by first recursively searching for the property we need to update.
        If that value is found, we update the tree.
     */
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

    /*
        This handles detecting when the user has finished adding a new item.
        Because there was no requirement to add a "submit" button, we just cleared up the UI by
        not having one to begin with.

        Additionally, this method handles updating state with the tree once any additions have been
        made.
     */
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

    /*
        Because we're building the UI from a string, every time it changes we'll need to
        re-bind the event handlers.
     */
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
