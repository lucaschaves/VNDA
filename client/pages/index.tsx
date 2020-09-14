import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import { User, NotifyProps } from "interfaces";
import { makeStyles } from "@material-ui/core/styles";
import API from "utils/api";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Snackbar,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

const useStyles = makeStyles({
    table: {
        minWidth: 600,
    },
    tableRow: {
        cursor: "pointer",
    },
    buttonNew: {
        height: 60,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
    },
    actions: {
        height: 15,
        width: 15,
        marginRight: 10,
    },
    actionsIcon: {
        height: 20,
    },
    actionColumn: {
        width: 100,
    },
});

const List = () => {
    const classes = useStyles();
    const router = useRouter();
    const [notify, setNotify] = useState<NotifyProps>({
        open: false,
        message: "",
    });
    const [data, setData] = useState<Array<User>>([]);

    const loadData = async () => {
        const resp = await API.get("users");
        setData(resp.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleNew = () => {
        router.push({
            pathname: "/user",
            query: {
                id: 0,
                edit: false,
            },
        });
    };

    const handleEdit = (row: User) => {
        router.push({
            pathname: "/user",
            query: {
                id: row.id,
                edit: true,
            },
        });
    };

    const handleDel = async (row: User) => {
        await API.post(`/users/${row.id}/deactivate`);
        loadData();
        setNotify({
            open: true,
            message: "Deletado com Sucesso!",
        });
    };

    return (
        <>
            <Layout>
                <div className={classes.buttonNew}>
                    <span>Lista de Usuários</span>
                    <Button variant="outlined" onClick={() => handleNew()}>
                        Novo usuário
                    </Button>
                </div>
                <TableContainer component={Paper} style={{ maxHeight: "75vh" }}>
                    <Table
                        className={classes.table}
                        aria-label="simple table"
                        stickyHeader
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="center"
                                    className={classes.actionColumn}
                                >
                                    Action
                                </TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Código Externo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow
                                    key={row.id}
                                    hover
                                    className={classes.tableRow}
                                >
                                    <TableCell>
                                        <IconButton
                                            className={classes.actions}
                                            onClick={() => handleEdit(row)}
                                        >
                                            <EditOutlinedIcon
                                                className={classes.actionsIcon}
                                            />
                                        </IconButton>

                                        <IconButton
                                            className={classes.actions}
                                            onClick={() => handleDel(row)}
                                        >
                                            <DeleteOutlineIcon
                                                className={classes.actionsIcon}
                                            />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.external_code}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Layout>

            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={notify.open}
                onClose={() => setNotify({ ...notify, open: false })}
                autoHideDuration={1000}
                message={notify.message}
            />
        </>
    );
};

export default List;
