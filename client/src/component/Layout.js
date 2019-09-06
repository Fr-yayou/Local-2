import React from 'react'

const Layout = ({title ="Title",description ="Description",children, className}) => (
    <div className="Layout-container">
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
)

export default Layout;