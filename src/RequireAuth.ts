import { Navigate } from 'react-router-dom'
import { useAppSelector } from './redux/hooks/useAppSelector'
type Props = {
    children: JSX.Element
}

export const RequireAuth = ({ children }: Props) => {

    const auth = useAppSelector(state => state.auth)

    const isAuth = auth.isAuth;

    if (isAuth) {
        return children;
    } else {
        return Navigate({to: '/'})
    }
}