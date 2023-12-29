import React, { useEffect } from "react";
import Options from "../../components/options/options";
import { useAuthAndNavigation } from "../../utils/auth/auth";

const OptionsPage = () => {
  const { checkAuthentication } = useAuthAndNavigation();

  useEffect(() => {
    checkAuthentication();
  }, []);
  return <Options />;
};

export default OptionsPage;
