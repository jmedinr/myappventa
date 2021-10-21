import ListaPage from './Gestion_Ventas/ListaPage.jsx'
import Registrar from './Gestion_Ventas/RegistrarProducto.jsx'
import Header from './Componentes/Header/Header_Admin.jsx'
import ListaV from './Gestion_Ventas/ListaPageVendedor.jsx'
import Footer from './Componentes/Footer/Footer.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <ListaPage></ListaPage>F
        </Route>
        <Route path="/agregar_productos" exact>
          <Registrar></Registrar>
        </Route>
        <Route path="/gestion_venta" exact>
          <ListaV></ListaV>
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
