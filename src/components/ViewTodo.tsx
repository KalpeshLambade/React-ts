import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast, { Toaster } from 'react-hot-toast';
import { I_Todo, TodoService } from '../services/TodoService';
import { useNavigate } from 'react-router-dom';

const todos = TodoService.getInstance();

const ViewTodo = () => {
    const [todoList, setTodoList] = useState<I_Todo[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [uuid,setUuid] = useState<string>('');
    const route = useNavigate()

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        const allTodos = todos.getAllByDelete();
        setTodoList(allTodos);
    }

    const handleClose = () => setShow(false);
    const handleShow = (uuid:string) => {
        setUuid(uuid);
        setShow(true)
    };
    const deleteTodo = ()=> {

        let result= todos.delete(uuid);
        setShow(false);
        setUuid('');

        if(result){
            fetchTodos();
            toast.success('Todo Deleted !');
        }else{
            toast.error('Something Went Wrong');

        }
    }

    return <>
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Accordion className='w-50'>
                <h1 className='text-center'>Your Todos</h1>
                {todoList.map((todo, index) => (
                    <Accordion.Item eventKey={index.toString()} key={todo?.uuid}>
                        <Accordion.Header >
                            <div className='d-flex justify-content-between w-100 p-2'>
                                <p className='mb-0'>{todo?.title}</p>
                                <p className='mb-0'>{
                                todo?.updatedStamp ? new Date(todo?.updatedStamp).toLocaleDateString(): 
                                new Date(todo?.createdStamp).toLocaleDateString()
                                }</p>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div>{todo?.description}</div>
                            <strong>{todo?.note}</strong>
                            <div className='d-flex justify-content-center align-items-center'>
                                <Button variant="success" className='m-2' onClick={()=> route(`/update/${todo?.uuid}`)}>Update</Button>
                                <Button variant="danger" onClick={()=> handleShow(todo?.uuid)}>Delete</Button>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Todo's</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure want to delete this todo!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={deleteTodo}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>

        <Toaster
            position="top-center"
            reverseOrder={false}
        />
    </>
}
export default ViewTodo