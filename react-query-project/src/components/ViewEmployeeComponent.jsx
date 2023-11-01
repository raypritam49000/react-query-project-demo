import React from 'react'
import { useParams } from 'react-router-dom';
import {useQuery } from "react-query";
import EmployeeService from '../services/EmployeeService';

const ViewEmployeeComponent = () => {
    const { id } = useParams();

    console.log(id);

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

    console.log(employee);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <h1>Error : {error.message}</h1>
    }

    return (
        <div>
            <br></br>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center"> View Employee Details</h3>
                <div className="card-body">
                    <div className="row">
                        <label> Employee First Name: </label>
                        <div> {employee?.firstName}</div>
                    </div>
                    <div className="row">
                        <label> Employee Last Name: </label>
                        <div> {employee?.lastName}</div>
                    </div>
                    <div className="row">
                        <label> Employee Email ID: </label>
                        <div> {employee?.emailId}</div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default ViewEmployeeComponent;