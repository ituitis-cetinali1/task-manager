import React from 'react'
import { sizing } from '@mui/system';
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

function BoardAddForm(props) {
    const [title, setTitle] = React.useState("Board");


    return (
        <Box
            sx={{
                /* m:0.5, */
                p: 0.5,
                width: 250,
                //height: 100,
                borderRadius: 3,
                bgcolor: 'grey.100'
            }}
        >
            <FormControl defaultValue="" required>
                {/* <label>Change Board Title</label> */}
                <TextField fullWidth id="Title" label="Title" variant="outlined" onChange={(event) => { setTitle(event.target.value) }} />


                <Button
                    variant='secondary'
                    onClick={props.handleBoardAddClose}>
                    Cancel
                </Button>
                <Button
                    onClick={() => { props.createBoard(title); props.handleBoardAddClose(); }}
                    variant='secondary'>
                    Add Board
                </Button>
                {/* <HelperText /> */}
            </FormControl>
        </Box>
    )
}

export default BoardAddForm