import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, setReloadData, showLoading } from '../../redux/rootSlice';
import { Form, message, Modal } from 'antd';
import axios from 'axios';

const AdminProjects = () => {
    const { portfolioData } = useSelector((state) => state.root);
    const dispatch = useDispatch();
    const { project } = portfolioData;
  
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [type, setType] = useState('add');

    const onFinish = async (values) => {
      try {
        const tempTechnologies = values.technologies.split(",");
        values.technologies = tempTechnologies;
        dispatch(showLoading());
        let res;
  
        if (selectedItemForEdit) {
          res = await axios.post("/api/portfolio/update-project", {
            ...values,
            _id: selectedItemForEdit._id,
          });
 
        } else {
          res = await axios.post("/api/portfolio/add-project", values);
        }
  
        if (res.data.success) {
          message.success(res.data.message);
          setShowAddEditModal(false);
          setSelectedItemForEdit(null);
          dispatch(hideLoading());
          dispatch(setReloadData(true));
          setType("");
        } else {
          message.error(res.data.message);
        }
  
        dispatch(hideLoading());
      } catch (error) {
        message.error(error.message);
        dispatch(hideLoading());
      }
    };
  
    const onDelete = async (item) => {
      try {
        dispatch(showLoading());
        const res = await axios.post("/api/portfolio/delete-project", {
          _id: item._id,
        });
        dispatch(hideLoading());
  
        if (res.data.success) {
          message.success(res.data.message);
          dispatch(hideLoading());
          dispatch(setReloadData(true));
        } else {
          message.error(res.data.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        message.error(error.message);
      }
    };
  
    return (
      <div>
        <div className="flex justify-end p-2">
          <button
            className="bg-green-900 px-5 py-2 text-white font-semibold"
            onClick={() => {
              setType('add');
              setSelectedItemForEdit(null);
              setShowAddEditModal(true);
            }}
          >
            Add Project
          </button>
        </div>
        <div className="grid grid-cols-4 gap-5 sm:grid-cols-1">
          {project.map((project) => (
            <div
              className="shadow border p-5 border-gray-400 flex flex-col"
              key={project._id}
            >
              <h1 className="text-primary text-xl font-bold">
                {project.title}
              </h1>
              <hr />
              <h1>{project.company}</h1>
              <h1>{project.description}</h1>
              <h1 className='text-secondary'>Technologies used:</h1>
              <h1>{project.technologies.join(", ")}</h1>
              <div className="flex justify-end gap-5 mt-5">
                <button
                  className="bg-red-700 text-white px-5 py-2 md"
                  onClick={() => onDelete(project)}
                >
                  Delete
                </button>
                <button
                  className="bg-green-900 text-white px-5 py-2 md"
                  onClick={() => {
                    setType("edit");
                    setSelectedItemForEdit(project);
                    setShowAddEditModal(true);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
        { (type === "add" || selectedItemForEdit) && <Modal
          open={showAddEditModal}
          title={selectedItemForEdit ? "Edit Project" : "Add Project"}
          footer={null}
          onCancel={() => {
              setShowAddEditModal(false);
              setSelectedItemForEdit(null);
              setType("");
          }}>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
                ...selectedItemForEdit,
                technologies: selectedItemForEdit?.technologies.join(" ,")
            }}
          >
            <Form.Item name="title" label="Title">
              <input className="modal-input" type="text" placeholder="Title" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <textarea className="modal-input" placeholder="Description" />
            </Form.Item>
            <Form.Item name="link" label="Link">
              <input className="modal-input" type="text" placeholder="Link" />
            </Form.Item>
            <Form.Item name="technologies" label="Technologies">
              <input className="modal-input" type="text" placeholder="Technologies" />
            </Form.Item>
            <div className="flex justify-end">
              <button type="button"
                className="border-primary text-primary px-5 py-2"
                onClick={() => {
                  setShowAddEditModal(false);
                  setSelectedItemForEdit(null);
                  setType("");
              }}>
                Cancel
              </button>
              <button type="submit" className="bg-green-900 text-white px-5 py-2">
                {selectedItemForEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>}
      </div>
    );
}

export default AdminProjects