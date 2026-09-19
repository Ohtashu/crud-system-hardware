import { Button, Form, Input, message } from "antd";
import axios from "axios";
import {useState} from "react";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isRegistering, setIsRegistering] = useState(false);


    const onFinish = async (values) => {
        try {
            if(isRegistering) {
                await axios.post('http:localhost:5000/api/auth/register', {
                    username: value.username,
                    password: value.password
                });
                message.success('Registration succesfull! Please log in');
                setIsRegisteting(false);
                form.resetFields();
            }
            else{
                    const response = await axios.post('http://localhost:5000/api/auth/login',{
                        username: values.username,
                        password: values.password
                    });
                    const token = response.data.token;
                    localStorage.setItem('token', token);

                    message.success('Login Successful');
                    navigate('/dashboard');
            }
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
            const errorMessage = error.response?.data?.error || (isRegistering ? 'Failed to register' :'Failed to login.');
            message.error(errorMessage);
            console.error('Auth error: ', error);
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
                <Button type="primary" htmlType='submit' style={{ width: '100%'}}>
                    {isRegistering ? 'Register' : 'Login'}
        </Button>
            </Form.Item>

            <div style={{ textAlign:'center', marginTop: '10px'}}>
                <a onClick={() => {
                    setIsRegistering(!isRegistering);
                    form.resetFields();
                }}>
                    {isRegistering ? 'Already have an account? Log in here': "Don't have an account? Register here"}
                </a>
            </div>
        </Form>
    );
}

export default LoginPage;