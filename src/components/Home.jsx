import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";
import { MdEditNote } from "react-icons/md";

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const API_URL = 'https://681c3df26ae7c794cf711726.mockapi.io/StudentDetails';

    const readUser = () => {
        setLoading(true);
        axios.get(API_URL)
            .then((res) => setData(res.data))
            .catch(() => alert("Data fetch error"))
            .finally(() => setLoading(false));
    };

    const deleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios.delete(`${API_URL}/${id}`)
                .then(() => setData(data.filter(item => item.id !== id)));
        }
    };

    useEffect(() => { readUser(); }, []);

const filteredData = data.filter((val) => {
    const fullName = `${val.firstName} ${val.lastName}`.toLowerCase();
    const phone = String(val.phone || "");

    return (
        fullName.includes(searchTerm.toLowerCase()) ||
        phone.includes(searchTerm)
    );
});
    return (
        <div className="container py-5">
            <div className="header-banner shadow">
                <h2 className="mb-0 fw-bold">User Directory</h2>
                <button className="btn btn-light fw-bold px-4" onClick={() => navigate('/UserPage')}>
                    + Add New User
                </button>
            </div>

            <div className="dashboard-card">
                <div className="mb-4">
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">🔍</span>
                        <input 
                            type="text" 
                            className="form-control border-start-0 ps-0" 
                            placeholder="Search by name or phone..." 
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-5"><h3>Loading data...</h3></div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th>Contact Info</th>
                                    <th>Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td className="fw-semibold">{item.firstName} {item.lastName}</td>
                                        <td>
                                            <div className="small text-muted">{item.phone}</div>
                                            <div className="small text-primary">{item.age} Years Old</div>
                                        </td>
                                        <td><span className="badge bg-success-subtle text-success border border-success-subtle">Active</span></td>
                                        <td className="text-end">
                                            <button className="btn btn-outline-primary btn-action me-2" onClick={() => navigate('/UserPage', { state: { item } })}>
                                                <MdEditNote size={18}/> Edit
                                            </button>
                                            <button className="btn btn-outline-danger btn-action" onClick={() => deleteUser(item.id)}>
                                                <AiFillDelete size={16}/> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;