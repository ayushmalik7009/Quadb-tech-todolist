import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: JSON.parse(localStorage.getItem("todos")) || [],
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
                completed: false
            };
            state.todos.push(todo);
            localStorage.setItem("todos", JSON.stringify(state.todos));
        },

        updateTodo: (state, action) => {
            const { id, newText } = action.payload;
            const todoToUpdate = state.todos.find(todo => todo.id === id);
            if (todoToUpdate) {
                todoToUpdate.text = newText;
                localStorage.setItem("todos", JSON.stringify(state.todos));
            }
        },

        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            localStorage.setItem("todos", JSON.stringify(state.todos));
        },

        toggleComplete: (state, action) => {
            const todoToToggle = state.todos.find(todo => todo.id === action.payload);
            if (todoToToggle) {
                todoToToggle.completed = !todoToToggle.completed;
                localStorage.setItem("todos", JSON.stringify(state.todos));
            }
        }
    }
});

export const { addTodo, updateTodo, deleteTodo, toggleComplete } = todoSlice.actions;

export default todoSlice.reducer;
