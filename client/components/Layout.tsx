import React from "react";
import clsx from "clsx";
import Head from "next/head";
import { useRouter } from "next/router";
import { LayoutProps } from "interfaces";
import {
    createStyles,
    makeStyles,
    useTheme,
    Theme,
} from "@material-ui/core/styles";
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CssBaseline,
    InputBase,
    Divider,
    IconButton,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import SearchIcon from "@material-ui/icons/Search";
import FaceIcon from "@material-ui/icons/Face";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ViewListIcon from "@material-ui/icons/ViewList";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import DescriptionIcon from "@material-ui/icons/Description";
import YouTubeIcon from "@material-ui/icons/YouTube";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },
        toolbarDiv: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
        },
        listItens: {
            paddingLeft: 22,
        },
        appBar: {
            background: "#1b2635",
            color: "#ffffff",

            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: "none",
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap",
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: "hidden",
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        navLeft: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        navRight: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: 200,
            marginRight: 10,
        },
        navRightIcon: {
            marginRight: 10,
        },
        navRightDrop: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            cursor: "pointer",
        },
        navImg: {
            height: 40,
            color: "#ffffff",
        },
        iconMenu: {
            color: "#cccccc",
            width: 40,
            height: 40,
        },
        iconButton: {
            padding: 5,
        },
        iconInput: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#ffffff",
            borderRadius: 15,
            height: 35,
            marginLeft: 15,
        },
        input: {
            flex: 1,
        },
    })
);

const Layout: React.FC = ({ children, title = "VNDA" }: LayoutProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <style>
                    {`* {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        outline: 0;
                    }
                    body {
                        background:  #cdcdcd;
                        color:  #454545;
                        -webkit-font-smoothing: antialiased;
                        transition: all 1s;
                    }
                    body, input, button {
                        font-family: 'Mukta', 'Roboto', Arial, Helvetica, sans-serif;
                        font-size: 16px
                    }
                    
                    @media only screen and (max-width: 600px) {

                    }
                    `}
                </style>
            </Head>

            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(true)}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.toolbarDiv}>
                        <div className={classes.navLeft}>
                            <div className={classes.iconInput}>
                                <IconButton
                                    type="submit"
                                    className={classes.iconButton}
                                    aria-label="search"
                                >
                                    <SearchIcon />
                                </IconButton>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Pesquisar"
                                    inputProps={{
                                        "aria-label": "Pesquisar...",
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className={classes.navImg}>Vnda</h2>
                        </div>
                        <div className={classes.navRight}>
                            <div className={classes.navRightIcon}>
                                <FaceIcon />
                            </div>
                            <div className={classes.navRightDrop}>
                                <span>lucas@lucas.com.br</span>
                                <ArrowDropDownIcon />
                            </div>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={() => setOpen(false)}>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem
                        className={classes.listItens}
                        button
                        onClick={() => router.push("/")}
                    >
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Usuários" />
                    </ListItem>
                    <ListItem
                        className={classes.listItens}
                        button
                        onClick={() => router.push("/")}
                    >
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Pedidos" />
                    </ListItem>
                    <ListItem
                        className={classes.listItens}
                        button
                        onClick={() => router.push("/")}
                    >
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Carrinhos" />
                    </ListItem>
                    <ListItem
                        className={classes.listItens}
                        button
                        onClick={() => router.push("/")}
                    >
                        <ListItemIcon>
                            <ViewListIcon />
                        </ListItemIcon>
                        <ListItemText primary="Produtos" />
                    </ListItem>
                    <ListItem
                        className={classes.listItens}
                        button
                        onClick={() => router.push("/")}
                    >
                        <ListItemIcon>
                            <LocalOfferIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tags" />
                    </ListItem>

                    <Divider />
                    <ListItem
                        className={classes.listItens}
                        button
                        onClick={() => router.push("/")}
                    >
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Menu" />
                    </ListItem>
                    <ListItem
                        className={classes.listItens}
                        button
                        onClick={() => router.push("/")}
                    >
                        <ListItemIcon>
                            <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText primary="Páginas" />
                    </ListItem>
                    <ListItem
                        className={classes.listItens}
                        button
                        onClick={() => router.push("/")}
                    >
                        <ListItemIcon>
                            <YouTubeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Banners" />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
};

export default Layout;
