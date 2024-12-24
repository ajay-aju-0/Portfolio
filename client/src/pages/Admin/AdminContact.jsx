import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/rootSlice';
import axios from 'axios';
import { Form, message } from 'antd';

const AdminContact = () => {
    const { portfolioData } = useSelector((state) => state.root);

    const dispatch = useDispatch();

    const onFinish = async(values) => {
        try {
            const tempPhone = values.phone.split(",");
            values.phone = tempPhone;
            dispatch(showLoading())
            const res = await axios.post('/api/portfolio/update-contact',{
                ...values,
                _id: portfolioData.contact[0]._id
            })

            if(res.data.success) {
                message.success(res.data.message);
            }
            else {
                message.error(res.data.message);
            }

            dispatch(hideLoading());
        } catch (error) {
            message.error(error.message);
            dispatch(hideLoading());
        }
    }
  return (
    <>
        <div>
            <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData?.contact[0]}>
                <Form.Item name='name' label="Name">
                    <input type="text" placeholder='Name' />
                </Form.Item>
                <Form.Item name='email' label="Email">
                    <input type="email" placeholder='Email' />
                </Form.Item>
                <Form.Item name='phone' label="Phone">
                    <input type="text" placeholder='Phone' />
                </Form.Item>
                <Form.Item name='country' label="Country">
                    <input type="text" placeholder='Country' />
                </Form.Item>
                <div className="flex justify-center w-full">
                    <button className='px-5 py-2 mr-20 bg-primary text-white' type='submit'>SAVE</button>
                </div>
            </Form>
        </div>
    </>
  )
}

export default AdminContact