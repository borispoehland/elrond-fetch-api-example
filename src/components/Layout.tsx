import { PropsWithChildren } from 'react'

interface IProps {}

const Layout = ({ children }: PropsWithChildren<IProps>): JSX.Element => {
    return (
        <div className="container py-5">
            <div className="flex-center flex-column">{children}</div>
        </div>
    )
}

export default Layout
