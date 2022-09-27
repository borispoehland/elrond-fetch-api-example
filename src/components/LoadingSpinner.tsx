import classNames from 'classnames'

interface IProps {
    extraClass?: string
}

const LoadingSpinner = ({ extraClass }: IProps): JSX.Element => {
    return (
        <div className="p-4">
            <div
                className={classNames('spinner-border', extraClass)}
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingSpinner
