import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ReqApi } from "../../ReqApi";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/reducers/authReducer";
import { setId, setNome } from "../../redux/reducers/userReducer";

const theme = createTheme({
	palette: {
		primary: {
			main: "#444",
		},
		secondary: {
			main: "#444",
		},
	},
});

export default function SignIn() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [checked, setChecked] = React.useState(false);

	interface User {
		_id?: string;
		nome?: string;
		email: string;
		password: string;
	}

	const handleChange = () => {
		setChecked(!checked);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		let user: User = {
			email: event.currentTarget.email.value,
			password: event.currentTarget.password.value,
		};
		let acesso = ReqApi.verificaAcesso(user);
		acesso.then((acesso) => {
			if (acesso.isAuth) {
				if (checked) {
					localStorage.setItem("isAuth", acesso.isAuth);
				} else {
					localStorage.removeItem("isAuth");
				}
				localStorage.setItem("token", acesso.token);
				localStorage.setItem("idUser", acesso.result._id);
				localStorage.setItem("nameUser", acesso.result.name);
				dispatch(setAuth(acesso.isAuth));
				navigate(`/app`);
			} else {
				alert("Usuário ou senha inválidos");
			}
		});
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<div>
						<img style={{ width: "200px" }} src="/LOGO.png" alt="" />
					</div>
					<br />
					<br />
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Endereço de Email"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Senha"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={
								<Checkbox
									value="remember"
									checked={checked}
									onChange={handleChange}
									color="primary"
								/>
							}
							label="Lembrar-me"
						/>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							Login
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Esqueceu a senha?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/signup" variant="body2">
									{"Não tem uma conta? Cadastre-se"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
