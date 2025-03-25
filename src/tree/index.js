import React from 'react';
import './index.css'

export default function Tree() {
    return (
        <div className="tree">
            <ul className="animalTree">
                <li><a>mammals</a>
                    <ul>
                        <li><a>cheetah</a>
                            <li>
                                <li><a>bear</a></li>
                                <li>
                                    <ul>
                                        <li><a>lion</a></li>
                                        <li><a>dog</a>
                                            <ul>
                                                <li><a>elephant</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li><a>ape</a></li>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}
