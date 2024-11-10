import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import styled, { StyleSheetManager } from 'styled-components'; // Importing styled-components

// Styled components
const StyledContainer = styled.div`
    padding: 1.5rem; // equivalent to 'p-6'
`;

const Title = styled.h3`
    text-align: center;
    font-size: 1.875rem; // equivalent to 'text-2xl'
    font-weight: bold;
`;

const SearchInput = styled.input`
    padding: 0.5rem 1rem; // equivalent to 'px-4 py-0.5'
    width: 250px; // Fixed width
    border-radius: 0.375rem; // Equivalent to 'rounded-md'
    border: 1px solid #d1d5db; // Equivalent to 'border-gray-300'   
`;

const AddButton = styled(Link)`
    padding: 0.5rem 1rem; // equivalent to 'px-4 py-1'
    background-color: #38b2ac; // equivalent to 'bg-teal-600'
    border-radius: 0.375rem; // equivalent to 'rounded'
    color: white;
    text-decoration: none; // Remove underline
`;

const shouldForwardProp = (prop) => {
    return prop !== 'center'; // Filter out the 'center' prop
};
const customStyles = {
    headCells: {
        style: {
            fontSize: '1.125rem',
            fontWeight: 'bold',
        },
    },
    cells: {
        style: {
            fontSize: '1rem',
        },
    },
};

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filteredEmployee, setFilteredEmployee] = useState([])

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/employee/', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });


                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.employees.map((emp) => ({
                        _id: emp._id,
                        sno: sno++,
                        dept_name: emp.department.dept_name,
                        name: emp.userId.name,
                        dob: new Date(emp.dob).toLocaleDateString(),
                        profileImage: <img className='rounded-full p-2' src={`http://localhost:5000/${emp.userId.profileImage}`} style={{ width: '120px', height: '120px', objectFit: 'cover' }} alt="Profile" />,
                        action: (<EmployeeButtons _id={emp._id} />),
                    }));
                    setEmployees(data);
                    setFilteredEmployee(data)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setEmpLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const handleFilter = (e) => {
        const records = employees.filter((emp) => {
            return emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setFilteredEmployee(records)
    }

    return (
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
            <StyledContainer>
                <Title center={true}>Manage Employees</Title>
                <div className='flex justify-between items-center mb-6'>
                    <SearchInput type="text" onChange={handleFilter} placeholder='Search By Employee Name' className='border px-2 rounded-md py-0.5 border-gray-300' />
                    <AddButton to='/admin-dashboard/add-employee'>Add New Employee</AddButton>
                </div>
                <div>
                    <DataTable columns={columns} data={filteredEmployee} customStyles={customStyles} pagination />
                </div>
            </StyledContainer>
        </StyleSheetManager>
    );
};

export default List;
