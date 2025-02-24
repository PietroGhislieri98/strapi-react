import { Link, useLocation } from 'react-router-dom';
import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import React from 'react';

function MenuComponent() {
  const location = useLocation(); // Hook per ottenere la location corrente
  const [isMobile, setIsMobile] = useState(false); // Stato per rilevare il mobile
  const [open, setOpen] = useState(false); // Stato per il Drawer mobile
  const [loading, setLoading] = useState(false); // Stato per il caricamento del Drawer

  // Funzione per mostrare il drawer e simulare il caricamento
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simula un caricamento per 2 secondi
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // Funzione per gestire il menu a seconda della location
  const handleMenuClick = (key) => {
    if (location.pathname === key) {
      window.location.href = key; // Ricarica la pagina se si clicca sulla stessa voce
    }
  };

  // Array di elementi del menu
  const menuItems = [
    { key: '/home', label: <Link to="/home" onClick={() => handleMenuClick('/home')}>Home Page</Link> },
    { key: '/about', label: <Link to="/about" onClick={() => handleMenuClick('/about')}>Chi siamo</Link> },
    {
      key: 'infection',
      label: 'Infezioni',
      children: [
        { key: '/chlamydia', label: <Link to="/chlamydia" onClick={() => handleMenuClick('/chlamydia')}>Chlamydia</Link> },
        { key: '/hiv', label: <Link to="/hiv" onClick={() => handleMenuClick('/hiv')}>HIV</Link> },
        { key: '/gonorrea', label: <Link to="/gonorrea" onClick={() => handleMenuClick('/gonorrea')}>Gonorrea</Link> },
        { key: '/mycoplasma', label: <Link to="/mycoplasma" onClick={() => handleMenuClick('/mycoplasma')}>Mycoplasma</Link> },
        { key: '/sifilide', label: <Link to="/sifilide" onClick={() => handleMenuClick('/sifilide')}>Sifilide</Link> },
        { key: '/epatite-c', label: <Link to="/epatite-c" onClick={() => handleMenuClick('/epatite-c')}>Epatite C</Link> },
        { key: '/epatite-b', label: <Link to="/epatite-b" onClick={() => handleMenuClick('/epatite-b')}>Epatite B</Link> },
        { key: '/epatite-a', label: <Link to="/epatite-a" onClick={() => handleMenuClick('/epatite-a')}>Epatite A</Link> },
        { key: '/condilomi', label: <Link to="/condilomi" onClick={() => handleMenuClick('/condilomi')}>Condilomi</Link> },
        { key: '/herpes-genitale', label: <Link to="/herpes-genitale" onClick={() => handleMenuClick('/herpes-genitale')}>Herpes Genitale</Link> },
        { key: '/glossario', label: <Link to="/glossario" onClick={() => handleMenuClick('/glossario')}>Glossario</Link> },
      ],
    },
    {
      key: 'service',
      label: 'Servizi',
      children: [
        { key: '/hiv-test', label: <Link to="/hiv-test" onClick={() => handleMenuClick('/hiv-test')}>HIV Test</Link> },
        { key: '/counselling-ist', label: <Link to="/counselling-ist" onClick={() => handleMenuClick('/counselling-ist')}>IST</Link> },
        { key: '/terapies', label: <Link to="/terapies" onClick={() => handleMenuClick('/terapies')}>Terapie</Link> },
        { key: '/comunicare-partner', label: <Link to="/comunicare-partner" onClick={() => handleMenuClick('/comunicare-partner')}>Avvisare i partner</Link> },
      ],
    },
    { key: '/contacts', label: <Link to="/contacts" onClick={() => handleMenuClick('/contacts')}>Contatti</Link> },
    { key: '/news', label: <Link to="/news" onClick={() => handleMenuClick('/news')}>Collabora</Link> },
    { key: '/events', label: <Link to="/events" onClick={() => handleMenuClick('/events')}>Eventi</Link> },
    { key: '/test', label: <Link to="/dashboard" onClick={() => handleMenuClick('/dashboard')}>Test</Link> },

  ];

  // Hook per rilevare il resize dello schermo e determinare se è mobile o meno
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Controllo iniziale alla prima esecuzione

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ WebkitAlignItems: 'center', WebkitJustifyContent: 'center'}}>
      {isMobile ? (
        <>
          <Button
            className="mobile-menu-button"
            type="primary"
            icon={<MenuOutlined />}
            onClick={showLoading}
            style={{ marginLeft: 'auto' }} // Icona hamburger per mobile
          />
          <Drawer
            closable
            destroyOnClose
            title={<p>Menu</p>}
            placement="right"
            open={open}
            onClose={() => setOpen(false)}
            loading={loading}
            styles={{
              body: {
                paddingLeft: isMobile ? '60px' : '0',
              },
            }}
          >
            <Menu
              mode="vertical"
              selectedKeys={[location.pathname]} // Seleziona l'elemento del menu basato sulla location
              defaultSelectedKeys={['/home']}
              items={menuItems}
            />
          </Drawer>
        </>
      ) : (
        <Menu
          className="desktop-menu"
          mode="horizontal"
          selectedKeys={[location.pathname]} // Seleziona l'elemento del menu basato sulla location
          defaultSelectedKeys={['/home']}
          items={menuItems}
          style={{ flex: 1, justifyContent: 'center', display: 'flex' }} // Mostra il menu desktop
        />
      )}

    </div>
  );
}

export default MenuComponent;
