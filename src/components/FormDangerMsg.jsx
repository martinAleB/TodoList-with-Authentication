import React from 'react'

const FormDangerMsg = ({ mensaje }) => {
    return (
        <div class="card text-white bg-danger mb-3" style={{ maxWidth: "18rem" }}>
            <div class="card-body">
                <p class="card-text">{mensaje}</p>
            </div>
        </div>
    )
}

export default FormDangerMsg;