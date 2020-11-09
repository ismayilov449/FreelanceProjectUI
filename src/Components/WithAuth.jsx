import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useHistory } from "react-router-dom";
//utils
import { isInRole } from "../Redux/Utils/auth.utils.js";
//roles
import ROLENAMES from "../Redux/Constants/RoleNames";

function WithAuth({ operation, component: Component, ...rest }) {
  const history = useHistory();
  const token = useSelector((state) => state.user);
  let role;

  const currentPath = history.location.pathname;

  //   sidebarData.find((sdb) => {
  //     if (currentPath.includes(sdb.name)) {
  //       if (sdb.subCatalog && sdb.subCatalog.length) {
  //         const selected = sdb.subCatalog.find((s) => s.path === currentPath);
  //         if (selected) role = selected;
  //         else role = sdb;
  //       } else {
  //         role = sdb;
  //       }
  //     }
  //   });

  const _checkAccess = () => {
    if (isInRole(ROLENAMES.SUPERADMIN)) {
      return true;
    } else {
      return isInRole(ROLENAMES.ADMINPANEL) && isInRole(role.roleName);
    }
    return false;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          _checkAccess() ? (
            <Component operation={operation} {...props} />
          ) : (
            <Redirect to="/404" />
          )
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  );
}

WithAuth.defaultProps = {
  operation: "",
};

export default WithAuth;
