import {useEffect, useState} from "react";
import {message, List, Card, Button, Modal, Form, Input, Select, InputNumber} from "antd";
import axios from 'axios';
import { EditOutlined} from '@ant-design/icons';

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
            const config = {header: {Authorization: `Bearer ${token}`}};

            if (editingId) {

                await axios.put(`http://localhost:5000/api/components/${editingId}`, value, config);
                message.success('Hardware updated successfully!');
            } else {

                await axios.post('http://localhost:5000/api/components', values, config);
                message.success('Hardware updated successfully!');
            }

            setIsModalOpen(false);
            form.resetFields();
            setEditingId(null);
            fetchHardware();
        }
        catch (error){
            console.error('Failed to save component: ', error);
            message.error('Failed to save hardware.');
        }
    };
    return (
        <div style={{padding: '50px'}}>
            <h2 style = {{marginBottom: '20px'}}> Hardware Dashboard</h2>

            <Button type='primary'
                    style={{marginBottom: '20px'}}
                    onClick={() => setIsModalOpen(true)}
                    >
                + Add Component
            </Button>

            <Modal title={editingId ? 'Edit Hardware' : 'Add New Hardware'}
                   open = {isModalOpen}
                   onCancel={() => setIsModalOpen(false)}
                   footer={null}
                   >

                <Form form={form} onFinish={handleSave} layout={"vertical"}>
                    <Form.Item name='hardware_name' label='Hardware Name' rules={[{ required: true, message: 'Required!'}]}>
                        <Input placeholder='e.g. AMD Ryzen 9'/>
                    </Form.Item>

                    <Form.Item name='brand' label='Manufacturer' rules={[{ required: true, message: 'Required'}]}>
                        <Input placeholder='e.g. AMD'/>
                    </Form.Item>

                    <Form.Item name='category' label='Category' rules={[{ required: true, message: 'Required'}]}>
                        <Select placeholder='Select a PC Hardware'>
                            <Select.Option value='NVIDIA'>NVIDIA</Select.Option>
                            <Select.Option value='AMD'>AMD</Select.Option>
                            <Select.Option value='Intel'>Intel</Select.Option>
                            <Select.Option value='ASUS'>ASUS</Select.Option>
                            <Select.Option value='MSI'>MSI</Select.Option>
                            <Select.Option value='Corsair'>Corsair</Select.Option>
                            <Select.Option value='Logitech'>Logitech</Select.Option>
                            <Select.Option value='Other'>Other</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='quantity' label='Quantity' rules={[{ required: true, message: 'Required'}]}>
                        <InputNumber style={{width: '100%'}} placeholder='e.g. 10'/>
                    </Form.Item>
                    <Form.Item name='price' label='Price' rules={[{ required: true, message: 'Required'}]}>
                        <Input type='number' placeholder='e.g. 2300'/>
                    </Form.Item>

                    <Form.Item>

                        <Button type='primary' htmlType='submit' style={{ width:'100%'}}>
                            Submit to Database
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
                        actions={[ <EditOutlined key='edit' onClick={() => openEditingModal(item)}/>
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