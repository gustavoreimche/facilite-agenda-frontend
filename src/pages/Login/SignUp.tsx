import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReqApi } from "../../ReqApi";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/reducers/authReducer";
import { setId, setEmail, setNome } from "../../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";

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

export default function SignUp() {
	interface User {
		_id?: string;
		name: string;
		email: string;
		password: string;
	}

	const [passwordConfirm, setPasswordConfirm] = React.useState(true);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		if (data.get("nome") == "" || data.get("email") == "" || data.get("password") == "") {
			return null;
		} else {
			if (data.get("password") !== data.get("passwordConfirm")) {
				setPasswordConfirm(false);
				return null;
			} else {
				setPasswordConfirm(true);
				let user: User = {
					name: data.get("name") as string,
					email: data.get("email") as string,
					password: data.get("password") as string,
				};

				let verificaEmail = ReqApi.getUserByEmail(user.email);
				verificaEmail.then((response) => {
					if (response === null) {
						console.log(user);
						let response = ReqApi.cadastraUser(user);
						response.then((response) => {
							localStorage.setItem("token", response.token);
							localStorage.setItem("idUser", response.result._id);
							localStorage.setItem("nameUser", response.result.name);
							dispatch(setAuth(response.isAuth));
							navigate(`/app`);
						});
					} else {
						alert("Email já cadastrado");
					}
				});
			}
		}

		console.log({
			email: data.get("email"),
			password: data.get("password"),
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
						<img style={{ width: "200px" }} src="/LOGO.png" alt="logo" />
					</div>
					<br />
					<br />
					<Typography component="h1" variant="h5">
						Cadastro
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12}>
								<TextField
									autoComplete="given-name"
									name="name"
									required
									fullWidth
									id="name"
									label="Nome Completo"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Senha"
									type="password"
									error={!passwordConfirm}
									helperText={!passwordConfirm ? "As senhas não conferem" : ""}
									id="password"
									autoComplete="new-password"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="passwordConfirm"
									label="Confirme a senha"
									type="password"
									error={!passwordConfirm}
									helperText={!passwordConfirm ? "As senhas não conferem" : ""}
									id="passwordConfirm"
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox value="allowExtraEmails" color="primary" />}
									label="Estou ciente com os termos de compromisso"
								/>
							</Grid>
						</Grid>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							Cadastro
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/" variant="body2">
									Já tem uma conta?
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
