'use client';
const { useContext, createContext, useState } = require('react');

const XtrataContext = createContext();

export const XtrataProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //The object values of the provider
  const providerValues = { isMenuOpen, setIsMenuOpen };

  return (
    <XtrataContext.Provider value={providerValues}>
      {children}
    </XtrataContext.Provider>
  );
};

export const useXtrataContext = () => useContext(XtrataContext);
