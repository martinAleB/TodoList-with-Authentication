import React from 'react'

const FormError = ({ mensaje }) => {
    return (
        <div className="invalid-feedback">
            {mensaje}
        </div>
    )
}

export default FormError;