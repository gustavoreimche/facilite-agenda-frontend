import { Navigate } from 'react-router-dom'
import { useAppSelector } from './redux/hooks/useAppSelector'
type Props = {
    children: JSX.Element
}

export const RequireAuth = ({ children }: Props) => {

    const isAuth = useAppSelector(state => state.auth.isAuth)

    if (isAuth) {
        return children;
    } else {
        return Navigate({to: '/'})
    }
}