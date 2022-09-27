import { MdOutlineErrorOutline } from 'react-icons/md'
import { IError } from '../lib/useElrondApi'
import Card from './Card'

interface IProps extends IError {}

const ErrorCard = ({ status, info }: IProps): JSX.Element => {
    return (
        <Card
            title={`Error ${status}`}
            text={info}
            icon={MdOutlineErrorOutline}
        />
    )
}

export default ErrorCard
