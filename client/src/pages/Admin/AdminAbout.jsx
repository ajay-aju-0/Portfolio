import { Form, message } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/rootSlice';
import axios from 'axios';

const AdminAbout = () => {
    const { portfolioData } = useSelector((state) => state.root);

    const dispatch = useDispatch()
    

    const onFinish = async(values) => {
        try {
            const tempSkills = values.skills.split(",")
            values.skills = tempSkills
            dispatch(showLoading())
            const res = await axios.post('/api/portfolio/update-about',{
                ...values,
                _id: portfolioData.about._id
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
        <Form
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            ...portfolioData.about,
            skills: portfolioData.about.skills.join(" ,")
        }}
        >
          <Form.Item name="lottieUrl" label="Lottie URL">
            <input type="text" placeholder="Lottie URL" />
          </Form.Item>
          <Form.Item name="description1" label="Description1">
            <textarea type="text" placeholder="Description1" />
          </Form.Item>
          <Form.Item name="description2" label="Description2">
            <textarea type="text" placeholder="Description2" />
          </Form.Item>
          <Form.Item name="skills" label="Skills">
            <textarea type="text" placeholder="Skills" />
          </Form.Item>
          <div className="flex justify-center w-full">
            <button
              className="px-5 py-2 mr-20 bg-primary text-white"
              type="submit"
            >
              SAVE
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default AdminAbout