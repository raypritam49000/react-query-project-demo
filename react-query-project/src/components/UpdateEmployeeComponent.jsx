import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import EmployeeService from '../services/EmployeeService';

const UpdateEmployeeComponent = () => {

    const formObject = {
        firstName: '',
        lastName: '',
        emailId: ''
    };

    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState(formObject);

    const { data: employee, isLoading, isError, error } = useQuery(
        {
            queryKey: ['employee', id],
            queryFn: () => EmployeeService.getEmployeeById(id),
            select: (response) => response.data
        },
        {
            enabled: !!id,
        }
    );

    useEffect(() => {
        if (employee) {
            setFormData(employee)
        }
    }, [employee]);


    const handleOnChangeEvent = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const updateEmployeeMutation = useMutation(
        (data) => EmployeeService.updateEmployee(data.employee, data.employeeId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['employees'])
                navigate("/");
            }
        }
    )


    const updateEmployee = (e) => {
        e.preventDefault();
        updateEmployeeMutation.mutate({ employee: formData, employeeId: id })
    }

    const resetForm = () => {
        setFormData(formObject);
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <h1>Error : {error.message}</h1>
    }

    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Update Employee</h3>
                        <div className="card-body">
                            <form onSubmit={updateEmployee}>
                                <div className="form-group">
                                    <label> First Name: </label>
                                    <input placeholder="First Name" name="firstName" className="form-control"
                                        value={formData?.firstName} onChange={handleOnChangeEvent} />
                                </div>
                                <div className="form-group">
                                    <label> Last Name: </label>
                                    <input placeholder="Last Name" name="lastName" className="form-control"
                                        value={formData?.lastName} onChange={handleOnChangeEvent} />
                                </div>
                                <div className="form-group">
                                    <label> Email Id: </label>
                                    <input placeholder="Email Address" name="emailId" className="form-control"
                                        value={formData?.emailId} onChange={handleOnChangeEvent} />
                                </div>

                                <div className="mt-2 text-center">
                                    <button className="btn btn-success" type='submit'>Update</button>
                                    <button className="btn btn-danger" onClick={resetForm} style={{ marginLeft: "10px" }}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UpdateEmployeeComponent;