import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { User, NotifyProps } from "interfaces";
import { useRouter } from "next/router";
import API from "utils/api";
import Layout from "components/Layout";
import {
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    Snackbar,
    FormControl,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    top: {
        background: "#fff",
        display: "flex",
        alignItems: "center",
        borderRadius: 5,
        width: "100%",
        height: 50,
        marginBottom: 20,

        "& > h4": {
            marginRight: 10,
            marginLeft: 30,
        },

        "& > p": {
            marginRight: 10,
        },
    },

    form: {
        background: "#fff",
        width: "100%",
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    textInput: {
        marginTop: 30,
        height: "100%",
    },
    textInputSel: {
        marginTop: 30,
        height: "100%",
        width: "100%",
    },
    selectInp: {
        width: "100%",
    },
    button: {
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5,
        width: "100%",
        height: 70,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20,
    },
    container: {
        border: "1px solid #c4c4c4",
        padding: 5,
        borderRadius: 5,
        marginTop: 20,
        height: 56,
    },
    items: {
        display: "inline-block",
        padding: "2px",
        marginLeft: 5,
        border: "1px solid #1b2635",
        fontFamily: "Helvetica, sans-serif",
        borderRadius: "5px",
        marginRight: "5px",
        cursor: "pointer",
    },
    input: {
        outline: "none",
        border: "none",
        fontSize: "16px",
        fontFamily: "Helvetica, sans-serif",
        paddingTop: 12,
        paddingLeft: 5,
    },
    spanDel: {
        marginLeft: 5,
    },
});

const enumFunc = ["Agente", "Gestor", "Local"];

const Users: React.FC = () => {
    const classes = useStyles();
    const router = useRouter();
    const { id, edit } = router.query;
    const [notify, setNotify] = useState<NotifyProps>({
        open: false,
        message: "",
    });
    const [selectFuncao, setSelectFuncao] = useState<string>();
    const [selectTags, setSelectTags] = useState<Array<string>>([]);
    const [selectTagsInput, setSelectTagsInput] = useState<string>();
    const [dataUser, setDataUser] = useState<User>({
        id: 0,
        email: "",
        name: "",
        role: 0,
        tags: [],
        external_code: "",
    });

    useEffect(() => {
        const loadData = async () => {
            const resp = await API.get(`users/${id}`);
            setDataUser(resp.data);
            setSelectTags(resp.data.tags);
            const ret = enumFunc.filter((v, i) => {
                if (i === resp.data.role) return v;
            });
            setSelectFuncao(ret[0]);
        };

        if (edit === "true") {
            loadData();
        }
    }, []);

    const loadGetUser = (type: string, val: string) => {
        if (dataUser) {
            const data = {
                id: dataUser.id,
                email: type === "email" ? val : dataUser.email,
                name: type === "name" ? val : dataUser.name,
                role: dataUser.role,
                tags: dataUser.tags,
                external_code: type === "code" ? val : dataUser.external_code,
            };

            setDataUser(data);
        }
    };

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setSelectTagsInput(event.target.value);
    }

    function handleICName(event: ChangeEvent<HTMLInputElement>) {
        loadGetUser("name", event.target.value);
    }

    function handleICEmail(event: ChangeEvent<HTMLInputElement>) {
        loadGetUser("email", event.target.value);
    }

    function handleICCode(event: ChangeEvent<HTMLInputElement>) {
        loadGetUser("code", event.target.value);
    }

    function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            if (event.currentTarget.value) {
                setSelectTags([...selectTags, event.currentTarget.value]);
                setSelectTagsInput("");
            }
        }

        if (
            selectTags.length &&
            event.key === "Backspace" &&
            !selectTagsInput?.length
        ) {
            setSelectTags(selectTags.slice(0, selectTags.length - 1));
        }
    }

    function handleRemoveItem(index: number) {
        return () => {
            const ret = selectTags.filter((item, i) => {
                if (i !== index) return item;
            });
            setSelectTags(ret);
        };
    }

    function onChangeSelectFuncao(event: ChangeEvent<{ value: unknown }>) {
        setSelectFuncao(event.target.value as string);
    }

    const updatedAddUser = async () => {
        const data = {
            email: dataUser.email,
            name: dataUser.name,
            role_name: selectFuncao,
            external_code: dataUser.external_code,
            tags: selectTags,
        };

        if (edit === "true") {
            await API.put(`users/${id}`, data);
            setNotify({
                open: true,
                message: "Usuário alterado!",
            });
        } else {
            await API.post("users", data);
            setNotify({
                open: true,
                message: "Salvo com sucesso!",
            });
        }
    };

    return (
        <>
            <Layout>
                <div className={classes.top}>
                    <h4>Usuário</h4>
                    <p>/</p>
                    <span>{dataUser?.name ? dataUser.name : "Novo"}</span>
                </div>

                <div className={classes.form}>
                    <TextField
                        className={classes.textInput}
                        id="name"
                        label="Nome"
                        fullWidth
                        margin="normal"
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={dataUser?.name}
                        onChange={handleICName}
                    />
                    <TextField
                        className={classes.textInput}
                        id="email"
                        label="email"
                        fullWidth
                        margin="normal"
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={dataUser?.email}
                        onChange={handleICEmail}
                    />
                    <FormControl
                        variant="outlined"
                        className={classes.textInputSel}
                    >
                        <InputLabel
                            className={classes.selectInp}
                            id="funcaolabel"
                        >
                            Função
                        </InputLabel>
                        <Select
                            className={classes.selectInp}
                            labelId="funcaolabel"
                            id="funcao"
                            defaultValue="Agente"
                            value={selectFuncao}
                            onChange={onChangeSelectFuncao}
                            label="Funçao"
                        >
                            <MenuItem value="Agente">Agente</MenuItem>
                            <MenuItem value="Gestor">Gestor</MenuItem>
                            <MenuItem value="Local">Local</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        className={classes.textInput}
                        id="externCode"
                        label="Código Externo"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={dataUser?.external_code}
                        onChange={handleICCode}
                    />

                    <label>
                        <ul className={classes.container}>
                            {selectTags?.map((item, i) => (
                                <li
                                    key={i}
                                    className={classes.items}
                                    onClick={handleRemoveItem(i)}
                                >
                                    {item}
                                    <span className={classes.spanDel}>(x)</span>
                                </li>
                            ))}
                            <input
                                className={classes.input}
                                value={selectTagsInput}
                                onChange={handleInputChange}
                                onKeyDown={handleInputKeyDown}
                            />
                        </ul>
                    </label>
                    <div style={{ height: 30 }} />
                </div>
                <div className={classes.button}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => router.push("/")}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={updatedAddUser}
                    >
                        Salvar
                    </Button>
                </div>
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

export default Users;
