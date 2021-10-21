import React from 'react'

function Footer() {
    return (
        <div className="container-fluid bg-dark text-white">
            <footer>
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12 p-1">
                        <h6 className="text-uppercase font-weight-bold">Información Adicional</h6>
                        <p>Carrera 200 Numero 500 - 20 Piso 1001, Bogotá D.C., Colombia</p>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 p-1">
                        <h6 className="text-uppercase font-weight-bold">Contacto</h6>
                        <p>Colombia
                        <br />info@atomium.com<br />
                        + 57 777 888 88
                        + 57 888 777 77
                        </p>
                    </div>
                    <div>
                        <div className="footer-copyright text-center">© 2021 Copyright: Equipo10</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer