'use client';
const { useContext, createContext, useState } = require('react');

const XtrataContext = createContext();

export const XtrataProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAcceptedOpen, setIsAcceptedOpen] = useState(false);
  const [isRejectedOpen, setIsRejectedOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [theRejectedFiles, setTheRejectedFiles] = useState([]);
  const [partAFiles, setPartAFiles] = useState([]);
  const [partARejectedFiles, setPartARejectedFiles] = useState([]);
  const [characterLimit, setCharacterLimit] = useState(160);
  const [partBFiles, setPartBFiles] = useState([]);
  const [partBRejectedFiles, setPartBRejectedFiles] = useState([]);
  const [extractedFiles, setExtractedFiles] = useState([]);
  const [allAcceptedOpen, setAllAcceptedOpen] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [allRejectedOpen, setAllRejectedOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extracting, setExtracting] = useState(false);
  const [searching, setSearching] = useState(false);
  const [downloading, setDownloading] = useState(false);

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
    partAFiles,
    setPartAFiles,
    partARejectedFiles,
    setPartARejectedFiles,
    partBFiles,
    setPartBFiles,
    partBRejectedFiles,
    setPartBRejectedFiles,
    allAcceptedOpen,
    setAllAcceptedOpen,
    searchedData,
    setSearchedData,
    allRejectedOpen,
    setAllRejectedOpen,
    progress,
    setProgress,
    extracting,
    setExtracting,
    searching,
    setSearching,
    downloading,
    setDownloading,
  };

  return (
    <XtrataContext.Provider value={providerValues}>
      {children}
    </XtrataContext.Provider>
  );
};

export const useXtrataContext = () => useContext(XtrataContext);
