import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useAppSelector } from '../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/reducers/authReducer';
import { useNavigate } from 'react-router-dom';

type Props = {
    hardColor: string
    openModalDespesa: () => void;
    openModalTotal: () => void;
    openModalEntradas?: () => void;
}
export default function AccountMenu({ hardColor, openModalDespesa, openModalEntradas, openModalTotal }: Props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = React.useState(useAppSelector(state => state.user.nome))
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        dispatch(setAuth(false))
        navigate('/')
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <svg className='menu-svg' fill={hardColor} viewBox="-5.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="none" ><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <title>menu</title> <path d="M1.375 9.156h18.063c0.781 0 1.375-0.594 1.375-1.375 0-0.75-0.594-1.344-1.375-1.344h-18.063c-0.781 0-1.375 0.594-1.375 1.344 0 0.781 0.594 1.375 1.375 1.375zM1.375 14.625h18.063c0.781 0 1.375-0.594 1.375-1.375 0-0.75-0.594-1.344-1.375-1.344h-18.063c-0.781 0-1.375 0.594-1.375 1.344 0 0.781 0.594 1.375 1.375 1.375zM1.375 20.094h18.063c0.781 0 1.375-0.594 1.375-1.344 0-0.781-0.594-1.375-1.375-1.375h-18.063c-0.781 0-1.375 0.594-1.375 1.375 0 0.75 0.594 1.344 1.375 1.344zM1.375 25.563h18.063c0.781 0 1.375-0.594 1.375-1.344 0-0.781-0.594-1.375-1.375-1.375h-18.063c-0.781 0-1.375 0.594-1.375 1.375 0 0.75 0.594 1.344 1.375 1.344z"></path> </g></svg>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar sx={{ color: hardColor}}/> {name}
                </MenuItem>
                <Divider />
                <MenuItem onClick={openModalEntradas}>
                    <ListItemIcon>
                        <AttachMoneyIcon fontSize='small' sx={{ color: hardColor}}/>
                    </ListItemIcon>
                    Entradas
                </MenuItem>
                <MenuItem onClick={openModalEntradas}>
                    <ListItemIcon>
                        <AttachMoneyIcon fontSize='small' sx={{ color: hardColor}} />
                    </ListItemIcon>
                    Listar Entradas
                </MenuItem>
                <MenuItem onClick={openModalDespesa}>
                    <ListItemIcon>
                        <AttachMoneyIcon fontSize='small' sx={{ color: hardColor}} />
                    </ListItemIcon>
                    Despesas
                </MenuItem>
                <MenuItem onClick={openModalDespesa}>
                    <ListItemIcon>
                        <AttachMoneyIcon fontSize='small' sx={{ color: hardColor}} />
                    </ListItemIcon>
                    Listar Despesas
                </MenuItem>
                <Divider />
                <MenuItem onClick={openModalTotal}>
                    <ListItemIcon>
                        <AttachMoneyIcon fontSize='small' sx={{ color: hardColor}} />
                    </ListItemIcon>
                    Relatório Mensal
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" sx={{ color: hardColor}}/>
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" sx={{ color: hardColor}}/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}