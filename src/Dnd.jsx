import { React, useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { borders } from '@mui/system';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CardHeader from '@mui/material/CardHeader';
import Popover from '@mui/material/Popover';
import BoardForm from './BoardForm';
import TaskForm from './TaskForm';
import TaskAddForm from './TaskAddForm';
import { Typography } from '@mui/material/Typography';
import { pink, red, yellow, green, blue } from '@mui/material/colors';
import { Paper } from '@mui/material/Paper';
import BoardAddForm from './BoardAddForm';

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

function Dnd(props) {
    const [state, setState] = useState(props.boards);
    const [boardFormOpen, setBoardFormOpen] = useState({
        anchorEl: null,
        boardId: null,
    });
    const [taskFormOpen, setTaskFormOpen] = useState({
        anchorEl: null,
        taskInd: null,
        boardInd: null,
    });
    const [taskAddFormOpen, setTaskAddFormOpen] = useState({
        boardInd: null,
    });
    const [BoardAddFormOpen, setBoardAddFormOpen] = useState(false)


    function onDragEnd(result) {
        const { source, destination, draggableId, type, index } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (type === "board") {

            const sInd = +source.droppableId;
            const dInd = +destination.droppableId;
            props.moveTask(props.boards[sInd].id, props.boards[dInd].id, source.index, destination.index)
        }
        if (type === "column") {
            props.moveBoard(source.index, destination.index)
        }
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const handleBoardOpen = (index, anchorEl) => {
        setBoardFormOpen({ anchorEl: anchorEl, boardId: index })
    };
    const handleBoardClose = () => {
        setBoardFormOpen({ anchorEl: null, boardId: null });
    };
    const handleTaskOpen = (index, anchorEl, ind) => {
        setTaskFormOpen({ anchorEl: anchorEl, taskInd: index, boardInd: ind })
    };
    const handleTaskClose = () => {
        setTaskFormOpen({ anchorEl: null, taskInd: null, boardInd: null });
    };
    const handleTaskAddOpen = (ind) => {
        setTaskAddFormOpen({ boardInd: ind })
    };
    const handleTaskAddClose = () => {
        setTaskAddFormOpen({ boardInd: null });
    };
    const handleBoardAddOpen = () => {
        setBoardAddFormOpen(true)
    };
    const handleBoardAddClose = () => {
        setBoardAddFormOpen(false);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
                droppableId="all-columns"
                direction="horizontal"
                type="column"
            >
                {provided => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{ display: 'flex', flexDirection: 'row' }}
                    >
                        {props.boards.map((board, ind) => (
                            <Draggable key={board.id} draggableId={board.id} index={ind}>
                                {provided => (
                                    <div {...provided.draggableProps} ref={provided.innerRef}>
                                        <Card
                                            sx={{
                                                size: 'sm',
                                                width: 250,
                                                mx: 0.5,
                                                //height: 100,
                                                borderRadius: 3,
                                                bgcolor: 'grey.300'
                                            }}
                                        >
                                            <CardHeader
                                                {...provided.dragHandleProps}
                                                action={
                                                    <IconButton aria-label="settings" onClick={(event) => handleBoardOpen(ind, event.currentTarget)}>
                                                        <MoreHorizIcon />
                                                    </IconButton>
                                                }
                                                title={board.title}
                                            />
                                            {/* BOARD STARTS HERE */}
                                            <CardContent>
                                                <Droppable key={ind} droppableId={`${ind}`} boardId={board.id} type="board">
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            /* style={getListStyle(snapshot.isDraggingOver)} */
                                                            {...provided.droppableProps}
                                                        >
                                                            <Popover
                                                                open={boardFormOpen.boardId === ind ? true : false}
                                                                onClose={handleBoardClose}
                                                                anchorEl={boardFormOpen.anchorEl}
                                                                anchorOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'right',
                                                                }}
                                                                transformOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'right',
                                                                }}
                                                            >
                                                                <BoardForm
                                                                    handleBoardClose={handleBoardClose}
                                                                    updateBoard={props.updateBoard}
                                                                    deleteBoard={props.deleteBoard}
                                                                    boardId={board.id}
                                                                />
                                                            </Popover>
                                                            {board.tasks.map((task, index) => (
                                                                <Draggable
                                                                    key={task.id}
                                                                    draggableId={task.id}
                                                                    index={index}
                                                                >
                                                                    {(provided, snapshot) => (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                        /* style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                            )} */
                                                                        >
                                                                            {/* task STARTS HERE */}
                                                                            <Card variant="outlined"
                                                                                sx={{
                                                                                    size: 'sm',
                                                                                    borderRadius: 3,
                                                                                    my: 0.5,
                                                                                    border: "3px solid",
                                                                                    borderColor: 'grey.200',
                                                                                    bgcolor: 'grey.200',
                                                                                    '&:hover': {
                                                                                        borderColor: blue[800],
                                                                                    },
                                                                                }} >
                                                                                <CardHeader
                                                                                    action={
                                                                                        <IconButton aria-label="settings" onClick={(event) => handleTaskOpen(index, event.currentTarget, ind)}>
                                                                                            <MoreHorizIcon />
                                                                                        </IconButton>
                                                                                    }
                                                                                    subheader={task.title}
                                                                                /* title={task.title} */
                                                                                >

                                                                                </CardHeader>
                                                                                <Popover
                                                                                    open={(taskFormOpen.boardInd === ind && taskFormOpen.taskInd === index) ? true : false}
                                                                                    onClose={handleTaskClose}
                                                                                    anchorEl={taskFormOpen.anchorEl}
                                                                                    anchorOrigin={{
                                                                                        vertical: 'top',
                                                                                        horizontal: 'right',
                                                                                    }}
                                                                                    transformOrigin={{
                                                                                        vertical: 'top',
                                                                                        horizontal: 'right',
                                                                                    }}
                                                                                >
                                                                                    <TaskForm
                                                                                        handleTaskClose={handleTaskClose}
                                                                                        updateTask={props.updateTask}
                                                                                        deleteTask={props.deleteTask}
                                                                                        boardId={board.id}
                                                                                        taskIndex={index}
                                                                                    />
                                                                                </Popover>
                                                                                {task.description === null ? "" :
                                                                                    <CardContent>
                                                                                        <p>{task.description}</p>
                                                                                        <div
                                                                                            style={{
                                                                                                display: "flex",
                                                                                                justifyContent: "space-around"
                                                                                            }}
                                                                                        >
                                                                                            {task.descr}

                                                                                        </div>
                                                                                    </CardContent>}
                                                                            </Card>
                                                                            {/* TASK ENDS HERE*/}

                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            <Box sx={{ display: (taskAddFormOpen.boardInd === ind) ? 'block' : 'none' }}>
                                                                <TaskAddForm
                                                                    boardId={board.id}
                                                                    handleTaskAddClose={handleTaskAddClose}
                                                                    createTask={props.createTask}
                                                                />
                                                            </Box>
                                                            {provided.placeholder}

                                                            <Button
                                                                variant={"text"}
                                                                sx={{
                                                                    borderRadius: 3,
                                                                    /* m: "5px", */
                                                                    width: '100%',
                                                                    /* border: "3px solid",
                                                                    borderColor: 'grey.200', */
                                                                    bgcolor: 'rgba(158, 158, 158, 0)',
                                                                    '&:hover': {
                                                                        bgcolor: 'grey.200',
                                                                    },
                                                                }}
                                                                onClick={() => {
                                                                    handleTaskAddOpen(ind);
                                                                }}
                                                            >
                                                                Add new item
                                                            </Button>
                                                        </div>
                                                    )}
                                                </Droppable>
                                            </CardContent>
                                            {/*BOARD ENDS HERE */}
                                        </Card>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        <div>
                            {BoardAddFormOpen ?

                                <BoardAddForm
                                    handleBoardAddClose={handleBoardAddClose}
                                    createBoard={props.createBoard}
                                />
                                :
                                <Button
                                    variant={"contained"}
                                    sx={{
                                        borderRadius: 3,
                                        m: "5px",
                                        width: 250,
                                        border: "3px solid",
                                        borderColor: 'grey.200',
                                        bgcolor: 'rgba(158, 158, 158, 0.7)',
                                        '&:hover': {
                                            bgcolor: 'grey.300',
                                        },
                                    }}
                                    onClick={() => {
                                        setBoardAddFormOpen(true);
                                    }}
                                >
                                    Add New Board
                                </Button>
                            }
                        </div>

                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}


export default Dnd