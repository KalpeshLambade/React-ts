import { v4 as uuidv4 } from 'uuid';

export interface I_Todo {
    title?: string;
    description?: string;
    note?: string;
    createdStamp: number;
    updatedStamp: number;
    deletedStamp: number;
    uuid: string;
}

export class TodoService {

    private static instance: TodoService | null = null;

    constructor() { }

    static getInstance(): TodoService {
        if (!TodoService.instance) {
            TodoService.instance = new TodoService()
        }
        return TodoService.instance;
    }


    save(title: string, description?: string, note?: string,) {
        try {
            const _localuuid = uuidv4();

            let newTodo: I_Todo = {
                title: title,
                description: description || '',
                note: note || '',
                createdStamp: +new Date(),
                updatedStamp: 0,
                deletedStamp: 0,
                uuid: _localuuid
            };

            let todos: I_Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
            todos.push(newTodo);
            localStorage.setItem('todos', JSON.stringify(todos));

            return true;
        } catch (error) {
            console.error(error);
            return false
        }
    }

    getAllByDelete() {
        try {
            let ToDos: I_Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
            ToDos = ToDos?.filter((todo) => todo?.deletedStamp == 0)

            return ToDos;
        } catch (error) {
            throw new Error;
        }
    }

    delete(uuid: string) {
        try {
            let ToDOs: I_Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
            let deleteTodo = ToDOs.find((todo) => todo?.uuid == uuid);

            if (deleteTodo) {
                deleteTodo.deletedStamp = + new Date();

                let updatedTodos = ToDOs.map(todo => todo.uuid === uuid ? deleteTodo : todo);

                localStorage.setItem('todos', JSON.stringify(updatedTodos));
                return true;
            }

            return false

        } catch (error) {
            throw new Error;
        }
    }

    getByUuid(uuid: string) {
        try {
            let ToDOs: I_Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
            let todo = ToDOs.find((todo) => todo?.uuid == uuid);

            if (todo) {
                return todo;
            }

            return null;

        } catch (error) {
            throw new Error;
        }
    }

    update(todo: I_Todo) {
        try {
            let todos: I_Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
            if (todo) {
                todo.updatedStamp = + new Date();
                let newList = todos.map((el) => el?.uuid == todo?.uuid ? todo : el)
                localStorage.setItem('todos', JSON.stringify(newList));
                return true;
            }
            return false
        } catch (error) {
            throw new Error
        }

    }

}
