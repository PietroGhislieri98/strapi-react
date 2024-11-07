import React, { useEffect, useState } from 'react';
import { Layout as AntLayout } from 'antd';

function Header() {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AntLayout.Header style={isMobile ? {} : { WebkitAlignItems: 'center', WebkitJustifyContent: 'center', paddingBottom: 175 }}>
      <div className="header-top" style={isMobile ? { flexDirection: 'row', padding: '10px 0' } : {}}>
        <img
          src="https://static.wixstatic.com/media/6cd85c_ed8279c53b9845f5814f250b7ff0c49a~mv2.png/v1/fill/w_69,h_67,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Logo%20Ospedale%20Verona.png"
          alt="Logo Sinistra"
          className="logo"
          style={isMobile ? { marginRight: '10px' } : {}}
        />

        <div style={isMobile ? { fontSize: '18px', textAlign: 'center' } : { textAlign: 'center', margin: '10px' }}>
          <h1 style={isMobile ? { margin: 0 } : {}}>CENTRO MISTRA</h1>
          {!isMobile && <h2>Azienda Ospedaliera Universitaria Integrata di Verona</h2>}
        </div>

        <img
          src="https://static.wixstatic.com/media/6cd85c_a255ec10b4c444c78ce9ce5950d78ee6~mv2.png/v1/fill/w_71,h_67,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Logo%20Universit%C3%A0%20Verona.png"
          alt="Logo Destra"
          className="logo"
          style={isMobile ? { marginLeft: '10px' } : {}}
        />
      </div>
    </AntLayout.Header>
  );
}

export default Header;
