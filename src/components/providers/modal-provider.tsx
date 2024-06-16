"use client";

import React, { useEffect, useState } from "react";
import SettingDialog from "../modal/settings-dialog";
import CoverImageModal from "../modal/cover-image-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <SettingDialog />
      <CoverImageModal />
    </>
  );
};

export default ModalProvider;
