import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {

    const route = useNavigate();

    return <>
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Card className="text-center w-50">
                <Card.Header as="h3">NotePad</Card.Header>
                <Card.Body>
                    <Card.Title >Welcome to NotePad</Card.Title>
                    <Card.Text>
                        NotePad is a simple and intuitive application for taking notes. You can quickly jot down your thoughts, create lists, and keep track of important information.
                    </Card.Text>
                    <Button variant="primary" onClick={()=> route('/add')}>Get Started</Button>
                </Card.Body>
                <Card.Footer className="text-muted">Happy Noting!</Card.Footer>
            </Card>
        </div>
    </>
}
