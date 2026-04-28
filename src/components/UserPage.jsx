import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserPage = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', age: '', phone: '', password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { state } = useLocation();
    const isEdit = !!state?.item;

    useEffect(() => { if (isEdit) setFormData(state.item); }, [isEdit, state]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const API_URL = 'https://681c3df26ae7c794cf711726.mockapi.io/StudentDetails';
        const request = isEdit ? axios.put(`${API_URL}/${state.item.id}`, formData) : axios.post(API_URL, formData);
        
        request.then(() => navigate('/'))
               .catch(() => alert("Something went wrong"))
               .finally(() => setLoading(false));
    };

    return (
        <div className="container py-5 d-flex justify-content-center">
            <div className="card shadow-lg border-0" style={{maxWidth: '550px', width: '100%', borderRadius: '16px'}}>
                <div className={`card-header py-4 text-white text-center border-0 ${isEdit ? 'bg-warning' : 'bg-primary'}`} 
                     style={{borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}}>
                    <h3 className="mb-0 fw-bold">{isEdit ? 'Update Profile' : 'New User Account'}</h3>
                    <p className="small mb-0 opacity-75">Please fill in the information below</p>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label small fw-bold">First Name</label>
                                <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-bold">Last Name</label>
                                <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label small fw-bold">Age</label>
                                <input type="number" className="form-control" name="age" value={formData.age} onChange={handleChange} required />
                            </div>
                            <div className="col-md-8">
                                <label className="form-label small fw-bold">Phone</label>
                                <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                            </div>
                            <div className="col-12">
                                <label className="form-label small fw-bold">Secure Password</label>
                                <input type="password" id="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button disabled={loading} className={`btn w-100 py-2 fw-bold text-uppercase ${isEdit ? 'btn-warning' : 'btn-primary'}`}>
                                {loading ? 'Saving...' : isEdit ? 'Apply Changes' : 'Create Account'}
                            </button>
                            <button type="button" className="btn btn-link w-100 mt-2 text-decoration-none text-muted" onClick={() => navigate('/')}>
                                Back to Directory
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserPage;