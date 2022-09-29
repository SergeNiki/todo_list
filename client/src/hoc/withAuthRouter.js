import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '..';

const withAuthRouter = (WrapperComponent) => {
  return observer((props) => {
    const { authUserStore } = useContext(Context);
    if (!authUserStore.isAuth) {
      return <Navigate to={'/login'} />;
    }
    return <WrapperComponent authUserStore={authUserStore} {...props} />;
  });
};

export default withAuthRouter;
