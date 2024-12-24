import { Form, message, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, setReloadData, showLoading } from "../../redux/rootSlice";
import axios from "axios";

const Experiences = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const { experience } = portfolioData;

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState('add');

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let res;

      if (selectedItemForEdit) {
        res = await axios.post("/api/portfolio/update-experience", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        res = await axios.post("/api/portfolio/add-experience", values);
      }

      if (res.data.success) {
        message.success(res.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(hideLoading());
        dispatch(setReloadData(true));
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
      const res = await axios.post("/api/portfolio/delete-experience", {
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
          Add Experience
        </button>
      </div>
      <div className="grid grid-cols-4 gap-5 sm:grid-cols-1">
        {experience?.map((experience) => (
          <div
            className="shadow border p-5 border-gray-400 flex flex-col"
            key={experience?._id}
          >
            <h1 className="text-primary text-xl font-bold">
              {experience?.period}
            </h1>
            <hr />
            <h1>{experience?.company}</h1>
            <h1>{experience?.title}</h1>
            <h1>{experience?.description}</h1>
            <h3>
            Link :&nbsp;
            <a href={experience?.link} target="_blank" className="inline-flex underline">certificate &nbsp;
            <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em" 
                    >
                    <path
                        fillRule="evenodd"
                        d="M8.636 3.5a.5.5 0 00-.5-.5H1.5A1.5 1.5 0 000 4.5v10A1.5 1.5 0 001.5 16h10a1.5 1.5 0 001.5-1.5V7.864a.5.5 0 00-1 0V14.5a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5v-10a.5.5 0 01.5-.5h6.636a.5.5 0 00.5-.5z"
                    />
                    <path
                        fillRule="evenodd"
                        d="M16 .5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h3.793L6.146 9.146a.5.5 0 10.708.708L15 1.707V5.5a.5.5 0 001 0v-5z"
                    />
                </svg>
            </a>
            </h3>
            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-red-700 text-white px-5 py-2 md"
                onClick={() => onDelete(experience)}
              >
                Delete
              </button>
              <button
                className="bg-green-900 text-white px-5 py-2 md"
                onClick={() => {
                  setType("edit");
                  setSelectedItemForEdit(experience);
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
        title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
        footer={null}
        onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
            setType("");
        }}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={selectedItemForEdit}
        >
          <Form.Item name="period" label="Period">
            <input className="modal-input" type="text" placeholder="Period" />
          </Form.Item>
          <Form.Item name="company" label="Company">
            <input className="modal-input" type="text" placeholder="Company" />
          </Form.Item>
          <Form.Item name="title" label="Title">
            <input className="modal-input" type="text" placeholder="Title" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <textarea
              className="modal-input"
              placeholder="Description"
            />
          </Form.Item>
          <Form.Item name="link" label="Link">
            <input className="modal-input" type="text" placeholder="Link" />
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
};

export default Experiences;
