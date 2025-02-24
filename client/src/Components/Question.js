import { Fragment, useState } from "react"
import { Button, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

export const Question = ({ state, name, onChange }) => {
    const enumOptions = {
        CheckBox: 0,
        RadioButton: 1,
        Text: 2,
        Question: 3,
        Options: 4
        
    }
    const [input, setInput] = useState(parseInt(state.type));
    const add = () => {
        if (state.options.length < 10) {
            state.options.push("Option")
            onChange(name, state)
        }
    }
    const remove = () => {
        if (state.options.length > 2) {
            state.options.pop()
            onChange(name, state)
        }
    }

    const handleChange = (e, value) => {
        switch (e) {
            case enumOptions.CheckBox:
            case enumOptions.RadioButton:
            case enumOptions.Text:
                setInput(value);
                state.type = value;
                onChange(name, state);
                break;
            case enumOptions.Question:
                state.question = value;
                onChange(name, state)
                break;
            case enumOptions.Options:
                state.options = value
                onChange(name, state)
                break;
            default:
                return;
        }
    }
    return (
        <div>
            <input name="Question" placeholder={state.question} required onChange={e => handleChange(enumOptions.Question, e.currentTarget.value)}></input>
            <br />
            {input === enumOptions.CheckBox ? (
                <>
                    <p>Add Options for CheckBox</p>
                    <Options onChange={handleChange} option={state.options} add={add} remove={remove}/>
                </>
            ) : input === enumOptions.RadioButton ? (
                <>
                    <p>Add Options for Radio Buttons</p>
                    <Options onChange={handleChange} option={state.options} add={add} remove={remove}/>
                </>
            ) : (
                <input></input>
            )}
            <br />

            <ToggleButtonGroup
                type="radio"
                name={`options-${name}`}
                defaultValue={parseInt(state.type)}   
                onChange={value => handleChange(value, value)}
                >
                <ToggleButton
                    id={`tbg-radio-1-${name}`}
                    value={enumOptions.CheckBox}
                    // onChange={() => setInput(enumOptions.CheckBox)}
                >
                    Checkbox
                </ToggleButton>
                <ToggleButton
                    id={`tbg-radio-2-${name}`}
                    value={enumOptions.RadioButton}
                    // onChange={() => setInput(enumOptions.RadioButton)}
                >
                    Radio
                </ToggleButton>
                <ToggleButton
                    id={`tbg-radio-3-${name}`}
                    value={enumOptions.Text}
                    // onChange={() => setInput(enumOptions.Text)}
                >
                    Text
                </ToggleButton>
            </ToggleButtonGroup>

            <br />
            <br />
        </div>
        
    );
}

const Options = ({onChange, option, add, remove}) => {
    
    const handleChange = (e) => {
        option[e.currentTarget.id] = e.currentTarget.value;
        onChange(4, option)
    }

    return (
        <>
            {option.map((v, i) => (
                    <Fragment key={i}>
                        <input required defaultValue={v} id={i} onChange={handleChange}></input>
                        <br />
                    </Fragment>
            ))}
            <Button onClick={add}>+</Button> {' '} <Button onClick={remove}>-</Button>
        </>
    )
}