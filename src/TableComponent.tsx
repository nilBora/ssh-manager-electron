import React, { useState } from 'react';
import {TableContainer} from "@mui/material";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {TableHead} from "@mui/material";
import {TableBody} from "@mui/material";
import {TableRow} from "@mui/material";
import {TableCell} from "@mui/material";
import {TextField} from "@mui/material";
import {IconButton} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {faRemove} from "@fortawesome/free-solid-svg-icons";
import {faSave} from "@fortawesome/free-solid-svg-icons";
//import {contextBridge, ipcRenderer} from "electron";

interface Data {
    id: number;
    alias: string;
    host: string;
    user: string;
    password: string;
    description: string;
}

const initialData: Data[] = [
    {
        id: 1,
        alias: 'Alias 1',
        host: 'Host 1',
        user: 'User 1',
        password: 'Password 1',
        description: 'Description 1',
    },
    {
        id: 2,
        alias: 'Alias 2',
        host: 'Host 2',
        user: 'User 2',
        password: 'Password 2',
        description: 'Description 2',
    },
];

const TableComponent: React.FC = () => {
    const [data, setData] = useState<Data[]>(initialData);
    const [editableRow, setEditableRow] = useState<number | null>(null);

    const handleAddRow = () => {
        let res = window.electronAPI.ping();
        console.log(res);
        //ipcRenderer.send('open-add-dialog', 'Add');
        //let title = 'Add';
    

        //window.electronAPI.setTitle('Your Title');
        // contextBridge.exposeInMainWorld('electronAPI', {
        //     setTitle: (title: any) => ipcRenderer.send('open-add-dialog', title)
        // });

        const newRow: Data = {
            id: data.length + 1,
            alias: 'New Alias',
            host: 'New Host',
            user: 'New User',
            password: 'New Password',
            description: 'New Description',
        };
        setData([...data, newRow]);
    };

    const handleEditRow = (id: number) => {
        setEditableRow(id);
    };

    const handleSaveRow = (id: number) => {
        setEditableRow(null);
        // Logic to save edited row data
    };

    const handleDeleteRow = (id: number) => {
        const confirmed = window.confirm('Are you sure you want to delete this row?');
        if (confirmed) {
            const updatedData = data.filter((item) => item.id !== id);
            setData(updatedData);
        }
    };

    return (
            <div>
                <Button variant="contained" onClick={handleAddRow}>Add</Button>
                <TableContainer component={Paper}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Alias</TableCell>
                        <TableCell>Host</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Password</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                {editableRow === row.id ? <TextField variant="outlined" type="text"
                                                                 value={row.alias}/> : row.alias}
                            </TableCell>
                            <TableCell>
                                {editableRow === row.id ? <TextField variant="outlined" type="text"
                                                                 value={row.host}/> : row.host}
                            </TableCell>
                            <TableCell>
                                {editableRow === row.id ? <TextField variant="outlined" type="text"
                                                                 value={row.user}/> : row.user}
                            </TableCell>
                            <TableCell>
                                {editableRow === row.id ? <TextField variant="outlined" type="text"
                                                                 value={row.password}/> : row.password}
                            </TableCell>
                            <TableCell>
                                {editableRow === row.id ? <TextField variant="outlined" type="text"
                                                                 value={row.description}/> : row.description}
                            </TableCell>
                            <TableCell>
                                {editableRow === row.id ? (
                                    <IconButton aria-label="Example" onClick={() => handleSaveRow(row.id)}>
                                        <FontAwesomeIcon icon={faSave} />
                                    </IconButton>
                                ) : (
                                    <IconButton aria-label="Example" onClick={() => handleEditRow(row.id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </IconButton>
                                )}
                                <IconButton aria-label="Example" onClick={() => handleDeleteRow(row.id)}>
                                    <FontAwesomeIcon icon={faRemove} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </TableContainer>
            </div>
    );
};

export default TableComponent;
