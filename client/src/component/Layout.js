import React from 'react'

const Layout = ({title ="Title",description ="Description",children, className}) => (
    <div className="Layout-container">
        <div className="Layout-container__header">
            <h2 className="Layout-container__header__title">{title}</h2>
            <p className="Layout-container__header__title__description">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
)

export default Layout;