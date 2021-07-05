import React, {Fragment} from 'react';
import { connect } from 'react-redux'
import  CookieDialog  from './client/components/CookieDialog';
import { PersistGate } from 'redux-persist/integration/react';




function PermissionAndPersist(props) {
  const { children, persistor, cookie } = props;

  return (
    <Fragment>
      {cookie.allowed && (
        <PersistGate persistor={persistor}>
          {children}
        </PersistGate>
      )}
      {!cookie.allowed && (
        <Fragment>
          {children}
          <CookieDialog/>
        </Fragment>
      )}
    </Fragment>
  );
}



const mapStateToProps = (state) => {
  return {
      cookie: state.cookie,
      }
};

export default connect(mapStateToProps)(PermissionAndPersist);
