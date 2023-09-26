import { useState } from "react";

function AddRemoveOptionField({ initialOptions = [], ...props }) {
    const defaultOption = { id: null, optionText: '' };
    const [inputFields, setInputFields] = useState(initialOptions.length ? initialOptions : [defaultOption]);


    const addInputField = () => {
        setInputFields([...inputFields, { optionText: '' }]);
    }

    const removeInputField = (indexToRemove) => {
        setInputFields(inputFields.filter((_, index) => index !== indexToRemove));
    }

    const handleChange = (index, event) => {
        const updatedFields = [...inputFields];
        updatedFields[index].optionText = event.target.value;
        setInputFields(updatedFields);
    }

    return (
        <div className="container">
            {inputFields.map((field, index) => (
                <div className="row my-3" key={index}>
                    <div className="col">
                        <div className="form-group">
                            <input
                                type="text"
                                value={field.optionText}
                                onChange={(event) => handleChange(index, event)}
                                name={"option-" + index}
                                className="form-control"
                                placeholder="Options"
                            />
                            {field.id && <input type="hidden" value={field.id} name={"optionId-" + index} />}
                        </div>
                    </div>
                    <div className="col-sm-2">
                        {inputFields.length > 1 && (
                            <button
                                className="btn btn-outline-danger"
                                type="button"
                                onClick={() => removeInputField(index)}
                            >
                                x
                            </button>
                        )}
                    </div>
                </div>
            ))}
            <div className="row">
                <div className="col-sm-12">
                    <button className="btn btn-outline-success" type="button" onClick={addInputField}>
                        Add New
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddRemoveOptionField;
