import React from 'react'
import Card from '@mui/material/Card';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import clsx from 'clsx';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import { pink, red, yellow, green, blue } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';

function TaskAddForm(props) {
    const [title, setTitle] = React.useState("Task");
    const [descr, setDescr] = React.useState(null);
    
    //color related functions
    /* const [color, setColor] = React.useState(null);
    const handleChange = (event) => {
        setColor(event.target.value);
    };
    const controlProps = (item) => ({
        checked: color === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    }); */


    return (

        <Box
            sx={{
                /* m:0.5, */
                p:0.5,
                width: 'auto',
                //height: 100,
                borderRadius: 3,
                bgcolor: 'grey.100'
            }}
        >
            <FormControl defaultValue="" required>
                {/* <label>Change Task Title</label> */}
                <TextField id="Title" label="Title" variant="outlined" onChange={(event) => { setTitle(event.target.value) }} />
                {/* <label>Change Task Description</label> */}
                <TextField
                    id="outlined-textarea"
                    label="Task Description"
                    placeholder="Placeholder"
                    multiline
                    onChange={(event) => { setDescr(event.target.value) }}
                />
                {/* <label>Change Task Color</label>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >

                    <Radio {...controlProps('a')} sx={{ color: yellow[800], '&.Mui-checked': { color: yellow[600], }, }} />
                    <Radio {...controlProps('b')} sx={{ color: red[800], '&.Mui-checked': { color: red[600], }, }} />
                    <Radio {...controlProps('c')} sx={{ color: green[800], '&.Mui-checked': { color: green[600], }, }} />
                    <Radio {...controlProps('d')} sx={{ color: blue[800], '&.Mui-checked': { color: blue[600], }, }} />
                    <Radio {...controlProps('e')} sx={{ color: pink[800], '&.Mui-checked': { color: pink[600], }, }} />
                </RadioGroup> */}

                <Button
                    variant='secondary'
                    onClick={props.handleTaskAddClose}>
                    Cancel
                </Button>
                <Button
                    onClick={() => { props.createTask(props.boardId, title, descr/* , color */); props.handleTaskAddClose(); }}
                    variant='secondary'>
                    Add Task
                </Button>
                {/* <HelperText /> */}
            </FormControl>
        </Box>
    )
}

export default TaskAddForm


