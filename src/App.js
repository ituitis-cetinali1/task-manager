import { useEffect, useState } from "react";
import { db } from "./firebase";
import { v4 as uuidv4 } from 'uuid';


import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore/lite";
import Dnd from "./Dnd";

console.log(process.env.REACT_APP_CONFIG)



function App() {
  const [boards, setBoards] = useState([{ tasks: [], title: "Board 1" }])
  const boardsCollectionReference = collection(db, "boards")
  const createBoard = async (boardTitle) => {
    await addDoc(boardsCollectionReference, { tasks: [], title: boardTitle, idx: boards.length });
    getBoards();
  };
  const createTask = async (boardId, newTaskTitle, newTaskDescr/* ,newTaskColor */) => {
    console.log(boardId)
    const boardDoc = doc(db, "boards", boardId);
    const boardData = (await getDoc(boardDoc)).data();
    const newTaskId = uuidv4();

    const newTask = {
      id: newTaskId,
      title: newTaskTitle,
      description: newTaskDescr,
    };

    await updateDoc(boardDoc, {
      tasks: arrayUnion(newTask)
    });
    getBoards();  // Refresh boards after task creation
  };
  const updateBoard = async (id, title, order) => {
    const boardDoc = doc(db, "boards", id);
    if (title === null) {
      const newFields = { idx: order };
      await updateDoc(boardDoc, newFields);

    } else {
      const newFields = { title: title };
      await updateDoc(boardDoc, newFields);

    }
  };
  const updateTask = async (boardId, taskIndex, taskTitle, taskDescription/* , taskColor */) => {
    const boardDoc = doc(db, "boards", boardId);
    const boardData = (await getDoc(boardDoc)).data();
    const newTask = {
      id: boardData.tasks[taskIndex].id,
      title: (taskTitle === null) ? boardData.tasks[taskIndex].title : taskTitle,
      description: (taskDescription === null) ? boardData.tasks[taskIndex].description : taskDescription,
      /* color: (taskColor === null) ? boardData.tasks[taskIndex].color : taskColor, */
    };

    const newTasks = boardData.tasks.with(taskIndex, newTask)
    /* const newTasks = [
      ...boardData.tasks.slice(0, taskIndex),
      newTask,
      ...boardData.tasks.slice(taskIndex)
    ]; */

    const newFields = { tasks: newTasks };
    await updateDoc(boardDoc, newFields);
    getBoards();  // Refresh boards after task creation
  };
  const insertTask = async (boardId, index, task) => {
    getBoards();  // Refresh boards after task creation
    const boardDoc = doc(db, "boards", boardId);
    const boardData = (await getDoc(boardDoc)).data();

    const newTasks = [
      ...boardData.tasks.slice(0, index),
      task,
      ...boardData.tasks.slice(index)
    ];
    const newFields = { tasks: newTasks };
    await updateDoc(boardDoc, newFields);

    getBoards();  // Refresh boards after task creation
  }
  const moveTask = async (sourceBoardId, destinationBoardId, sourceIdx, destinationIdx) => {

    const sourceBoardDoc = doc(db, "boards", sourceBoardId);
    const sourceBoardData = (await getDoc(sourceBoardDoc)).data();

    const task = sourceBoardData.tasks[sourceIdx]
    //remove task from source
    await updateDoc(sourceBoardDoc, {
      tasks: arrayRemove(task)
    });
    //insert task at destination
    let index = destinationIdx
    /* if (sourceBoardId === destinationBoardId && destinationIdx > sourceIdx) {
      index = destinationIdx - 1
    } */
    const destinationBoardDoc = doc(db, "boards", destinationBoardId);
    const destinationBoardData = (await getDoc(destinationBoardDoc)).data();
    const newTasks = [
      ...destinationBoardData.tasks.slice(0, index),
      task,
      ...destinationBoardData.tasks.slice(index)
    ];
    const newFields = { tasks: newTasks };
    await updateDoc(destinationBoardDoc, newFields);
    getBoards();  // Refresh boards after task creation
  }
  const moveBoard = async (sIdx, dIdx) => {
    const currentBoards = boards;
    const temp = currentBoards[sIdx]
    currentBoards.splice(sIdx, 1)
    currentBoards.splice(dIdx, 0, temp)
    currentBoards.map((board, idx) => (
      updateBoard(board.id, null, idx)))
    getBoards();

  }
  const deleteBoard = async (id) => {
    const boardDoc = doc(db, "boards", id);
    await deleteDoc(boardDoc);
    getBoards();
  };
  const deleteTask = async (boardId, taskIndex) => {
    const boardDoc = doc(db, "boards", boardId);
    const boardData = (await getDoc(boardDoc)).data();
    await updateDoc(boardDoc, {
      tasks: arrayRemove(boardData.tasks[taskIndex])
    });
    getBoards();
  };
  const getBoards = async () => {
    const data = await getDocs(boardsCollectionReference);
    const boards = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const sortedBoards = boards.sort((a, b) => a["idx"] - b["idx"]);
    setBoards(sortedBoards);
  }
  
  useEffect(() => {
    getBoards();
  }, [])

  return (
    <div >
        <Dnd
          boards={boards}
          getBoards={getBoards}
          updateBoard={updateBoard}
          deleteBoard={deleteBoard}
          createBoard={createBoard}
          createTask={createTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          insertTask={insertTask}
          moveTask={moveTask}
          moveBoard={moveBoard}
        ></Dnd>
    </div>
  );
}

export default App;
