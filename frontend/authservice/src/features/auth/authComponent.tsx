import { useCurrentUserQuery } from "../../app/services/auth";

import { MySpin } from "../../components/mySpin/mySpin";

export const AuthComponent = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentUserQuery();

  if (isLoading) {
    return <MySpin />;
  }
  return children;
};
