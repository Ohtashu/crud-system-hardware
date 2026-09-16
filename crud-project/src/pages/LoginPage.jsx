import {Button, Form, Input} from "antd";
import './LoginPage.css'
function LoginPage(){
    const onFinish = (values) => {
        console.log(values);
    };

    return (
      <Form onFinish = {onFinish} >
          <Form.Item label='Email/Username'
                    name = 'email'
                    rules={[{required: true, message: 'Please enter your username!'}]}>
              <Input placeholder = 'Enter Email/Username'/>
          </Form.Item>

          <Form.Item label = 'Password'
                    name = 'password'
                    rules = {[{required: true, message: 'Please enter your password!'}]}
                    >
              <Input.Password placeholder = 'Enter Password'/>
          </Form.Item>

      <Form.Item  rules = {[{required: true, message: 'Please enter your password!'}]}>
         <Button type="primary" htmlType='submit'>Login</Button>
      </Form.Item>

      </Form>
    );
}
export default LoginPage;