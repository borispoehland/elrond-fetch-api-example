import Image from 'next/image'
import { PropsWithChildren } from 'react'
import { IconType } from 'react-icons'

interface IProps {
    title: string
    icon?: IconType
    iconColor?: string
    imgSrc?: string
    subTitle?: string
    text?: string
}

const Card = ({
    icon,
    iconColor = 'darkred',
    imgSrc,
    title,
    subTitle,
    text,
    children,
}: PropsWithChildren<IProps>): JSX.Element => {
    const Icon = icon
    return (
        <div
            className="card"
            style={{ minWidth: 250, breakInside: 'avoid-column' }}
        >
            {imgSrc && (
                <div className="card-image-top">
                    <div className="position-relative" style={{ height: 300 }}>
                        <Image
                            src={imgSrc}
                            layout="fill"
                            objectFit="cover"
                            alt=""
                        />
                    </div>
                </div>
            )}
            {Icon && (
                <div className="card-image-top flex-center pt-3">
                    <Icon size={50} color={iconColor} />
                </div>
            )}
            <div className="card-body">
                <h5 className="card-title text-center">{title}</h5>
                {subTitle && (
                    <h6 className="card-subtitle mb-2 text-muted">
                        {subTitle}
                    </h6>
                )}
                {text && <p className="card-text text-center">{text}</p>}
                {children}
            </div>
        </div>
    )
}

export default Card
