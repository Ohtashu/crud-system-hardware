import {useEffect, useState} from "react";
import {message, List, Card, Button, Modal, Form, Input, Select, InputNumber, Popconfirm, Row, Col} from "antd";
import axios from 'axios';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';

function ComponentsPage(){

    const [components, setComponents] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const [editingId, setEditingId] = useState(null);

    const fetchHardware = async () => {
        try {

            const token = localStorage.getItem('token');

            const responce = await axios.get('http://localhost:5000/api/components',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setComponents(responce.data);
        } catch(error){
            console.error('Failed to fetch hardware: ', error);
            message.error('Failed to load inventory');
        }
    };

    useEffect(() => {
        fetchHardware();
    }, []);

    const openAddModal = () => {
        setEditingId(null);
        form.resetFields();
        setIsModalOpen(true);
    }
    const openEditingModal = (item) => {
        setEditingId(item.id);
        form.setFieldsValue({
            hardware_name: item.hardware_name,
            brand: item.brand,
            category: item.category,
            quantity: item.quantity,
            price: item.price
        });
        setIsModalOpen(true);
    };


    const handleSave = async (values) => {
        try {
            const token = localStorage.getItem('token');
            const config = {headers: {Authorization: `Bearer ${token}`}};

            if (editingId) {

                await axios.put(`http://localhost:5000/api/components/${editingId}`, values, config);
                message.success('Hardware updated successfully!');
            } else {

                await axios.post('http://localhost:5000/api/components', values, config);
                await message.success('Hardware updated successfully!');
            }

            setIsModalOpen(false);
            form.resetFields();
            setEditingId(null);
            await fetchHardware();
        }
        catch (error){
            console.error('Failed to save component: ', error);
            await message.error('Failed to save hardware.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const config = {headers: {Authorization: `Bearer ${token}`}}

            await axios.delete(`http://localhost:5000/api/components/${id}`, config);
            await message.success('Deletion Successful!');

           await fetchHardware();

        }catch(error){
                console.error('Failed to delete component: ', error);
                await message.error('Failed to delete hardware');
            }
    }

    //Handles Logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href= '/login';
    }
    return (
        <div style={{padding: '50px'}}>

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                <h2 style = {{marginBottom: '20px'}}> Hardware Dashboard</h2>
                <Button type='primary' danger onClick={handleLogout}>
                    Logout
                </Button>
            </div>

            <Button type='primary'
                    style={{marginBottom: '20px'}}
                    onClick={openAddModal}
                    >
                + Add Component
            </Button>

            <Modal title={editingId ? 'Edit Hardware' : 'Add New Hardware'}
                   open = {isModalOpen}
                   onCancel={() => setIsModalOpen(false)}
                   footer={null}
                   width={800}
                   >

                <Form form={form} onFinish={handleSave} layout="vertical" style={{ height: 'auto', display: 'block'}}>

                    <Row gutter={16}>
                         <Col span = {6}>
                    <Form.Item name='hardware_name' label='Hardware Name' rules={[{ required: true, message: 'Required!'}]}>
                        <Input placeholder='e.g. AMD Ryzen 9'/>
                    </Form.Item>
                         </Col>

                     <Col span={6}>
                    <Form.Item name='brand' label='Manufacturer' rules={[{ required: true, message: 'Required'}]}>
                        <Input placeholder='e.g. AMD'/>
                    </Form.Item>
                     </Col>

                    <Col span={6}>
                    <Form.Item name='category' label='Category' rules={[{ required: true, message: 'Required'}]}>
                        <Select placeholder='Select a PC Hardware'>
                            <Select.Option value='RAM'>RAM</Select.Option>
                            <Select.Option value='CPU'>CPU</Select.Option>
                            <Select.Option value='SSD'>SSD</Select.Option>
                            <Select.Option value='HDD'>HDD</Select.Option>
                            <Select.Option value='GPU'>GPU</Select.Option>
                            <Select.Option value='PSU'>PSU</Select.Option>
                            <Select.Option value='Other'>Other</Select.Option>
                        </Select>
                    </Form.Item>
                    </Col>

                        <Col span={6}>
                    <Form.Item name='quantity' label='Quantity' rules={[{ required: true, message: 'Required'}]}>
                        <InputNumber style={{width: '100%'}} placeholder='e.g. 10'/>
                    </Form.Item>
                        </Col>

                        <Col span={6}>
                    <Form.Item name='price' label='Price' rules={[{ required: true, message: 'Required'}]}>
                        <Input type='number' placeholder='e.g. 2300'/>
                    </Form.Item>
                        </Col>
                </Row>
                    <Form.Item style={{marginBottom: 0}}>
                        <Button type='primary' htmlType='submit' style={{ width:'100%', marginTop:'10px'}}>
                            {editingId ? 'Save Changes': 'Submit to Database'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4
                }}
                dataSource={components}
                renderItem={(item) => (
                <List.Item>
                    <Card title = {item.hardware_name} hoverable
                        actions={[ <EditOutlined key='edit' onClick={() => openEditingModal(item)}/>,
                            <Popconfirm title='Delete this hardware?'
                                        key='delete'
                                        description='Are you sure you want to permanently remove this item?'
                                        onConfirm={() => handleDelete(item.id)}
                                        okText='Yes'
                                        cancelText='No'>
                                <DeleteOutlined style={{ color: 'red'}}/>
                            </Popconfirm>
                        ]}
                    >
                        <p><strong>Manufacturer: </strong>{item.brand}</p>
                        <p><strong>Category: </strong>{item.category}</p>
                        <p><strong>Quantity: </strong>{item.quantity}</p>
                        <p><strong>Price: </strong>{item.price}</p>
                        <p style={{color: 'gray', fontSize: '12px'}}>ID: {item.id}</p>

                    </Card>
                    </List.Item>
                    )}
                    />
        </div>
    );
}

export default ComponentsPage;