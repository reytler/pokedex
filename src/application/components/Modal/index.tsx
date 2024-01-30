import './style.css'

interface ModalProps {
    isOpen: boolean
    children: JSX.Element | undefined
    toogle: ()=>void
}

export function Modal({isOpen,children,toogle}:ModalProps){
    return(
        <div className="modal" style={{display: isOpen ? 'block': 'none'}}>
            <div className="modal-content">
                <div className="modal-header">
                    <span className="btn-toogle" onClick={()=>toogle()}>X</span>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}