import { Navigate } from "react-router-dom";
import { ReqApi } from "./ReqApi";
import { useAppSelector } from "./redux/hooks/useAppSelector";
type Props = {
	children: JSX.Element;
};

export const RequireAuth = ({ children }: Props) => {
	const isAuth =
		localStorage.getItem("isAuth") === "true" ? true : useAppSelector((state) => state.auth.isAuth);

	if (isAuth) {
		return children;
	} else {
		return Navigate({ to: "/" });
	}
};
