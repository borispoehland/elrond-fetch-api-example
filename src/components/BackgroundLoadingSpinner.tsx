import LoadingSpinner from './LoadingSpinner'

const BackgroundLoadingSpinner = (): JSX.Element => {
    return (
        <div className="position-absolute" style={{ right: 10, top: 10 }}>
            <LoadingSpinner extraClass="text-secondary" />
        </div>
    )
}

export default BackgroundLoadingSpinner
