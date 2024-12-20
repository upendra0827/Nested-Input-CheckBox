import React, { useState } from "react";
import NestedInput from "./NestedInput";
import './style.css'

const NestInputComponent = () => {

    const [checkboxData, setCheckoutData] = useState([
        {
            id: 1,
            label: "Fruits",
            checked: false,
            children: [
                {
                    id: 11,
                    label: "Citrus",
                    checked: false,
                    children: [
                        {
                            id: 111,
                            label: "Orange",
                            checked: false,
                            children: [
                                { id: 1111, label: "Valencia Orange", checked: false },
                                { id: 1112, label: "Navel Orange", checked: false }
                            ]
                        },
                        {
                            id: 112,
                            label: "Lemon",
                            checked: false,
                            children: [
                                { id: 1121, label: "Eureka Lemon", checked: false },
                                { id: 1122, label: "Meyer Lemon", checked: false }
                            ]
                        }
                    ]
                },
                {
                    id: 12,
                    label: "Berries",
                    checked: false,
                    children: [
                        {
                            id: 121,
                            label: "Strawberry",
                            checked: false,
                            children: [
                                { id: 1211, label: "Albion Strawberry", checked: false },
                                { id: 1212, label: "Monterey Strawberry", checked: false }
                            ]
                        },
                        {
                            id: 122,
                            label: "Blueberry",
                            checked: false,
                            children: [
                                { id: 1221, label: "Duke Blueberry", checked: false },
                                { id: 1222, label: "Legacy Blueberry", checked: false }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            label: "Vegetables",
            checked: false,
            children: [
                {
                    id: 21,
                    label: "Leafy Greens",
                    checked: false,
                    children: [
                        {
                            id: 211,
                            label: "Spinach",
                            checked: false,
                            children: [
                                { id: 2111, label: "Baby Spinach", checked: false },
                                { id: 2112, label: "Savoy Spinach", checked: false }
                            ]
                        },
                        {
                            id: 212,
                            label: "Lettuce",
                            checked: false,
                            children: [
                                { id: 2121, label: "Romaine Lettuce", checked: false },
                                { id: 2122, label: "Butterhead Lettuce", checked: false }
                            ]
                        }
                    ]
                },
                {
                    id: 22,
                    label: "Root Vegetables",
                    checked: false,
                    children: [
                        {
                            id: 221,
                            label: "Carrot",
                            checked: false,
                            children: [
                                { id: 2211, label: "Nantes Carrot", checked: false },
                                { id: 2212, label: "Imperator Carrot", checked: false }
                            ]
                        },
                        {
                            id: 222,
                            label: "Beetroot",
                            checked: false,
                            children: [
                                { id: 2221, label: "Red Beetroot", checked: false },
                                { id: 2222, label: "Golden Beetroot", checked: false }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
    );

    const handleToggleAllChildren = ({ data, value }) => {
        for (let i = 0; i < data.length; i++) {
            data[i].checked = value

            if (data[i].children) {
                handleToggleAllChildren({ data: data[i].children, value })
            }
        }
    }

    const handleUnselectParents = ({ parents }) => {
        for (let i = 0; i < parents.length; i++) {
            parents[i].checked = false
        }
    }



    const handleSelectParents = ({ parents }) => {
        const areAllChlidrenActive = ({ node }) => {
            for (let i = 0; i < node.length; i++) {
                if (!node[i].checked) return false

                if (node[i].children && !areAllChlidrenActive({ node: node[i].children })) {
                    return false
                }
            }
            return true
        }

        for (let i = parents.length - 1; i > -1; i--) {
            if (parents[i].children && areAllChlidrenActive({ node: parents[i].children })) parents[i].checked = true
            else break
        }
    }

    const handleMarkCheckbox = ({ data, id, parents }) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                data[i].checked = !data[i].checked

                if (data[i].children) {
                    handleToggleAllChildren({ data: data[i].children, value: data[i].checked })
                }

                if (data[i].checked)
                    handleSelectParents({ parents: [...parents] })

                else {
                    handleUnselectParents({ parents: [...parents] })
                }
            }

            else if (data[i].children) {
                parents.push(data[i])
                handleMarkCheckbox({ data: data[i].children, id, parents })
            }
        }
        parents.pop()
    }

    const handleChange = ({ e, id }) => {
        const parents = []
        const checkboxDataClone = [...checkboxData]
        handleMarkCheckbox({ data: checkboxDataClone, id, parents })
        setCheckoutData(checkboxDataClone)
    }


    return (
        <div className="nested-input">
            <h1>Nested Input</h1>
            <NestedInput checkboxData={checkboxData} handleChange={handleChange} />
        </div>
    )
};

export default NestInputComponent;
