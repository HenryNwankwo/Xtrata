'use client';
const { useContext, createContext, useState } = require('react');

const XtrataContext = createContext();

export const XtrataProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAcceptedOpen, setIsAcceptedOpen] = useState(false);
  const [isRejectedOpen, setIsRejectedOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [theRejectedFiles, setTheRejectedFiles] = useState([]);
  const [filteredLines, setFilteredLines] = useState([]);
  const [characterLimit, setCharacterLimit] = useState(160);
  const [groupFilteredLines, setGroupFilteredLines] = useState([]);
  const [extractedFiles, setExtractedFiles] = useState([]);
  //The object values of the provider
  const providerValues = {
    isMenuOpen,
    setIsMenuOpen,
    isAcceptedOpen,
    setIsAcceptedOpen,
    isRejectedOpen,
    setIsRejectedOpen,
    files,
    setFiles,
    theRejectedFiles,
    setTheRejectedFiles,
    characterLimit,
    setCharacterLimit,
    extractedFiles,
    setExtractedFiles,
  };

  return (
    <XtrataContext.Provider value={providerValues}>
      {children}
    </XtrataContext.Provider>
  );
};

export const useXtrataContext = () => useContext(XtrataContext);
