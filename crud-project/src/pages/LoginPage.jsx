import { Button, Form, Input, message } from "antd";
import axios from "axios";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login',{
                username: values.username,
                password: values.password
            });

            const token = response.data.token;
            localStorage.setItem('token', token);

            message.success('Login Successful');

            navigate('/dashboard');
        }
        catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to login.';
            message.error(errorMessage);
            console.error('Login error: ', error);
        }
    };

    return (
        <Form onFinish={onFinish}>
            <Form.Item
                label='Email/Username'
                name='username'
                rules={[{required: true, message: 'Please enter your username'}]}
                >

                <Input placeholder='Enter Email/Username'/>
            </Form.Item>

            <Form.Item
                label = 'Password'
                name = 'password'
                rules={[{required: true, message: 'Please enter your password', }]}
                >
                <Input.Password placeholder = 'Enter Password'/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType='submit'>Login</Button>
            </Form.Item>
        </Form>
    );
}

export default LoginPage;