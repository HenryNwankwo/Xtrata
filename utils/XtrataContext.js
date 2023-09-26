'use client';
const { useContext, createContext } = require('react');

const XtrataContext = createContext();

export const XtrataProvider = ({ children }) => {
  //The object values of the provider
  const providerValues = {};

  return (
    <XtrataContext.Provider value={providerValues}>
      {children}
    </XtrataContext.Provider>
  );
};

export const useXtrataContext = () => useContext(XtrataContext);
