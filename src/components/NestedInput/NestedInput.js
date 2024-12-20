import React from "react";

const NestedInput = ({ checkboxData, handleChange }) => {
    return <div className="nested-input">
        {
            checkboxData.map((item, i) => (
                <div key={item.id}>
                    <div>
                        <input type="checkbox" checked={item.checked} onChange={(e) => handleChange({ e: e, id: item.id })} />
                        <label>{item.label}</label>
                    </div>
                    <div className="children">
                        {
                            item.children && <NestedInput checkboxData={item.children} handleChange={handleChange} />
                        }
                    </div>
                </div>
            ))
        }
    </div>
};

export default NestedInput;
