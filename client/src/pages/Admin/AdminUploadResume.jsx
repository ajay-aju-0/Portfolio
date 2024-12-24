import { useRef, useState } from 'react';
import { message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setReloadData } from '../../redux/rootSlice';

const AdminUploadResume = () => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const ref = useRef(null);


    const handleFileChange = (e) => {
        // setFile(e.target.files[0]);
        setFile(ref.current.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
          alert('Please select a file.');
          return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
          const response = await axios.post('/api/portfolio/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          message.success(response.data.message);
          dispatch(setReloadData(true));
          ref.current.value = '';
        } catch (error) {
          message.error('Failed to upload file');
        }
    };

    const handleDownload = async () => {    
        try {
          const response = await axios.get(`/api/portfolio/download`, {
            responseType: 'blob'
          });
  
          const url = window.URL.createObjectURL(new Blob([response.data],{ type : "application/pdf" }));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', link.href.split('-').slice(1).join('-')); // Remove timestamp
          document.body.appendChild(link);
          link.click();
          link.remove();
        } catch (error) {
          message.error('Error downloading file');
        }
    };
    

  return (
    <div>
      <h1>Upload Resume</h1>
      <input type="file" ref={ref} onChange={handleFileChange} />
      <button className='ml-10 p-2  bg-green-900 text-white cursor-pointer' onClick={handleUpload}>Upload</button>
      <br /><br /><br /> <br />
      <h1>Download Resume</h1>
      <button className='mt-10 bg-green-900 text-white p-3 cursor-pointer' onClick={handleDownload}>
        Download Uploaded Resume
      </button>
    </div>
  )
}

export default AdminUploadResume