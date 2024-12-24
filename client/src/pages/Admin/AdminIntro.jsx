import React from 'react'
import { Form, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/rootSlice';
import axios from 'axios';

const AdminIntro = () => {
    const { portfolioData } = useSelector((state) => state.root);

    const dispatch = useDispatch()

    // const { intro } = portfolioData;

    // console.log(portfolioData?.intro)
    

    const onFinish = async(values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/portfolio/update-intro',{
                ...values,
                _id: portfolioData.intro._id
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
            <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData?.intro}>
                <Form.Item name='welcomeText' label="Welcome Text">
                    <input type="text" placeholder='Welcome Text' />
                </Form.Item>
                <Form.Item name='firstname' label="First Name">
                    <input type="text" placeholder='firstname' />
                </Form.Item>
                <Form.Item name='lastname' label="Last Name">
                    <input type="text" placeholder='lastname' />
                </Form.Item>
                <Form.Item name='caption' label="Caption">
                    <input type="text" placeholder='caption' />
                </Form.Item>
                <Form.Item name='description' label="Description">
                    <textarea placeholder='description' />
                </Form.Item>
                <div className="flex justify-center w-full">
                    <button className='px-5 py-2 mr-20 bg-primary text-white' type='submit'>SAVE</button>
                </div>
            </Form>
        </div>
    </>
  )
}

export default AdminIntro