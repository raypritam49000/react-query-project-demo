import React from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: employees, isLoading, isError, error } = useQuery({
        queryKey: ['employees'],
        queryFn: () => EmployeeService.getEmployees(),
        select: (response) => response.data
    });


    console.log("data data", employees);


    const deleteEmployeeMutation = useMutation(
        (id) => EmployeeService.deleteEmployee(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['employees'])
            }
        }
    )

    const deleteEmployee = (id) => {
        deleteEmployeeMutation.mutate(id);
    };

    const addEmployee = () => {
        navigate(`/add-employee`);
    }

    const viewEmployee = (id) => {
        navigate(`/view-employee/${id}`)
    }

    const editEmployee = (id) => {
        navigate(`/update-employee/${id}`);
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <h1>Error : {error.message}</h1>
    }

    return (
        <div>
            <h2 className="text-center">Employees List</h2>
            <div className="row">
                <button className="btn btn-primary" onClick={addEmployee}> Add Employee</button>
            </div>
            <br></br>
            <div className="row">
                <table className="table table-striped table-bordered">

                    <thead>
                        <tr>
                            <th> Employee ID</th>
                            <th> Employee First Name</th>
                            <th> Employee Last Name</th>
                            <th> Employee Email Id</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees && Array.isArray(employees) && employees.length > 0 && employees?.map(
                                employee =>
                                    <tr key={employee.id}>
                                        <td>{employee.id}</td>
                                        <td> {employee.firstName} </td>
                                        <td> {employee.lastName}</td>
                                        <td> {employee.emailId}</td>
                                        <td>
                                            <button onClick={() => editEmployee(employee.id)} className="btn btn-info">Update </button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => viewEmployee(employee.id)} className="btn btn-info">View </button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default ListEmployeeComponent