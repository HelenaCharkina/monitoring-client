import * as React from "react";
import {FC, useState} from "react";
import Select from "react-select";

interface SelectListProps {
    value: number
    onChange: (value:number) => void
}

const options = [
    {value: 0, label: '1 минута'},
    {value: 1, label: '5 минут'},
    {value: 2, label: '10 минут'},
    {value: 3, label: '15 минут'},
    {value: 4, label: '1 час'},
    {value: 5, label: '1 день'}
]
const customStyles = {
    control: (styles: any, state: any) => ({
        ...styles,
        backgroundColor: 'white',
        border: 'none',
        width: 200,
        borderRadius: 0,
        color: 'black',
        marginTop: 16,
        boxShadow: 'none',
        borderBottom: state.isFocused ? '2px solid #3f51b5' : '1px solid rgba(0, 0, 0, 0.42)',
        "&:hover": {
            borderBottom: '2px solid black',
        }

    }),
    option: (styles: any, {data, isDisabled, isFocused, isSelected}: any) => {
        return {
            ...styles,
            backgroundColor: isSelected
                ? '#e3e8ff'
                : isFocused
                    ? '#e3e8ff' : undefined,
            color: 'black',
        };
    },
}
const SelectList: FC<SelectListProps> = ({value, onChange}) => {
    const handleIntervalChange = (i: any) => {
        onChange(i.value)
    };
    return (
        <Select options={options} styles={customStyles} placeholder="Интервал" value={options[value]}
                onChange={handleIntervalChange}/>
    )
}
export default SelectList