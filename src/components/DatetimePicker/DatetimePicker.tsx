import {FC, useState} from "react";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker, KeyboardDateTimePicker,
} from '@material-ui/pickers';
import * as React from "react";

interface DatetimePickerProps {
    label:string
    value:Date
    onChange:any
}
const DatetimePicker: FC<DatetimePickerProps> = ({ label, value, onChange}) => {

    return(
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDateTimePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy hh:mm a"
                    placeholder="dd/MM/yyyy hh:mm"
                    margin="normal"
                    id="start-picker"
                    label={label}
                    value={value}
                    onChange={onChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    InputProps={{
                        style: {
                            fontSize: 14,
                            fontFamily:'Times',
                        }
                    }}
                    style={{width:"185px", marginRight:"5px" }}
                />
            </MuiPickersUtilsProvider>
    )
}
export default DatetimePicker