import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, toggleComplete, updateTodo } from '../features/todo/todoSlice';

function TaskList({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.text);
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);
    const inputRef = useRef(null);

    const editTodo = () => {
        dispatch(updateTodo({ id: todo.id, newText: todoMsg }));
        setIsTodoEditable(false);
    }

    const toggleCompleted = () => {
        dispatch(toggleComplete(todo.id));
    }

    useEffect(() => {
        if (isTodoEditable && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isTodoEditable]);

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}
        >
            {/* checkbox is here */}
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                ref={inputRef}
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${todo.completed ? "border-black/10 px-2" : "border-transparent"
                    } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

                    {/* Here is edit and save button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;
                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable(true);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? <i className="fas fa-save"></i> : <i className="fas fa-edit"></i>}
            </button>
            {/* here is delete button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => dispatch(deleteTodo(todo.id))}
            >
                <i className="fas fa-trash"></i>
            </button>
        </div>
    );
}

export default TaskList;
