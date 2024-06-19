import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { ChangeEvent, FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { TodoService } from '../services/TodoService';


interface I_Todo {
    title: string;
    description: string;
    note: string;
}

const AddToDo = () => {
    const [toDo, setToDo] = useState<I_Todo>(
        {
            title: '',
            description: '',
            note: ''
        }
    )

    const handelFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let name = e?.target?.name;
        let value = e?.target?.value;

        setToDo({ ...toDo, [name]: value })
    }

    const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!toDo?.title.trim()) {
            toast.error('Title cannot be empty');
            return;
        }

        let newTodo = TodoService.getInstance();
        let isAdded = newTodo.save(toDo?.title, toDo?.description, toDo?.note);

        if (isAdded) {
            setToDo({
                title: '',
                description: '',
                note: ''
            });
            toast.success('Todo Added')
        } else {
            toast.error("This didn't work.")
        }

    }

    return <>
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Card className="w-25 p-3">
                <Card.Body>
                    <Card.Title className="mb-4 text-center" as="h2">Add Todo</Card.Title>
                    <Form onSubmit={(e) => handelSubmit(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" onChange={(e) => handelFormChange(e)} name='title' value={toDo?.title} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} style={{ resize: 'none' }}
                                className="overflow-scroll" placeholder="Enter description"
                                onChange={(e) => handelFormChange(e)} name='description' value={toDo?.description} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control as="textarea" rows={2} style={{ resize: 'none' }} placeholder="Enter notes"
                                onChange={(e) => handelFormChange(e)} name="note" value={toDo?.note} />
                        </Form.Group>
                        <Button variant="primary" type='submit'>Add Todo</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
    </>
}
export default AddToDo


